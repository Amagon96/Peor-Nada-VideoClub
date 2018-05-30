const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const async = require('async');

function index(req, res, next){
  const page = req.params.page ? req.params.page : 1;
  User.paginate({}, {
    page: page,
    limit:3
  }, (err, users)=>{
    if(err){
      res.json({
        err: true,
        message: 'No se pudo extraer usuarios',
        objs: {}
      });
    }else{
      res.json({
        err: false,
        message:'Lista de usuarios',
        objs:users
      });
    }
  });
}

function create(request, response, next) {
  const name = request.body.name;
  const lastName = request.body.lastName;
  const email = request.body.email;
  const password = request.body.password;

  let user = new User();
  user.name = name;
  user.lastName = lastName;
  user.email = email;

  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {

      user.password = hash;
      user.salt = salt;

      user.save((err, obj) => {
        if (err) {
          response.json({
            error: true,
            message: 'Usuario no  Guardado',
            objs: {}
          });
        } else {
          response.json({
            error: false,
            message: 'usuario Guardado',
            objs: obj
          });
        }
      });
    });
  });
}

function update(request, response, next) {
  const name = request.body.name;
  const lastName = request.body.lastName;
  const email = request.body.email;
}

function remove(req, res, next){
  const id = req.params.id;
  if(id){
    User.remove({_id:id}, function(err){
      if (err) {
        res.json({
          err: true,
          message: 'No se pudo eliminar usuario',
          objs: {}
        });
      }else{
        res.json({
          err: false,
          message:'Usuario eliminado',
          objs: {}
        });
      }
    });
  }else{
    res.json({
      err: true,
      message:'Usuario no existe',
      objs:{}
    });
  }
}

module.exports = {
  index,
  create,
  update,
  remove
};
