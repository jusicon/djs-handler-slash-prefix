const Discord = require('discord.js')
const client = require('../../index.js')
const config = require('../../config.json');

const cooldowns = new Map();
const prefix = config.prefix;

client.on('messageCreate', async (message, member) => {
  if (message.author.bot) return;
  if (!message.guild) return;


  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let command = client.commands.get(cmd)
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (!command) return;

  const PermissionsFlags = [
    "CREATE_INSTANT_INVITE",
    "KICK_MEMBERS",
    "BAN_MEMBERS",
    "ADMINISTRATOR",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "ADD_REACTIONS",
    "VIEW_AUDIT_LOG",
    "PRIORITY_SPEAKER",
    "STREAM",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "SEND_TTS_MESSAGES",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "READ_MESSAGE_HISTORY",
    "MENTION_EVERYONE",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_GUILD_INSIGHTS",
    "CONNECT",
    "SPEAK",
    "MUTE_MEMBERS",
    "DEAFEN_MEMBERS",
    "MOVE_MEMBERS",
    "USE_VAD",
    "CHANGE_NICKNAME",
    "MANAGE_NICKNAMES",
    "MANAGE_ROLES",
    "MANAGE_WEBHOOKS",
    "MANAGE_EMOJIS",
  ];

  if (command.permissions.length) {
    let invalidPermissionsFlags = [];
    for (const permission of command.permissions) {
      if (!PermissionsFlags.includes(permission)) {
        return console.log(`Invalid Permsissions : ${permssion}`)
      }

      if (!message.member.permissions.has(permission)) {
        invalidPermissionsFlags.push(permission);
      }
    }

    if (invalidPermissionsFlags.length) {
      const noPermEmbed = new Discord.MessageEmbed()
        .setColor('#2f3136')
        .setTitle('Invalid Permission(s)')
        .setDescription('You don\'t have that permission(s)')
        .addField('Permission(s) Required!', `\`${invalidPermissionsFlags}\``)
        .setFooter("by Astonish Promotions ©2022", client.user.avatarURL())
        .setTimestamp()

      return message.reply({ embeds: [noPermEmbed] })
    }

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = (command.cooldown) * 1000;

    if (time_stamps.has(message.author.id)) {
      const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

      if (current_time < expiration_time) {
        const time_left = (expiration_time - current_time) / 1000;
        const cooldownEmbed = new Discord.MessageEmbed()
          .setDescription(`**Please wait ${time_left.toFixed(0)} second(s) before using the command ${command.name} again.**`)
          .setColor('#2f3136')
        return message.reply({ embeds: [cooldownEmbed] });
      }
    }

    //If the author's id is not in time_stamps then add them with the current time.
    time_stamps.set(message.author.id, current_time);
    //Delete the user's id once the cooldown is over.
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);
  }

  if (command) command.run(client, message, Discord, args);

});