const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");


const router = express.Router();
const bodyParser = require("body-parser");

// llama a los controladores.
const usuario = require("./controllers/usuario");
const agendaController = require('./controllers/agenda');
const loginController = require("./controllers/login");
const reservaController = require('./controllers/reservas');

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
router.post("/registrar", usuario.create);
router.put("/usuarios/:id", usuario.edit);
router.delete("/usuarios/:id", usuario.remove);

// agenda
router.get("/agendas", agendaController.show);
router.post("/agendas", agendaController.create);
router.put("/agendas/:id", agendaController.edit);
router.delete("/agendas/:id", agendaController.remove);

// reserva
router.post("/agendas/:id/reservas", reservaController.add);
router.get("/agendas/:id/reservas", reservaController.show);
router.delete("/agendas/:id/reservas/:idReserva", reservaController.remove);
router.put("/agendas/:id/reservas/:idReserva", reservaController.edit);

// login
router.post("/login", loginController.login);
router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    res.clearCookie('connect.sid');
    res.render('login', {layout: './Shared/layout'})
  });
});

// vistas

// Home
router.get('/login', (req, res) => { res.render('login', {layout: './Shared/layout'}) });
router.get('/mision', (req, res) => { res.render('mision', {layout: './Shared/layout'}) });
router.get('/contacto', (req, res) => { res.render('contacto', {layout: './Shared/layout'}) });
router.get('/registrar', (req, res) => { res.render('registrar', {layout: './Shared/layout', created: null}) });


// Crud Usuarios
router.get('/indexUsers', (req, res) => { res.render('indexUsers', {layout: './Shared/layout'}) }); 

// router.get('/inicioSession', (req, res) => { res.render('inicioSession', {layout: './Shared/layout_login'}) });

//Menu usuario Paciente
router.get('/informacion', (req, res) => { res.render('informacion', {layout: './Shared/layout_login'}) });
router.get('/reservaHora', (req, res) => { res.render('reservaHora', {layout: './Shared/layout'}) });
router.get('/reservaHoras', (req, res) => { res.render('reservaHoras', {layout: './Shared/layout'}) });


// login
router.get('/', (req, res) => { res.render('index', {layout: './Shared/layout'}) });

router.get('/medico', (req, res , next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
},(req, res) => { res.render('inicioSession', { layout: './Shared/layout_login', user: req.user }) });

router.get('/inicioSession', (req, res , next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
},(req, res) => {
  if (req.user.idTipo_usuario === 5) return res.render('inicioSession', { layout: './Shared/layout_login', user: req.user })
  if (req.user.idTipo_usuario === 1) return res.render('medico', { layout: './Shared/layout_login', user: req.user })  
 });

module.exports = router;
