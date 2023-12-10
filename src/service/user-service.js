const db = require("../application/database");
const bcrypt = require("bcrypt");
const { ResponseError } = require("../error/response-error");
const UserHelper = require("../helper/user-helper");
require("dotenv").config();

const login = async (request) => {
  const { username, password } = request;
  const userData = await db("ms_user").where({ user_name: username });

  /* Check username */
  if (userData.length === 0) {
    throw new ResponseError(401, "Username or password wrong");
  }

  /* Check password */
  const passwordData = userData[0].user_password;
  const passwordMatch = await bcrypt.compare(password, passwordData);

  if (!passwordMatch) {
    throw new ResponseError(401, "Username or password wrong");
  }

  /* Save to login transaction */
  const transactionID = await UserHelper.addAuthenticationTransaction(
    userData[0].user_id
  );
  const roleName = await UserHelper.getRoleName(userData[0].role_id);

  const user = {
    transaction_id: transactionID,
    user_id: userData[0].user_id,
    username: userData[0].user_name,
    role: roleName,
  };

  const token = UserHelper.generateToken(
    user,
    process.env.Token_Secret_Key,
    "1m"
  );
  const refreshToken = UserHelper.generateToken(
    user,
    process.env.Refresh_Token_Key,
    "3d"
  );

  /* remove transaction_id because doesn't needed by FE */
  delete user.transaction_id;

  return { token, user, refreshToken };
};

const getToken = async (request) => {
  /* check if there's a cookies in header */
  const refreshToken = request.cookies.refreshToken || undefined;

  if (!refreshToken) {
    throw new ResponseError(401, "Unauthorized");
  }
  
  const decodedUser = UserHelper.decodeToken(refreshToken, process.env.Refresh_Token_Key);

  /* get new token */
  const token = UserHelper.generateToken(decodedUser, process.env.Token_Secret_Key, "1m");
  return token;
};

const logout = async (request) => {
  /* add logout transactions */
  await UserHelper.setLogoutDate(request);
};

module.exports = {
  login,
  logout,
  getToken,
};
