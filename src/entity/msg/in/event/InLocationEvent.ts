import { EventInMsg } from "./EventInMsg";

export class InLocationEvent extends EventInMsg {
    public static EVENT: string = "LOCATION";

    private latitude!: string;
    private longitude!: string;
    private precision!: string;

    constructor(toUserName: string, fromUserName: string, createTime: number, event: string) {
        super(toUserName, fromUserName, createTime, event);
    }

    public get getLatitude(): string {
        return this.latitude;
    }

    public set setLatitude(latitude: string) {
        this.latitude = latitude;
    }

    public get getLongitude(): string {
        return this.longitude;
    }

    public set setLongitude(longitude: string) {
        this.longitude = longitude;
    }

    public get getPrecision(): string {
        return this.precision;
    }

    public set setPrecision(precision: string) {
        this.precision = precision;
    }
}