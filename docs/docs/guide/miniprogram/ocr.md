# OCR 识别

## 官方文档

[OCR 识别官方文档](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/ocr/ocr.bankcard.html)

## 源码

[TNWX 中 OCR 识别相关接口源码](https://gitee.com/javen205/TNWX/blob/master/packages/miniprogram/src/OCRApi.ts)

## 示例

```TypeScript
app.get('/ocr', async (req: any, res: any) => {

    let type: string = req.query.type;

    console.log('to ocr...' + type);

    switch (parseInt(type)) {
        case 1:
            OCRApi.ocrByUrl(OCRType.IDCARD,'https://up.enterdesk.com/edpic_360_360/28/bc/80/28bc80d62c84ea7797197a6d7cb03394.jpg')
                .then((data) => {
                    res.send(data);
                })
                .catch((error) => console.log(error))
            break;
        case 2:
            OCRApi.ocrByUrl(OCRType.PRINTEDTEXT,'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1724603202,554806693&fm=26&gp=0.jpg')
                .then((data) => {
                    res.send(data);
                })
                .catch((error) => console.log(error))
            break;
        case 3:
            OCRApi.ocrByFile(OCRType.PRINTEDTEXT,'/Users/Javen/Downloads/miniprogram_qrcode2.png')
                .then((data) => {
                    res.send(data);
                })
                .catch((error) => console.log(error))
            break;
        default:
            break
    }

});
```
