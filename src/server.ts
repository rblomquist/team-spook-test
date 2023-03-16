import express from "express";
import { ApolloServer } from "apollo-server-express";
import { authorizeWithGoogle, getGoogleAuthUrl } from "./google-auth";
import { mongoConnect } from "./db/index";
import { busResolvers } from "./graphql-schema/busResolvers";
import { typeDefs } from "./graphql-schema/typeDefs";
import { customerResolvers } from "./graphql-schema/customerResolvers";
import { guideResolvers } from "./graphql-schema/guideResolvers";
import { agentResolvers } from "./graphql-schema/agentResolvers";
import { serverErrorHandler } from "./utils/ErrorHandling/typesErrors/serverErrorHandler";
import { userResolvers } from "./graphql-schema/userResolvers";
import { getUserEmail } from "./utils/getUserEmail";
import {
  requireGoogleAuth,
  configureCookieParser,
} from "./utils/google-auth-middleware";

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

export async function start() {
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: [
      busResolvers,
      agentResolvers,
      customerResolvers,
      guideResolvers,
      userResolvers,
    ],
    introspection: true,
  });
  mongoConnect()
  await server.start();
  server.applyMiddleware({ app });
  app.use(serverErrorHandler);
  app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://tu-usuario-de-github.github.io"
    );
    next();
  });
  app.get("*", (req, res) => res.send("404 not found"));
  app.listen({ port }, () => {
    console.log(
      `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    );
  });
}

start();