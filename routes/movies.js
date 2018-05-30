const express = require('express');
const router = express.Router();
const moviesController = require("../controllers/moviesController");

router.get('/list', moviesController.list);

router.get('/new', moviesController.newMovie);

router.get('/:page?', moviesController.index);

router.get('/show/:id', moviesController.show);

router.post('/create2', moviesController.create2);

router.post('/', moviesController.create);

router.put('/:id', moviesController.update);

router.delete('/:id?', moviesController.remove);

module.exports = router;
