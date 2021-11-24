const bcryptjs = require("bcryptjs");
const { usermodel } = require("../model");
const usersDB = require("../data/users.json");
const navigationController = {
  getHome: (req, res, next) => {
    res.render("index");
  },
  login: (req, res, next) => {
    res.render("login");
  },
  loginProcess: (req, res) => {
    let userToLogin = usermodel.findByField("email", req.body.email);
    if (userToLogin) {
      let Okpass = bcryptjs.compareSync(
        req.body.password,
        userToLogin.password
      );
      if (Okpass) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin;
        return res.redirect("userProfile");
      }
    }
    return res.render("login", {
      errors: {
        email: {
          msg: "Las credenciales son inválidas",
        },
      },
    });
  },
  register: (req, res, next) => {
    res.render("register");
  },
  store: (req, res) => {
    let newUser = {
      id: usersDB.length + 1,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password, 10),
      category: req.body.category,
    };
    usermodel.createUser(newUser);

    res.redirect("login");
  },
  profile: (req, res, next) => {
    return res.render("userProfile", {
      user: req.session.userLogged
    });
  },
  userList: (req, res, next) => {
    return res.render("userList", { usersDB });
  },
};

module.exports = navigationController;
