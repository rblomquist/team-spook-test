// import dotenv from "dotenv";
// import pkg from 'express-openid-connect';
// import { auth, requiresAuth } from 'express-openid-connect';
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { authorizeWithGoogle, getGoogleAuthUrl } from "./google-auth.js";
import { mongoConnect } from "./db/index.js";
import { busResolvers } from "./graphql-schema/busResolvers.js";
import { typeDefs } from "./graphql-schema/typeDefs.js";
import { customerResolvers } from "./graphql-schema/customerResolvers.js";
import { guideResolvers } from "./graphql-schema/guideResolvers.js";
import { agentResolvers } from "./graphql-schema/agentResolvers.js";
import { serverErrorHandler } from "./utils/ErrorHandling/typesErrors/serverErrorHandler.js";
import { userResolvers } from "./graphql-schema/userResolvers.js";
import { getUserEmail } from "./utils/getUserEmail.js";
import {
  requireGoogleAuth,
  configureCookieParser,
} from "./utils/google-auth-middleware.js";

const app = express();
const port = 4000;
configureCookieParser(app); // Configurar middleware de cookies
mongoConnect();
// Ruta de autenticación de Google
app.get("/auth/google", (req, res) => {
  console.log("hola /auth/google")
  const authUrl = getGoogleAuthUrl();
  res.redirect(authUrl);
});

// Ruta de callback de autenticación de Google
app.get("/auth/google/redirect", async (req, res) => {
  console.log("hola redirect")
  const { code } = req.query;
  const tokens = await authorizeWithGoogle(code);
  const email = await getUserEmail(tokens);
  console.log("Email:", email); // Agrega un console.log aquí para verificar que el email se esté obteniendo correctamente
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
    console.log("Tokens guardados en la base de datos");
  } catch (error) {
    console.error(error);
  }
  console.log("Tokens guardados en la base de datos"); // Agrega un console.log aquí para verificar que se estén guardando los tokens
  res.redirect("/");
});

app.get("/", requireGoogleAuth, (req, res) => {
  res.send("Welcome to Tourism Agency API");
});
app.get("/api-docs", requireGoogleAuth, (req, res) => {
  res.redirect(
    process.env.NODE_ENV === "development"
      ? `http://localhost:${port}/graphql`
      : `https://tourguideagency.onrender.com/graphql`
  );
});
app.get("/graphql", requireGoogleAuth, (req, res) => {
  res.redirect(
    process.env.NODE_ENV == "development"
      ? `http://localhost:${port}/graphql`
      : `https://tourguideagency.onrender.com/graphql`
  );
});

// dotenv.config();

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.SECRET,
//   baseURL: process.env.BASE_URL,
//   clientID: process.env.CLIENT_ID,
//   issuerBaseURL: process.env.ISSUER_BASE_URL
// };

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });


// app.get('/api-docs',(req,res)=>res.redirect(`https://tourguideagency.onrender.com/graphql`))
// app.post('/verify-password', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const result = await verifyPass(email, password);
//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// });

export async function start() {
  const server = new ApolloServer({
    typeDefs : typeDefs,
    resolvers: [busResolvers, agentResolvers, customerResolvers, guideResolvers, userResolvers],
      introspection: true
  });
  mongoConnect()
  await server.start();
  server.applyMiddleware({ app });
  app.use(serverErrorHandler);
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://tu-usuario-de-github.github.io");
    next();
  });
  app.get('*',(req,res)=>res.send("404 not found"))
  app.listen({ port }, () => {
    console.log(
      `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    );
  });
}

start()

