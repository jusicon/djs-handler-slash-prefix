const Discord = require("discord.js")
const wait = require('util').promisify(setTimeout);

module.exports = {
    name: 'ping',
    description: 'Shows the bot latency!',

    run: async (client, interaction, arguments) => {
        let embed = new Discord.MessageEmbed()
            .setTitle('Calculating ping...')
            .setDescription('This may take some time.')
            .setColor('#2f3136')
        const inter = await interaction.reply({ embeds: [embed], fetchReply: true })

        const ping = interaction.createdTimestamp - inter.createdTimestamp;

        let resultEmbed = new Discord.MessageEmbed()
            .setTitle('🏓Pong!')
            .setDescription(`Bot latency: \`${ping}\`ms \nAPI latency: \`${client.ws.ping}\`ms`)
            .setColor('#2f3136')
            .setThumbnail('https://media3.giphy.com/media/fB2hQGqXXPGpi/giphy.gif?cid=ecf05e474yvm9ojuyv5l85en6h2pga244dv04yd7v6afv33a&rid=giphy.gif&ct=g')
            .setFooter("by Mr.Handler ©2021", client.user.avatarURL())
        await interaction.editReply({ embeds: [resultEmbed]});
    }
}