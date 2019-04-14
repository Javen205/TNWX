import { InMsg } from "../InMsg";

export class InShakearoundUserShakeEvent extends InMsg {
    private event!: string;//事件
    private uuid!: string;
    private major!: number;
    private minor!: number;
    private distance!: number;//设备与用户的距离（浮点数；单位：米）
    private aroundBeaconList!: AroundBeacon[];

    constructor(toUserName: string, fromUserName: string, createTime: number, msgType: string) {
        super(toUserName, fromUserName, createTime, msgType);
    }

    public get getEvent(): string {
        return this.event;
    }
    public set setEvent(event: string) {
        this.event = event;
    }

    public get getUuid(): string {
        return this.uuid;
    }
    public set setUuid(uuid: string) {
        this.uuid = uuid;
    }

    public get getMajor(): number {
        return this.major;
    }
    public set setMajor(major: number) {
        this.major = major;
    }

    public get getMinor(): number {
        return this.minor;
    }
    public set setMinor(minor: number) {
        this.minor = minor;
    }

    public get getDistance(): number {
        return this.distance;
    }
    public set setDistance(distance: number) {
        this.distance = distance;
    }

    public get getAroundBeaconList(): AroundBeacon[] {
        return this.aroundBeaconList;
    }
    public set setAroundBeaconList(aroundBeaconList: AroundBeacon[]) {
        this.aroundBeaconList = aroundBeaconList;
    }
}

export class AroundBeacon {
    private uuid: string;
    private major: number;
    private minor: number;
    private distance: number;//设备与用户的距离（浮点数；单位：米）

    constructor(uuid: string, major: number, minor: number, distance: number) {
        this.uuid = uuid;
        this.major = major;
        this.minor = minor;
        this.distance = distance;
    }
}