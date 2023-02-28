/***escribir la definición de los tipos y consultas que tu API GraphQL va a soportar.
 * Esto es hecho en el lenguaje de esquema de GraphQL, y permite describir los datos
 *  y la estructura de tus consultas. ***/
import { gql } from "apollo-server-express";
export const typeDefs = gql `
  type User {
    _id: ID!
    email: String!
    password: String!
  }
  type UserGoogleAuth {
    _id: ID!
    email: String!
    googleAccessToken: String!
    googleRefreshToken: String!
    googleScope: String!
    googleTokenType: String!
    googleIdToken: String!
    googleExpiryDate: String
  }

  type Customer {
    _id: ID
    firstName: String
    lastName: String
    email: String
    phone: String
    emergency_phone: String
    passport: String
    seat: Int
  }

  type Guide {
    _id: ID
    firstName: String
    lastName: String
    email: String
    phone: String
    languages: String
    bio: String
    databaseAccessLevel: Int
  }

  type Bus {
    _id: ID!
    Name: String!
    Description: String!
    Tour_Guide: String!
    Total_Seat: Int!
    Empty_Seat: Int!
    Full_Seat: Int!
    Patent: String!
  }

  type Query {
    getAllcustomers: [Customer]
    getCustomerbyId(id: ID!): Customer
    getAllguides: [Guide]
    getGuidebyId(id: ID!): Guide
    getAllBuses: [Bus]!
    getBusesbyId(id: ID!): Bus
    getUserbyEmail(email: String!): User
  }

  type Mutation {
    registerUserGoogleAuth(
      email: String!
      googleAccessToken: String!
      googleRefreshToken: String!
      googleScope: String!
      googleTokenType: String!
      googleIdToken: String!
      googleExpiryDate: String
    ): UserGoogleAuth!
    registerUser(email: String!, password: String!): User!
    createCustomer(
      firstName: String!
      lastName: String!
      email: String!
      phone: String!
      emergency_phone: String!
      passport: String!
      seat: Int!
    ): Customer!
    updateCustomer(
      id: ID!
      firstName: String
      lastName: String
      email: String
      phone: String
      emergency_phone: String
      passport: String
      seat: Int
    ): Customer!
    deleteCustomer(id: ID!): String!
    createGuide(
      firstName: String
      lastName: String
      email: String
      phone: String
      languages: String
      bio: String
      databaseAccessLevel: Int
    ): Guide!
    updateGuide(
      _id: ID!
      firstName: String
      lastName: String
      email: String
      phone: String
      languages: String
      bio: String
      databaseAccessLevel: Int
    ): Guide!
    deleteGuide(id: ID!): String!
    createBus(
      Name: String!
      Description: String!
      Tour_Guide: String!
      Total_Seat: Int!
      Empty_Seat: Int!
      Full_Seat: Int!
      Patent: String!
    ): Bus!
    updateBus(
      id: ID!
      Name: String!
      Description: String!
      Tour_Guide: String!
      Total_Seat: Int
      Empty_Seat: Int
      Full_Seat: Int
      Patent: String
    ): Bus!
    deleteBus(id: ID!): String!
  }
`;
