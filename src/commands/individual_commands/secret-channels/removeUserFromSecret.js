const util = require("../../commandUtil");
const logger = require("../../logger");
const {
  SECRET_ROLE_PREFIX,
  SECRET_ROLE_PERMISSIONS,
} = require("../../constants");

module.exports = (msg, arrMsg) => {
  if (!msg.member.hasPermission("ADMINISTRATOR"))
    return logger.err(logger.NO_POWER, msg, "Admins only.");
  if (arrMsg.length === 0) return logger.err(logger.INVALID_OPTION, msg);
  let members = util.getMemberByName(msg, arrMsg[0], arrMsg[1]);
  const channel = msg.channel;
  if (members.length === 0)
    return logger.err(logger.INVALID_OPTION, msg, "Cannot find this user.");
  if (members.length > 1)
    return logger.err(
      logger.INVALID_OPTION,
      msg,
      "More than one user found. Specify user tag id to be more clear."
    );

  const roles = members[0].roles.cache
    .filter((role) => {
      const permissions = role.permissionsIn(channel);
      return (
        permissions.has(SECRET_ROLE_PERMISSIONS) &&
        role.name.startsWith(SECRET_ROLE_PREFIX)
      );
    })
    .map((role) => role);
  if (roles.length > 1)
    return logger.err(
      logger.ROLE_ERROR,
      msg,
      "There are more than one roles that can see this channel: " +
        roles.map((role) => role.name).toString()
    );
  if (roles.length === 0)
    return logger.err(
      logger.ROLE_ERROR,
      msg,
      "No roles are designated so that this channel can be seen."
    );
  members[0].roles.remove(roles[0]);
};
