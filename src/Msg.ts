export class Msg {

    static txtMsg(toUser: string, fromUser: string, content: string): string {
        let xmlContent = "<xml><ToUserName><![CDATA[" + toUser + "]]></ToUserName>";
        xmlContent += "<FromUserName><![CDATA[" + fromUser + "]]></FromUserName>";
        xmlContent += "<CreateTime>" + new Date().getTime() + "</CreateTime>";
        xmlContent += "<MsgType><![CDATA[text]]></MsgType>";
        xmlContent += "<Content><![CDATA[" + content + "]]></Content></xml>";
        return xmlContent;
    }

    static articleMsg(toUser: string, fromUser: string, articleArr): string {
        var xmlContent = "<xml><ToUserName><![CDATA[" + toUser + "]]></ToUserName>";
        xmlContent += "<FromUserName><![CDATA[" + fromUser + "]]></FromUserName>";
        xmlContent += "<CreateTime>" + new Date().getTime() + "</CreateTime>";
        xmlContent += "<MsgType><![CDATA[news]]></MsgType>";
        xmlContent += "<ArticleCount>" + articleArr.length + "</ArticleCount>";
        xmlContent += "<Articles>";
        articleArr.map(function (item, index) {
            xmlContent += "<item>";
            xmlContent += "<Title><![CDATA[" + item.title + "]]></Title>";
            xmlContent += "<Description><![CDATA[" + item.description + "]]></Description>";
            xmlContent += "<PicUrl><![CDATA[" + item.picUrl + "]]></PicUrl>";
            xmlContent += "<Url><![CDATA[" + item.url + "]]></Url>";
            xmlContent += "</item>";
        });
        xmlContent += "</Articles></xml>";
        return xmlContent;
    }
}