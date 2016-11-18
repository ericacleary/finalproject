'use strict';

var express = require('express');
var Todo = require('../models/todo');
//var todos = require('../../mock/todos.json');

var router = express.Router();

router.get('/todos', function(request, response) {
  Todo.find({}, function(err, todos) {
    if(err) {
      //do something
      return response.status(500).json({message: err.message});
    }
      response.json({todos: todos});
  });
});

router.post('/todos', function(request, response) {
  var todo = request.body;
  Todo.create(todo, function(err, todo) {
    if(err) {
      return response.status(500).json({err: err.message});
    }
    response.json({'todo': todo, message: 'Todo Created'});
  });
});

router.put('/todos/:id', function(request, response) {
  var id = request.params.id;
  var todo = request.body;
  if(todo && todo._id !==id) {
    return response.status(500).json({err: "Ids don't match!"})
  }
  Todo.findByIdAndUpdate(id, todo, {new: true}, function(err, todo) {
    if(err) {
      return response.status(500).json({err: err.message});
    }
    response.json({'todo': todo, message: 'Todo Updated!'});
  });
});

router.delete('/todos/:id', function(req, res) {

 var id = req.params.id;

 Todo.findByIdAndRemove(id, function(err, result) {

   if (err) {

     return res.status(500).json({ err: err.message });

   }

   res.json({ message: 'Todo Deleted' });

 });

});


//todo: add delete router

module.exports = router;
