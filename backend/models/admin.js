const Sequelize = require('sequelize');

const Admin = DATABASE.define('admins', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: Sequelize.CHAR(50),
    allowNull: false
  },
  email: {
    type: Sequelize.CHAR(100),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
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
});
module.exports = Admin;
