import mongoose from 'mongoose'; // Importar mongoose para realizar la consulta
import { UserGoogleAuth } from '../../models/collections.js';

export const requireGoogleAuth = async (req, res, next) => {
  const link = process.env.NODE_ENV == "development"
    ? "http://localhost:4000"
    : "https://tourguideagency.onrender.com";
  const userId = req.session.userId; // Leer el ID del usuario desde la sesión

  if (!userId) {
    // Si el identificador de usuario no está en la sesión, redirigir a la ruta de autenticación de Google
    res.redirect(`${link}/auth/google`);
  } else {
    // Verificar si el googleTokenId está almacenado en la base de datos
    const user = await UserGoogleAuth.findOne({ googleTokenId: userId });

    if (!user) {
      // Si el googleTokenId no está en la base de datos, redirigir a la ruta de autenticación de Google
      res.redirect(`${link}/auth/google`);
    } else {
      // Si el googleTokenId está en la base de datos, continuar con la siguiente función middleware
      next();
    }
  }
};





