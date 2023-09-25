const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, "secret03", (err, decoded) => {
      if (err) {
        res.send({ msg: "please log in" });
      } else {
        req.userId = decoded.userId;

        next();
      }
    });
  } else {
    res.send({ msg: "please log in" });
  }
};

module.exports = auth;
