const base = require('../../jest.config')
module.exports = {
  ...base,
  name: 'wxcp',
  displayName: 'wxcp',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$'
}
