const { runCommand } = require("./commands/allCommands");

const app = (msg) => {
  runCommand(msg);
};
module.exports = app;
