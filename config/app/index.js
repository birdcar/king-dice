const intents = require('./intents');
const { registerCommands } = require('./commands');

module.exports = {
  config: {
    intents
  },
  utils: {
    registerCommands
  },
};