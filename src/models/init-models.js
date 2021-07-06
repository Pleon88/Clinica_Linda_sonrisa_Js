var DataTypes = require("sequelize").DataTypes;
var _Agenda = require("./Agenda");
var _Boleta = require("./Boleta");
var _Categoria_Insumos = require("./Categoria_Insumos");
var _Cliente = require("./Cliente");
var _Comuna = require("./Comuna");
var _Insumos = require("./Insumos");
var _Insumos_OrdenPedido = require("./Insumos_OrdenPedido");
var _Orden_Pedidos = require("./Orden_Pedidos");
var _Presupuesto = require("./Presupuesto");
var _Producto = require("./Producto");
var _Producto_Presupuesto = require("./Producto_Presupuesto");
var _Proveedor = require("./Proveedor");
var _Region = require("./Region");
var _Reserva = require("./Reserva");
var _Servicio = require("./Servicio");
var _Tipo_Usuario = require("./Tipo_Usuario");
var _Usuario = require("./Usuario");

function initModels(sequelize) {
  var Agenda = _Agenda(sequelize, DataTypes);
  var Boleta = _Boleta(sequelize, DataTypes);
  var Categoria_Insumos = _Categoria_Insumos(sequelize, DataTypes);
  var Cliente = _Cliente(sequelize, DataTypes);
  var Comuna = _Comuna(sequelize, DataTypes);
  var Insumos = _Insumos(sequelize, DataTypes);
  var Insumos_OrdenPedido = _Insumos_OrdenPedido(sequelize, DataTypes);
  var Orden_Pedidos = _Orden_Pedidos(sequelize, DataTypes);
  var Presupuesto = _Presupuesto(sequelize, DataTypes);
  var Producto = _Producto(sequelize, DataTypes);
  var Producto_Presupuesto = _Producto_Presupuesto(sequelize, DataTypes);
  var Proveedor = _Proveedor(sequelize, DataTypes);
  var Region = _Region(sequelize, DataTypes);
  var Reserva = _Reserva(sequelize, DataTypes);
  var Servicio = _Servicio(sequelize, DataTypes);
  var Tipo_Usuario = _Tipo_Usuario(sequelize, DataTypes);
  var Usuario = _Usuario(sequelize, DataTypes);

  Reserva.belongsTo(Agenda, { as: "id_agenda_Agenda", foreignKey: "id_agenda"});
  Agenda.hasMany(Reserva, { as: "Reservas", foreignKey: "id_agenda"});
  Insumos.belongsTo(Categoria_Insumos, { as: "id_categoria_insumos_Categoria_Insumo", foreignKey: "id_categoria_insumos"});
  Categoria_Insumos.hasMany(Insumos, { as: "Insumos", foreignKey: "id_categoria_insumos"});
  Proveedor.belongsTo(Comuna, { as: "id_comuna_Comuna", foreignKey: "id_comuna"});
  Comuna.hasMany(Proveedor, { as: "Proveedors", foreignKey: "id_comuna"});
  Insumos_OrdenPedido.belongsTo(Insumos, { as: "id_producto_Insumo", foreignKey: "id_producto"});
  Insumos.hasMany(Insumos_OrdenPedido, { as: "Insumos_OrdenPedidos", foreignKey: "id_producto"});
  Producto.belongsTo(Insumos, { as: "id_insumos_Insumo", foreignKey: "id_insumos"});
  Insumos.hasMany(Producto, { as: "Productos", foreignKey: "id_insumos"});
  Insumos_OrdenPedido.belongsTo(Orden_Pedidos, { as: "id_ordenPedido_Orden_Pedido", foreignKey: "id_ordenPedido"});
  Orden_Pedidos.hasMany(Insumos_OrdenPedido, { as: "Insumos_OrdenPedidos", foreignKey: "id_ordenPedido"});
  Boleta.belongsTo(Presupuesto, { as: "id_presupuesto_Presupuesto", foreignKey: "id_presupuesto"});
  Presupuesto.hasMany(Boleta, { as: "Boleta", foreignKey: "id_presupuesto"});
  Producto_Presupuesto.belongsTo(Presupuesto, { as: "id_presupuesto_Presupuesto", foreignKey: "id_presupuesto"});
  Presupuesto.hasMany(Producto_Presupuesto, { as: "Producto_Presupuestos", foreignKey: "id_presupuesto"});
  Producto_Presupuesto.belongsTo(Producto, { as: "id_producto_Producto", foreignKey: "id_producto"});
  Producto.hasMany(Producto_Presupuesto, { as: "Producto_Presupuestos", foreignKey: "id_producto"});
  Orden_Pedidos.belongsTo(Proveedor, { as: "rut_proveedor_Proveedor", foreignKey: "rut_proveedor"});
  Proveedor.hasMany(Orden_Pedidos, { as: "Orden_Pedidos", foreignKey: "rut_proveedor"});
  Comuna.belongsTo(Region, { as: "idregion_Region", foreignKey: "idregion"});
  Region.hasMany(Comuna, { as: "Comunas", foreignKey: "idregion"});
  Producto.belongsTo(Servicio, { as: "id_servicio_Servicio", foreignKey: "id_servicio"});
  Servicio.hasMany(Producto, { as: "Productos", foreignKey: "id_servicio"});
  Agenda.belongsTo(Usuario, { as: "id_usuario_agenda_Usuario", foreignKey: "id_usuario_agenda"});
  Usuario.hasMany(Agenda, { as: "Agendas", foreignKey: "id_usuario_agenda"});
  Cliente.belongsTo(Usuario, { as: "Id_cliente_Usuario", foreignKey: "Id_cliente"});
  Usuario.hasOne(Cliente, { as: "Cliente", foreignKey: "Id_cliente"});

  return {
    Agenda,
    Boleta,
    Categoria_Insumos,
    Cliente,
    Comuna,
    Insumos,
    Insumos_OrdenPedido,
    Orden_Pedidos,
    Presupuesto,
    Producto,
    Producto_Presupuesto,
    Proveedor,
    Region,
    Reserva,
    Servicio,
    Tipo_Usuario,
    Usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
