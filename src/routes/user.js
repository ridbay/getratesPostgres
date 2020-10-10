const user = require("../controllers/user");

module.exports = (app) => {
  app.post("/signup", user.signup);
  app.post("/signin", user.signin);
};
