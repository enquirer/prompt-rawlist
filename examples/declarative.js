'use strict';

var Enquirer = require('enquirer');
var enquirer = new Enquirer();

enquirer.register('rawlist', require('..'));

var questions = [
  {
    type: 'rawlist',
    name: 'dinner',
    message: 'What would you like to do?',
    choices: [
      'Order a pizza',
      'Make a reservation',
      enquirer.separator(),,
      'Ask opening hours',
      'Talk to the receptionist'
    ]
  },
  {
    type: 'rawlist',
    name: 'size',
    message: 'What size would you like?',
    choices: ['Jumbo', 'Large', 'Standard', 'Medium', 'Small', 'Micro']
  }
];

enquirer.ask(questions)
  .then(function (answers) {
    console.log(answers);
  });
