const Discord = require('discord.js')
const client = require('../../index.js')
const config = require('../../config.json');


client.on('interactionCreate', async interaction => {
    if(interaction.isCommand()) {
        const slashcommand = client.slashcommands.get(interaction.commandName);
        if(!slashcommand) return interaction.followUp({content: 'This command no longer exists.'}) && client.commands.delete(interaction.commandName);

        const arguments = [];

        for (let option of interaction.options.data) {
            if (option.type === 'SUB_COMMAND') {
                option.options?.forEach((x) => {
                    if (x.value) arguments.push(option.value);
                });
            } else if (option.value) arguments.push(option.value);
        }
        if (slashcommand) slashcommand.run(client, interaction, arguments);
    }
})