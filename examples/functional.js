'use strict';

var Enquirer = require('enquirer');
var enquirer = new Enquirer();

enquirer.register('rawlist', require('..'));
enquirer.question('dinner', 'What would you like to do?', {
  type: 'rawlist',
  choices: [
    'Order a pizza',
    'Make a reservation',
    enquirer.separator(),
    'Ask opening hours',
    'Talk to the receptionist'
  ]
});

enquirer.question('size', 'What size would you like?', {
  type: 'rawlist',
  choices: ['Jumbo', 'Large', 'Standard', 'Medium', 'Small', 'Micro']
});

enquirer.ask(['dinner', 'size'])
  .then(function (answers) {
    console.log(answers);
    //=> { dinner: 'Order a pizza', size: 'Large' }
  });
