var express = require('express');
var router = express.Router();

const RoleService = require('../services/RoleService')

/**
 * @swagger
 * components:
 *  schemas:
 *    Role:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of role
 *        name:
 *          type: string
 *          description: The role name
 */

/**
 * @swagger
 * tags:
 *  name: Roles
 *  description: The roles managing API
 */

/**
 * @swagger
 * /api/role:
 *  get:
 *    summary: Returns a list of all roles
 *    tags: [Roles]
 *    responses:
 *      200:
 *        description: The list of the role
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                properties:
 *                  success:
 *                    type: boolean
 *                  response:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Role'
 */

router.get('/', async function(req, res, next) {
  try {
    var body = req.body;
    var query = req.query;
    var response = await RoleService.getAll();
    res.send({
      success: true,
      response
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message
    });
  }
})

module.exports = router;