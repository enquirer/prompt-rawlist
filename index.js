'use strict';

var util = require('util');
var log = require('log-utils');
var Prompt = require('prompt-base');
var Paginator = require('terminal-paginator');
var isNumber = require('is-number');

/**
 * Constructor
 */

function RawList(question, answers, rl) {
  if (!(this instanceof RawList)) {
    return new RawList(question, answers, rl);
  }
  Prompt.apply(this, arguments);

  if (!this.choices) {
    throw new TypeError('expected "options.choices" to be an object or array');
  }

  this.selected = 0;
  this.question.validate = function(val) {
    return val != null;
  };

  var idx = this.question.default;
  if (isNumber(idx) && idx >= 0 && idx < this.question.choices.realLength) {
    this.selected = idx;
  }

  // Make sure no default is set (so it won't be printed)
  this.question.default = null;
  this.paginator = new Paginator();
}

/**
 * Inherit `Prompt`
 */

util.inherits(RawList, Prompt);

/**
 * Start the prompt session
 * @param  {Function} `cb` Callback when prompt is finished
 * @return {Object} Returns the `RawList` instance
 */

RawList.prototype.ask = function(cb) {
  this.callback = cb;
  this.only('line', this.onEnter.bind(this));
  this.only('keypress', this.onKeypress.bind(this));
  this.render();
  return this;
};

/**
 * Render the prompt to the terminal
 */

RawList.prototype.render = function(error) {
  var append = error ? (append = '\n' + log.red('>> ') + error) : '';
  var message = this.message;

  if (this.status === 'answered') {
    message += log.cyan(this.answer);
  } else {
    var choicesStr = renderChoices(this.question.choices.items, this.selected);
    message += this.paginator.paginate(choicesStr, this.selected, this.options.pageSize);
    message += '\n  Answer: ';
  }

  message += this.rl.line;
  this.ui.render(message, append);
};

/**
 * When user presses a key
 */

RawList.prototype.onKeypress = function() {
  var idx = this.rl.line.length ? Number(this.rl.line) - 1 : 0;
  if (this.question.choices.getChoice(idx)) {
    this.selected = idx;
  } else {
    this.selected = undefined;
    this.render('invalid option');
    return;
  }
  this.render();
};

/**
 * When user presses the `enter` key
 */

RawList.prototype.onEnter = function(idx) {
  var input = this.question.choices.getChoice(idx - 1);
  if (typeof input === 'undefined' || input.value === 'help' || !input.value) {
    return this.onError(input);
  }
  this.answer = this.getAnswer(input);
  this.status = 'answered';
  this.submitAnswer();
};

/**
 * When `error` is emitted.
 */

RawList.prototype.onError = function() {
  this.render('Please enter a valid index');
};

/**
 * Get the answer value.
 */

RawList.prototype.getAnswer = function(input) {
  return input.value;
};

/**
 * Function for rendering checkbox choices
 * @param {Array} `choices` Array of choice objects
 * @param {Number} `idx` Position of the pointer
 * @return {String} Rendered content
 */

function renderChoices(choices, idx) {
  var separatorOffset = 0;
  var output = '';

  choices.forEach(function(choice, i) {
    output += '\n  ';

    if (choice.type === 'separator') {
      separatorOffset++;
      output += ' ' + choice;
      return;
    }

    var num = i - separatorOffset;
    var display = formatNumber(num, choice.name);
    if (num === idx) {
      display = log.cyan(display);
    }
    output += display;
  });
  return output;
}

/**
 * Format the list numbers: "1) foo"
 */

function formatNumber(idx, choiceName) {
  return (idx + 1) + ') ' + choiceName;
}

/**
 * Module exports
 */

module.exports = RawList;
