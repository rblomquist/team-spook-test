import express from "express";
import { authorizeWithGoogle, getGoogleAuthUrl } from './google-auth.js';
import { ApolloServer } from "apollo-server-express";
import { mongoConnect } from "./db/index.js";
import { busResolvers } from "./graphql-schema/busResolvers.js";
import { typeDefs } from "./graphql-schema/typeDefs.js";
import { customerResolvers } from "./graphql-schema/customerResolvers.js";
import { guideResolvers } from "./graphql-schema/guideResolvers.js";
import { destinationResolvers } from "./graphql-schema/destinationResolvers.js";
import { serverErrorHandler } from './utils/ErrorHandling/typesErrors/serverErrorHandler.js';
import { verifyPass } from './utils/verifyPass.js';
import { userResolvers } from "./graphql-schema/userResolvers.js";
import { getUserEmail } from "./utils/getUserEmail.js";
const app = express();
const port = 4000;
mongoConnect();
// Ruta de autenticación de Google
app.get('/auth/google', (req, res) => {
    const authUrl = getGoogleAuthUrl();
    res.redirect(authUrl);
});
// Ruta de callback de autenticación de Google
app.get('/auth/google/redirect', async (req, res) => {
    const { code } = req.query;
    const tokens = await authorizeWithGoogle(code);
    const email = await getUserEmail(tokens);
    console.log('Email:', email); // Agrega un console.log aquí para verificar que el email se esté obteniendo correctamente
    try {
        await userResolvers.Mutation.registerUserGoogleAuth(null, {
            email: email,
            googleAccessToken: tokens.access_token,
            googleRefreshToken: tokens.refresh_token,
            googleScope: tokens.scope,
            googleTokenType: tokens.token_type,
            googleIdToken: tokens.id_token,
            googleExpiryDate: new Date(tokens.expiry_date),
        });
        console.log('Tokens guardados en la base de datos');
    }
    catch (error) {
        console.error(error);
    }
    console.log('Tokens guardados en la base de datos'); // Agrega un console.log aquí para verificar que se estén guardando los tokens
    res.redirect('/');
});
app.get('/', (req, res) => res.send("Si somos tercos como mulas"));
app.get('/api-docs', (req, res) => res.redirect(`https://studio.apollographql.com/sandbox?endpoint=http%3A%2F%2Flocalhost%3A4000%2Fgraphql`));
app.get('/api-docs-render', (req, res) => res.redirect(`https://studio.apollographql.com/sandbox?endpoint=https%3A%2F%2Fbusesdatabaseapi.onrender.com%2Fgraphql`));
app.post('/verify-password', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await verifyPass(email, password);
        res.json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
async function start() {
    const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: [busResolvers, customerResolvers, guideResolvers, destinationResolvers, userResolvers],
        introspection: true
    });
    await server.start();
    server.applyMiddleware({ app });
    app.use(serverErrorHandler);
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "https://tu-usuario-de-github.github.io");
        next();
    });
    app.get('*', (req, res) => res.send("404 not found"));
    app.listen({ port }, () => {
        console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`);
    });
}
start();
