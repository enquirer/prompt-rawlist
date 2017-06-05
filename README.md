# prompt-rawlist [![NPM version](https://img.shields.io/npm/v/prompt-rawlist.svg?style=flat)](https://www.npmjs.com/package/prompt-rawlist) [![NPM monthly downloads](https://img.shields.io/npm/dm/prompt-rawlist.svg?style=flat)](https://npmjs.org/package/prompt-rawlist) [![NPM total downloads](https://img.shields.io/npm/dt/prompt-rawlist.svg?style=flat)](https://npmjs.org/package/prompt-rawlist) [![Linux Build Status](https://img.shields.io/travis/enquirer/prompt-rawlist.svg?style=flat&label=Travis)](https://travis-ci.org/enquirer/prompt-rawlist)

> Rawlist prompt. Can be used as a standalone prompt, or with a prompt system like [Enquirer](http://enquirer.io).

![prompt-rawlist example](https://raw.githubusercontent.com/enquirer/prompt-rawlist/master/docs/example.gif)

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save prompt-rawlist
```

## Usage

```js
var RawList = require('prompt-rawlist');
var prompt = new RawList({
  name: 'colors',
  message: 'Favorite flavor?',
  choices: [
    'chocolate',
    'strawberry',
    'vanilla'
  ]
});

// async
prompt.ask(function(answer) {
  console.log(answer);
  // chocolate
});

// promise
prompt.run()
  .then(function(answer) {
    console.log(answer);
    // chocolate
  });
```

## Enquirer usage

Register as a plugin with [enquirer](http://enquirer.io):

```js
var Enquirer = require('enquirer');
var enquirer = new Enquirer();
enquirer.register('rawlist', require('prompt-rawlist'));
```

### Declarative format

Define questions using a declarative style, similar to Inquirer.

```js
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

### Expressive format

Register questions using enquirer's `.question` method:

```js
enquirer.question('dinner', {
  type: 'rawlist',
  message: 'What would you like to do?',
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

## Attribution

Originally based on the `rawlist` prompt in [inquirer](https://github.com/sboudrias/Inquirer.js).

## About

### Related projects

* [prompt-base](https://www.npmjs.com/package/prompt-base): Base prompt module used for creating custom prompts. | [homepage](https://github.com/enquirer/prompt-base "Base prompt module used for creating custom prompts.")
* [prompt-checkbox](https://www.npmjs.com/package/prompt-checkbox): Multiple-choice/checkbox prompt. Can be used standalone or with a prompt system like [Enquirer](http://enquirer.io). | [homepage](https://github.com/enquirer/prompt-checkbox "Multiple-choice/checkbox prompt. Can be used standalone or with a prompt system like [Enquirer].")
* [prompt-confirm](https://www.npmjs.com/package/prompt-confirm): Confirm (yes/no) prompt. Can be used standalone or with a prompt system like [Enquirer](http://enquirer.io). | [homepage](https://github.com/enquirer/prompt-confirm "Confirm (yes/no) prompt. Can be used standalone or with a prompt system like [Enquirer].")
* [prompt-list](https://www.npmjs.com/package/prompt-list): List-style prompt. Can be used as a standalone prompt, or with a prompt system like… [more](https://github.com/enquirer/prompt-list) | [homepage](https://github.com/enquirer/prompt-list "List-style prompt. Can be used as a standalone prompt, or with a prompt system like [enquirer].")
* [prompt-question](https://www.npmjs.com/package/prompt-question): Question object, used by Enquirer and prompt plugins. | [homepage](https://github.com/enquirer/prompt-question "Question object, used by Enquirer and prompt plugins.")
* [prompt-radio](https://www.npmjs.com/package/prompt-radio): Radio prompt. Can be used as a standalone prompt, or as a plugin for [Enquirer](http://enquirer.io). | [homepage](https://github.com/enquirer/prompt-radio "Radio prompt. Can be used as a standalone prompt, or as a plugin for [Enquirer].")

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

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on June 04, 2017._