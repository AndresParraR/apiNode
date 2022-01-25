var models = require('../models');

module.exports = class RolesService {
    static async getAll(page, pageSize, search) {
      const roles = await models.role.findAll({
        order: [
          ['id', 'ASC']
        ],
      })
      return roles
    }
}