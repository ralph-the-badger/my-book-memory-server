const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "../config/.env" });

// Middleware zur Überprüfung, ob ein Token vorhanden ist
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Die Authentifizierung ist fehlgeschlagen!");
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (e) {
    return next(e);
  }
};
