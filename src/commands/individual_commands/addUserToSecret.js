require("dotenv").config();
const util = require("../commandUtil");
const logger = require("../logger");

module.exports = (msg, arrMsg) => {
  if (arrMsg.length < 2) return logger.err(logger.INVALID_OPTION, msg);
  const member = util.getMemberById(msg, arrMsg[0]);
  const channel = util.getChannelById(msg, arrMsg[1]);
  if (!channel)
    return logger.err(logger.INVALID_OPTION, msg, "Bad channel id.");
  if (!member) return logger.err(logger.INVALID_OPTION, msg, "Bad user id.");
  const roles = util
    .getAllRoles(msg)
    .filter((role) => {
      const permissions = role.permissionsIn(channel);
      return (
        permissions.has("VIEW_CHANNEL") &&
        !role.permissions.has("ADMINISTRATOR")
      );
    })
    .map((role) => role);
  if (roles.length > 1)
    logger.err(
      logger.ROLE_ERROR,
      msg,
      "There are more than one roles that can see this channel: " +
        roles.map((role) => role.name).toString()
    );
  if (roles.length === 0)
    logger.err(
      logger.ROLE_ERROR,
      msg,
      "No roles are designated so that this channel can be seen."
    );
  member.roles.add(roles[0]);
};
