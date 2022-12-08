const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'pokemons',
    {
      id: {
        field: 'ID_POKE',
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      nombre: {
        field: 'NOMBRE_POKE',
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      vida: {
        field: 'VIDA_POKE',
        type: DataTypes.INTEGER,
      },
      ataque: {
        field: 'ATAQUE_POKE',
        type: DataTypes.INTEGER,
      },
      defensa: {
        field: 'DEFENSA_POKE',
        type: DataTypes.INTEGER,
      },
      velocidad: {
        field: 'VELOCIDAD_POKE',
        type: DataTypes.INTEGER,
      },
      altura: {
        field: 'ALTURA_POKE',
        type: DataTypes.INTEGER,
      },
      peso: {
        field: 'PESO_POKE',
        type: DataTypes.INTEGER,
      },
      imagen: {
        field: 'IMAGEN_POKE',
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: 'TB_POKEMONS',
      timestamps: false,
    }
  );
};
