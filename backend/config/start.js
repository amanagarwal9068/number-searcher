const bcrypt = require('bcrypt');
const Admin = require('../models/admin');
const config = require('./config');

// Creating admin first time if does not exist
exports.createAdmin = async () => {
  try {
    let admin = await Admin.findOne({ where: { email: config.ADMIN_EMAIL } });
    if (!admin) {
      const hashedPassword = await bcrypt.hash(
        config.ADMIN_PASSWORD,
        config.SALT_ROUNDS
      );
      admin = await Admin.create({
        name: config.ADMIN_NAME,
        email: config.ADMIN_EMAIL,
        password: hashedPassword
      });
      console.log(admin);
    }
  } catch (error) {
    console.log(error);
  }
};
