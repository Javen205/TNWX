# 素材管理

## 官方文档

[企业微信素材管理官方文档](https://work.weixin.qq.com/api/doc/90000/90135/91054)

## 源码

[TNWX-QyMediaApi](https://gitee.com/javen205/TNWX/blob/master/packages/wxcp/src/QyMediaApi.ts)

## 示例

```TypeScript
// 企业微信素材管理
app.get('/qyMediaApi', (req: any, res: any) => {
    let type: string = req.query.type;
    console.log('type', type);
    switch (parseInt(type)) {
        // 上传图片
        case 0:
            QyMediaApi.uploadImg('/Users/Javen/Documents/pic/1.jpeg')
                .then(data => {
                    console.log(data);
                    res.send(data);
                })
                .catch((error) => console.log(error));
            break;
        // 上传临时素材图片 media_id 仅三天内有效
        case 1:
            QyMediaApi.upload(QyMediaType.IMAGE,'/Users/Javen/Documents/pic/1.jpeg')
                .then(data => {
                    console.log(data);
                    res.send(data);
                })
                .catch((error) => console.log(error));
            break;
        // 上传临时素材文件 media_id 仅三天内有效
        case 2:
            QyMediaApi.upload(QyMediaType.FILE,'/Users/Javen/Documents/TNW/TNW-Menu.md')
                .then(data => {
                    console.log(data);
                    res.send(data);
                })
                .catch((error) => console.log(error));
            break;
        // 获取临时素材
        case 3:
            QyMediaApi.get('39Cnt6IuBjBh-z1kWk7iY5EFoYuptkowMvT_r0yRM4Rk')
                .then(data => {
                    console.log(data);
                    res.send(data);
                })
                .catch((error) => console.log(error));
            break;
        default:
            break;
    }
});
```