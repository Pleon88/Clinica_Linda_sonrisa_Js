const Sequelize = require("sequelize");
const Model = require("../models");

const show = async (req, res) => {
  return await Model.Cliente.findByPk(req.params.id)
    .then(async (result) => {
      const user = await Model.Usuario.findByPk(req.params.id)
      const usuario = {
        run: user.dataValues.run_usuario,
        nombre: user.dataValues.nombre_usuario
      }
      return res.json({ result, usuario});
    })
}

const add = async (req, res) => {
  const {liq_sueldo_cliente, AFP_cliente, finiquito_cliente } = req.body;
  const toCreate = {
    Id_cliente: req.user.run_usuario,
  }
  if (liq_sueldo_cliente) toCreate.liq_sueldo_cliente = liq_sueldo_cliente
  if (AFP_cliente) toCreate.AFP_cliente = AFP_cliente
  if (finiquito_cliente) toCreate.finiquito_cliente = finiquito_cliente
  const createClient = await Model.Cliente.create(toCreate).catch((error) => error);
  if (createClient.message) return res.status(400).json(createClient.error)
  return res.status(200).json({ status: 200, message: 'guardado correctamente'})
}

module.exports = {
  add,
  show
}