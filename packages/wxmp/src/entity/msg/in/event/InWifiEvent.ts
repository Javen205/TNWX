/**
 * @author Javen
 * @copyright javendev@126.com
 * @description wifi连网后下发消息
 */
import { EventInMsg } from './EventInMsg'

export class InWifiEvent extends EventInMsg {
  public static EVENT: string = 'WifiConnected'
  private connectTime: string
  private expireTime: string
  private vendorId: string
  private shopId: string
  private deviceNo: string

  public get getConnectTime(): string {
    return this.connectTime
  }

  public set setConnectTime(connectTime: string) {
    this.connectTime = connectTime
  }

  public get getExpireTime(): string {
    return this.expireTime
  }

  public set setExpireTime(expireTime: string) {
    this.expireTime = expireTime
  }

  public get getVendorId(): string {
    return this.vendorId
  }

  public set setVendorId(vendorId: string) {
    this.vendorId = vendorId
  }

  public get getShopId(): string {
    return this.shopId
  }

  public set setShopId(shopId: string) {
    this.shopId = shopId
  }

  public get getDeviceNo(): string {
    return this.deviceNo
  }

  public set setDeviceNo(deviceNo: string) {
    this.deviceNo = deviceNo
  }
}
