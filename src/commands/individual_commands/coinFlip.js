module.exports = (msg) => {
  const output = Math.random() > 0.5 ? "HEADS" : "TAILS";
  msg.channel.send(output);
};
