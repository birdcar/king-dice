const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
  .setName('roll')
  .setDescription('Roll one or more dice.')
  .addStringOption((option) => {
    return option
      .setName('dice')
      .setDescription(
        'The dice to roll, in the format "NumberDicetype" (i.e. "1d6" to roll one 6-sided dice).'
      )
      .setRequired(true);
  });

async function execute(interaction) {
  const input = interaction.options.getString('dice').trim().split(' ');
  const output = [];

  for (const roll of input) {
    let [num, sides] = roll.split('d').map((n) => parseInt(n));

    if (num === 0) {
      await interaction.reply(
        `You can't roll 0 d${sides}! Try again please :bow:`
      );
      return;
    }

    if (!num) {
      num = 1;
    }

    let start = 0;
    while (start !== num) {
      output.push(getRoll(sides));
      start++;
    }
  }

  const sum = output.reduce((total, num) => (total += num), 0);
  await interaction.reply({ content: `${output.join('+')} = ${sum}` });
}

/**
 * Get a specific dice roll, given a number of sides
 *
 * @param {number} numSides
 */
function getRoll(numSides) {
  return Math.floor(Math.random() * (numSides - 1) + 1);
}

module.exports = {
  data,
  execute,
};
