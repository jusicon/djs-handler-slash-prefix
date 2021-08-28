const { glob } = require('glob');
const { promisify } = require('util');
const globPromise = promisify(glob);
const fs = require('fs')
const ascii = require('ascii-table');


module.exports = async (client) => {
  const slashcommandFiles = await globPromise(`${process.cwd()}/slashcommands/*/*.js`);

  slashcommandsArry = [];

  slashcommandFiles.map(async (slashcommandFile) => {
    const slashcommand = await require(slashcommandFile);

    if (!slashcommand.name) return;
    if (slashcommand.Perms) slashcommand.defaultPermission = false;

    const C = slashcommandFile.split("/");
    console.log(`✅[SLASH CMDS HANDLER] - File ` + slashcommand.name + `.js ` + `was loaded!`)

    await client.slashcommands.set(slashcommand.name, slashcommand)
    slashcommandsArry.push(slashcommand);

      client.on('ready', async () => {
        const MainGuild = await client.guilds.cache.get('putguildid');

        MainGuild.commands.set(slashcommandsArry).then((command) => {
          const Roles = (slashcommandName) => {
            const slashcmdPerms = slashcommandsArry.find((c) => c.name === slashcommandName).Perms;

            if (!slashcmdPerms) return null;

            return MainGuild.roles.cache.filter((r) => r.permissions.has(slashcmdPerms) && !r.managed);
          };

          const fullPermissions = command.reduce((accumulator, x) => {
            const roles = Roles(x.name);
            if (!roles) return accumulator;

            const permissions = roles.reduce((a, v) => {
              return [...a, { id: v.id, type: 'ROLE', permission: true }]
            }, []);

            return [...accumulator, { id: x.id, permissions }]
          }, []);

          MainGuild.commands.permissions.set({ fullPermissions });
        })
      })
  })
}