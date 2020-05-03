require("dotenv").config();
const randomNames = require("../names");
const ADMINISTRATOR = require("discord.js").Permissions.FLAGS.ADMINISTRATOR;
const AES = require("crypto-js/aes");
const {
  SECRET_VOICE_CATEGORY_NAME,
  SECRET_TEXT_CATEGORY_NAME,
  SECRET_PREFIX,
} = require("../constants");
const util = require("../commandUtil");

const secret = (msg, arrMsg) => {
  if (!util.checkPermissions(msg, ADMINISTRATOR)) return;

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
    util
      .createChannel(msg, SECRET_PREFIX + secretName, {
        type: "voice",
        reason: `secret type ${secretName} voice channel`,
        permissionOverwrites: permissionOverwrites(id),
      })
      .then((channel) => {
        channel.setParent(parent);
      })
      .catch(console.error);
  };
  const createSecretText = (parent, id) => {
    util
      .createChannel(msg, SECRET_PREFIX + secretName, {
        type: "text",
        reason: `secret type ${secretName} text channel`,
        permissionOverwrites: permissionOverwrites(id),
      })
      .then((channel) => {
        channel.setParent(parent);
      })
      .catch(console.error);
  };
  // Make role, channels, categories
  util
    .createRole(
      msg,
      {
        name: AES.encrypt(
          secretName.replace(/ /g, "-"),
          process.env.ENCRYPT_PASS
        ).toString(),
      },
      "Making a new secret type."
    )
    .then(({ id }) => {
      const voiceCat = util.getChannelByName(msg, SECRET_VOICE_CATEGORY_NAME);
      const textCat = util.getChannelByName(msg, SECRET_TEXT_CATEGORY_NAME);
      if (textCat.length === 0)
        util
          .createChannel(msg, SECRET_TEXT_CATEGORY_NAME, {
            type: "category",
            reason: "Secret type bundle for text",
            permissionOverwrites: permissionOverwrites(id),
          })
          .then((parent) => {
            createSecretText(parent, id);
          });
      else createSecretText(textCat[0], id);
      if (voiceCat.length === 0)
        util
          .createChannel(msg, SECRET_VOICE_CATEGORY_NAME, {
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
