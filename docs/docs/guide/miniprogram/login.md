# 登录

## 获取 code

```JavaScript
wx.login({
    success: res => {
    console.log(res);
    }
})   
```

## 登录凭证校验

```TypeScript
MiniProgramApi.code2Session(ApiConfigKit.getAppId, ApiConfigKit.getApiConfig.getAppScrect, code)
    .then((data) => {
        res.send(data);
    }).catch((error) => console.log(error))
```

## 获取用户信息 

```JavaScript
wx.getUserInfo({
    withCredentials: true,
    success: res=>{
    console.log(res);
    }
})  
```

签证签名并解密 encryptedData 

```TypeScript
signature = 'bc404eedffb75c8d3cf3346acaf92466a7a793a1';
let rawData = '{"nickName":"Javen","gender":1,"language":"zh_CN","city":"Shenzhen","province":"Guangdong","country":"China","avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/icc2nhPAgI52Yx52hWXknQzYC122WeVIAoE1F9Tia3ZFmj8TUEr6M4rY10GDf4qTFT9RvdM3icDibq9BQ7kooYMW5g/132"}';
let session_key = 'syOEZf6faXl3JqAKh9FfvQ==';
let iv = 'wGZm1/t99wRHb4oiwDbybQ==';
let encryptedData = 'r9UTG7Yo3xlXZ1++2atDr/7So5b+GevtC4ZkxXeL+vCjYoMp50YB004IcCuPdbZlzd06Pvx0Yd6B92188ttbvkhCYb2uE8Wa8Nr1a/M72984gHj37TX4dX5f8/IMAXGqSPOMVjx14LZPMg8YDFYY5lUlYtHRvsOLl8zboZ9fR2B5+p3juPsnzyxuZZkUHYclRJ3qQzffZHMrelP7IHdMbUHVmsgpfwJc5Is6zhSpi/DKjHJxdIfHjl0wusP1Dy55WymSfxUfaEi63Fln9m8fUXF0mZprbFGl54sxKdabQuaQIL7aeETpMhNEmWBdtIetTuC3bkfBXLlW1b/JkUjBRdU2ZF4tRKHT24I6LnwfQMmXrEcbHA0JdU2CvU/TeF+iqYud4mgo115THVy76jxIPJXm65zbLuUVG6CvzOUSEOyWVSNQ7nbcwA3qrDiEuL4nYPusyoQpsZCxs+FUTEImmATD12R0/6Q1N557Ica59Wo=';
let key = Buffer.from(session_key, 'base64');
let baseIv = Buffer.from(iv, 'base64');

let signature2 = Kits.sha1(rawData + session_key);

if (signature2 === signature) {
    let ecrypt = Kits.aes128cbcDecrypt(key, baseIv, encryptedData);
    res.send(ecrypt);
} else {
    res.send('签名错误');
}

```