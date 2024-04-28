const jwt = require("jsonwebtoken");

const AuthenticateToken = (req, res, next) => {
  // Extract the authorization header from the request
  const authHeader = req.headers["authorization"];
  // Extract the token from the authorization header
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  // Verify the token using the secret key
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    // If token is valid, add user information to the request object
    req.user = user;
    next();
  });
};

module.exports = AuthenticateToken;
