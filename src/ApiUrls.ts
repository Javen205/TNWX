export class ApiUrls {
    public static wxDomain = 'https://api.weixin.qq.com/'
    public static accessToken = '%scgi-bin/token?grant_type=client_credential&appid=%s&secret=%s'
    public static createMenu = '%scgi-bin/menu/create?access_token=%s'
    public static sendTemplate = '%scgi-bin/message/template/send?access_token=%s'
}


