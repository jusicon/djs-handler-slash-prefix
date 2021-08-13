let Discord = require('discord.js')
let client = new Discord.Client({
    intents: [ Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_INTEGRATIONS, Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS ],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
})


const config = require('./config.json')
const prefix = config.prefix;
require ('dotenv').config()
const fs = require('fs')



client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync('./commands/');
module.exports = client;
['handler'].forEach((handler) => {
  require(`./handlers/${handler}`)(client)
});



client.login(process.env.TOKEN)