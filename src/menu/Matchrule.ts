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


    public get getGroupId(): string {
        return this.group_id;
    }

    public set setGroupId(group_id: string) {
        this.group_id = group_id;
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