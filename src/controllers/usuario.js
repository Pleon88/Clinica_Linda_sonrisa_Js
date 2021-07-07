const Sequelize = require("sequelize");
const Model = require("../models");

const { getComuna, getRegion } = require('./divisonGeografica');

const showAll = async (req, res) => {
  const usuarios = await Model.Usuario.findAll();
  return res.render('users', {layout: './Shared/layout_login', users: usuarios, user: req.user })
  // return res.json({ data: usuarios})
};

const show = async (req, res) => {
  let usuarios = await Model.Usuario.findByPk(req.params.id );
  const comunaFind = await Model.Comuna.findOne({ where: { id_comuna: Number(usuarios.comuna_usuario) }})
  usuarios.comuna_usuario = comunaFind.nombre_comuna
  // return res.render('informacion', {layout: './Shared/layout_login', users: usuarios, user: req.user })
  return res.status(200).json({usuarios})
};

const showFromLoged = async (req, res) => {
  const tipoUsuario = await Model.Tipo_Usuario.findAll();
  return res.render('user-data', {layout: './Shared/layout_login', 
  user: req.user,
  regiones: await getRegion(),
  comunas: await getComuna(req.user.region_usuario),
  tipoUsuario: tipoUsuario,
})
}

const showP = async (req, res) => {
  let usuarios = await Model.Usuario.findByPk(req.params.id );
  const comunaFind = await Model.Comuna.findOne({ where: { id_comuna: Number(usuarios.comuna_usuario) }})
  usuarios.comuna_usuario = comunaFind.nombre_comuna
  return res.render('visualizar', {layout: './Shared/layout_login', users: usuarios, user: req.user })
  //return res.status(200).json({usuarios})
};

const showE = async (req, res) => {
  let usuarios = await Model.Usuario.findByPk(req.params.id );

  const tipoUsuario = await Model.Tipo_Usuario.findAll();

  const toRedirect = {
    layout: './Shared/layout_login', 
    users: usuarios, 
    user: req.user,
    regiones: await getRegion(),
    comunas: await getComuna(usuarios.dataValues.region_usuario),
    tipoUsuario: tipoUsuario,
  }
  return res.render('modificar', toRedirect)
  //return res.status(200).json({usuarios})
};

const showU = async (req, res) => {
  let usuarios = await Model.Usuario.findByPk(req.params.id );
  const comunaFind = await Model.Comuna.findOne({ where: { id_comuna: Number(usuarios.comuna_usuario) }})
  usuarios.comuna_usuario = comunaFind.nombre_comuna
  return res.render('editeUser', {layout: './Shared/layout_login', users: usuarios, user: req.user })
  //return res.status(200).json({usuarios})
};

const create = async (req, res) => {
  req.body.comuna_usuario = Number(req.body.comuna_usuario);
  req.body.idTipo_usuario = Number(req.body.idTipo_usuario);
  req.body.fecha_creacion = new Date();
  req.body.idTipo_usuario = req.body.idTipo_usuario ? req.body.idTipo_usuario : 5;
  req.body.status_usuario = req.body.status_usuario  ? req.body.status_usuario  : 'Activo'
  if (req.body.selectRegion) {
    req.body.region_usuario = Number(req.body.selectRegion)
    delete req.body.selectRegion
  }
  if (req.body.comunasSelect) {
    req.body.comuna_usuario = Number(req.body.comunasSelect)
    delete req.body.comunasSelect
  }

  const usuarios = await Model.Usuario.create(req.body).catch((error) => error)
  if (usuarios.message) return res.render(res.render('registrar', {layout: './Shared/layout', 
  created: false,
  regiones: await getRegion(),
  user: req.user,
}))
  // return res.status(200).json({usuarios})
  return res.render(res.render('registrar', {layout: './Shared/layout', 
  created: true, 
  regiones: await getRegion(),
  user: req.user,
 }))
};

const createU = async (req, res) => {
  req.body.comuna_usuario = Number(req.body.comuna_usuario);
  req.body.idTipo_usuario = Number(req.body.idTipo_usuario);
  req.body.fecha_creacion = new Date();
  req.body.status_usuario = req.body.status_usuario  ? req.body.status_usuario  : 'Activo'

  const usuarios = await Model.Usuario.create(req.body).catch((error) => error)
  if (usuarios.message) return res.render(res.render('crear', {layout: './Shared/layout_login', created: false }))
  // return res.status(200).json({usuarios})
  return res.render(res.render('crear', {layout: './Shared/layout_login', created: true, user: req.user }))
};

const edit = async (req, res) => {
  if (req.body.selectRegion) {
    req.body.region_usuario = Number(req.body.selectRegion)
    delete req.body.selectRegion
  }
  if (req.body.comunasSelect) {
    req.body.comuna_usuario = Number(req.body.comunasSelect)
    delete req.body.comunasSelect
  }
  if (req.body.idTipo_usuario) req.body.idTipo_usuario = +req.body.idTipo_usuario
  const usuario = await Model.Usuario.update(req.body, { where: {run_usuario: req.params.id }})
  if (usuario[0] === 1) {
    return res.status(200).json({ error: false, message: 'Usuario actualizado' })
  }
  return res.status(400).json({ error: true, message: 'Problemas al actualizar al usuario'});
  //return res.render('modificar', {layout: './Shared/layout_login', users: usuarios, user: req.user })
};

const remove = async (req, res) => {
  const usuario = await Model.Usuario.destroy({ where: {run_usuario: req.params.id }})
  console.log(usuario)
  if (usuario === 1) {
    return res.status(200).json({ message: 'Eliminado' })
  }
  return res.status(400).json({ message: 'Problemas al borrar al usuario'})
  //return res.render('eliminar', {layout: './Shared/layout_login', users: usuarios, user: req.user })
};

module.exports = {
  show,
  showP,
  showE,
  showU,
  create,
  showAll,
  edit,
  remove,
  createU,
  showFromLoged,
};
