const express = require('express');
const User = require('../models/user');

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

function create(req, res, next){
  const name = req.body.name;
  const lastName = req.body.lastName;
  const email = req.body.email;

  let user = new User();

  user.name = name;
  user.lastName = lastName;
  user.email = email;

  user.save((err, users)=>{
    if (err) {
      res.json({
        err: true,
        message: 'No se pudo guardar usuario',
        objs: {}
      });
    }else{
      res.json({
        err: false,
        message:'Usuario Guardado',
        objs:users
      });
    }
  });
}

function update(req, res, next){
  res.send("estas en /movies/ -> put");
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
