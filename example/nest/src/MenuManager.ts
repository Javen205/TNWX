import {
    Menu,
    ClickButton,
    ViewButton,
    ComButton
} from 'tnw';

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