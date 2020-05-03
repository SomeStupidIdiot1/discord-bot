const MANAGE_MESSAGES = require("discord.js").Permissions.FLAGS.MANAGE_MESSAGES;
const checkChannel = (msg, channelNameStarsWith = "secret") => {
  return msg.channel.name.startsWith(channelNameStarsWith);
};
const checkPermissions = (msg, permission = MANAGE_MESSAGES) => {
  return msg.member.hasPermission(permission);
};
const getAllRoles = (msg, onlyNames = false) => {
  const allRoles = msg.guild.roles.cache;
  if (!onlyNames) return allRoles;
  return allRoles.map((role) => role.name);
};
const getRoleByName = (msg, name) => {
  return msg.guild.roles.cache
    .filter((role) => role.name === name)
    .map((item) => item);
};
const createRole = (msg, data, reason = "Default reason") => {
  const options = {};
  options.data = data;
  if (reason) options.reason = reason;
  return msg.guild.roles.create(options);
};
const createChannel = (msg, name, options) => {
  return msg.guild.channels.create(name, options);
};
const getChannelByName = (msg, name, type = "category") => {
  return msg.guild.channels.cache
    .filter((channel) => channel.name === name && channel.type === type)
    .map((item) => item);
};
module.exports = {
  checkChannel,
  checkPermissions,
  getAllRoles,
  createRole,
  createChannel,
  getRoleByName,
  getChannelByName,
};
