import { ClickButton } from './ClickButton';
import { ViewButton } from './ViewButton';
import { ComButton } from './ComButton';
import { Menu } from './Menu';


export class MenuManager {

    static getMenu(): Menu {
        let btn11 = new ClickButton();
        btn11.Name = "微信相册发图";
        btn11.Type = "pic_weixin";
        btn11.Key = "rselfmenu_1_1";

        let btn12 = new ClickButton();
        btn12.Name = "拍照或者相册发图";
        btn12.Type = "pic_photo_or_album";
        btn12.Key = "rselfmenu_1_2";

        let btn13 = new ClickButton();
        btn13.Name = "系统拍照发图";
        btn13.Type = "pic_sysphoto";
        btn13.Key = "rselfmenu_1_3";

        let btn21 = new ClickButton();
        btn21.Name = "扫码带提示";
        btn21.Type = "scancode_waitmsg";
        btn21.Key = "rselfmenu_2_1";

        let btn22 = new ClickButton();
        btn22.Name = "扫码推事件";
        btn22.Type = "scancode_push";
        btn22.Key = "rselfmenu_2_2";

        let btn23 = new ViewButton();
        btn23.Name = "Gitee";
        btn23.Type = "view";
        btn23.Url = "https://gitee.com/javen205";


        let btn31 = new ViewButton();
        btn31.Name = "IJPay";
        btn31.Type = "view";
        btn31.Url = "https://gitee.com/javen205/IJPay";

        let btn32 = new ClickButton();
        btn32.Name = "发送位置";
        btn32.Type = "location_select";
        btn32.Key = "rselfmenu_3_2";

        let btn33 = new ViewButton();
        btn33.Name = "在线咨询";
        btn33.Type = "view";
        btn33.Url = "http://wpa.qq.com/msgrd?v=3&uin=572839485&site=qq&menu=yes";

        let btn34 = new ViewButton();
        btn34.Name = "我的博客";
        btn34.Type = "view";
        btn34.Url = "https://blog.javen.dev";

        let btn35 = new ClickButton();
        btn35.Name = "点击事件";
        btn35.Type = "click";
        btn35.Key = "rselfmenu_3_5";

        let mainBtn1 = new ComButton();
        mainBtn1.Name = "发图";
        mainBtn1.subButton = [btn11, btn12, btn13];

        let mainBtn2 = new ComButton();
        mainBtn2.Name = "扫码";
        mainBtn2.subButton = [btn21, btn22, btn23];

        let mainBtn3 = new ComButton();
        mainBtn3.Name = "个人中心";
        mainBtn3.subButton = [btn31, btn32, btn33, btn34, btn35];
        let menu = new Menu();
        menu.Button = [mainBtn1, mainBtn2, mainBtn3];

        return menu;
    }
}