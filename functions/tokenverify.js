const crypto = require("crypto");
const jwt = require("jsonwebtoken");


exports.tokenverify = async (req, res, next) => {
  let token = req.headers["astro-token"];

  if (!token) {
    return res.status(403).send({ message: "No Token Provided" });
  }
  console.log(process.env.TOKEN_SECRET);
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).send({ message: "Unathorized" });
    }
    req.astroId = decoded.astroId;
    console.log(req.astroId);
     req.usertype = decoded.usertype;
    next();
  });
};
