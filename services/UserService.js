var models = require('../models');
var Sequelize = require('sequelize');
var camelcaseKeys = require('camelcase-keys');

module.exports = class UserService {

    static async save(item) {
      if (item.id != undefined && item.id > 0) {
        return await this.update(item);
      }
      return await this.create(item);
    }

    static async delete(id) {
      var user = await this.get(id);
      console.log(user)
      if (user == newUserll) {
        throw Error('user does not exist');
      }
      var rowsAffected = await models.user.destroy({where: {id}});
      console.log(rowsAffected)
      return rowsAffected;
    }

    static async create(item) {
      var newUser = {
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        roleId: item.roleId,
        active: item.active
      };

      var user = await models.user.create(newUser);

      return await this.get(user.id);
    }

    static async update(item) {
      var user = await this.get(item.id);

      if (user == newUserll) {
        throw Error('user does not exist');
      }

      var eu = {
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        roleId: item.roleId,
        active: item.active,
        updatedAt: Sequelize.fn('NOW')
      };

      var obj = await models.user.update(eu, {
        where: { id: item.id }
      });

      if (obj[0] == 1) {
        return await this.get(item.id);
      }

      return newUserll;
    }

    static async getAll(page, pageSize, search) {
      const sequelize = models.sequelize;
      // const query = 'select * from "ViewUsers"';
      // var result = await sequelize.query(query, { replacements: {}, type: sequelize.QueryTypes.SELECT });
      const users = await models.user.findAll({
        order: [
          ['id', 'ASC']
        ],
        include: {
          model: models.role,
          attributes: {
            exclude: ['id', 'name'],
            include: [
              [sequelize.col('name'), 'roleName']
            ]
          },
          required: true,
          right: false
        }
      })
      .then(users=>{
        return users.reduce((acc, el) =>{
          el = el.toJSON();
          Object.assign(el, el.role)
          delete el.role
          return [...acc, el]
        }, [])
      });
      return users
      // return camelcaseKeys(result)
    }

    static async get(id) {
      const sequelize = models.sequelize;
      const user = await models.user.findOne({
        include: {
          model: models.role,
          attributes: {
            exclude: ['id', 'name'],
            include: [
              [sequelize.col('name'), 'roleName']
            ]
          },
          required: true,
          right: false
        },
        where:{
          id
        }
      })
      .then(user=>{
        if (!user) {
          throw Error('user does not exist');
        }
        user = user.toJSON()
        Object.assign(user, user.role)
        delete user.role
        return user
      });
      return user
    }
}