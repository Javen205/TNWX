/**
 * @author Javen 
 * @copyright 2019-03-23 javendev@126.com 
 * @description 微信小店订单支付成功接口消息
 */
import { EventInMsg } from "../event/EventInMsg";

export class InMerChantOrderEvent extends EventInMsg {
    public static EVENT: string = "merchant_order";

    private orderId!: string;
    private orderStatus!: number;
    private productId!: string;
    private skuInfo!: string;

    constructor(toUserName: string, fromUserName: string, createTime: number, msgType: string) {
        super(toUserName, fromUserName, createTime, msgType);
    }

    public get getOrderId(): string {
        return this.orderId;
    }

    public set setOrderId(orderId: string) {
        this.orderId = orderId;
    }

    public get getOrderStatus(): number {
        return this.orderStatus;
    }

    public set setOrderStatus(orderStatus: number) {
        this.orderStatus = orderStatus;
    }

    public get getProductId(): string {
        return this.productId;
    }

    public set setProductId(productId: string) {
        this.productId = productId;
    }

    public get getSkuInfo(): string {
        return this.skuInfo;
    }

    public set setSkuInfo(skuInfo: string) {
        this.skuInfo = skuInfo;
    }
}