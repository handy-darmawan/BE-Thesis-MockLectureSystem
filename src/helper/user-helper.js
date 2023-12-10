const db = require("../application/database");
const jwt = require("jsonwebtoken");

class UserHelper {

  static shared = new UserHelper();

  async getRoleName(roleID) {
    const role = await db("ms_role").where({ role_id: roleID });
    return role[0].role_description;
  }

  generateToken(user, secretToken, time) {
    return jwt.sign(user, secretToken, {
      expiresIn: time,
    });
  }

  async addAuthenticationTransaction(userID) {
    const dateNow = new Date();
    const date = new Date();

    /*set the logout date to now + 3 days */
    await db("tr_login_transaction").insert({
      user_id: userID,
      transaction_user_login_date: date,
      transaction_user_logout_date: new Date(
        dateNow.setDate(dateNow.getDate() + 3)
      ),
      input_user: "system",
      input_date: date,
    });

    const getTransactionID = await db("tr_login_transaction")
      .where({
        user_id: userID,
        input_date: date,
      })
      .select("transaction_id");

    return getTransactionID[0].transaction_id;
  }

  async setLogoutDate(request) {
    const { transaction_id, user_id } = request.user;
    const date = new Date();

    await db("tr_login_transaction")
      .where({
          transaction_id: transaction_id,
          user_id: user_id
        })
      .update({
        transaction_user_logout_date: date,
        update_user: "system",
        update_date: date,
      });
  }

  decodeToken(refreshToken, refreshTokenKey) {
    const decoded = jwt.decode(refreshToken, refreshTokenKey)

    delete decoded.iat
    delete decoded.exp

    return decoded
  }

}

module.exports = UserHelper.shared;