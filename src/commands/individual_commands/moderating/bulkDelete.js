const logger = require("../../logger");

module.exports = (msg, arrMsg) => {
  let deleteSize = 100;
  const channel = msg.channel;
  if (msg.channel.permissionsFor(msg.member).has("MANAGE_MESSAGES")) {
    if (arrMsg.length !== 0) deleteSize = arrMsg[0];
    channel
      .bulkDelete(deleteSize)
      .then(() => {
        channel.send(
          `Deletion sent out by ${msg.author.username}#${msg.author.discriminator} complete.`
        );
      })
      .catch((err) => {
        logger.err(logger.INVALID_OPTION, msg, err.message);
      });
  } else logger.err(logger.NO_POWER, msg);
};
