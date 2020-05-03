const c = require("./individual_commands/bulkDelete");
const ca = require("./individual_commands/clearAll");
const id = require("./individual_commands/getId");
const add = require("./individual_commands/addUserToSecret");
const secret = require("./individual_commands/newSecret");
const util = require("./commandUtil");

const commands = {
  test: (msg, arrMsg) => {
    var lines = process.stdout.getWindowSize()[1];
    for (var i = 0; i < lines; i++) {
      console.log("\r\n");
    }
  },
  c,
  ca,
  secret,
  id,
  add,
};
module.exports = commands;
