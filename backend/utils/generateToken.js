const jwt = require("jsonwebtoken");

// jsonwebtoken is used for authorisation

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
