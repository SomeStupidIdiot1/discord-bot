module.exports = (msg, arrMsg) => {
  let userId = msg.author.id;
  if (arrMsg.length !== 0) userId = arrMsg[0].slice(2, arrMsg[0].length - 1);
  msg.channel.send(`Your id is ${userId}.`);
};
