const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Usuario', {
    run_usuario: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    nombre_usuario: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    apellidoP_usuario: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    apellidoM_usuario: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    fecha_nac_usuario: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    usuario: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password_usuario: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    direccion_usuario: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    comuna_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Comuna',
        key: 'id_comuna'
      }
    },
    email_usuario: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    fono_usuario: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    idTipo_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tipo_Usuario',
        key: 'idTipo_usuario'
      }
    },
    idCliente_usuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Cliente',
        key: 'Id_cliente'
      }
    },
    persona_cargo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    status_usuario: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    fecha_creacion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'Usuario',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Usuario_1",
        unique: true,
        fields: [
          { name: "run_usuario" },
        ]
      },
    ]
  });
};
