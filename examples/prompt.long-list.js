'use strict';

var Prompt = require('..');
var prompt = new Prompt({
  type: 'rawlist',
  name: 'dinner',
  message: 'What would you like to do?',
  choices: [
    'foo',
    'bar',
    'baz',
    'qux',
    'fez',
    'aaa',
    'bbb',
    'ccc',
    'ddd',
    'eee',
    'fff',
    'ggg',
    'hhh',
    'iii'
  ]
});

prompt.run()
  .then(function(answer) {
    console.log(answer)
  })
  .catch(function(err) {
    console.log(err)
  })
