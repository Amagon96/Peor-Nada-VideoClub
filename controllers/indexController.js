const express = require('express');
const User = require('../models/user');
const async = require('async');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');


function index(request, response, next) {
  response.render('index', {});
};

function login(req, res, next){
  const email = req.body.email;
  const password = req.body.password;
  const key = config.get('api.key');
  async.parallel({
    user: (callback)=>{
      User.findOne({
        email: email
      }).exec(callback);
    }
  }, (err, results)=>{
    const user = results.user;
    if(user){
      bcrypt.hash(password, user.salt, function(err, hash){
        if(hash === user.password){
          const payload = {
            id: user._id
          };
          let token = jwt.sign(payload, key, {
            expiresIn: 86400
          });
          res.json({
            error: false,
            message:'Usuario y password ok :D',
            objs: {
              token: token
            }
          });
        }
        else {
          res.json({
            error: true,
            message:'Usuario y password no ok D:',
            objs:{}
          });
        }
      });
    }else{
      res.json({
        error: true,
        message:'Usuario y password no ok D:',
        objs:{}
      });
    }
  });
};

function logout(req, res, next){
  res.render('logout', {});
}


module.exports = {
  index,
  login,
  logout
};
