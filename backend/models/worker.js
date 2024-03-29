const Sequelize = require('sequelize');

const Worker = DATABASE.define(
  'workers',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.CHAR(50),
      allowNull: false
    },
    profession: {
      type: Sequelize.CHAR(100),
      allowNull: false
    },
    number: {
      type: Sequelize.CHAR(30),
      allowNull: false
    },
    PictureId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'medias',
        key: 'id'
      }
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  },
  {
    indexes: [
      {
        name: 'workers_name',
        fields: ['name']
      },
      {
        name: 'workers_profession',
        fields: ['profession']
      }
    ]
  }
);

module.exports = Worker;
