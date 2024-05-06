const bcrypt = require('bcryptjs');
const valueRounds = 20;

const encryptPassword = async (password) => {
  const value = await bcrypt.genSalt(valueRounds);
  const hashedPassword = await bcrypt.hash(password, value);
  return hashedPassword;
};

const decryptPassword = async (password, userPassword) => {
  const passwordMatch = await bcrypt.compare(password, userPassword);
  return passwordMatch;
};

module.exports = { encryptPassword, decryptPassword };
