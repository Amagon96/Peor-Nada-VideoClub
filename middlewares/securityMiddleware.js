const express = require('express');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
  const token = req.body.token || req.query.token || request.headers['x-acces-token'];
  if(token){
    jwt.verify(token, 'fc10a08df7fafa3871166646609e1c95', (err, decoded)=>{
      if(err){
        res.json({
          err: true,
          message:'Llave incorrecta',
          objs: {}
        });
      }else{
        next();
      }
    });
  } else{
    res.json({
      err: true,
      message:'Llave incorrecta',
      objs: {}
    });
  }
}

module.exports = {
  verifyToken
};
