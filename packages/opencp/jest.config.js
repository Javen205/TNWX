const base = require('../../jest.config')
module.exports = {
  ...base,
  name: 'opencp',
  displayName: 'opencp',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$'
}
