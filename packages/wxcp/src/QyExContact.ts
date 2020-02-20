import * as util from 'util'
import { HttpKit } from '@tnwx/kits'
import { AccessToken, QyAccessTokenApi } from '@tnwx/accesstoken'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 外部联系人管理
 */
export class QyExContact {
  private static getFollowUserListUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/get_follow_user_list?access_token=%s'

  /**
   * 获取配置了客户联系功能的成员列表
   * @param accessToken {AccessToken}
   */
  public static async getFollowUserList(accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getFollowUserListUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static addContactWayUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/add_contact_way?access_token=%s'

  /**
   * 配置客户联系「联系我」方式
   * @param type 联系方式类型,1-单人, 2-多人
   * @param scene 场景，1-在小程序中联系，2-通过二维码联系，3-在线问诊
   * @param style 在小程序中联系时使用的控件样式
   * @param remark 联系方式的备注信息，用于助记，不超过30个字符
   * @param skipVerify 外部客户添加时是否无需验证，默认为true
   * @param state 自定义的state参数
   * @param user 使用该联系方式的用户userID列表，在type为1时为必填，且只能有一个
   * @param party 使用该联系方式的部门id列表，只在type为2时有效
   * @param accessToken {AccessToken}
   */
  public static async addContactWay(
    type: number,
    scene: number,
    style?: number,
    remark?: string,
    skipVerify?: boolean,
    state?: string,
    user?: Array<string>,
    party?: Array<string>,
    accessToken?: AccessToken
  ) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.addContactWayUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        type: type,
        scene: scene,
        style: style,
        remark: remark,
        skip_verify: skipVerify,
        state: state,
        user: user,
        party: party
      })
    )
  }

  private static updateContactWayUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/update_contact_way?access_token=%s'

  /**
   * 更新企业已配置的「联系我」方式
   * @param configId
   * @param style
   * @param remark
   * @param skipVerify
   * @param state
   * @param user
   * @param party
   * @param accessToken {AccessToken}
   */
  public static async updateContactWay(
    configId: string,
    style?: number,
    remark?: string,
    skipVerify?: boolean,
    state?: string,
    user?: Array<string>,
    party?: Array<string>,
    accessToken?: AccessToken
  ) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.updateContactWayUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        config_id: configId,
        style: style,
        remark: remark,
        skip_verify: skipVerify,
        state: state,
        user: user,
        party: party
      })
    )
  }

  private static getContactWayUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/get_contact_way?access_token=%s'

  /**
   * 获取企业已配置的「联系我」方式
   * @param configId 联系方式的配置id
   * @param accessToken {AccessToken}
   */
  public static async getContactWay(configId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getContactWayUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        config_id: configId
      })
    )
  }

  private static delContactWayUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/del_contact_way?access_token=%s'

  /**
   * 删除企业已配置的「联系我」方式
   * @param configId 联系方式的配置id
   * @param accessToken {AccessToken}
   */
  public static async delContactWay(configId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.delContactWayUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        config_id: configId
      })
    )
  }

  private static getUserListUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/list?access_token=%s&userid=%s'

  /**
   * 获取客户列表
   * @param userId 企业成员的userid
   * @param accessToken {AccessToken}
   */
  public static async getUserList(userId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getUserListUrl, accessToken.getAccessToken, userId)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static getUserInfoUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/get?access_token=%s&external_userid=%s'

  /**
   * 获取客户列表
   * @param externalUserId 外部联系人的userid
   * @param accessToken {AccessToken}
   */
  public static async getUserInfo(externalUserId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getUserInfoUrl, accessToken.getAccessToken, externalUserId)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static updateRemarkUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/remark?access_token=%s'

  /**
   * 修改客户备注信息
   * @param userId
   * @param externalUserId
   * @param remark
   * @param description
   * @param remarkCompany
   * @param remarkMobiles
   * @param remarkPicMediaid
   * @param accessToken
   */
  public static async updateRemark(
    userId: string,
    externalUserId: string,
    remark?: string,
    description?: string,
    remarkCompany?: string,
    remarkMobiles?: Array<string>,
    remarkPicMediaid?: string,
    accessToken?: AccessToken
  ) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.updateRemarkUrl, accessToken.getAccessToken, externalUserId)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        userid: userId,
        external_userid: externalUserId,
        remark: remark,
        description: description,
        remark_company: remarkCompany,
        remark_mobiles: remarkMobiles,
        remark_mediaid: remarkPicMediaid
      })
    )
  }

  private static getCorpTagListUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/get_corp_tag_list?access_token=%s'

  /**
   * 获取企业标签库
   * @param tagId
   * @param accessToken
   */
  public static async getCorpTagList(tagId?: Array<string>, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getCorpTagListUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        tag_id: tagId
      })
    )
  }

  private static addCorpTagUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/add_corp_tag?access_token=%s'

  /**
   * 添加企业客户标签
   * @param groupId 标签组id
   * @param groupName 标签组名称
   * @param order 标签组次序值
   * @param tag 标签列表
   * @param accessToken {AccessToken}
   */
  public static async addCorpTag(groupId?: string, groupName?: string, order?: number, tag?: Array<{ name: string; order?: number }>, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.addCorpTagUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        group_id: groupId,
        group_name: groupName,
        order: order,
        tag: tag
      })
    )
  }

  private static editCorpTagUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/edit_corp_tag?access_token=%s'

  /**
   * 编辑企业客户标签
   * @param id 标签或标签组的id列表
   * @param name 新的标签或标签组名称
   * @param order 标签/标签组的次序值
   * @param accessToken {AccessToken}
   */
  public static async editCorpTag(id: string, name?: string, order?: number, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.editCorpTagUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        id: id,
        name: name,
        order: order
      })
    )
  }

  private static delCorpTagUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/del_corp_tag?access_token=%s'

  /**
   * 删除企业客户标签
   * @param tagId 标签的id列表
   * @param groupId 标签组的id列表
   * @param accessToken {AccessToken}
   */
  public static async delCorpTag(tagId: Array<string>, groupId?: Array<string>, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.delCorpTagUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        tag_id: tagId,
        group_id: groupId
      })
    )
  }

  private static markTagUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/mark_tag?access_token=%s'

  /**
   * 编辑客户企业标签
   * @param userId 添加外部联系人的userid
   * @param externalUserId 外部联系人userid
   * @param addTag 要标记的标签列表
   * @param removeTag 要移除的标签列表
   * @param accessToken
   */
  public static async markTag(userId: string, externalUserId: string, addTag?: Array<string>, removeTag?: Array<string>, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.markTagUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        userid: userId,
        external_userid: externalUserId,
        add_tag: addTag,
        remove_tag: removeTag
      })
    )
  }

  private static getGroupChatListUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/groupchat/list?access_token=%s'

  /**
   * 获取客户群列表
   * @param offset 分页，偏移量
   * @param limit 分页，预期请求的数据量，取值范围 1 ~ 1000
   * @param statusFilter 群状态过滤。0 - 普通列表 1 - 离职待继承 2 - 离职继承中 3 - 离职继承完成
   * @param ownerFilter 群主过滤。如果不填，表示获取全部群主的数据
   * @param accessToken {AccessToken}
   */
  public static async getGroupChatList(
    offset: number,
    limit: number,
    statusFilter = 0,
    ownerFilter?: { userid_list: Array<string>; partyid_list: Array<string> },
    accessToken?: AccessToken
  ) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getGroupChatListUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        status_filter: statusFilter,
        owner_filter: ownerFilter,
        offset: offset,
        limit: limit
      })
    )
  }

  private static getGroupChatUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/groupchat/get?access_token=%s'

  /**
   * 获取客户群详情
   * @param chatId 客户群ID
   * @param accessToken {AccessToken}
   */
  public static async getGroupChat(chatId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getGroupChatUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        chat_id: chatId
      })
    )
  }

  private static addMsgTemplateUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/add_msg_template?access_token=%s'

  /**
   * 添加企业群发消息任务
   * @param externalUserId 客户的外部联系人id列表，不可与sender同时为空，最多可传入1万个客户
   * @param sender 发送企业群发消息的成员userid，不可与external_userid同时为空
   * @param text 文本消息
   * @param image 图片消息
   * @param link 链接消息
   * @param miniprogram 小程序消息
   * @param accessToken {AccessToken}
   */
  public static async addMsgTemplate(
    externalUserId?: Array<string>,
    sender?: string,
    text?: {
      content: string
    },
    image?: {
      media_id: string
    },
    link?: {
      title: string
      url: string
      picurl?: string
      desc?: string
    },
    miniprogram?: {
      title: string
      pic_media_id: string
      appid: string
      page: string
    },
    accessToken?: AccessToken
  ) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.addMsgTemplateUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        external_userid: externalUserId,
        sender: sender,
        text: text,
        image: image,
        link: link,
        miniprogram: miniprogram
      })
    )
  }

  private static getGroupMsgResultUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/get_group_msg_result?access_token=%s'

  /**
   * 获取企业群发消息发送结果
   * @param msgId 群发消息的id
   * @param accessToken {AccessToken}
   */
  public static async getGroupMsgResult(msgId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getGroupMsgResultUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        msgid: msgId
      })
    )
  }

  private static sendWelcomeMsgUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/send_welcome_msg?access_token=%s'

  /**
   * 发送新客户欢迎语
   * @param welcomeCode 通过添加外部联系人事件推送给企业的发送欢迎语的凭证，有效期为20秒
   * @param text 文本消息
   * @param image 图片消息
   * @param link 链接消息
   * @param miniprogram 小程序消息
   * @param accessToken {AccessToken}
   */
  public static async sendWelcomeMsg(
    welcomeCode: string,
    text?: {
      content: string
    },
    image?: {
      media_id: string
    },
    link?: {
      title: string
      url: string
      picurl?: string
      desc?: string
    },
    miniprogram?: {
      title: string
      pic_media_id: string
      appid: string
      page: string
    },
    accessToken?: AccessToken
  ) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.sendWelcomeMsgUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        welcome_code: welcomeCode,
        text: text,
        image: image,
        link: link,
        miniprogram: miniprogram
      })
    )
  }

  private static addGroupWelcomeTemplateUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/group_welcome_template/add?access_token=%s'

  /**
   * 添加群欢迎语素材
   * @param text 文本消息
   * @param image 图片消息
   * @param link 链接消息
   * @param miniprogram 小程序消息
   * @param accessToken {AccessToken}
   */
  public static async addGroupWelcomeTemplate(
    text?: {
      content: string
    },
    image?: {
      media_id: string
    },
    link?: {
      title: string
      url: string
      picurl?: string
      desc?: string
    },
    miniprogram?: {
      title: string
      pic_media_id: string
      appid: string
      page: string
    },
    accessToken?: AccessToken
  ) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.addGroupWelcomeTemplateUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        text: text,
        image: image,
        link: link,
        miniprogram: miniprogram
      })
    )
  }

  private static editGroupWelcomeTemplateUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/group_welcome_template/edit?access_token=%s'

  /**
   * 编辑群欢迎语素材
   * @param templateId 群欢迎语的素材id
   * @param text 文本消息
   * @param image 图片消息
   * @param link 链接消息
   * @param miniprogram 小程序消息
   * @param accessToken {AccessToken}
   */
  public static async editGroupWelcomeTemplate(
    templateId: string,
    text?: {
      content: string
    },
    image?: {
      media_id: string
    },
    link?: {
      title: string
      url: string
      picurl?: string
      desc?: string
    },
    miniprogram?: {
      title: string
      pic_media_id: string
      appid: string
      page: string
    },
    accessToken?: AccessToken
  ) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.editGroupWelcomeTemplateUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        template_id: templateId,
        text: text,
        image: image,
        link: link,
        miniprogram: miniprogram
      })
    )
  }

  private static getGroupWelcomeTemplateUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/group_welcome_template/get?access_token=%s'

  /**
   * 获取群欢迎语素材
   * @param templateId 群欢迎语的素材id
   * @param accessToken {AccessToken}
   */
  public static async getGroupWelcomeTemplate(templateId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getGroupWelcomeTemplateUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        template_id: templateId
      })
    )
  }

  private static delGroupWelcomeTemplateUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/group_welcome_template/del?access_token=%s'

  /**
   * 获取群欢迎语素材
   * @param templateId 群欢迎语的素材id
   * @param accessToken {AccessToken}
   */
  public static async delGroupWelcomeTemplate(templateId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.delGroupWelcomeTemplateUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        template_id: templateId
      })
    )
  }

  private static getUnAssignedListUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/get_unassigned_list?access_token=%s'

  /**
   * 获取离职成员的客户列表
   * @param pageId
   * @param pageSize
   * @param accessToken {AccessToken}
   */
  public static async getUnAssignedList(pageId: number, pageSize: number, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getUnAssignedListUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        page_id: pageId,
        page_size: pageSize
      })
    )
  }

  private static transferContactUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/transfer?access_token=%s'

  /**
   * 离职成员的外部联系人再分配
   * @param externalUserId 外部联系人的userid，注意不是企业成员的帐号
   * @param handOverUserId 离职成员的userid
   * @param takeOverUserId 接替成员的userid
   * @param accessToken {AccessToken}
   */
  public static async transferContact(externalUserId: string, handOverUserId: string, takeOverUserId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.transferContactUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        external_userid: externalUserId,
        handover_userid: handOverUserId,
        takeover_userid: takeOverUserId
      })
    )
  }

  private static transferGroupChatUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/groupchat/transfer?access_token=%s'

  /**
   * 离职成员的群再分配
   * @param chatIdList 需要转群主的客户群ID列表
   * @param newOwner 新群主ID
   * @param accessToken {AccessToken}
   */
  public static async transferGroupChat(chatIdList: Array<string>, newOwner: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.transferGroupChatUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        chat_id_list: chatIdList,
        new_owner: newOwner
      })
    )
  }

  private static getUserBehaviorDataUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/get_user_behavior_data?access_token=%s'

  /**
   * 获取联系客户统计数据
   * @param startTime 数据起始时间
   * @param endTime 数据结束时间
   * @param userId 用户ID列表
   * @param partyId 部门ID列表
   * @param accessToken {AccessToken}
   */
  public static async getUserBehaviorData(startTime: number, endTime: number, userId?: Array<string>, partyId?: Array<number>, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getUserBehaviorDataUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        userid: userId,
        partyid: partyId,
        start_time: startTime,
        end_time: endTime
      })
    )
  }

  private static getGroupChatStatisticUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/groupchat/statistic?access_token=%s'

  /**
   * 获取客户群统计数据
   * @param dayBeginTime 开始时间，填当天开始的0分0秒（否则系统自动处理为当天的0分0秒）。取值范围：昨天至前60天
   * @param ownerFilter 群主过滤，如果不填，表示获取全部群主的数据
   * @param orderBy 排序方式。1 - 新增群的数量 2 - 群总数 3 - 新增群人数 4 - 群总人数
   * @param orderAsc 是否升序。0-否；1-是。默认降序
   * @param offset 分页，偏移量, 默认为0
   * @param limit 分页，预期请求的数据量，默认为500，取值范围 1 ~ 1000
   * @param accessToken {AccessToken}
   */
  public static async getGroupChatStatistic(
    dayBeginTime: number,
    ownerFilter?: {
      userid_list?: Array<string>
      partyid_list?: Array<number>
    },
    orderBy?: number,
    orderAsc?: number,
    offset?: number,
    limit?: number,
    accessToken?: AccessToken
  ) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getGroupChatStatisticUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        day_begin_time: dayBeginTime,
        owner_filter: ownerFilter,
        order_by: orderBy,
        order_asc: orderAsc,
        offset: offset,
        limit: limit
      })
    )
  }
}
