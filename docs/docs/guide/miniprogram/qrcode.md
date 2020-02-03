# 小程序码

## 官方文档

[小程序码文档](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/qr-code/wxacode.createQRCode.html)

## 源码

[TNWX 中小程序码相关接口源码](https://gitee.com/javen205/TNWX/blob/master/packages/miniprogram/src/MiniProgramApi.ts#L180)


## 示例

```TypeScript
case 7:
    MiniProgramApi.getUnlimited('TNWX','IJPay?author=Javen')
        .then((data) => {
            //写入文件
            fs.writeFile('/Users/Javen/Downloads/miniprogram_qrcode.png', data, function(err){
                if(err){
                    res.send(err);
                }else{
                    res.send('保存成功');
                }
            });
        })
        .catch((error) => console.log(error))
    break;
case 8:
    MiniProgramApi.createQRCode('IJPay?author=Javen')
        .then((data) => {
            //写入文件
            fs.writeFile('/Users/Javen/Downloads/miniprogram_qrcode2.png', data, function(err){
                if(err){
                    res.send(err);
                }else{
                    res.send('保存成功');
                }
            });
        })
        .catch((error) => console.log(error))
    break;
case 9:
    MiniProgramApi.getWxAcode('IJPay?author=Javen')
        .then((data) => {
            //写入文件
            fs.writeFile('/Users/Javen/Downloads/miniprogram_qrcode3.png', data, function(err){
                if(err){
                    res.send(err);
                }else{
                    res.send('保存成功');
                }
            });
        })
        .catch((error) => console.log(error))
    break;
```