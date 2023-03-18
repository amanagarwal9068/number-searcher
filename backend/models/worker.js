const Sequelize = require("sequelize");

let Worker = DATABASE.define("workers", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: Sequelize.CHAR(50),
    allowNull: false,
  },
  profession: {
    type: Sequelize.CHAR(100),
    allowNull: false,
  },
  PictureId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: "medias",
      key: "id",
    },
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

module.exports = Worker;
