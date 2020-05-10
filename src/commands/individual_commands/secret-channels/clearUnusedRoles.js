const {
  SECRET_ROLE_PREFIX,
  SECRET_TEXT_CATEGORY_NAME,
  SECRET_ROLE_PERMISSIONS,
} = require("../../constants");
const util = require("../../commandUtil");
const logger = require("../../logger");

module.exports = (msg) => {
  if (!msg.member.hasPermission("MANAGE_CHANNELS"))
    return logger.err(
      logger.NO_POWER,
      msg,
      "Permission MANAGE_CHANNELS not found."
    );
  const deleteRoles = (roles) => {
    let count = 0;
    roles.forEach((role) => {
      role.delete().catch(console.error);
      count++;
    });
    msg.channel.send(`${count} roles deleted`);
  };
  const allRoles = msg.guild.roles.cache.filter((role) => {
    return role.name.startsWith(SECRET_ROLE_PREFIX);
  });
  const category = util.getChannelByName(msg, SECRET_TEXT_CATEGORY_NAME);
  if (category.length === 1) {
    const rolesToDelete = allRoles.filter((role) => {
      return !category[0].children.find((channel) => {
        const permissions = role.permissionsIn(channel);
        return (
          permissions.has(SECRET_ROLE_PERMISSIONS) &&
          role.name.startsWith(SECRET_ROLE_PREFIX)
        );
      });
    });
    deleteRoles(rolesToDelete);
  } else deleteRoles(allRoles);
};
