/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 素材管理
 */
import * as util from 'util';
import { AccessTokenApi } from '../AccessTokenApi';
import { AccessToken } from '../AccessToken';
import { HttpKit } from '@tnw/kits';

export class MediaApi {
	private static uploadUrl: string = 'https://api.weixin.qq.com/cgi-bin/media/upload?access_token=%s&type=%s';
	/**
   * 新增临时素材
   * @param filePath
   * @param mediaType
   */
	public static async uploadMedia(filePath: string, mediaType: MediaType) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.uploadUrl, accessToken.getAccessToken, mediaType);
		return HttpKit.getHttpDelegate.upload(url, filePath);
	}

	private static getUrl: string = 'https://api.weixin.qq.com/cgi-bin/media/get?access_token=%s&media_id=%s';

	/**
   * 获取临时素材
   * @param mediaId
   */
	public static async getMedia(mediaId: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		return util.format(this.getUrl, accessToken.getAccessToken, mediaId);
	}

	/**
   * 高清语音素材获取接口
   * 公众号可以使用本接口获取从JSSDK的uploadVoice接口上传的临时语音素材，格式为speex，16K采样率。
   * 该音频比上文的临时素材获取接口（格式为amr，8K采样率）更加清晰，适合用作语音识别等对音质要求较高的业务。
   */
	private static get_jssdk_url: string = 'https://api.weixin.qq.com/cgi-bin/media/get/jssdk?access_token=%s';

	public static async getJssdkMedia(mediaId: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		return util.format(this.get_jssdk_url, accessToken.getAccessToken, mediaId);
	}

	private static add_news: string = 'https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=%s';
	/**
   * 新增永久图文素材
   * @param mediaId
   */
	public static async uploadNews(mediaArticles: MediaArticles[]) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.add_news, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				articles: mediaArticles
			})
		);
	}
	private static update_news: string = 'https://api.weixin.qq.com/cgi-bin/material/update_news?access_token=%s';
	/**
   * 修改永久图文素材
   * @param mediaId  要修改的图文消息的id
   * @param index  要更新的文章在图文消息中的位置（多图文消息时，此字段才有意义），第一篇为0
   * @param mediaArticles
   */
	public static async updateNews(mediaId: string, index: number, mediaArticles: MediaArticles) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.update_news, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				media_id: mediaId,
				index: index,
				articles: mediaArticles
			})
		);
	}

	private static uploadImgUrl: string = 'https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=%s';
	/**
   * 上传图文消息内的图片获取URL
   * 本接口所上传的图片不占用公众号的素材库中图片数量的5000个的限制。
   * 图片仅支持jpg/png格式，大小必须在1MB以下。
   * @param filePath
   */
	public static async uploadImg(filePath: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.uploadImgUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.upload(url, filePath);
	}

	private static addMaterialUrl: string = 'https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=%s&type=%s';
	/**
   * 新增其他类型永久素材
   * 如果是添加视频请使用 addVideoMaterial
   *
   * @param filePath
   * @param mediaType
   */
	public static async addMaterial(filePath: string, mediaType: MediaType) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.addMaterialUrl, accessToken.getAccessToken, mediaType);
		return HttpKit.getHttpDelegate.upload(url, filePath);
	}
	/**
   * 新增 video 类型永久素材
   * @param filePath
   * @param title
   * @param introduction
   */
	public static async addVideoMaterial(filePath: string, title: string, introduction: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.addMaterialUrl, accessToken.getAccessToken, MediaType.VIDEO);
		return HttpKit.getHttpDelegate.upload(
			url,
			filePath,
			JSON.stringify({
				title: title,
				introduction: introduction
			})
		);
	}

	private static getMaterialUrl: string = 'https://api.weixin.qq.com/cgi-bin/material/get_material?access_token=%s';
	/**
   * 获取永久素材
   * @param mediaId
   */
	public static async getMaterial(mediaId: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getMaterialUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				media_id: mediaId
			})
		);
	}

	private static delMaterialUrl: string = 'https://api.weixin.qq.com/cgi-bin/material/del_material?access_token=%s';
	/**
   * 删除永久素材
   * @param mediaId
   */
	public static async delMaterial(mediaId: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.delMaterialUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				media_id: mediaId
			})
		);
	}

	private static getMaterialCountUrl: string = 'https://api.weixin.qq.com/cgi-bin/material/get_materialcount?access_token=%s';
	/**
   * 获取素材总数
   */
	public static async getMaterialCount() {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getMaterialCountUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpGet(url);
	}

	private static batchGetMaterialUrl: string = 'https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=%s';
	/**
   * 获取素材列表
   * @param mediaType 素材的类型，图片（image）、视频（video）、语音 （voice）、图文（news）
   * @param offset 从全部素材的该偏移位置开始返回，0表示从第一个素材 返回
   * @param count 返回素材的数量，取值在1到20之间
   */
	public static async batchGetMaterial(mediaType: MediaType, offset: number = 0, count: number = 1) {
		if (offset < 0) offset = 0;
		if (count > 20) count = 20;
		if (count < 1) count = 1;

		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.batchGetMaterialUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				type: mediaType,
				offset: offset,
				count: count
			})
		);
	}
}

/**
 * 上传临时素材的格式、大小限制与公众平台官网一致
 * 图片（image）: 2M，支持PNG\JPEG\JPG\GIF格式
 * 语音（voice）：2M，播放长度不超过60s，支持AMR\MP3格式
 * 视频（video）：10MB，支持MP4格式
 * 缩略图（thumb）：64KB，支持JPG格式
 */
export enum MediaType {
	IMAGE = 'image',
	VOICE = 'voice',
	VIDEO = 'video',
	THUMB = 'thumb',
	NEWS = 'news'
}

export class MediaArticles {
	// 标题
	private title: string;
	// 图文消息的封面图片素材id（必须是永久mediaID）
	private thumb_media_id: string;
	// 作者
	private author: string | undefined;
	// 图文消息的摘要，仅有单图文消息才有摘要，多图文此处为空
	private digest: string | undefined;
	// 是否显示封面，0为false，即不显示，1为true，即显示
	private show_cover_pic: boolean;
	// 图文消息的具体内容，支持HTML标签，必须少于2万字符，小于1M，且此处会去除JS
	private content: string;
	// 图文消息的原文地址，即点击“阅读原文”后的URL
	private content_source_url: string;
	// 是否打开评论，0不打开，1打开
	private need_open_comment: number | undefined;
	// 是否粉丝才可评论，0所有人可评论，1粉丝才可评论
	private only_fans_can_comment: number | undefined;

	constructor(
		title: string,
		thumb_media_id: string,
		show_cover_pic: boolean,
		content: string,
		content_source_url: string,
		author?: string,
		digest?: string,
		need_open_comment?: number,
		only_fans_can_comment?: number
	) {
		this.title = title;
		this.thumb_media_id = thumb_media_id;
		this.author = author;
		this.digest = digest;
		this.show_cover_pic = show_cover_pic;
		this.content = content;
		this.content_source_url = content_source_url;
		this.need_open_comment = need_open_comment;
		this.only_fans_can_comment = only_fans_can_comment;
	}
}
