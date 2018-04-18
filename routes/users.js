const express = require('express');
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get('/:page?', usersController.index);

router.post('/', usersController.create);

router.put('/:id', usersController.update);

router.delete('/:id?', usersController.remove);

module.exports = router;
