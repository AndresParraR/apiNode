var express = require('express');
var router = express.Router();

const ContactService = require('../services/ContactService')

/**
 * @swagger
 * components:
 *  schemas:
 *    Contact:
 *      type: object
 *      properties:
 *        names:
 *          type: string
 *          description: names user
 *        email:
 *          type: string
 *          description: email user
 *        message: 
 *          type: string
 *          description: message user
 */

/**
 * @swagger
 * tags:
 *  name: Contact
 *  description: Contact send
 */

/**
 * @swagger
 * /api/contact:
 *  post:
 *    summary: Send email to contact
 *    tags: [Contact]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              names:
 *                type: string
 *              email:
 *                type: string
 *              message:
 *                type: string
 *    responses:
 *      200:
 *        description: Send email
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  success:
 *                    type: boolean
 *                  response:
 *                    type: object
 *                    properties:
 *                    success:
 *                      type: boolean
 *                      default: true
 *                    response:
 *                      type: string
 */

router.post('/', async function(req, res, next) {
  try {
    var body = req.body;
    var query = req.query;
    var response = await ContactService.sendEmail(body);
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

module.exports = router;