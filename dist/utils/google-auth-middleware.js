import cookieParser from 'cookie-parser';
// Middleware para verificar la autenticación de Google
export const requireGoogleAuth = (req, res, next) => {
    const link = process.env.NODE_ENV == "development" ? 'http://localhost:4000' : 'https://tourguideagency.onrender.com';
    console.log("probando " + link);
    const googleAccessToken = req.cookies.googleAccessToken;
    if (!googleAccessToken) {
        res.redirect(`${link}/auth/google`);
    }
    else {
        // Si el token de acceso está presente, continuar con la siguiente función middleware
        next();
    }
};
// Configurar middleware de cookies
export const configureCookieParser = (app) => {
    app.use(cookieParser());
};
