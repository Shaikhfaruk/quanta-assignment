const jwt = require("jsonwebtoken");

// Auth middleware

exports.requireLogin = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      // Attach token to request
      req.user = decode;
      next();
    } else {
      return res.status(400).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
  }
};
