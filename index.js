require("dotenv").config();
const app = require("./src/app");
const Discord = require("discord.js");
const bot = new Discord.Client();
const { PREFIX, HELP } = require("./src/commands/allCommands");

bot.on("ready", () => {
  console.log(`Bot is running as ${bot.user.tag}`);
  bot.user.setPresence({
    activity: { name: `a Serf. Use ${PREFIX + HELP}` },
  });
});
bot.on("message", (message) => app(message));
bot.login(process.env.TOKEN);
