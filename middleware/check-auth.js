const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user");

dotenv.config({ path: "../config/.env" });

// Middleware zur Überprüfung, ob ein Token vorhanden ist
module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.send({
      error:
        "Sie verfügen über keine Authorisierung. Bitte melden Sie sich an.",
    });
  }
  try {
    // get Bearer token
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.redirect("/login");
      throw new Error("Die Authentifizierung ist fehlgeschlagen.");
    }
    const { id } = jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);

    req.userId = await User.findOne({ _id: id }).select("_id");
    next();
  } catch (e) {
    return next(e);
  }
};
