require('dotenv').config();

const { Client } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { config, utils } = require('../config/app/index');

// Create a new client instance
const bot = new Client(config);
const client = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

// When the client is ready, run this code (only once)
bot.on('ready', async () => {
  await utils.registerCommands(bot, client);
  console.log(bot.commands);
  console.log('Ready!');
});

bot.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = bot.commands.get(interaction.commandName);

  if (!command) return;

  await command.execute(interaction).catch(async (err) => {
    console.error(err);
    await interaction.reply({
      content: `Sorry! Something went wrong while processing the message.`,
      ephemeral: true,
    });
  });
});

// Login to Discord with your client's token
bot.login(process.env.DISCORD_TOKEN);
