/**
 *  Created by Denis Abramyan (dennila2@ya.ru, dennila2@gmail.com)
 *  on 10.08.2020
 */
const assert = require('assert');
const { selectCase } = require('../select-case');


describe('props === Object', () => {
  describe('Check simple object', () => {
    const obj = {
      keyOne: 'Value-one',
      keyTwo: 'Value-two',
      default: 'default-value',
    };

    it('simple key present in object', () => {
      const resultChoice = selectCase(obj, 'keyOne');
      const expectedChoice = 'Value-one';

      assert.equal(resultChoice, expectedChoice);
    });

    it('key absent in object', () => {
      const resultChoice = selectCase(obj, 'none');
      const expectedChoice = 'default-value';

      assert.equal(resultChoice, expectedChoice);
    });

    it('key as array', () => {
      const resultChoice = selectCase(obj, ['none', 'keyTwo']);
      const expectedChoice = 'Value-two';

      assert.equal(resultChoice, expectedChoice);
    });
  });

  describe('Check complex object', () => {
    const obj = {
      [['keyOne', 'keyOnePlus']]: 'Value-one',
      [['keyTwo', 'keyTwoPlus']]: 'Value-two',
      ['default']: 'default-value',
    };

    it('simple key present in key arrays of object', () => {
      const resultChoice = selectCase(obj, 'keyOnePlus');
      const expectedChoice = 'Value-one';

      assert.equal(resultChoice, expectedChoice);
    });

    it('key present in object', () => {
      const resultChoice = selectCase(obj, 'keyTwo');
      const expectedChoice = 'Value-two';

      assert.equal(resultChoice, expectedChoice);
    });

    it('key absent in object', () => {
      const resultChoice = selectCase(obj, 'none');
      const expectedChoice = 'default-value';

      assert.equal(resultChoice, expectedChoice);
    });

    it('key as array', () => {
      const resultChoice = selectCase(obj, ['none', 'keyTwoPlus']);
      const expectedChoice = 'Value-two';

      assert.equal(resultChoice, expectedChoice);
    });
  });

  describe('without default', () => {
    const obj = {
      [['keyOne', 'keyOnePlus']]: 'Value-one',
      [['keyTwo', 'keyTwoPlus']]: 'Value-two',
    };

    it('absent key', () => {
      const resultChoice = selectCase(obj, ['none']);
      const expectedChoice = undefined;

      assert.strictEqual(resultChoice, expectedChoice);
    });

    it('absent fx', () => {
      const resultChoice = selectCase(obj, ['none'], { isFx: true });

      assert.equal(typeof resultChoice, 'function');
    });
  });
});

describe('props === Array', () => {
  const arr = [
    ['keyOne', 'Value-one'],
    [['keyTwo', 'keyTwoPlus'], 'Value-two'],
    [['default', 'foo'], 'default-value'],
  ];

  it('simple key present in array', () => {
    const resultChoice = selectCase(arr, 'keyOne');
    const expectedChoice = 'Value-one';

    assert.equal(resultChoice, expectedChoice);
  });

  it('key present in key array', () => {
    const resultChoice = selectCase(arr, 'keyTwoPlus');
    const expectedChoice = 'Value-two';

    assert.equal(resultChoice, expectedChoice);
  });

  it('key as array', () => {
    const resultChoice = selectCase(arr, ['none', 'keyTwo']);
    const expectedChoice = 'Value-two';

    assert.equal(resultChoice, expectedChoice);
  });

  it('key absent', () => {
    const resultChoice = selectCase(arr, ['none', 'none-2']);
    const expectedChoice = 'default-value';

    assert.equal(resultChoice, expectedChoice);
  });
});

describe('props === Map', () => {
  const map = new Map([
    ['keyOne', 'Value-one'],
    [['keyTwo', 'keyTwoPlus'], 'Value-two'],
    [['default', 'foo'], 'default-value'],
  ]);

  it('simple key present in array', () => {
    const resultChoice = selectCase(map, 'keyOne');
    const expectedChoice = 'Value-one';

    assert.equal(resultChoice, expectedChoice);
  });

  it('key present in key array', () => {
    const resultChoice = selectCase(map, 'keyTwoPlus');
    const expectedChoice = 'Value-two';

    assert.equal(resultChoice, expectedChoice);
  });

  it('key as array', () => {
    const resultChoice = selectCase(map, ['none', 'keyTwo']);
    const expectedChoice = 'Value-two';

    assert.equal(resultChoice, expectedChoice);
  });

  it('key absent', () => {
    const resultChoice = selectCase(map, ['none', 'none-2']);
    const expectedChoice = 'default-value';

    assert.equal(resultChoice, expectedChoice);
  });
});

