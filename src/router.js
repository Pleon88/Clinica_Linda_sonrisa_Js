const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");


const router = express.Router();
const bodyParser = require("body-parser");

// llama a los controladores.
const usuario = require("./controllers/usuario");
const loginController = require("./controllers/login");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cors());
router.use(cookieParser("yNtXwglSOT3LrnoqeJvr1g=="));
router.use(
  session({
    secret: "yNtXwglSOT3LrnoqeJvr1g==",
    resave: true,
    saveUninitialized: true,
  })
);
router.use(passport.initialize());
router.use(passport.session());

// usuarios
router.get("/usuarios", usuario.showAll);
router.get("/usuarios/:id", usuario.show);
router.post("/usuarios", usuario.create);
router.put("/usuarios/:id", usuario.edit);
router.delete("/usuarios/:id", usuario.remove);

// login
router.post("/login", loginController.login);
router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    res.clearCookie('connect.sid');
    // Don't redirect, just print text
    res.send('Logged out');
  });
});

// vistas
router.get('/login', (req, res) => { res.render('login', {layout: './Shared/layout'}) });
router.get('/test', (req, res) => { res.render('test', {layout: './Shared/layout'}) });
router.get('/inicioSession', (req, res) => { res.render('inicioSession', {layout: './Shared/layout_login'}) });
router.get('/registrar', (req, res) => { res.render('registrar', {layout: './Shared/layout'}) });
router.get('/informacion', (req, res) => { res.render('informacion', {layout: './Shared/layout_login'}) });

router.get('/', (req, res , next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
},(req, res) => { res.render('inicioSession', { user: req.user }) });

module.exports = router;
