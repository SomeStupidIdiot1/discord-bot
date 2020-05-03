const util = require("../commandUtil");
const randomNames = require("../names");
const SECRET_VOICE_CATEGORY_NAME = "Secret voice channels";
const SECRET_TEXT_CATEGORY_NAME = "Secret text channels";
const secret = (msg, arrMsg) => {
  // Name of secret channels
  let secretName;
  if (arrMsg.length !== 0) secretName = arrMsg[0];
  else {
    let i = 0;
    do {
      secretName = randomNames[Math.floor(Math.random() * randomNames.length)];
      i++;
    } while (util.getAllRoles(msg, true).includes(secretName) && i < 20);
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
      .createChannel(msg, secretName, {
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
      .createChannel(msg, secretName, {
        type: "text",
        reason: `secret type ${secretName} text channel`,
        permissionOverwrites: permissionOverwrites(id),
      })
      .then((channel) => {
        channel.setParent(parent);
        channel.send(`This category's id is \`${parent.id}\`.`);
      })
      .catch(console.error);
  };
  // Make role, channels, categories
  util
    .createRole(
      msg,
      { name: `secret ${Math.random()}`, color: "RANDOM" },
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

module.exports = {
  SECRET_VOICE_CATEGORY_NAME,
  SECRET_TEXT_CATEGORY_NAME,
  secret,
};
