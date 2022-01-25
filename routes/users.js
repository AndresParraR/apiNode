var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    message: 'Handling GET requests to /users'
  })
});

router.post('/', function(req, res, next) {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  }
  res.status(201).json({
    message: 'Handling POST requests to /users',
    createdProduct: user
  })
});

router.get('/:productId', function(req, res, next) {
  const id = req.params.productId;
  if(id === 'special'){
    res.status(200).json({
      message: 'You discovered the special ID',
      id: id
    })
  }else{
    res.status(200).json({
      message: 'You passed an ID'
    })
  }
});

module.exports = router;
