const logger = require("../logger");

module.exports = (msg) => {
  if (!msg.member.hasPermission("ADMINISTRATOR"))
    return logger.err(logger.NO_POWER, msg, "Admins only.");
  msg.guild.channels.cache.forEach((channel) => {
    channel.delete().catch(console.error);
  });
};
