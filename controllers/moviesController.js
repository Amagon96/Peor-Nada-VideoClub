const express = require('express');
const Movie = require('../models/movie');

function show(req, res, next){
  const id = req.params.id;
  Movie.findOne({
    _id:id
  }, (err, obj)=>{
    res.render('movies/show', {movie:obj});
  });
}

function newMovie(req, res, next){
  res.render('movies/new', {});
}

function create2(req,res,next){
  console.log(req.body.title)
  console.log(req.body.duration)
  console.log(req.body.genre)
  res.render('movies/show2', {});
}

function list(req, res, next){
  Movie.find({}, (err, objs)=>{
    res.render('movies/list', {
      movies:objs
    });
  });
}

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

function update(id, req, res, movie){
    const title = req.body.title;
    const genre = req.body.genre;
    const duration = req.body.duration;
    const director = req.body.director;

    movie.set({title : title});
    movie.set({genre : genre});
    movie.set({duration : duration});
    movie.set({director : director});

    movie.save((err, movies)=>{
        if (err) {
            res.json({
                err: true,
                message: 'No se pudo editar pelicula',
                objs: {}
            });
        }else{
            res.json({
                err: false,
                message:'Pelicula Editada',
                objs:movies
            });
        }
    });
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
  create2,
  update,
  remove,
  show,
  list,
  newMovie
};
