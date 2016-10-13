'use strict';

var Prompt = require('..');
var prompt = new Prompt({
  type: 'rawlist',
  name: 'dinner',
  message: 'What would you like to do?',
  choices: [
    'Order a pizza',
    'Make a reservation',
    'Ask opening hours',
    'Talk to the receptionist'
  ]
});

prompt.run()
  .then(function(answers) {
    console.log(answers)
  });
