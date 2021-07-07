const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

const verifyUserLogin = (req, res , next) => {
  if (req.isAuthenticated()) return next();
  res.render('index', {layout: './Shared/layout'})
}

const router = express.Router();
const bodyParser = require("body-parser");

// llama a los controladores.
const usuario = require("./controllers/usuario");
const agendaController = require('./controllers/agenda');
const loginController = require("./controllers/login");
const reservaController = require('./controllers/reservas');
const clienteController = require('./controllers/cliente');
const divisionGeografica = require('./controllers/divisonGeografica');

const { getRegion } = require('./controllers/divisonGeografica');

router.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
router.use(bodyParser.json({ limit: '50mb' }));
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
router.get("/users", usuario.showAll);
router.get("/informacion/:id", usuario.show);
router.get("/visualizar/:id", usuario.showP);
router.get("/modificar/:id", usuario.showE);
router.get("/editeUser/:id", usuario.showU);
router.post("/registrar", usuario.create);
router.post("/crear", usuario.createU);
router.put("/editar/:id", usuario.edit);
router.delete("/eliminar/:id", usuario.remove);

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
router.get("/reserva/:id", reservaController.getReserva)

// cliente
router.get("/clientes/:id", clienteController.show);
router.post("/clientes", clienteController.add);

// login
router.post("/login", loginController.login);
router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    res.clearCookie('connect.sid');
    res.render('index', {layout: './Shared/layout'})
  });
});

// vistas

// Home
router.get('/login', (req, res) => { res.render('login', {layout: './Shared/layout'}) });
router.get('/mision', (req, res) => { res.render('mision', {layout: './Shared/layout'}) });
router.get('/contacto', (req, res) => { res.render('contacto', {layout: './Shared/layout'}) });
router.get('/registrar', async (req, res) => { 
  const { user } = req
  if (user === undefined) {
    res.render('registrar', {layout: './Shared/layout', created: null, regiones: await getRegion()})
  } else {
    res.render('registrar', {layout: './Shared/layout_login', created: null, regiones: await getRegion()})
  }
  
 });

// Crud Usuarios
router.get('/users',verifyUserLogin, (req, res) => { res.render('users', {layout: './Shared/layout_login', user: req.user}) }); 
router.get('/crear',verifyUserLogin, usuario.crearFromUser); 
router.get('/visualizar',verifyUserLogin, (req, res) => { res.render('visualizar', {layout: './Shared/layout_login', user: req.user}) });
router.get('/eliminar', verifyUserLogin, (req, res) => { res.render('eliminar', {layout: './Shared/layout_login', user: req.user}) });
router.get('/modificar',verifyUserLogin, (req, res) => { res.render('modificar', {layout: './Shared/layout_login', user: req.user}) });

// router.get('/inicioSession', (req, res) => { res.render('inicioSession', {layout: './Shared/layout_login'}) });

//Menu usuario Paciente
router.get('/informacion',verifyUserLogin, usuario.showFromLoged);
router.get('/editeUser',verifyUserLogin, (req, res) => { res.render('editeUser', {layout: './Shared/layout_login', user: req.user}) });
router.get('/situacionEconomica',verifyUserLogin, (req, res) => { res.render('situacionEconomica', {layout: './Shared/layout_login', user: req.user}) });
router.get('/reservaHora', (req, res) => { res.render('reservaHora', {layout: './Shared/layout'}) });
router.get('/reservations',verifyUserLogin ,reservaController.showProfessionals);
router.get('/verBoletas',verifyUserLogin, (req, res) => { res.render('verBoletas', {layout: './Shared/layout_login', user: req.user}) });

// division geografica
router.get('/regiones', divisionGeografica.region)
router.get('/regiones/:idRegion/comunas', divisionGeografica.comuna)

//Menu Usuario Odontologo
router.get('/agenda',verifyUserLogin, (req, res) => { res.render('agenda', {layout: './Shared/layout_login', user: req.user}) });
router.get('/verAgenda', agendaController.show);
router.get('/validarSituacion',verifyUserLogin, (req, res) => { res.render('validarSituacion', {layout: './Shared/layout_login', user: req.user}) });

// login
router.get('/', (req, res) => { res.render('index', {layout: './Shared/layout'}) });
router.get('/medico',verifyUserLogin ,(req, res) => { res.render('medico', { layout: './Shared/layout_login', user: req.user }) });
router.get('/inicioSession', (req, res , next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
},(req, res) => {
  if (req.user.idTipo_usuario === 5) return res.render('inicioSession', { layout: './Shared/layout_login', user: req.user })
  if (req.user.idTipo_usuario === 1) return res.render('medico', { layout: './Shared/layout_login', user: req.user })  
 });

module.exports = router;
