const c = require("./individual_commands/moderating/bulkDelete");
const ca = require("./individual_commands/moderating/clearAll");

const add = require("./individual_commands/secret-channels/addUserToSecret");
const secret = require("./individual_commands/secret-channels/newSecret");
const remove = require("./individual_commands/secret-channels/removeUserFromSecret");
const clearRoleCache = require("./individual_commands/secret-channels/clearUnusedRoles");

const id = require("./individual_commands/getId");
const delAll = require("./individual_commands/deleteChannel");
const flip = require("./individual_commands/coinFlip");

const util = require("./commandUtil");

const commands = {
  test: (msg, arrMsg) => {
    var lines = process.stdout.getWindowSize()[1];
    for (var i = 0; i < lines; i++) {
      console.log("\r\n");
    }
    const category = util.getChannelByName(msg, "Secret text channels");
    console.log(category);
  },
  c,
  ca,
  secret,
  id,
  add,
  remove,
  delAll,
  flip,
  clearRoleCache,
};
module.exports = commands;
