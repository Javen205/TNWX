import * as util from 'util';
import { AccessTokenApi } from '../AccessTokenApi';
import { AccessToken } from '../AccessToken';
import { HttpKit } from '../kit/HttpKit';
export class TagApi {
    private static createTagUrl: string = "https://api.weixin.qq.com/cgi-bin/tags/create?access_token=%s";
    private static getTagUrl: string = "https://api.weixin.qq.com/cgi-bin/tags/get?access_token=%s";
    private static updateTagUrl: string = "https://api.weixin.qq.com/cgi-bin/tags/update?access_token=%s";
    private static deleteTagUrl: string = "https://api.weixin.qq.com/cgi-bin/tags/delete?access_token=%s";
    private static getUserTagUrl: string = "https://api.weixin.qq.com/cgi-bin/user/tag/get?access_token=%s";
    private static batchTaggingUrl: string = "https://api.weixin.qq.com/cgi-bin/tags/members/batchtagging?access_token=%s";
    private static batchUnTaggingUrl: string = "https://api.weixin.qq.com/cgi-bin/tags/members/batchuntagging?access_token=%s";
    private static getIdListUrl: string = "https://api.weixin.qq.com/cgi-bin/tags/getidlist?access_token=%s";

    /**
     * 创建标签
     * @param tagName 
     */
    public static async create(tagName: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.createTagUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify({
            "tag": {
                "name": tagName
            }
        }));
    }
    /**
     * 获取公众号已创建的标签
     */
    public static async get() {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.getTagUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpGet(url);
    }
    /**
     * 编辑标签
     * @param tagId 
     * @param tagName 
     */
    public static async update(tagId: number, tagName: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.updateTagUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify({
            "tag": {
                "id": tagId,
                "name": tagName
            }
        }));
    }
    /**
     * 删除标签
     * @param tagId 
     */
    public static async delete(tagId: number) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.deleteTagUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify({
            "tag": {
                "id": tagId
            }
        }));
    }
    /**
     * 获取标签下粉丝列表
     * @param tagId 
     * @param nextOpenid 
     */
    public static async getUser(tagId: number, nextOpenid?: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.getUserTagUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify({
            "tagid": tagId,
            "next_openid": nextOpenid
        }));
    }
    /**
     * 批量为用户打标签
     * @param tagId 
     * @param openIdList 
     */
    public static async batchAddTag(tagId: number, openIdList: string[]) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.batchTaggingUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify({
            "openid_list": openIdList,
            "tagid": tagId
        }));
    }
    /**
     * 批量为用户取消标签
     * @param tagId 
     * @param openIdList 
     */
    public static async batchDelTag(tagId: number, openIdList: string[]) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.batchUnTaggingUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify({
            "openid_list": openIdList,
            "tagid": tagId
        }));
    }
    /**
     * 获取用户身上的标签列表
     * @param openId 
     */
    public static async getUserTag(openId: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.getIdListUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify({
            "openid": openId
        }));
    }

}