const passport = require("passport");
const PassportLocal = require("passport-local").Strategy;
const Sequelize = require("sequelize");
const Model = require("../models");

const login = async (req, res, next) => {
  console.log(req.body);

  passport.use(
    new PassportLocal(async function (username, password, done) {
      const loginUser = await Model.Usuario.findOne({
        where: {
          usuario: req.body.username,
          password_usuario: req.body.password,
        },
      })

      if (loginUser !== null) {
        return done(null, loginUser.dataValues );
      }

      return done(null, false);
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (id, done) {
    done(null, id);
  });

  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })(req, res, next);
};

const showLogin = () => {};

module.exports = {
  login,
};
