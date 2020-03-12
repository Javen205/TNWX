const base = require('../../jest.config')
module.exports = {
  ...base,
  name: 'openmp',
  displayName: 'openmp',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$'
}
