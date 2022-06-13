const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('replies with PONG so you know the bot is working!');

async function execute(interaction) {
  await interaction.reply({ content: 'PONG!', ephemeral: true });
}

module.exports = {
  data,
  execute,
};
