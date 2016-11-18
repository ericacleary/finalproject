'use strict';

var Todo = require('./models/todo.js');

var todos = [

      {"name": "Get excited about learning how to code."},
      {"name": "Get overwhelmed"},
      {"name": "Resist the urge to throw the computer out the window."},
      {"name": "Panic!"},
      {"name": "Get the message from Brian that I graduated. (I hope!)"},
      {"name": "Drink a very large glass of Merlot."}
];

todos.forEach(function(todo, index) {
  Todo.find({'name': todo.name}, function(err, todos) {
    if(!err && !todos.length) {
      Todo.create({completed: false, name: todo.name});
    };
  });
});
