  
let Discord = require('discord.js')
let client = new Discord.Client({
    intents: 32767,
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
})


const config = require('./config.json')
const prefix = config.prefix;
require ('dotenv').config()
const fs = require('fs')


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.slashcommands = new Discord.Collection();
client.categories - fs.readdirSync('./slashcommands/');
client.categories = fs.readdirSync('./commands/');
module.exports = client;
['command_handler', 'slashcommand_handler', 'event_handler'].forEach((handler) => {
  require(`./handlers/${handler}`)(client)
});


client.login(process.env.TOKEN)