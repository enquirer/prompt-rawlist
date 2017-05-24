'use strict';

require('mocha');
var assert = require('assert');
var Prompt = require('..');
var prompt;
var unmute;

describe('.run', function() {
  beforeEach(function() {
    prompt = new Prompt({
      name: 'color',
      message: 'What colors do you like?',
      choices: ['red', 'green', 'blue']
    });

    unmute = prompt.mute();
  });

  afterEach(function() {
    unmute();
  });

  it('should return an answers object on ask', function(cb) {
    prompt.on('ask', function() {
      prompt.rl.input.emit('keypress', '1');
      prompt.rl.input.emit('keypress', '\n');
    });

    prompt.ask(function(answer) {
      assert.deepEqual(answer, 'red');
      cb();
    });
  });
});
