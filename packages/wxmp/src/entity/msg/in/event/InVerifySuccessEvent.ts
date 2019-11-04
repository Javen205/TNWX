/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 资质认证成功通知事件
 */
import { EventInMsg } from './EventInMsg';

export class InVerifySuccessEvent extends EventInMsg {
	//资质认证成功
	public static EVENT_IN_QUALIFICATION_VERIFY_SUCCESS: string = 'qualification_verify_success';
	//名称认证成功
	public static EVENT_IN_NAMING_VERIFY_SUCCESS: string = 'naming_verify_success';
	//年审通知
	public static EVENT_IN_ANNUAL_RENEW: string = 'annual_renew';
	//认证过期失效通知
	public static EVENT_IN_VERIFY_EXPIRED: string = 'verify_expired';

	private expiredTime: string;

	constructor(toUserName: string, fromUserName: string, createTime: number, event: string) {
		super(toUserName, fromUserName, createTime, event);
	}

	public get getExpiredTime(): string {
		return this.expiredTime;
	}

	public set setExpiredTime(expiredTime: string) {
		this.expiredTime = expiredTime;
	}
}
