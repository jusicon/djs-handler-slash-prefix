const { glob } = require('glob');
const { promisify } = require('util');
const globPromise = promisify(glob);
const fs = require('fs')
const ascii = require('ascii-table');


module.exports = async (client) => {
  const slashcommandFiles = await globPromise(`${process.cwd()}/slashcommands/*/*.js`);

  slashcommandsArray = [];

  slashcommandFiles.map(async (slashcommandFile) => {
    const slashcommand = await require(slashcommandFile);

    if (!slashcommand.name) return;

    const C = slashcommandFile.split("/");
    console.log(`✅[SLASH CMDS HANDLER] - File ` + slashcommand.name + `.js ` + `was loaded!`)

    await client.slashcommands.set(slashcommand.name, slashcommand)
    slashcommandsArray.push(slashcommand);

        client.on('ready', async () => {
        const mainGuild = await client.guilds.cache.get("967172133987946577");
        mainGuild.commands.set(slashcommandsArray);
    });
  })
}