const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send('No Token');
    }

    // Correct index is [1]
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).send('Invalid Token Format');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).send('Invalid or Expired Token');
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send("Admin Only");
  }
  next();
};
