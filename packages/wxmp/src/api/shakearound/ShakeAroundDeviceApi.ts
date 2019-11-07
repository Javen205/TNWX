/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 微信摇一摇 设备管理
 */
import * as util from 'util';
import { AccessToken, AccessTokenApi } from '@tnwx/accesstoken';
import { HttpKit } from '@tnwx/kits';

export class ShakeAroundDeviceApi {
	private static applyIdUrl: string = 'https://api.weixin.qq.com/shakearound/device/applyid?access_token=%s';

	/**
	 *  申请设备ID
	 *  @param quantity 申请的设备ID的数量，单次新增设备超过500个，需走人工审核流程
	 *  @param applyReason 申请理由，不超过100个汉字或200个英文字母
	 *  @param comment 备注，不超过15个汉字或30个英文字母
	 *  @param poiId 设备关联的门店ID，关联门店后，在门店1KM的范围内有优先摇出信息的机会。门店相关信息具体可 查看门店相关的接口文档
	 */
	public static async applyId(quantity: number, applyReason: string, comment?: string, poiId?: number) {
		let map = new Map<string, any>();
		map.set('quantity', quantity);
		map.set('apply_reason', applyReason);
		if (comment) map.set('comment', comment);
		if (poiId) map.set('poi_id', poiId);
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.applyIdUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify(map));
	}
	private static applyStatusUrl: string = 'https://api.weixin.qq.com/shakearound/device/applystatus?access_token=%s';
	/**
	 *  查询设备ID申请审核状态
	 *  @param applyId 批次ID，申请设备ID时所返回的批次ID
	 */
	public static async getApplyStatus(applyId: number) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.applyStatusUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				apply_id: applyId
			})
		);
	}

	private static updateUrl: string = 'https://api.weixin.qq.com/shakearound/device/update?access_token=%s';
	/**
	 *  编辑设备的备注信息
	 *  @param deviceIdentifier 可用设备ID或完整的UUID、Major、Minor指定设备，二者选其一。
	 *  @param comment 	设备的备注信息，不超过15个汉字或30个英文字母。
	 */
	public static async updateDeviceInfo(deviceIdentifier: DeviceIdentifier, comment: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.updateUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				device_identifier: deviceIdentifier,
				comment: comment
			})
		);
	}

	private static bindLocationUrl: string = 'https://api.weixin.qq.com/shakearound/device/bindlocation?access_token=%s';
	/**
	 *  配置设备与门店的关联关系
	 *  @param deviceIdentifier 指定的设备ID
	 *  @param poiId 设备关联的门店ID，关联门店后，在门店1KM的范围内有优先摇出信息的机会。当值为0时，将清除设备已关联的门店ID。门店相关信息具体可 查看门店相关的接口文档
	 *  @param type 为1时，关联的门店和设备归属于同一公众账号； 为2时，关联的门店为其他公众账号的门店
	 *  @param poiAppid 当Type为2时，必填。关联门店所归属的公众账号的APPID
	 */
	public static async bindLocation(
		deviceIdentifier: DeviceIdentifier,
		poiId: number,
		type: number = 1,
		poiAppid?: string
	) {
		let map = new Map<string, any>();
		map.set('device_identifier', deviceIdentifier);
		map.set('poi_id', poiId);
		if (type == 2) {
			map.set('type', 2);
			if (poiAppid) map.set('poi_appid', poiAppid);
		}
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.bindLocationUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify(map));
	}

	private static searchUrl: string = 'https://api.weixin.qq.com/shakearound/device/search?access_token=%s';
	/**
	 *  查询设备列表
	 *  @param deviceIdentifier 指定的设备ID
	 */
	public static async searchByDevice(deviceIdentifier: DeviceIdentifier) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.searchUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				device_identifiers: deviceIdentifier,
				type: 1
			})
		);
	}
	/**
	 *  需要分页查询或者指定范围内的设备时
	 *  @param lastSeen 	前一次查询列表末尾的设备ID ， 第一次查询last_seen 为0
	 *  @param count 待查询的设备数量，不能超过50个
	 */
	public static async searchPage(lastSeen: number, count: number) {
		if (lastSeen < 0) lastSeen = 0;
		if (count > 50) count = 50;
		if (count < 1) count = 1;

		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.searchUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				last_seen: lastSeen,
				type: 2,
				count: count
			})
		);
	}
	/**
	 *  当需要根据批次ID查询时
	 *  @param applyId 批次ID，申请设备ID时所返回的批次ID
	 *  @param lastSeen 前一次查询列表末尾的设备ID ， 第一次查询last_seen 为0
	 *  @param count 待查询的设备数量，不能超过50个
	 */
	public static async searchPageByApplyId(applyId: number, lastSeen: number, count: number) {
		if (lastSeen < 0) lastSeen = 0;
		if (count > 50) count = 50;
		if (count < 1) count = 1;

		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.searchUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				apply_id: applyId,
				last_seen: lastSeen,
				type: 3,
				count: count
			})
		);
	}

	private static bindPageUrl: string = 'https://api.weixin.qq.com/shakearound/device/bindpage?access_token=%s';
	/**
	 *  配置设备与页面的关联关系
	 *  @param deviceIdentifier 指定页面的设备ID
	 *  @param pageIds 待关联的页面列表
	 */
	public static async bindPage(deviceIdentifier: DeviceIdentifier, pageIds: number[]) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.bindPageUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				device_identifier: deviceIdentifier,
				page_ids: pageIds
			})
		);
	}

	private static relationSearchUrl: string = 'https://api.weixin.qq.com/shakearound/relation/search?access_token=%s';
	/**
	 *  查询设备与页面的关联关系,当查询指定设备所关联的页面时
	 *  @param deviceIdentifier 指定页面的设备ID
	 */
	public static async relationSearch(deviceIdentifier: DeviceIdentifier) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.relationSearchUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				device_identifier: deviceIdentifier,
				type: 1
			})
		);
	}
	/**
	 * 
	 *  @param pageId 指定的页面id
	 *  @param begin 关联关系列表的起始索引值
	 *  @param count 待查询的关联关系数量，不能超过50个
	 */
	public static async relationSearchByPage(pageId: number, begin: number, count: number) {
		if (begin < 0) begin = 0;
		if (count > 50) count = 50;
		if (count < 1) count = 1;

		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.relationSearchUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				type: 2,
				page_id: pageId,
				begin: begin,
				count: count
			})
		);
	}

	private static addGroupUrl: string = 'https://api.weixin.qq.com/shakearound/device/group/add?access_token=%s';
	/**
	 *  新增分组 每个帐号下最多只有1000个分组。
	 *  @param groupName 分组名称，不超过100汉字或200个英文字母
	 */
	public static async addGroup(groupName: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.addGroupUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				group_name: groupName
			})
		);
	}

	private static updateGroupUrl: string = 'https://api.weixin.qq.com/shakearound/device/group/update?access_token=%s';
	/**
	 *  编辑分组信息
	 *  @param groupId 分组唯一标识，全局唯一
	 *  @param groupName 分组名称，不超过100汉字或200个英文字母
	 */
	public static async updateGroup(groupId: number, groupName: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.updateGroupUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				group_id: groupId,
				group_name: groupName
			})
		);
	}

	private static deleteGroupUrl: string = 'https://api.weixin.qq.com/shakearound/device/group/delete?access_token=%s';
	/**
	 *  删除分组
	 *  @param groupId 分组唯一标识，全局唯一
	 */
	public static async deleteGroup(groupId: number) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.deleteGroupUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				group_id: groupId
			})
		);
	}

	private static getGroupListUrl: string = 'https://api.weixin.qq.com/shakearound/device/group/getlist?access_token=%s';
	/**
	 *  查询分组列表
	 *  @param begin 分组列表的起始索引值
	 *  @param count 待查询的分组数量，不能超过1000个
	 */
	public static async getGroupList(begin: number, count: number) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getGroupListUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				begin: begin,
				count: count
			})
		);
	}

	private static getGroupDetailUrl: string = 'https://api.weixin.qq.com/shakearound/device/group/getdetail?access_token=%s';
	/**
	 *  查询分组详情
	 *  @param groupId 分组唯一标识，全局唯一
	 *  @param begin 分组列表的起始索引值
	 *  @param count 待查询的分组数量，不能超过1000个
	 */
	public static async getGroupDetail(groupId: number, begin: number, count: number) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getGroupDetailUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				groupId: groupId,
				begin: begin,
				count: count
			})
		);
	}

	private static addDeviceUrl: string = 'https://api.weixin.qq.com/shakearound/device/group/adddevice?access_token=%s';
	/**
	 *  添加设备到分组
	 *  @param groupId 分组唯一标识，全局唯一
	 *  @param deviceIdentifierList 	设备id列表 每次添加设备上限为1000
	 */
	public static async addDeviceToGroup(groupId: number, deviceIdentifierList: DeviceIdentifier[]) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.addDeviceUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				groupId: groupId,
				device_identifiers: deviceIdentifierList
			})
		);
	}

	private static deleteGroupDeviceUrl = 'https://api.weixin.qq.com/shakearound/device/group/deletedevice?access_token=%s';
	/**
	 *  从分组中移除设备
	 *  @param groupId 分组唯一标识，全局唯一
	 *  @param deviceIdentifierList 设备id列表 每次删除设备上限为1000
	 */
	public static async deleteDeviceFromGroup(groupId: number, deviceIdentifierList: DeviceIdentifier[]) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.deleteGroupDeviceUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				groupId: groupId,
				device_identifiers: deviceIdentifierList
			})
		);
	}
}

export class DeviceIdentifier {
	private device_id: number;
	private uuid: string;
	private major: number;
	private minor: number;

	public set setDeviceId(deviceId: number) {
		this.device_id = deviceId;
	}

	public get getDeviceId(): number {
		return this.device_id;
	}

	public set setUuid(uuid: string) {
		this.uuid = uuid;
	}

	public get getUuit(): string {
		return this.uuid;
	}

	public set setMajor(major: number) {
		this.major = major;
	}

	public get getMajor(): number {
		return this.major;
	}

	public set setMinor(minor: number) {
		this.minor = minor;
	}

	public get getMinor(): number {
		return this.minor;
	}
}
