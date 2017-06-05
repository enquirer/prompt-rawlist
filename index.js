'use strict';

var Prompt = require('prompt-list');
var isNumber = require('is-number');
var cyan = require('ansi-cyan');
var dim = require('ansi-dim');
var red = require('ansi-red');

/**
 * Constructor
 */

function RawList(question, answers, rl) {
  Prompt.apply(this, arguments);
  var prompt = this;

  this.choices.paginator.footer = '';
  this.options.footer = dim('\n(Move up and down to reveal more choices)');
  this.errorMessage = red('  >> Please enter a valid index');
  this.rawDefault = 0;

  if (this.choices.isValidIndex(this.question.default)) {
    this.position = this.rawDefault = Number(this.question.default);
    this.question.default = null;
    this.initialDefault = null;
  }

  if (typeof this.options.validate !== 'function') {
    this.options.validate = function(val) {
      this.rl.history = [];
      if (this.status !== 'submitted') {
        return true;
      }
      return val != null;
    };
  }

  this.on('render', function(context) {
    if (context.status !== 'answered') {
      context.message += '\n  Answer: ' + prompt.rl.line;
      context.message += prompt.options.footer;
    }
    if (context.status === 'interacted') {
      prompt.options.footer = '';
    }
  });

  this.action('number', function(pos) {
    if (prompt.rl.line === '') {
      return this.position(pos);
    }
    var n = Number(prompt.rl.line) - 1;
    if (this.choices.isValidIndex(n)) {
      return n;
    }
    return -1;
  });

  this.choices.options.format = function(line) {
    line = this.index + 1 + ') ' + line;
    return this.position === this.index ? cyan(line) : line;
  };
}

/**
 * Inherit `Prompt`
 */

Prompt.extend(RawList);

/**
 * Render the answer value
 */

RawList.prototype.renderAnswer = function(input) {
  return cyan(this.answer);
};

/**
 * Get the selected answer
 * @param {String} `input`
 * @param {Object} `key`
 */

RawList.prototype.getAnswer = function(input, key) {
  if (key && key.name === 'line') {
    if (key.value === '') {
      input = this.position;
    } else if (isNumber(key.value)) {
      input = Number(key.value) - 1;
    } else if (input.trim()) {
      return (this.answer = this.choices.key(input));
    }

    if (input <= this.choices.length && input >= 0) {
      return (this.answer = this.choices.key(input));
    }
  }
};

/**
 * Module exports
 */

module.exports = RawList;
