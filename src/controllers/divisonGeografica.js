const Sequelize = require("sequelize");
const Model = require("../models");

const getRegion = () => {
  return Model.Region.findAll().then((result) => {
    return result;
  });
};

const getComuna = (idRegion) => {
  console.log('>>>>>>>>>>>>>>| ID REGION CONTROLLER', idRegion)
  return Model.Comuna.findAll({ where: { idregion: idRegion } }).then(
    (result) => {
      return result;
    }
  );
};

const region = async (req, res) => {
  return Model.Region.findAll().then((result) => {
    return res.json({ data: result });
  });
};

const comuna = (req, res) => {
  return Model.Comuna.findAll({
    where: { idregion: req.params.idRegion },
  }).then((result) => {
    return res.json({ data: result });
  });
};

module.exports = {
  region,
  comuna,
  getRegion,
  getComuna,
};
