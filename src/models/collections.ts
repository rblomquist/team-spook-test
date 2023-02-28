//Refleja la estructura de datos de la base de datos.
import { Schema, model, Types } from "mongoose";

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  seat: {
    type: Number,
    required: true,
  },
});

const busSchema = new Schema({
  Total_Seat: {
    type: Number,
    required: true,
  },
  Empty_Seat: {
    type: Number,
    required: true,
  },
  Full_Seat: {
    type: Number,
    required: true,
  },
  Patent: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const userSchemaGoogleAuth = new Schema({
  email: { type: String, required: true },
  googleAccessToken: { type: String },
  googleRefreshToken: { type: String },
  googleScope: { type: String },
  googleTokenType: { type: String },
  googleIdToken: { type: String },
  googleExpiryDate: { type: String },
});

export const UserGoogleAuth = model("usergoogleauths", userSchemaGoogleAuth);
export const Customer = model("Customer", customerSchema);
export const Bus = model("Bus", busSchema);
export const User = model("users", userSchema);
