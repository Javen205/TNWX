import { HttpKit } from './../src/HttpKit'

test('http get', async () => {
  let url = 'https://gitee.com/api/v5/repos/Javen205/TNWX'
  let data = await HttpKit.getHttpDelegate.httpGet(url)
  return expect(data['stargazers_count']).toBeGreaterThanOrEqual(117)
})
