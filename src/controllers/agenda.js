const Sequelize = require("sequelize");
const Model = require("../models");

const show = async (req, res) => {
  const { profesional, returned } = req.query;
  let userLogin = profesional;
  if (returned !== "false") userLogin = req.user.run_usuario
  const agenda = await Model.Agenda.findAll({
    where: { id_usuario_agenda: userLogin }
  });
  if (returned !== "false") {
    console.log('entra al return')
    return res.render('verAgenda', {layout: './Shared/layout_login', user: req.user, agendas: agenda })
  }
  return res.status(200).json(agenda)
  // (req, res) => { res.render('verAgenda', {layout: './Shared/layout_login', user: req.user}) }
}

const create = async (req, res) => {
  const body = {
    id_usuario_agenda: req.user.run_usuario,
    fecha_agenda: req.body.fechaInicio,
    status_agenda: 'activo'
  }


  const verify = await Model.Agenda.findAll({ where: { fecha_agenda: req.body.fechaInicio}})
  if (verify.length !== 0) {
    return res.status(400).json({ message: 'Fecha de agenda ya cuenta con una agenda'})
  }

  const newAgenda = await Model.Agenda.create(body).catch((error) => error)
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