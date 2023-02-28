import { ApolloClient, InMemoryCache,gql } from '@apollo/client';

export const GET_ALL_CUSTOMERS = gql`
  query {
    getAllcustomers {
      _id
      firstName
      lastName
      email
      phone
      emergency_phone
      passport
      seat
    }
  }
`;
export const GET_ALL_GUIDESS = gql`
  query {
    getAllGuides {
      _id
      firstName
      lastName
      email
      phone
      languages
      bio
      databaseAccessLevel
    }
  }
`;
export const REGISTER_USER = gql`
  mutation registerUser($email: String!, $password: String!) {
    registerUser(email: $email, password: $password) {
      email
      password
    }
  }
`;



const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // reemplaza con la URL de tu servidor GraphQL
  cache: new InMemoryCache()
});

export default client;
