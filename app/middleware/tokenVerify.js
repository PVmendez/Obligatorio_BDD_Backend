import jwt from "jsonwebtoken";

export const verifyToken = () => (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    req.user = decoded;
    req.roles = decoded.UserInfo.roles;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ mensaje: 'Token expirado. Por favor, inicia sesión nuevamente.' });
    }
    return res.status(401).json({ mensaje: 'Token no válido.' });
  }
};
