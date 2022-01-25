var express = require('express');
var router = express.Router();

const UserService = require('../services/UserService')

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - firstName
 *        - lastName
 *        - email
 *        - roleId
 *        - active
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of User
 *        firstName:
 *          type: string
 *          description: The firstname of User
 *        lastName:
 *          type: string
 *          description: The lastname of User
 *        email:
 *          type: string
 *          description: The email of User
 *        roleId:
 *          type: integer
 *          description: The roleId of User
 *        roleName:
 *          type: string
 *          description: The roleName of User
 *        active:
 *          type: boolean
 *          description: If the User is active or not
 *        createdAt:
 *          type: string
 *          format: date-time
 *          description: When the user was created
 *        updatedAt:
 *          type: string
 *          format: date-time
 *          description: When the user was updated
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The users managing API
 */

/**
 * @swagger
 * /api/user:
 *  get:
 *    summary: Returns a list of all users
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: The list of the Users
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
 *                      $ref: '#/components/schemas/User'
 */

 router.get('/', async function(req, res, next) {
  try {
    var body = req.body;
    var query = req.query;
    var response = await UserService.getAll();
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

/**
 * @swagger
 * /api/user/{userId}:
 *  get:
 *    summary: Update a user
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: integer
 *        required: true
 *        description: Id of the user
 *    responses:
 *      200:
 *        description: The user was deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                response:
 *                  type: object
 *                  $ref: '#/components/schemas/User'
 * 
 *      404:
 *        description: The user was not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  default: false
 *                error:
 *                  type: string
 */

router.get('/:userId', async function(req, res, next) {
  try {
    var body = req.body;
    const id = req.params.userId;
    var query = req.query;
    var response = await UserService.get(id);
    res.send({
      success: true,
      response: response
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message
    });
  }
})

/**
 * @swagger
 * /api/user:
 *  post:
 *    summary: Create a new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              email:
 *                type: string
 *              roleId:
 *                type: integer
 *              active:
 *                type: boolean
 *    responses:
 *      200:
 *        description: The user was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                response:
 *                  type: object
 *                  $ref: '#/components/schemas/User'
 *                  
 *      500:
 *        description: Some server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  default: false
 *                error:
 *                  type: string
 */

router.post('/', async function(req, res, next) {
  try {
    var body = req.body;
    var query = req.query;
    var response = await UserService.save(body);
    res.send({
      success: true,
      response: response
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message
    });
  }
})

/**
 * @swagger
 * /api/user/{userId}:
 *  put:
 *    summary: Update a user
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: integer
 *        required: true
 *        description: Id of the user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              email:
 *                type: string
 *              roleId:
 *                type: integer
 *              active:
 *                type: boolean
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                response:
 *                  type: object
 *                  $ref: '#/components/schemas/User'
 * 
 *      404:
 *        description: The user was not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  default: false
 *                error:
 *                  type: string
 */

 router.put('/:userId', async function(req, res, next) {
  try {
    var body = req.body;
    body.id = req.params.userId;
    var query = req.query;
    var response = await UserService.update(body);
    res.send({
      success: true,
      response: response
    })
  } catch (error) {
    res.status(404).send({
      success: false,
      error: error.message
    });
  }
})

/**
 * @swagger
 * /api/user/{userId}:
 *  delete:
 *    summary: Delete a user
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: integer
 *        required: true
 *        description: Id of the user
 *    responses:
 *      200:
 *        description: The user was deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 * 
 *      404:
 *        description: The user was not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  default: false
 *                error:
 *                  type: string
 */

router.delete('/:userId', async function(req, res, next) {
  try {
    var body = req.body;
    const id = req.params.userId;
    var query = req.query;
    var response = await UserService.delete(id);
    res.send({
      success: true
    })
  } catch (error) {
    res.status(404).send({
      success: false,
      error: error.message
    });
  }
})

// router.delete('/:userId', async function(req, res, next) {
//   try{
//     const id = req.params.userId;
//     const user = await models.user.destroy({
//       where:{id}
//     });
//     console.log(user)
//     res.status(200).json({
//       message: 'Handling DELETE requests to /api/User/:userId'
//     })
//   }catch(err){
//     res.status(500).send({
//       success: false,
//       error: err.message
//     });
//   }
// });

// router.get('/', async function(req, res, next) {
//   try{
//     const users = await models.user.findAll();
//     res.status(200).json({
//       message: 'Handling GET requests to /api/User',
//       data: users
//     })
//   }catch(err){
//     res.status(500).send({
//       success: false,
//       error: err.message
//     });
//   }
// });

// router.get('/', async function(req, res, next) {
//   try {
//     var body = req.body;
//     var query = req.query;
//     var response = await UserService.getAll();
//     res.send({
//       success: true,
//       response: response
//     })
//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       error: error.message
//     });
//   }
// });

// router.get('/:userId', async function(req, res, next) {
//   try{
//     const id = req.params.userId;
//     const user = await models.user.findOne({
//       where:{id}
//     });
//     res.status(200).json({
//       message: 'Handling GET requests to /api/User/:userId',
//       data: user
//     })
//   }catch(err){
//     res.status(500).send({
//       success: false,
//       error: err.message
//     });
//   }
// });

// router.post('/', async function(req, res) {
//   console.log(req.body, models.user)
//   const { firstName, lastName, email, active, roleId } = req.body;
//   try{
//     let newUser = await models.user.create({
//       firstName,
//       lastName,
//       email,
//       active,
//       roleId,
//       updatedAt: Sequelize.fn('NOW'),
//     })
    
//     if(newUser){
//       res.json({
//         message: 'User created successfully',
//         data: newUser
//       }) 
//     }
//   }catch(err){
//     res.status(500).send({
//       success: false,
//       error: err.message
//     });
//   }
// })

// router.put('/', async function(req, res) {
//   console.log(req.body, models.user)
//   const { id, firstName, lastName, email, active, roleId } = req.body;
//   try{
//     var eu = {
//       firstName,
//       lastName,
//       email,
//       roleId,
//       active,
//       updatedAt: Sequelize.fn('NOW')
//     };

//     var obj = await models.user.update(eu, {
//       where: { id: id }
//     });
    
//     if(obj){
//       res.json({
//         message: 'User updated successfully',
//         data: obj
//       }) 
//     }
//   }catch(err){
//     res.status(500).send({
//       success: false,
//       error: err.message
//     });
//   }
// })

module.exports = router;