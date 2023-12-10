const userService = require("../service/user-service");

const login = async (request, response, next) => {
  try {
    const result = await userService.login(request.body);

    response.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 3,
      sameSite: "none",
      secure: true,
    });

    response.status(200).json({
      token: {
        access_token: result.token
      },
      data: result.user,
    });
  } catch (error) {
    next(error);
  }
};


const logout = async (request, response, next) => {
  try {
    /* add logout date */
    await userService.logout(request);

    /* delete cookies */
    response.clearCookie("refreshToken");

    response.status(200).json({
      message: "Logout success",
    });

  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  logout
};
