const jwt = require("jsonwebtoken");
//                     id of user to be encoded in the token

const generateToken = (user) => {
  return jwt.sign({ id }, process.env.JWT, {
    expiresIn: "10d", // token expires in 10 days
  });
};

module.exports = generateToken;
