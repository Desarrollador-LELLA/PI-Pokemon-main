const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'tipos',
    {
      id: {
        field: 'ID_TIPO',
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nombre: {
        field: 'NOMBRE_TIPO',
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: 'TB_TIPOS',
      timestamps: false,
    }
  );
};
