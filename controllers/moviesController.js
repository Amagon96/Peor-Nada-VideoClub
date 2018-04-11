const express = require('express');
const Movie = require('../models/movie');

function index(req, res, next){
  const page = req.params.page ? req.params.page : 1;
  Movie.paginate({}, {
    page: page,
    limit:3
  }, (err, movies)=>{
    if(err){
      res.json({
        err: true,
        message: 'No se pudo extraer movies',
        objs: {}
      });
    }else{
      res.json({
        err: false,
        message:'Lista de peliculas',
        objs:movies
      });
    }
  });
}

function create(req, res, next){
  const title = req.body.title;
  const genre = req.body.genre;
  const duration = req.body.duration;
  const director = req.body.director;

  let movie = new Movie();

  movie.title = title;
  movie.genre = genre;
  movie.duration = duration;
  movie.director = director;

  movie.save((err, movies)=>{
    if (err) {
      res.json({
        err: true,
        message: 'No se pudo guardar pelicula',
        objs: {}
      });
    }else{
      res.json({
        err: false,
        message:'Pelicula Guardada',
        objs:movies
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
    Movie.remove({_id:id}, function(err){
      if (err) {
        res.json({
          err: true,
          message: 'No se pudo eliminar pelicula',
          objs: {}
        });
      }else{
        res.json({
          err: false,
          message:'Pelicula eliminada',
          objs: {}
        });
      }
    });
  }else{
    res.json({
      err: true,
      message:'Pelicula no existe',
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
