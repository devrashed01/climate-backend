const jwt = require("jsonwebtoken");

module.exports = ({ id, role }) => {
  const token = jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "1d",
  });
  return token;
};
