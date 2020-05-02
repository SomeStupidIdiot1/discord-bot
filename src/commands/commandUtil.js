const MANAGE_MESSAGES = require("discord.js").Permissions.FLAGS.MANAGE_MESSAGES;
const checkChannel = (msg, channelNameStarsWith = "secret") => {
  return msg.channel.name.startsWith(channelNameStarsWith);
};
const checkPermissions = (msg, permission = MANAGE_MESSAGES) => {
  return msg.member.hasPermission(permission);
};
module.exports = { checkChannel, checkPermissions };
