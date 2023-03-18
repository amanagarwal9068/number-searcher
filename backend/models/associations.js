const Worker = require("../models/worker.js");
const Media = require("../models/media.js");

const oneToOneAs = (ModelA, ModelB, ForeignKey, AS) => {
  ModelA.hasOne(ModelB, { foreignKey: ForeignKey, as: AS });
  ModelB.belongsTo(ModelA, { foreignKey: ForeignKey, as: AS });
};
const oneToManyAs = (ModelA, ModelB, ForeignKey, AS) => {
  ModelA.hasMany(ModelB, { foreignKey: ForeignKey, as: AS });
  ModelB.belongsTo(ModelA, { foreignKey: ForeignKey, as: AS });
};

module.exports = associations = () => {
  oneToOneAs(Media, Worker, "PictureId", "Picture");
};
