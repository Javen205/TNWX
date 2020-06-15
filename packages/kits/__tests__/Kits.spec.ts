import { Kits, SIGN_TYPE } from '../src/Kits'

test('md5', () => {
  expect(Kits.md5('IJPay Java 聚合支付 SDK')).toBe('c16ed5db4570b8d7d85b734e64695976')
})

test('sha1', () => {
  expect(Kits.sha1('JPay 简易而不简单的支付 SDK')).toBe('203ea326f7533148736f0ab41ede1d9238d8aa2c')
})

test('hmacsha256', () => {
  expect(
    Kits.hmacsha256(
      'TNWX 微信系开发脚手架，支持微信公众号、微信支付、微信小游戏、微信小程序、微信企业号。同时也支持 Http 模块扩展，最最最重要的是能快速的集成至任何 Node.js 框架(Express、Nest、Egg、Koa 等)',
      'TNWX'
    )
  ).toBe('e6912c8797198bbf90dab5360127fd931d5f4f0161be0aa866f72e992f6c6dfb')
})

test('generateStr length is 32', () => {
  expect(Kits.generateStr()).toHaveLength(32)
})

test('aes128cbcDecrypt', () => {
  let signature = 'bc404eedffb75c8d3cf3346acaf92466a7a793a1'

  let rawData =
    '{"nickName":"Javen","gender":1,"language":"zh_CN","city":"Shenzhen","province":"Guangdong","country":"China","avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/icc2nhPAgI52Yx52hWXknQzYC122WeVIAoE1F9Tia3ZFmj8TUEr6M4rY10GDf4qTFT9RvdM3icDibq9BQ7kooYMW5g/132"}'
  let session_key = 'syOEZf6faXl3JqAKh9FfvQ=='

  let iv = 'wGZm1/t99wRHb4oiwDbybQ=='

  let encryptedData =
    'r9UTG7Yo3xlXZ1++2atDr/7So5b+GevtC4ZkxXeL+vCjYoMp50YB004IcCuPdbZlzd06Pvx0Yd6B92188ttbvkhCYb2uE8Wa8Nr1a/M72984gHj37TX4dX5f8/IMAXGqSPOMVjx14LZPMg8YDFYY5lUlYtHRvsOLl8zboZ9fR2B5+p3juPsnzyxuZZkUHYclRJ3qQzffZHMrelP7IHdMbUHVmsgpfwJc5Is6zhSpi/DKjHJxdIfHjl0wusP1Dy55WymSfxUfaEi63Fln9m8fUXF0mZprbFGl54sxKdabQuaQIL7aeETpMhNEmWBdtIetTuC3bkfBXLlW1b/JkUjBRdU2ZF4tRKHT24I6LnwfQMmXrEcbHA0JdU2CvU/TeF+iqYud4mgo115THVy76jxIPJXm65zbLuUVG6CvzOUSEOyWVSNQ7nbcwA3qrDiEuL4nYPusyoQpsZCxs+FUTEImmATD12R0/6Q1N557Ica59Wo='

  let key = new Buffer(session_key, 'base64')

  let baseIv = new Buffer(iv, 'base64')

  let signature2 = Kits.sha1(rawData + session_key)

  let ecrypt = Kits.aes128cbcDecrypt(key, baseIv, encryptedData)

  expect(signature2 == signature).toBeTruthy()
  expect(ecrypt).toBe(
    '{"openId":"oUikW0Tmx9FYrSDc7SGMYqWJMClo","nickName":"Javen","gender":1,"language":"zh_CN","city":"Shenzhen","province":"Guangdong","country":"China","avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/icc2nhPAgI52Yx52hWXknQzYC122WeVIAoE1F9Tia3ZFmj8TUEr6M4rY10GDf4qTFT9RvdM3icDibq9BQ7kooYMW5g/132","watermark":{"timestamp":1572162721,"appid":"wxf30d9b9b316d5de4"}}'
  )
})

test('generateSignedXml MD5', async () => {
  let reqObj = {
    author: 'Javen',
    IJPay: 'https://gitee.com/javen205/IJPay',
    TNWX: 'https://gitee.com/javen205/TNWX'
  }
  let key = 'CQtr0JyC4XiTPMXhxED93MsbcPM7zG83'

  let data = await Kits.generateSignedXml(reqObj, key, SIGN_TYPE.SIGN_TYPE_MD5)
  console.log(data)
  expect.assertions(1)
  return Kits.xml2obj(String(data)).then(obj => {
    expect(obj['sign']).toEqual('84EF80F8640E5C51CC9FE98C1F13F12D')
  })
})

test('generateSignedXml HMAC-SHA256', async () => {
  let reqObj = {
    author: 'Javen',
    IJPay: 'https://gitee.com/javen205/IJPay',
    TNWX: 'https://gitee.com/javen205/TNWX'
  }
  let key = 'CQtr0JyC4XiTPMXhxED93MsbcPM7zG83'

  let data = await Kits.generateSignedXml(reqObj, key, SIGN_TYPE.SIGN_TYPE_HMACSHA256)
  console.log(data)
  expect.assertions(1)
  return Kits.xml2obj(String(data)).then(obj => {
    expect(obj['sign']).toEqual('57658016342938AFDDB839E3FEE2600DE6FEBE049C19725DB3172DE8A44B8F54')
  })
})

test('aes256ecbEncrypt and aes256ecbDecrypt', () => {
  let iv = new Buffer('')
  let key = new Buffer('42cc1d91bab89b65ff55b19e28fff4f0')
  let data = 'IJPay'
  let encryptStr = Kits.aes256ecbEncrypt(key, iv, data)
  let eecryptStr = Kits.aes256ecbDecrypt(key, iv, encryptStr)

  expect(eecryptStr).toBe('IJPay')
})
