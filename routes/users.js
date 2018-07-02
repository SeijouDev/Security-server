var express = require('express');
var router = express.Router();

const User = require('../models/user');

router.get('/', (req, res) => {
  // res.json({status: 200, message: 'Connected now!'});
  User.findAll( (err,data) => {
    res.status(200).json(data);
  });
});

router.get('/:id', (req, res) => {
  User.findOne( req.params.id , (err,data) => {
    res.status(200).json(data);
  });
});

router.post('/create', (req,res) => {
  console.log(req.body);
  let user = {
    id: null,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }

  User.insert(user, (err, data) => {
    if(data && data.result) {
      res.json({
        success: true,
        msg: 'User inserted!',
        data: data
      });
    }
    else {
      res.status(500).json({
        success: false,
        msg: 'Error creating user :('
      });
    }
  });
});

module.exports = router;
