const base = require('../../jest.config')
module.exports = {
  ...base,
  name: 'kits',
  displayName: 'kits',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$'
}
