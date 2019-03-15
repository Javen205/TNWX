export class Matchrule {
    //用户分组id，可通过用户分组管理接口获取
    private group_id!: string;
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


}