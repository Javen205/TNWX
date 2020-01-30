const base = require('../../jest.config')
module.exports = {
  ...base,
  name: 'wxmp',
  displayName: 'wxmp',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$'
}
