import { google } from 'googleapis';
import path from 'path';
import { readFileSync, writeFile } from 'fs';
// Lee los datos de las credenciales de Google desde el archivo JSON
const credentialsPath = path.join(process.cwd(), process.env.NODE_ENV === "development" ? 'credentials.json' : "./credentials.json");
const credentials = JSON.parse(readFileSync(credentialsPath, 'utf8'));
const REDIRECT_URI = process.env.NODE_ENV === "development" ? 'http://localhost:4000/auth/google/redirect' : "https://busesdatabaseapi.onrender.com/auth/google/redirect";
const SCOPES = ['https://www.googleapis.com/auth/userinfo.profile'];
// Configuración de OAuth 2.0
const oAuth2Client = new google.auth.OAuth2(credentials.web.client_id, credentials.web.client_secret, REDIRECT_URI);
// Función de autorización de Google
export async function authorizeWithGoogle(code) {
    const { tokens } = await oAuth2Client.getToken(code.toString());
    oAuth2Client.setCredentials(tokens);
    // Devuelve los tokens de acceso
    console.log(tokens);
    return tokens;
}
// Ruta de autenticación de Google
export function getGoogleAuthUrl() {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    return authUrl;
}
// Función para guardar los tokens de acceso en un archivo
async function saveCredentials(credentials) {
    const tokenPath = path.join(process.cwd(), 'token.json');
    const tokenString = JSON.stringify(credentials);
    await writeFile(tokenPath, tokenString, (err) => {
        if (err)
            return console.error(err);
        console.log('Tokens stored to', tokenPath);
    });
}
