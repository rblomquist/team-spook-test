import { GraphQLError } from "graphql";
export const ErrorHandling = (error) => {
  switch (error.name) {
    case "CastError":
        throw new GraphQLError(`CastError on field ${error.path}: value (${error.value}) must be ${error.kind}`, {
            extensions: {
              code: "VALIDATION_FAILED",
            },
          });
    case "ValidationError":
      throw new GraphQLError(
        `Validation error: ${error.message}`,
        {
          extensions: {
            code: "VALIDATION_FAILED",
          },
        }
      );
    case "SyntaxError":
      throw new GraphQLError(
        `Syntax error in your query: ${error.message}`,
        {
          extensions: {
            code: "SYNTAX_ERROR",
          },
        }
      );
    case "AuthenticationError":
      throw new GraphQLError(
        `Authentication error: ${error.message}`,
        {
          extensions: {
            code: "AUTHENTICATION_FAILED",
          },
        }
      );
    case "AuthorizationError":
      throw new GraphQLError(
        `Authorization error: ${error.message}`,
        {
          extensions: {
            code: "AUTHORIZATION_FAILED",
          },
        }
      );
    case "NotFoundError":
          throw new GraphQLError(`${error.message}`, {
            extensions: {
              code: "DATA_NOT_FOUND",
            },
          });
    case "GraphQLError":
      throw new GraphQLError(
        `Data fetching error: ${error.message}`,
        {
          extensions: {
            code: "BAD_DATA_ENTRY",
          },
        }
      );
    default:
      throw error;
  }
};


