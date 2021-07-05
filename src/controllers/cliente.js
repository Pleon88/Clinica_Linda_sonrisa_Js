const Sequelize = require("sequelize");
const Model = require("../models");

const show = (req, res) => {
  return res.render('cliente', {layout: './Shared/layout'})
}

const add = (req, res) => {
  console.log(req.body)
}

module.exports = {
  add,
  show
}