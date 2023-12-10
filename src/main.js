const web = require("./application/web");

require("dotenv").config();

web.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
