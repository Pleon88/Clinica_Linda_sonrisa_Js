const Sequelize = require("sequelize");
const Model = require("../models");

const getComuna = () => {

}

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
  const comunaFind = await Model.Comuna.findOne({ where: { id_comuna: Number(req.user.comuna_usuario) }})
  req.user.comuna_usuario = comunaFind.nombre_comuna
  return res.render('user-data', {layout: './Shared/layout_login', user: req.user })
}

const showP = async (req, res) => {
  let usuarios = await Model.Usuario.findByPk(req.params.id );
  const comunaFind = await Model.Comuna.findOne({ where: { id_comuna: Number(usuarios.comuna_usuario) }})
  usuarios.comuna_usuario = comunaFind.nombre_comuna
  return res.render('visualizar', {layout: './Shared/layout_login', users: usuarios, user: req.user })
  //return res.status(200).json({usuarios})
};

const create = async (req, res) => {
  req.body.comuna_usuario = Number(req.body.comuna_usuario);
  req.body.idTipo_usuario = Number(req.body.idTipo_usuario);
  req.body.fecha_creacion = new Date();
  req.body.idTipo_usuario = req.body.idTipo_usuario ? req.body.idTipo_usuario : 5;
  req.body.status_usuario = req.body.status_usuario  ? req.body.status_usuario  : 'Activo'

  const usuarios = await Model.Usuario.create(req.body).catch((error) => error)
  if (usuarios.message) return res.render(res.render('registrar', {layout: './Shared/layout', created: false }))
  // return res.status(200).json({usuarios})
  return res.render(res.render('registrar', {layout: './Shared/layout', created: true }))
};

const createU = async (req, res) => {
  req.body.comuna_usuario = Number(req.body.comuna_usuario);
  req.body.idTipo_usuario = Number(req.body.idTipo_usuario);
  req.body.fecha_creacion = new Date();
  req.body.status_usuario = req.body.status_usuario  ? req.body.status_usuario  : 'Activo'

  const usuarios = await Model.Usuario.create(req.body).catch((error) => error)
  if (usuarios.message) return res.render(res.render('crear', {layout: './Shared/layout_login', created: false }))
  // return res.status(200).json({usuarios})
  return res.render(res.render('crear', {layout: './Shared/layout_login', created: true }))
};

const edit = async (req, res) => {
  const usuario = await Model.Usuario.update(req.body, { where: {run_usuario: req.params.id }})
  console.log(usuario)
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
  create,
  showAll,
  edit,
  remove,
<<<<<<< HEAD
  createU,
=======
  showFromLoged,
>>>>>>> 3f8aa4038c29b3b65cd9c9bb83bb90af7f9c8d14
};


// 2021-06-29T02:13:52.670Z
// 2021-06-29T02:14:00.396Z