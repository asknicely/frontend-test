const getOrdinalSuffix = require('../web/tools/OrdinalSuffix');

test('adds st ordinal suffix to 1', () => {
  expect(getOrdinalSuffix(1)).not.toBe("2nd");
  expect(getOrdinalSuffix(1)).toBe("1st");
});