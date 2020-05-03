const util = require("../commandUtil");

module.exports = (msg) => {
  if (util.checkChannel(msg) || util.checkPermissions(msg)) {
    msg.channel.clone().then(() => {
      msg.channel.delete("Reset logs").catch((error) => console.log(error));
    });
  }
};
