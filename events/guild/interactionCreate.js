const Discord = require('discord.js')
const client = require('../../index.js')
const ms = require('pretty-ms')
const economy = require('../../models/economy');



client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {

        const command = client.commands.get(interaction.commandName);
        if (!command) return interaction.followUp({ content: 'This command no longer exists.' }) && client.commands.delete(interaction.commandName);

        const errorEmbed = new Discord.MessageEmbed()
            .setColor('#2F3136')
            .setFooter({ text: `by ${client.user.username}`, iconURL: client.user.avatarURL()})
            .setTimestamp()

        const arguments = [];


        for (let option of interaction.options.data) {
            if (option.type === 'SUB_COMMAND') {
                option.options?.forEach((x) => {
                    if (x.value) arguments.push(option.value);
                });
            } else if (option.value) arguments.push(option.value);
        }


        if (command.permission && !interaction.member.permissions.has(command.permission)) {
            return interaction.reply({ embeds: [errorEmbed.setDescription(`**\`❌\` | You do not have the required permission for this command: \`${interaction.commandName}\`.**`)], ephemeral: true })
        }

        const t = client.timeouts.get(`${interaction.user.id}_${command.name}`) || 0;

        if (Date.now() - t < 0) return interaction.reply({ embeds: [errorEmbed.setDescription(`**\`❌\` | Command on cooldown, please wait __${ms(t - Date.now())}__**`)], ephemeral: true });

        client.timeouts.set(`${interaction.user.id}_${command.name}`, Date.now() + (command.timeout || 0));


        if (command) command.run(client, interaction, arguments);
    }
})