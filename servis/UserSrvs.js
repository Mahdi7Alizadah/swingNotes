const User = require('../model/UserMdl');
const { decryptPassword } = require('../middlewer/UserMdlwr');
const jwt = require('jsonwebtoken');

const registerUser = async (username, password) => {
  try {
    const isExistUser = await User.findOne({ username: username });
    if (isExistUser) throw new Error('User already exists');

    const hashedPassword = await encryptPassword(password);
    const user = { username: username, password: hashedPassword };
    const result = await User.save(user);

    const parsedResult = {
      username: result.username,
      password: result.password,
      _id: result._id,
      createdAt: result.createdAt,
    };
    return { status: 201, result: parsedResult };
  } catch (error) {
    if (error.message == 'User already exists') {
      return { status: 409, result: { error: error.message } };
    } else {
      throw error;
    }
  }
};

const logingUser = async (username, password) => {
  try {
    const isExistUser = await User.findOne({ username: username });
    if (!isExistUser) throw new Error('Username not found');

    const passwordMatch = await decryptPassword(password, isExistUser.password);
    if (!passwordMatch) return { status: 401, result: 'Incorrect password' };

    const token = jwt.sign(
      { username: isExistUser.username, userId: isExistUser._id },
      process.env.JWT_KEY,
      { expiresIn: '30min' }
    );

    return { status: 200, result: { token: token } };
  } catch (error) {
    if (error.message !== 'Username not found') {
      throw error;
    } else {
      return { status: 404, result: { error: error.message } };
    }
  }
};

module.exports = { registerUser, logingUser };
