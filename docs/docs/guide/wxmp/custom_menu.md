# 自定义菜单

## 简介

**TNWX: TypeScript + Node.js + WeiXin 微信系开发脚手架，支持微信公众号、微信支付、微信小游戏、微信小程序、企业号/企业微信。最最最重要的是能快速的集成至任何 Node.js 框架(Express、Nest、Egg、Koa 等)**


## 接口权限

[公众号接口权限说明](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1433401084)

[菜单规则以及按钮类型说明](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141013)



实现自定义菜单有两种方式

1. 编辑模式
2. 开发模式

## 编辑模式

登录 MP 平台，侧栏找到 `添加功能插件` 菜单并在插件库中找到 `自定义菜单` 插件添加后按照提示操作即可。

## 开发模式

开发模式下有两种实现方式但推荐使用第二种

1. 使用微信 [公众平台接口调试工具](http://mp.weixin.qq.com/debug/) 实现
2. 使用 [官方提供的接口](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141013) 实现



## TNWX 中实现方案

- 创建菜单
- 删除菜单
- 查询菜单
- 添加个性化菜单
- 删除个性化菜单
- 测试个性化菜单匹配结果



```typescript
export class MenuApi {

    private static createMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=%s'
    private static deleteMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=%s';
    private static getMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/get?access_token=s%';
    private static getSelfMenuInfoUrl = 'https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info?access_token=s%';

    private static addConditionalUrl = 'https://api.weixin.qq.com/cgi-bin/menu/addconditional?access_token=s%';
    private static delConditionalUrl = 'https://api.weixin.qq.com/cgi-bin/menu/delconditional?access_token=s%';
    private static tryMatchUrl = 'https://api.weixin.qq.com/cgi-bin/menu/trymatch?access_token=s%';


    /**
     * 创建菜单
     * @param response 
     * @param menuJson 
     */
    public static async create(menuJson: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.createMenuUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpPost(url, menuJson);
    }
    /**
     * 删除菜单
     * @param response 
     */
    public static async delete() {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.deleteMenuUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpGet(url);
    }
    /**
     * 查询菜单
     * @param response 
     */
    public static async get() {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.getMenuUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpGet(url);
    }
    public static async getCurrentSelfMenu() {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.getSelfMenuInfoUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpGet(url);
    }

    /**
     * 添加个性化菜单
     * @param response 
     * @param menuJson 
     */
    public static async addConditional(menuJson: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.addConditionalUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpPost(url, menuJson);
    }

    /**
     * 删除个性化菜单
     * @param response 
     */
    public static async deleteConditional() {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.delConditionalUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpGet(url);
    }
    /**
     * 测试个性化菜单匹配结果
     * @param response 
     * @param openId 
     */
    public static async tryMatch(openId: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.tryMatchUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify({
            "user_id": openId
        }));
    }
}
```



## 读取配置文件来创建菜单

```typescript
// 读取配置文件来创建自定义菜单
app.get('/creatMenu', (req: any, res: any) => {
    fs.readFile("./config/menu.json", function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        let fileData = data.toString();
        console.log(fileData);
        // res.send(fileData)
        MenuApi.create(fileData).then(data => {
            res.send(data);
        });
    });
});
```



## 动态创建自定义菜单



```typescript
app.get('/dynamicCreatMenu', (req: any, res: any) => {
    MenuApi.create(JSON.stringify(MenuManager.getMenu())).then(data => {
        res.send(data);
    });
});
```

### 菜单管理类

```typescript
export class MenuManager {

    static getMenu(): Menu {
        let btn11 = new ClickButton();
        btn11.setName = "微信相册发图";
        btn11.setType = "pic_weixin";
        btn11.setKey = "rselfmenu_1_1";

        let btn12 = new ClickButton();
        btn12.setName = "拍照或者相册发图";
        btn12.setType = "pic_photo_or_album";
        btn12.setKey = "rselfmenu_1_2";

        let btn13 = new ClickButton();
        btn13.setName = "系统拍照发图";
        btn13.setType = "pic_sysphoto";
        btn13.setKey = "rselfmenu_1_3";

        let btn21 = new ClickButton();
        btn21.setName = "扫码带提示";
        btn21.setType = "scancode_waitmsg";
        btn21.setKey = "rselfmenu_2_1";

        let btn22 = new ClickButton();
        btn22.setName = "扫码推事件";
        btn22.setType = "scancode_push";
        btn22.setKey = "rselfmenu_2_2";

        let btn23 = new ViewButton();
        btn23.setName = "Gitee";
        btn23.setType = "view";
        btn23.setUrl = "https://gitee.com/javen205";


        let btn31 = new ViewButton();
        btn31.setName = "IJPay";
        btn31.setType = "view";
        btn31.setUrl = "https://gitee.com/javen205/IJPay";

        let btn32 = new ClickButton();
        btn32.setName = "发送位置";
        btn32.setType = "location_select";
        btn32.setKey = "rselfmenu_3_2";

        let btn33 = new ViewButton();
        btn33.setName = "在线咨询";
        btn33.setType = "view";
        btn33.setUrl = "http://wpa.qq.com/msgrd?v=3&uin=572839485&site=qq&menu=yes";

        let btn34 = new ViewButton();
        btn34.setName = "我的博客";
        btn34.setType = "view";
        btn34.setUrl = "https://blog.javen.dev";

        let btn35 = new ClickButton();
        btn35.setName = "点击事件";
        btn35.setType = "click";
        btn35.setKey = "rselfmenu_3_5";

        let mainBtn1 = new ComButton();
        mainBtn1.setName = "发图";
        mainBtn1.setSubButton = [btn11, btn12, btn13];

        let mainBtn2 = new ComButton();
        mainBtn2.setName = "扫码";
        mainBtn2.setSubButton = [btn21, btn22, btn23];

        let mainBtn3 = new ComButton();
        mainBtn3.setName = "个人中心";
        mainBtn3.setSubButton = [btn31, btn32, btn33, btn34, btn35];
        let menu = new Menu();
        menu.setButton = [mainBtn1, mainBtn2, mainBtn3];

        return menu;
    }
}
```



### 封装实体类



```typescript

export class Menu {
    private button!: Button[];
    private matchrule!: Matchrule;

    public get getButton(): Button[] {
        return this.button;
    }
    public set setButton(button: Button[]) {
        this.button = button;
    }

    public get getMatchrule(): Matchrule {
        return this.matchrule;
    }
    public set setMatchrule(matchrule: Matchrule) {
        this.matchrule = matchrule;
    }
}

export class Button {
    private name: string;
    private type: string;

    constructor(name?: string, type?: string) {
        this.name = name || '';
        this.type = type || '';
    }

    public get getName(): string {
        return this.name;
    }
    public set setName(name: string) {
        this.name = name;
    }

    public get getType(): string {
        return this.type;
    }
    public set setType(type: string) {
        this.type = type;
    }
}


export class ClickButton extends Button {
    private key: string;

    constructor(name?: string, type?: string, key?: string) {
        super(name, type);
        this.key = key || '';
    }

    public get getKey(): string {
        return this.key;
    }
    public set setKey(key: string) {
        this.key = key;
    }
}


export class ComButton extends Button {
    private sub_button: Button[];

    constructor(name?: string, type?: string, sub_button?: Button[]) {
        super(name, type);
        this.sub_button = sub_button || [];
    }

    public get getSubButton(): Button[] {
        return this.sub_button;
    }
    public set setSubButton(sub_button: Button[]) {
        this.sub_button = sub_button;
    }
}


export class MediaButton extends Button {
    private media_id: string;

    constructor(name?: string, type?: string, media_id?: string) {
        super(name, type);
        this.media_id = media_id || '';
    }

    public get getMediaId(): string {
        return this.media_id;
    }
    public set setMediaId(media_id: string) {
        this.media_id = media_id;
    }
}

export class ViewButton extends Button {
    private url: string;

    constructor(name?: string, type?: string, url?: string) {
        super(name, type);
        this.url = url || '';
    }

    public get getUrl(): string {
        return this.url;
    }
    public set setUrl(url: string) {
        this.url = url;
    }
}

export class Matchrule {
    //用户分组id，可通过用户分组管理接口获取
    private tag_id!: string;
    //性别：男（1）女（2），不填则不做匹配
    private sex!: string;
    //国家信息
    private country!: string;
    //省份信息
    private province!: string;
    //城市信息
    private city!: string;
    //客户端版本，当前只具体到系统型号：IOS(1), Android(2),Others(3)，不填则不做匹配
    private client_platform_type!: string;
    //语言信息
    private language!: string;


    public get getTagId(): string {
        return this.tag_id;
    }

    public set setTagId(tag_id: string) {
        this.tag_id = tag_id;
    }

    public get getSex(): string {
        return this.sex;
    }

    public set setSex(sex: string) {
        this.sex = sex;
    }

    public get getCountry(): string {
        return this.country;
    }

    public set setCountry(country: string) {
        this.country = country;
    }

    public get getProvince(): string {
        return this.province;
    }

    public set setProvince(province: string) {
        this.province = province;
    }

    public get getCity(): string {
        return this.city;
    }

    public set setCity(city: string) {
        this.city = city;
    }

    public get getClientPlatformType(): string {
        return this.client_platform_type;
    }

    public set setClientPlatformType(client_platform_type: string) {
        this.client_platform_type = client_platform_type;
    }

    public get getLanguage(): string {
        return this.language;
    }

    public set setLanguage(language: string) {
        this.language = language;
    }

}
```

## Java 版本自定义菜单

[微信公众号开发之自定义菜单](https://www.jianshu.com/p/41ce83878f05)

## 开源推荐

- `TNWX` 微信公众号开发脚手架：<https://gitee.com/javen205/TNWX>
- `IJPay` 让支付触手可及：<https://gitee.com/javen205/IJPay>
- SpringBoot 微服务高效开发 `mica` 工具集：<https://gitee.com/596392912/mica>
- `Avue` 一款基于 vue 可配置化的神奇框架：<https://gitee.com/smallweigit/avue>
- `pig` 宇宙最强微服务（架构师必备）：<https://gitee.com/log4j/pig>
- `SpringBlade` 完整的线上解决方案（企业开发必备）：<https://gitee.com/smallc/SpringBlade>

 