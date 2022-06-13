const fs = require('fs/promises');
const path = require('path');

const { Collection } = require('discord.js');
const { Routes } = require('discord-api-types/v10');


const commandsDir = path.join(__dirname, '..', '..', 'app', 'commands')

async function registerCommands(bot, client) {
  const commands = [];
  const guildIds = bot.guilds.cache.map(guild => guild.id)
  
  bot.commands = new Collection();
  const commandFiles = (await fs.readdir(commandsDir)).filter(f => f.endsWith('js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsDir, file);
    const command = require(filePath);
    bot.commands.set(command.data.name, command);
    console.log(bot.commands);
    commands.push(command.data.toJSON());
  }

  for (const id of guildIds) {
    try {
      await client.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, id), { body: commands })
      console.log(`Successfully updated commands for Guild: ${id}`);
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = {
  registerCommands
};