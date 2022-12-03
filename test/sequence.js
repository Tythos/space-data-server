const { cwd } = require("process");

const Sequencer = require("@jest/test-sequencer").default;

class CustomSequencer extends Sequencer {
  sort(tests) {
    const copyTests = Array.from(tests).sort((testA, testB) =>
      testA.path > testB.path ? 1 : -1
    );
    return copyTests;
  }
}

module.exports = CustomSequencer;
