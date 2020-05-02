const INVALID_COMMAND = "INVALID_COMMAND";
const INVALID_OPTION = "INVALID_OPTION";
const NO_POWER = "NO_POWER";
const allActions = {};
allActions[INVALID_COMMAND] = (message, extra) => {
  message.channel.send("This command is invalid. " + extra);
};
allActions[INVALID_OPTION] = (message, extra) => {
  message.channel.send("Arguments are bad. " + extra);
};
allActions[NO_POWER] = (message) => {
  message.channel.send("You cannot use this command.");
};
const err = (err, message, extra = "") => {
  const action = allActions[err];
  if (action) action(message, extra);
};
module.exports = { err, INVALID_COMMAND, INVALID_OPTION, NO_POWER };
