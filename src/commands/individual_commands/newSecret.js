require("dotenv").config();
const randomNames = require("../names");
const logger = require("../logger");

const AES = require("crypto-js/aes");
const {
  SECRET_VOICE_CATEGORY_NAME,
  SECRET_TEXT_CATEGORY_NAME,
  SECRET_PREFIX,
} = require("../constants");
const util = require("../commandUtil");

const secret = (msg, arrMsg) => {
  if (!msg.member.hasPermission("ADMINISTRATOR"))
    return logger.err(logger.NO_POWER, msg, "Admins only.");

  // Name of secret channels
  let secretName;
  if (arrMsg.length !== 0) secretName = arrMsg[0];
  else {
    let random = "";
    do {
      secretName =
        randomNames[Math.floor(Math.random() * randomNames.length)] + random;
      random = Math.floor(Math.random() * 1000000);
    } while (util.getAllRoles(msg, true).includes(secretName));
  }
  // Permission of new channels
  const permissionOverwrites = (id) => [
    {
      id: util.getRoleByName(msg, "@everyone")[0].id,
      deny: ["VIEW_CHANNEL"],
    },
    {
      id: id,
      allow: ["VIEW_CHANNEL"],
    },
  ];
  // Making of the channels
  const createSecretVoice = (parent, id) => {
    createSecret(parent, id, "voice");
  };
  const createSecretText = (parent, id) => {
    createSecret(parent, id, "text");
  };
  const createSecret = (parent, id, type) => {
    msg.guild.channels
      .create(SECRET_PREFIX + secretName, {
        type: type,
        reason: `secret type ${secretName} ${type} channel`,
        permissionOverwrites: permissionOverwrites(id),
      })
      .then((channel) => {
        channel.setParent(parent);
      })
      .catch(console.error);
  };
  // Make role, channels, categories
  msg.guild.roles
    .create({
      data: {
        name: AES.encrypt(
          secretName.replace(/ /g, "-"),
          process.env.ENCRYPT_PASS
        ).toString(),
      },
      reason: "Making a new secret type.",
    })
    .then(({ id }) => {
      const voiceCat = util.getChannelByName(msg, SECRET_VOICE_CATEGORY_NAME);
      const textCat = util.getChannelByName(msg, SECRET_TEXT_CATEGORY_NAME);
      if (textCat.length === 0)
        msg.guild.channels
          .create(SECRET_TEXT_CATEGORY_NAME, {
            type: "category",
            reason: "Secret type bundle for text",
            permissionOverwrites: permissionOverwrites(id),
          })
          .then((parent) => {
            createSecretText(parent, id);
          });
      else createSecretText(textCat[0], id);
      if (voiceCat.length === 0)
        msg.guild.channels
          .create(SECRET_VOICE_CATEGORY_NAME, {
            type: "category",
            reason: "Secret type bundle for voice",
            permissionOverwrites: permissionOverwrites(id),
          })
          .then((parent) => {
            createSecretVoice(parent, id);
          });
      else createSecretVoice(voiceCat[0], id);
    })
    .catch(console.error);
};

module.exports = secret;
