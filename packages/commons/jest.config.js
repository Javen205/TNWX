const base = require('../../jest.config')
module.exports = {
  ...base,
  name: 'commons',
  displayName: 'commons',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$'
}
