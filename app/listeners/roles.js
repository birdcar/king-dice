const INTRO =
  /^introducing\s+myself\s+as\s+\<@(?<discordUserId>[\w\d]+)\>[\W\s]*$/i;
const TOGGLE =
  /^\<@(?<discordUserId>[\w\d]+)\>\s+(?<toggle>is|isn\W?t)\s+(?<role>.*)$/i;
const LIST = /^who\s+is\s+\<@(?<discordUserId>[\w\d]+)\>[\W\s]*$/i;

const MATCHERS = [INTRO, TOGGLE, LIST];

async function intro(event, bot, client) {}

async function setRole(event, bot, client) {}

async function deleteRole(event, bot, client) {}

async function toggleRole(event, bot, client) {}

async function listRoles(event, bot, client) {}

function listener(message) {
  const author = message.author;
  let mentioned = message.mentions;

  MATCHERS.forEach((re) => {
    match = message.match(re);

    if (match) {
      output = match;
    }
  });

  return output;
}

module.exports = {
  intro,
  toggleRole,
  listRoles,
  checkMessage,
};
