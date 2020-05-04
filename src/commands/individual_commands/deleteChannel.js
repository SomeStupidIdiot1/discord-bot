const util = require("../commandUtil");
const logger = require("../logger");

module.exports = (msg) => {
  if (!util.checkPermissions(msg, "ADMINISTRATOR"))
    return logger.err(logger.NO_POWER, msg, "Admins only.");
  msg.guild.channels.cache.forEach((channel) => {
    channel.delete().catch(console.error);
  });
};
