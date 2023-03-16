import { google } from 'googleapis';
import path from 'path';
import { readFileSync } from 'fs';
import { UserGoogleAuth } from "../models/collections";

const credentialsPath = path.join(process.cwd(), 'credentials.json');
const credentials = JSON.parse(readFileSync(credentialsPath, 'utf8'));

const oAuth2Client = new google.auth.OAuth2(
  credentials.web.client_id,
  credentials.web.client_secret,
  'http://localhost:4000/auth/google/redirect'
);

export async function getUserEmail(tokens: any) {
  const { id_token } = tokens;
  const ticket = await oAuth2Client.verifyIdToken({
    idToken: id_token,
    audience: credentials.web.client_id,
  });
  const payload = ticket.getPayload();
  const email = payload.email;
  return email;
}

  