/**
 * `rawlist` type prompt
 */

var util = require('util');
var BasePrompt = require('enquirer-prompt');
var Separator = require('enquirer-separator');
var Paginator = require('terminal-paginator');
var isNumber = require('is-number');
var log = require('log-utils');

/**
 * Constructor
 */

function Prompt() {
  BasePrompt.apply(this, arguments);

  if (!this.question.choices) {
    throw new TypeError('expected choices to be an array');
  }

  this.question.validChoices = this.question.choices.filter(Separator.exclude);
  this.rawDefault = 0;
  this.selected = 0;

  this.question.validate = function(val) {
    return val != null;
  };

  var idx = this.question.default;
  if (isNumber(idx) && idx >= 0 && idx < this.question.choices.realLength) {
    this.selected = this.rawDefault = idx;
  }

  // Make sure no default is set (so it won't be printed)
  this.question.default = null;
  this.paginator = new Paginator();
}

/**
 * Inherit `BasePrompt`
 */

util.inherits(Prompt, BasePrompt);

/**
 * Start the prompt session
 * @param  {Function} `cb` Callback when prompt is finished
 * @return {Object} Returns the `Prompt` instance
 */

Prompt.prototype.ask = function(cb) {
  var self = this;
  this.callback = cb;

  this.ui.on('line', function(e) {
    var event = self.getCurrentValue(e);
    if (!event || event.value === 'help' || !event.value) {
      self.onError(event);
    } else {
      self.onSubmit(event);
    }
  });

  this.ui.on('keypress', this.onKeypress.bind(this));
  this.render();
  return this;
};

/**
 * Render the prompt to the terminal
 */

Prompt.prototype.render = function(error) {
  var message = this.message;
  var append = error ? (append = '\n' + log.red('>> ') + error) : '';

  if (this.status === 'answered') {
    message += log.cyan(this.answer);
  } else {
    var choicesStr = renderChoices(this.question.choices, this.selected);
    message += this.paginator.paginate(choicesStr, this.selected, this.question.pageSize);
    message += '\n  Answer: ';
  }

  message += this.rl.line;
  this.ui.render(message, append);
};

/**
 * When user press a key
 */

Prompt.prototype.onKeypress = function() {
  var idx = this.rl.line.length ? Number(this.rl.line) - 1 : 0;
  if (this.question.choices.getChoice(idx)) {
    this.selected = idx;
  } else {
    this.selected = undefined;
  }
  this.render();
};

/**
 * When user presses the `enter` key
 */

Prompt.prototype.onSubmit = function(state) {
  this.status = 'answered';
  this.answer = state.value;
  this.render();
  this.ui.write();
  this.callback(state.value);
};

/**
 * When `error` is emitted.
 */

Prompt.prototype.onError = function() {
  this.render('Please enter a valid index');
};

/**
 * Get the currently defined value
 */

Prompt.prototype.getCurrentValue = function(input) {
  if (!input) {
    input = this.rawDefault;
  } else if (isNumber(input)) {
    input -= 1;
  } else {
    return {isValid: false, value: null};
  }
  var choice = this.question.choices.getChoice(input);
  return choice || {isValid: false, value: null};
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

    var index = i - separatorOffset;
    var display = (index + 1) + ') ' + choice.name;
    if (index === idx) {
      display = log.cyan(display);
    }
    output += display;
  });

  return output;
}

/**
 * Module exports
 */

module.exports = Prompt;
