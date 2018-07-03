var express = require('express');
var User = require('../models/userEntity');
var router = express.Router();

router.get('/', (req, res) => {
  // res.json({status: 200, message: 'Connected now!'});
  User.findAll( (err,data) => {
    if(err)
      res.status(500).json(err);    
    else
      res.status(200).json(data);
  });
});

router.get('/:id', (req, res) => {
  User.findOne( req.params.id , (err,data) => {
    if(err)
      res.status(500).json(err);    
    else
      res.status(200).json(data);
  });
});

router.post('/create', (req,res) => {
  let user = {
    id: null,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }

  User.insert(user, (err, data) => {
    if(err) {
      if(err.code = 23505)
        res.status(200).json({ msg: 'User already exists!'});      
      else
        res.status(500).json(err);
    }
    else {
      if(data && data.result) {
        res.status(200).json({
          msg: 'User inserted!',
          data: data
        });
      }
      else {
        res.status(500).json({
          success: false,
          msg: 'Error creating user :(',
          err: err
        });
      }
    }
  });
});

router.post('/login', (req, res) => {
  let user = {email: req.body.email, password: req.body.password};
  User.login( user , (err, data) => {
    if(err)
      res.status(500).json(err);
    else {
      if(data.length == 1) {
        res.status(200).json({user: data[0]})
      }
      else {
        res.status(200).json({msg: 'Not registered!'});
      }
    }
  });
});

module.exports = router;
