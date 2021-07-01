const Sequelize = require("sequelize");
const Model = require("../models");

const show = async (req, res) => {
  const agenda = await Model.Agenda.findAll({
    where: { id_usuario_agenda: req.query.idMedico }
  });
  return res.status(200).json({agenda})
}

const create = async (req, res) => {
  const newAgenda = await Model.Agenda.create(req.body).catch((error) => error)
  if (newAgenda.message) return res.json({ error: true, message: newAgenda.message })
  return res.status(200).json({newAgenda})
}

const edit = async () => {

};

const remove = async (req, res) => {
  const agenda = await Model.Agenda.destroy({ where: {id_agenda: req.params.id }})
  console.log(agenda)
  if (agenda === 1) {
    return res.status(200).json({ message: 'Eliminado' })
  }
  return res.status(400).json({ message: 'Problemas al borrar al agenda'})
}

module.exports = {
  show,
  create,
  remove,
  edit,
}