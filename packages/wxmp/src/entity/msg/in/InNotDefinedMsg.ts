/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 未知消息
 */
import { InMsg } from './InMsg';

export class InNotDefinedMsg extends InMsg {
	constructor(toUserName: string, fromUserName: string, createTime: number, msgType: string) {
		super(toUserName, fromUserName, createTime, msgType);
	}
}
