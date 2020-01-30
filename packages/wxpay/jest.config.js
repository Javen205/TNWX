const base = require('../../jest.config')
module.exports = {
  ...base,
  name: 'wxpay',
  displayName: 'wxpay',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$'
}
