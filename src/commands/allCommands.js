const logger = require("./logger");
const PREFIX = "//";
const HELP = "help";
const DEFAULT = "default_invalid_command_error";
const allCommands = require("./customCommands");

allCommands[HELP] = (msg) => {
  msg.channel.send(
    "The documentation for using this bot: https://github.com/SomeStupidIdiot1/discord-bot/blob/master/docs.md"
  );
};
allCommands[DEFAULT] = (msg) => {
  logger.err(
    logger.INVALID_COMMAND,
    msg,
    `Refer to ${
      PREFIX + HELP
    }. Make sure the command is spelled correctly, CAPS matter.`
  );
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
