const logger = require("./logger");
const PREFIX = "//";
const HELP = "help";
const DEFAULT = "default_invalid_command_error";
const allCommands = require("./customCommands");

allCommands[HELP] = (msg) => {
  msg.channel.send("The documentation for using this bot: INSERT LINK HERE");
};
allCommands[DEFAULT] = (msg) => {
  logger.err(logger.INVALID_COMMAND, msg, `Refer to ${PREFIX + HELP}`);
};

const runCommand = (msg) => {
  if (!msg.content.startsWith(PREFIX)) return;
  const arrMsg = msg.content
    .trim()
    .split(" ")
    .filter((item) => item !== "");
  const command = arrMsg[0].substring(2);
  if (allCommands[command]) allCommands[command](msg, arrMsg.slice(1));
  else allCommands[DEFAULT](msg, arrMsg.slice(1));
};
module.exports = { PREFIX, HELP, runCommand };
