# prompt-rawlist [![NPM version](https://img.shields.io/npm/v/prompt-rawlist.svg?style=flat)](https://www.npmjs.com/package/prompt-rawlist) [![NPM monthly downloads](https://img.shields.io/npm/dm/prompt-rawlist.svg?style=flat)](https://npmjs.org/package/prompt-rawlist)  [![NPM total downloads](https://img.shields.io/npm/dt/prompt-rawlist.svg?style=flat)](https://npmjs.org/package/prompt-rawlist) [![Linux Build Status](https://img.shields.io/travis/enquirer/prompt-rawlist.svg?style=flat&label=Travis)](https://travis-ci.org/enquirer/prompt-rawlist)

> Rawlist prompt. Can be used as a standalone prompt, or with a prompt system like [Enquirer].

![prompt-rawlist example](https://raw.githubusercontent.com/enquirer/prompt-rawlist/master/example.gif)

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save prompt-rawlist
```

## Usage

### Functional style

```js
var Enquirer = require('enquirer');
var enquirer = new Enquirer();

enquirer.register('rawlist', require('prompt-rawlist'));

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
```

### Declarative style

Define questions using a declarative style, like Inquirer.

```js
var Enquirer = require('enquirer');
var enquirer = new Enquirer();

enquirer.register('rawlist', require('prompt-rawlist'));

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
```

## Attribution

Based on the `rawlist` prompt in inquirer.

## About

### Related projects

* [prompt-base](https://www.npmjs.com/package/prompt-base): Base prompt module used for creating custom prompt types for Enquirer. | [homepage](https://github.com/enquirer/prompt-base "Base prompt module used for creating custom prompt types for Enquirer.")
* [prompt-checkbox](https://www.npmjs.com/package/prompt-checkbox): Multiple-choice/checkbox prompt. Can be used standalone or with a prompt system like [Enquirer]. | [homepage](https://github.com/enquirer/prompt-checkbox "Multiple-choice/checkbox prompt. Can be used standalone or with a prompt system like [Enquirer].")
* [prompt-confirm](https://www.npmjs.com/package/prompt-confirm): Confirm (yes/no) prompt. Can be used standalone or with a prompt system like [Enquirer]. | [homepage](https://github.com/enquirer/prompt-confirm "Confirm (yes/no) prompt. Can be used standalone or with a prompt system like [Enquirer].")
* [prompt-list](https://www.npmjs.com/package/prompt-list): List-style prompt. Can be used as a standalone prompt, or with a prompt system like… [more](https://github.com/enquirer/prompt-list) | [homepage](https://github.com/enquirer/prompt-list "List-style prompt. Can be used as a standalone prompt, or with a prompt system like [Enquirer].")
* [prompt-question](https://www.npmjs.com/package/prompt-question): Question object, used by Enquirer and prompt plugins. | [homepage](https://github.com/enquirer/prompt-question "Question object, used by Enquirer and prompt plugins.")
* [prompt-radio](https://www.npmjs.com/package/prompt-radio): Radio prompt. This prompt behaves like other radio-button interfaces, where only one choice is enabled… [more](https://github.com/enquirer/prompt-radio) | [homepage](https://github.com/enquirer/prompt-radio "Radio prompt. This prompt behaves like other radio-button interfaces, where only one choice is enabled whilst all others are disabled. Can be used as a standalone prompt, or with a prompt system like [Enquirer].")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.5.0, on April 12, 2017._