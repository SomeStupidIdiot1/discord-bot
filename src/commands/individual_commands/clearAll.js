const { SECRET_PREFIX } = require("../constants");

module.exports = async (msg) => {
  if (
    msg.channel.name.startsWith(SECRET_PREFIX) ||
    msg.member.hasPermission("MANAGE_MESSAGES")
  ) {
    await msg.channel.clone();
    msg.channel.delete("Reset logs").catch((error) => console.log(error));
  }
};
