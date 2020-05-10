module.exports = async (msg) => {
  if (msg.member.hasPermission("MANAGE_MESSAGES")) {
    await msg.channel.clone();
    msg.channel.delete("Reset logs").catch((error) => console.log(error));
  }
};
