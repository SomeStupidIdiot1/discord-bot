module.exports = async (msg) => {
  if (msg.channel.permissionsFor(msg.member).has("MANAGE_MESSAGES")) {
    await msg.channel.clone();
    msg.channel.delete("Reset logs").catch((error) => console.log(error));
  }
};
