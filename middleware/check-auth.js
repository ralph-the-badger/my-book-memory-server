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
      throw new Error("Die Authentifizierung ist fehlgeschlagen.");
    }
    const { id } = jwt.verify(
      token,
      process.env.TOKEN_PRIVATE_KEY,
      (err, res) => {
        if (err) {
          // throw new Error(
          //   "Die Session ist abgelaufen. Bitte melden Sie sich erneut an."
          // );
          return "token expired";
        } else return res;
      }
    );

    if (id === "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    req.userId = await User.findOne({ _id: id }).select("_id");

    next();
  } catch (e) {
    return next(e);
  }
};
