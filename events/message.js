const client = require('../index.js')
const config = require('../config.json');
const { MessageEmbed, Permissions } = require('discord.js');
const prefix = config.prefix;

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    if (message.content === 'hello') {
        message.reply('hi :)')
    }

    if (!message.content.startsWith(prefix)) return;
    if (!message.guild) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));

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

    if (command.permissions.length){
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
            const noPermEmbed = new MessageEmbed()
            .setColor('#2f3136')
            .setTitle('Invalid Permission(s)')
            .setDescription('You don\'t have that permission(s)')
            .addField('Permission(s) Required!', `\`${invalidPermissionsFlags}\``)
            .setFooter("by Café Portal ©2021", client.user.avatarURL())
            .setTimestamp()

            return message.reply({ embeds: [noPermEmbed] })
        }
    }

    if (command) command.run(client, message, args);
});