const db = require('../../config/db/index.js');

class MeRole {
  constructor() {
    this.tableName = 'me_role';
    this.joinName = 'mr';
    this.db = db(`${this.tableName} as ${this.joinName}`);
  }

  /**
   * 
   * @param {string} roles 
   * @returns { string[] }
   */
  #parseRoles(roles) {
    return roles.split(';;')
  }

  /**
   * 
   * @param {string[]} roles 
   * @return { string }
   */
  #joinRoles(roles) {
    roles.join(';;')
  }

  /**
   * 
   * @param {string} discordId 
   */
  async get(discordId) {
    const userRoles = await this.db
      .select(['discord_id', 'roles'])
      .where({ 'discord_id': discordId }).first();

    if (!userRoles) {
      return {}
    }

    return {
      ...userRoles,
      roles: this.#parseRoles(userRoles.roles)
    }
  }

  async create(discordId, role) {

  }

  async update(discordId, newRole) {
    const userRoles = await this.get(discordId);

    if (userRoles.roles.indexOf(newRole) !== -1) {
      return userRoles
    }

    const newRoles = this.#joinRoles(userRoles.roles.push(newRole));

    return this.db
      .update(newRoles, ['*'])
      .where({ 'mr.discord_id': discordId });
  }
}

module.exports = new MeRole();