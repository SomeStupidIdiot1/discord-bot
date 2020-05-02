const util = require("./commandUtil");
const logger = require("./logger");

const commands = {
  c: (msg, arrMsg) => {
    let deleteSize = 100;
    const channel = msg.channel;
    if (util.checkChannel(msg) || util.checkPermissions(msg)) {
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
  },
  ca: (msg) => {
    if (util.checkChannel(msg) || util.checkPermissions(msg)) {
      msg.channel.clone().then(() => {
        msg.channel.delete("Reset logs").catch((error) => console.log(error));
      });
    }
  },
  test: (msg, argMsg) => {
    msg.channel.clone().then((response) => console.log(response));
  },
};
module.exports = commands;
