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

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.status(409).json({ success : false, message : 'authentication failed' });
    }
    req.login(user, function(err){
      if(err){
        return next(err);
      }
      console.log(user)
      return res.status(200).json({ success : true, message : 'authentication succeeded', user: user.idTipo_usuario });        
    });
  })(req, res, next);

};

module.exports = {
  login,
};
