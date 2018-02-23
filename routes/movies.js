const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
  res.send("Estas en /movies/ -> get");
});

router.post('/', (req, res, next)=>{
  res.send("estas en /movies/ -> post");
});

router.put('/', (req, res, next)=>{
  res.send("estas en /movies/ -> put");
});

router.delete('/', (req, res, next)=>{
  res.send("estas en /movies/ -> delete");
});

module.exports = router;
