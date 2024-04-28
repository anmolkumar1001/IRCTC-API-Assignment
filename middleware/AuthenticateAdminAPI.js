const AuthenticateAdminAPI = (req, res, next) => {
  // Check if the user is authenticated and has admin role
  if (req.user.role !== "admin") {
    return res.status(401).send("Unauthorized: Admin access only");
  }

  // Check if the API key is provided and matches the expected value
  const apiKey = req.headers["api-key"];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).send("Unauthorized: Invalid API key");
  }

  // If all checks pass, proceed to the next middleware or route handler
  next();
};

module.exports = AuthenticateAdminAPI;
