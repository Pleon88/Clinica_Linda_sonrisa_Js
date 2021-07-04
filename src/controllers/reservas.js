const Sequelize = require("sequelize");
const Model = require("../models");


const showProfessionals = async (req, res) => {
  const professionals = await Model.Usuario.findAll({
    attributes: ['run_usuario', 'nombre_usuario'],
    where: {
      idTipo_usuario: 1
    }
  })
  return res.render('reservaHoras', {layout: './Shared/layout_login', professionals: professionals, user: req.user})
}

const add = async (req, res) => {
  const { id } = req.params;
  const { horarioReserva } = req.body;

  const toSave = horarioReserva.map((hora) => {
    return {
      id_agenda: Number(id),
      status_reserva: 'activo',
      horario_reserva: hora,
    }
  })
  const addReserva = await Model.Reserva.bulkCreate(toSave)
  return res.status(200).json({ addReserva })
}

const getReserva = async (req, res) => {
  const reservas = await Model.Reserva.findByPk(req.params.id)
  return res.status(200).json(reservas)
}

const show = async (req, res) => {
  const { id } = req.params;
  const { all } = req.query;

  const toWhere = {
    id_agenda: Number(id),
  }
  if (all !== "true")  toWhere.status_reserva = 'activo'
  const reservas = await Model.Reserva.findAll({ where: toWhere })
  return res.status(200).json(reservas)
}


const edit = async (req, res) => {
  const { id, idReserva } = req.params;
  const userUpdate = await Model.Reserva.update({ 
    status_reserva: "reservado", 
    id_usuario: req.body.profesional }, {
    where: {
      id_agenda: id, id: idReserva 
    }
  });

  return res.json(userUpdate)
};

const remove = async (req, res) => {
  const reserva = await Model.Reserva.destroy({ where: {
    id: req.params.idReserva,
    id_agenda: req.params.id
  }})
  console.log(reserva)
  if (reserva === 1) {
    return res.status(200).json({ message: 'Eliminado' })
  }
  return res.status(400).json({ message: 'Problemas al borrar al reserva'})
}

module.exports = {
  add,
  show,
  remove,
  edit,
  showProfessionals,
  getReserva,
}