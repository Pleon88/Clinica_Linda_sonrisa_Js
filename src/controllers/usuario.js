const Sequelize = require("sequelize");
const Model = require("../models");

const showAll = async (req, res) => {
  const usuarios = await Model.Usuario.findAll();
  return res.json({ data: usuarios})
};

const show = async (req, res) => {
  const usuarios = await Model.Usuario.findByPk(req.params.id );
  return res.status(200).json({usuarios})
};

const create = async (req, res) => {
  req.body.comuna_usuario = Number(req.body.comuna_usuario);
  req.body.idTipo_usuario = Number(req.body.idTipo_usuario);
  req.body.fecha_creacion = new Date();
  const usuarios = await Model.Usuario.create(req.body).catch((error) => error)
  if (usuarios.message) return res.json({ error: true, message: usuarios.message })
  return res.status(200).json({usuarios})
};

const edit = async (req, res) => {
  const usuario = await Model.Usuario.update(req.body, { where: {run_usuario: req.params.id }})
  console.log(usuario)
  if (usuario[0] === 1) {
    return res.status(200).json({ error: false, message: 'Usuario actualizado' })
  }
  return res.status(400).json({ error: true, message: 'Problemas al actualizar al usuario'});
};

const remove = async (req, res) => {
  const usuario = await Model.Usuario.destroy({ where: {run_usuario: req.params.id }})
  console.log(usuario)
  if (usuario === 1) {
    return res.status(200).json({ message: 'Eliminado' })
  }
  return res.status(400).json({ message: 'Problemas al borrar al usuario'})
};

module.exports = {
  show,
  create,
  showAll,
  edit,
  remove,
};


// 2021-06-29T02:13:52.670Z
// 2021-06-29T02:14:00.396Z