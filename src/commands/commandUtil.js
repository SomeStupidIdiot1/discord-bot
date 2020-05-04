const MANAGE_MESSAGES = require("discord.js").Permissions.FLAGS.MANAGE_MESSAGES;
const { SECRET_PREFIX } = require("./constants");
const checkChannel = (msg, channelNameStarsWith = SECRET_PREFIX) => {
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
const getChannelById = (msg, id) => {
  return msg.guild.channels.cache.find((channel) => channel.id === id);
};
const getMemberById = (msg, id) => {
  if (id.startsWith("<")) id = id.slice(id.search(/\d/), id.length - 1);
  return msg.guild.members.cache.find((member) => member.id === id);
};
const getMemberByName = (msg, name, discriminator = null) => {
  let possible = msg.guild.members.cache.filter((member) =>
    member.displayName.includes(name)
  );
  if (discriminator)
    possible = possible.filter(
      (member) => member.user.discriminator == discriminator
    );
  return possible.map((member) => member);
};
module.exports = {
  checkChannel,
  checkPermissions,
  getAllRoles,
  createRole,
  createChannel,
  getRoleByName,
  getChannelByName,
  getChannelById,
  getMemberById,
  getMemberByName,
};
