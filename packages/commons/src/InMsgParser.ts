import { InTaskEvent } from './entity/msg/in/event/InTaskEvent'
import { InSpeechRecognitionResults } from './entity/msg/in/InSpeechRecognitionResults'
import { InMsg } from './entity/msg/in/InMsg'
import { InImageMsg } from './entity/msg/in/InImageMsg'
import { InTextMsg } from './entity/msg/in/InTextMsg'
import { InNotDefinedMsg } from './entity/msg/in/InNotDefinedMsg'
import { InVideoMsg } from './entity/msg/in/InVideoMsg'
import { InShortVideoMsg } from './entity/msg/in/InShortVideoMsg'
import { InLocationMsg } from './entity/msg/in/InLocationMsg'
import { InLinkMsg } from './entity/msg/in/InLinkMsg'
import { InVoiceMsg } from './entity/msg/in/InVoiceMsg'
import { InFollowEvent } from './entity/msg/in/event/InFollowEvent'
import { InQrCodeEvent } from './entity/msg/in/event/InQrCodeEvent'
import { InLocationEvent } from './entity/msg/in/event/InLocationEvent'
import { InNotDefinedEvent } from './entity/msg/in/event/InNotDefinedEvent'
import { InMenuEvent } from './entity/msg/in/event/InMenuEvent'
import { ScanCodeInfo } from './entity/msg/in/event/ScanCodeInfo'
import { InTemplateMsgEvent } from './entity/msg/in/event/InTemplateMsgEvent'
import { InMassEvent } from './entity/msg/in/event/InMassEvent'
import { InCustomEvent } from './entity/msg/in/event/InCustomEvent'
import { InVerifySuccessEvent } from './entity/msg/in/event/InVerifySuccessEvent'
import { InVerifyFailEvent } from './entity/msg/in/event/InVerifyFailEvent'
import { InPoiCheckNotifyEvent } from './entity/msg/in/event/InPoiCheckNotifyEvent'
import { InWifiEvent } from './entity/msg/in/event/InWifiEvent'
import { InCardPassCheckEvent } from './entity/msg/in/card/InCardPassCheckEvent'
import { InUpdateMemberCardEvent } from './entity/msg/in/card/InUpdateMemberCardEvent'
import { InUserPayFromCardEvent } from './entity/msg/in/card/InUserPayFromCardEvent'
import { InMerChantOrderEvent } from './entity/msg/in/card/InMerChantOrderEvent'
import { InCardPayOrderEvent } from './entity/msg/in/card/InCardPayOrderEvent'
import { InCardSkuRemindEvent } from './entity/msg/in/card/InCardSkuRemindEvent'
import { InUserConsumeCardEvent } from './entity/msg/in/card/InUserConsumeCardEvent'
import { InUserGetCardEvent } from './entity/msg/in/card/InUserGetCardEvent'
import { InUserGiftingCardEvent } from './entity/msg/in/card/InUserGiftingCardEvent'
import { InUserCardEvent } from './entity/msg/in/card/InUserCardEvent'
import { InShakearoundUserShakeEvent } from './entity/msg/in/event/InShakearoundUserShakeEvent'
import { InEnterAgentEvent } from './entity/msg/in/event/InEnterAgentEvent'
import { InBatchJobResultEvent } from './entity/msg/in/event/InBatchJobResultEvent'
import { InUpdateTagEvent } from './entity/msg/in/event/InUpdateTagEvent'
import { InUpdatePartyEvent } from './entity/msg/in/event/InUpdatePartyEvent'
import { InUpdateUserEvent } from './entity/msg/in/event/InUpdateUserEvent'
import { BaseMsg } from './entity/msg/BaseMsg'
import { InSuiteTicket } from './entity/msg/in/InSuiteTicket'
import { InAuthEvent } from './entity/msg/in/InAuthEvent'
import { InBatchJobResult } from './entity/msg/in/InBatchJobResult'
import { InExternalContact } from './entity/msg/in/InExternalContact'
import { InExternalContactEvent } from './entity/msg/in/event/InExternalContactEvent'
import { InRegisterCorp } from './entity/msg/in/InRegisterCorp'

export class InMsgParser {
  public static parse(obj: any): BaseMsg {
    return this.doParse(obj)
  }

  private static doParse(obj: any): BaseMsg {
    if ('text' === obj.MsgType) return this.parseInTextMsg(obj)
    if ('image' === obj.MsgType) return this.parseInImageMsg(obj)
    if ('video' === obj.MsgType) return this.parseInVideoMsg(obj)
    if ('shortvideo' === obj.MsgType) return this.parseInShortVideoMsg(obj)
    if ('location' === obj.MsgType) return this.parseInLocationMsg(obj)
    if ('link' === obj.MsgType) return this.parseInLinkMsg(obj)
    if ('voice' === obj.MsgType) return this.parseInVoiceMsgAndInSpeechRecognitionResults(obj)
    if ('event' === obj.MsgType) return this.parseInEvent(obj)
    if (InSuiteTicket.INFO_TYPE === obj.InfoType) return this.parseInSuiteTicket(obj)
    if (InBatchJobResult.INFO_TYPE === obj.InfoType) return this.parseInBatchJobResult(obj)
    if (InAuthEvent.CREATE_AUTH === obj.InfoType || InAuthEvent.CHANGE_AUTH === obj.InfoType || InAuthEvent.CANCEL_AUTH === obj.InfoType) return this.InAuthEvent(obj)
    if (InExternalContact.INFO_TYPE === obj.InfoType) return this.parseInExternalContact(obj)
    if (InRegisterCorp.INFO_TYPE === obj.InfoType) return this.parseInRegisterCorp(obj)
    console.debug(
      `无法识别的消息类型 ${obj.MsgType}\n微信公众号开发文档:https://developers.weixin.qq.com/doc/offiaccount/Getting_Started/Overview.html\n企业微信号开发文档:https://work.weixin.qq.com/api/doc`
    )
    return new InNotDefinedMsg(obj.ToUserName, obj.FromUserName, obj.CreateTime, obj.MsgType)
  }

  private static parseInTextMsg(obj: any): InMsg {
    let msg: InTextMsg = new InTextMsg(obj.ToUserName, obj.FromUserName, obj.CreateTime, obj.MsgType)
    msg.setContent = obj.Content
    msg.setMsgId = obj.MsgId
    msg.setAgentId = obj.AgentID
    return msg
  }

  private static parseInImageMsg(obj: any): InMsg {
    let msg: InImageMsg = new InImageMsg(obj.ToUserName, obj.FromUserName, obj.CreateTime, obj.MsgType)
    msg.setPicUrl = obj.PicUrl
    msg.setMediaId = obj.MediaId
    msg.setMsgId = obj.MsgId
    msg.setAgentId = obj.AgentID
    return msg
  }

  private static parseInVideoMsg(obj: any): InMsg {
    let msg: InVideoMsg = new InVideoMsg(obj.ToUserName, obj.FromUserName, obj.CreateTime, obj.MsgType)
    msg.setThumbMediaId = obj.ThumbMediaId
    msg.setMediaId = obj.MediaId
    msg.setMsgId = obj.MsgId
    msg.setAgentId = obj.AgentID
    return msg
  }

  private static parseInShortVideoMsg(obj: any): InMsg {
    let msg: InShortVideoMsg = new InShortVideoMsg(obj.ToUserName, obj.FromUserName, obj.CreateTime, obj.MsgType)
    msg.setThumbMediaId = obj.ThumbMediaId
    msg.setMediaId = obj.MediaId
    msg.setMsgId = obj.MsgId
    msg.setAgentId = obj.AgentID
    return msg
  }

  private static parseInLocationMsg(obj: any): InMsg {
    let msg: InLocationMsg = new InLocationMsg(obj.ToUserName, obj.FromUserName, obj.CreateTime, obj.MsgType)
    msg.setLocation_X = obj.Location_X
    msg.setLocation_Y = obj.Location_Y
    msg.setScale = obj.Scale
    msg.setLabel = obj.Label
    msg.setMsgId = obj.MsgId
    msg.setAgentId = obj.AgentID
    return msg
  }

  private static parseInLinkMsg(obj: any): InMsg {
    let msg: InLinkMsg = new InLinkMsg(obj.ToUserName, obj.FromUserName, obj.CreateTime, obj.MsgType)
    msg.setTitle = obj.Title
    msg.setDescription = obj.Description
    msg.setUrl = obj.Url
    msg.setMsgId = obj.MsgId
    msg.setAgentId = obj.AgentID
    return msg
  }

  private static parseInVoiceMsgAndInSpeechRecognitionResults(obj: any): InMsg {
    let recognition: string = obj.Recognition
    let mediaId: string = obj.MediaId
    let format: string = obj.Format
    let msgId: string = obj.MsgId
    let agentId: string = obj.AgentID

    if (recognition) {
      let msg = new InVoiceMsg(obj.ToUserName, obj.FromUserName, obj.CreateTime, obj.MsgType)
      msg.setMediaId = mediaId
      msg.setFormat = format
      msg.setMsgId = msgId
      msg.setAgentId = agentId
      return msg
    } else {
      let msg = new InSpeechRecognitionResults(obj.ToUserName, obj.FromUserName, obj.CreateTime, obj.MsgType)
      msg.setMediaId = mediaId
      msg.setFormat = format
      msg.setMsgId = msgId
      msg.setAgentId = agentId
      msg.setRecognition = recognition
      return msg
    }
  }

  private static parseInEvent(obj: any): InMsg {
    let event: string = obj.Event
    let eventKey: string = obj.EventKey
    let agentId: string = obj.AgentID

    if ('unsubscribe' == event) {
      let e = new InFollowEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setEventKey = eventKey
      e.setAgentId = agentId
      return e
    }
    let ticket = obj.Ticket
    // 用户未关注时，进行关注后的事件推送
    if ('subscribe' == event && eventKey && eventKey.startsWith('qrscene_')) {
      let e = new InQrCodeEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setEventKey = eventKey
      e.setTicket = ticket
      return e
    }
    // 用户已关注时的事件推送
    if ('SCAN' == event) {
      let e = new InQrCodeEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setEventKey = eventKey
      e.setTicket = ticket
      return e
    }

    if (InFollowEvent.EVENT_INFOLLOW_SUBSCRIBE == event) {
      let e = new InFollowEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setEventKey = eventKey
      e.setAgentId = agentId
      return e
    }
    // 进入应用
    if (InEnterAgentEvent.EVENT == event) {
      let e = new InEnterAgentEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setEventKey = eventKey
      e.setAgentId = agentId
      return e
    }
    // 上报地理位置事件
    if (InLocationEvent.EVENT == event) {
      let e = new InLocationEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setLatitude = obj.Latitude
      e.setLongitude = obj.Longitude
      e.setPrecision = obj.Precision
      e.setAgentId = agentId
      return e
    }
    // 自定义菜单事件之一 1：点击菜单拉取消息时的事件推送
    if (InMenuEvent.EVENT_INMENU_CLICK == event.toUpperCase()) {
      let e = new InMenuEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setEventKey = eventKey
      e.setAgentId = agentId
      return e
    }
    // 自定义菜单事件之二 2：点击菜单跳转链接时的事件推送
    if (InMenuEvent.EVENT_INMENU_VIEW == event.toUpperCase()) {
      let e = new InMenuEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setEventKey = eventKey
      e.setAgentId = agentId
      return e
    }
    // 扫码推事件 和 扫码推事件且弹出“消息接收中”提示框
    if ('scancode_push' == event || 'scancode_waitmsg' == event) {
      let e = new InMenuEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setEventKey = eventKey
      e.setAgentId = agentId
      let scanType = obj.ScanCodeInfo.ScanType
      let scanResult = obj.ScanCodeInfo.ScanResult
      e.setScanCodeInfo = new ScanCodeInfo(scanType, scanResult)
      return e
    }
    // 5. pic_sysphoto：弹出系统拍照发图，这个后台其实收不到该菜单的消息，
    // 点击它后，调用的是手机里面的照相机功能，而照相以后再发过来时，就收到的是一个图片消息了
    if (InMenuEvent.EVENT_INMENU_PIC_SYSPHOTO == event) {
      let e = new InMenuEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setEventKey = eventKey
      e.setAgentId = agentId
      return e
    }
    // pic_photo_or_album：弹出拍照或者相册发图
    if (InMenuEvent.EVENT_INMENU_PIC_PHOTO_OR_ALBUM == event) {
      let e = new InMenuEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setEventKey = eventKey
      e.setAgentId = agentId
      return e
    }
    // pic_weixin：弹出微信相册发图器
    if (InMenuEvent.EVENT_INMENU_PIC_WEIXIN == event) {
      let e = new InMenuEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setEventKey = eventKey
      e.setAgentId = agentId
      return e
    }
    // location_select：弹出地理位置选择器
    if (InMenuEvent.EVENT_INMENU_LOCATION_SELECT == event) {
      let e = new InMenuEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setEventKey = eventKey
      e.setAgentId = agentId
      return e
    }
    // media_id：下发消息（除文本消息）
    if (InMenuEvent.EVENT_INMENU_MEDIA_ID == event) {
      let e = new InMenuEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setEventKey = eventKey
      return e
    }
    // view_limited：跳转图文消息URL
    if (InMenuEvent.EVENT_INMENU_VIEW_LIMITED == event) {
      let e = new InMenuEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setEventKey = eventKey
      return e
    }
    // 模板消息是否送达成功通知事件
    if (InTemplateMsgEvent.EVENT == event) {
      let e = new InTemplateMsgEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setMsgId = obj.MsgID
      e.setStatus = obj.Status
      return e
    }
    // 群发任务结束时是否送达成功通知事件
    if (InMassEvent.EVENT == event) {
      let e = new InMassEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setMsgId = obj.MsgID
      e.setStatus = obj.Status
      e.setTotalCount = obj.TotalCount
      e.setFilterCount = obj.FilterCount
      e.setSentCount = obj.SentCount
      e.setErrorCount = obj.ErrorCount
      return e
    }
    // 多客服接入会话事件
    if (InCustomEvent.EVENT_INCUSTOM_KF_CREATE_SESSION == event) {
      let e = new InCustomEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setKfAccount = obj.KfAccount
      return e
    }
    // 多客服关闭会话事件
    if (InCustomEvent.EVENT_INCUSTOM_KF_CLOSE_SESSION == event) {
      let e = new InCustomEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setKfAccount = obj.KfAccount
      return e
    }
    // 多客服转接会话事件
    if (InCustomEvent.EVENT_INCUSTOM_KF_SWITCH_SESSION == event) {
      let e = new InCustomEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setKfAccount = obj.KfAccount
      e.setToKfAccount == obj.ToKfAccount
      return e
    }
    // 微信摇一摇事件
    if ('ShakearoundUserShake' == event) {
      let e = new InShakearoundUserShakeEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setEvent = event
      e.setUuid = obj.ChosenBeacon.Uuid
      e.setMajor = obj.ChosenBeacon.Major
      e.setMinor = obj.ChosenBeacon.Minor
      e.setDistance = obj.ChosenBeacon.Distance
      e.setAroundBeaconList = obj.AroundBeacons
      return e
    }
    // 资质认证成功 || 名称认证成功 || 年审通知 || 认证过期失效通知
    if ('qualification_verify_success' == event || 'naming_verify_success' == event || 'annual_renew' == event || 'verify_expired' == event) {
      let e = new InVerifySuccessEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setExpiredTime == obj.expiredTime
      return e
    }
    // 资质认证失败 || 名称认证失败
    if ('qualification_verify_fail' == event || 'naming_verify_fail' == event) {
      let e = new InVerifyFailEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setFailTime = obj.failTime
      e.setFailReason = obj.failReason
      return e
    }
    // 门店在审核事件消息 , update by unas at 2016-1-29,add event param
    if (InPoiCheckNotifyEvent.EVENT == event) {
      let e = new InPoiCheckNotifyEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setUniqId = obj.UniqId
      e.setPoiId = obj.PoiId
      e.setResult = obj.Result
      e.setMsg = obj.Msg
      return e
    }
    // wifi 连网后下发消息
    if (InWifiEvent.EVENT == event) {
      let e = new InWifiEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setConnectTime = obj.ConnectTime
      e.setExpireTime = obj.ExpireTime
      e.setVendorId = obj.VendorId
      e.setDeviceNo = obj.DeviceNo
      e.setShopId = obj.ShopId
      return e
    }
    if (InUserCardEvent.EVENT_USER_VIEW == event) {
      let e = new InUserCardEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setCardId = obj.CardId
      e.setUserCardCode = obj.UserCardCode
      return e
    }
    if (InUserCardEvent.EVENT_MEMBERCARD == event) {
      let e = new InUserCardEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setCardId = obj.CardId
      e.setUserCardCode = obj.UserCardCode
      return e
    }
    if (InUpdateMemberCardEvent.EVENT == event) {
      let e = new InUpdateMemberCardEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setCardId = obj.CardId
      e.setUserCardCode = obj.UserCardCode
      e.setModifyBonus = obj.ModifyBonus
      e.setModifyBalance = obj.ModifyBalance
      return e
    }
    if (InUserPayFromCardEvent.EVENT == event) {
      let e = new InUserPayFromCardEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setCardId = obj.CardId
      e.setUserCardCode = obj.UserCardCode
      e.setLocationId = obj.LocationId
      e.setTransId = obj.TransId
      e.setFee = obj.Fee
      e.setOriginalFee = obj.OriginalFee
      return e
    }
    // 微信小店支付消息
    if (InMerChantOrderEvent.EVENT == event) {
      let e = new InMerChantOrderEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setOrderId = obj.OrderId
      e.setOrderStatus = obj.OrderStatus
      e.setProductId = obj.ProductId
      e.setSkuInfo = obj.SkuInfo
      return e
    }
    // 审核通过事件推送
    if (InCardPassCheckEvent.EVENT_PASS == event) {
      let e = new InCardPassCheckEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setCardId = obj.CardId
      e.setRefuseReason = obj.RefuseReason
      return e
    }
    // 审核未通过事件推送
    if (InCardPassCheckEvent.EVENT_NOT_PASS == event) {
      let e = new InCardPassCheckEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setCardId = obj.CardId
      e.setRefuseReason = obj.RefuseReason
      return e
    }
    // 券点流水详情事件
    if (InCardPayOrderEvent.EVENT == event) {
      let e = new InCardPayOrderEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setOrderId = obj.OrderId
      e.setStatus = obj.Status
      e.setCreateOrderTime = obj.CreateOrderTime
      e.setPayFinishTime = obj.PayFinishTime
      e.setDesc = obj.Desc
      e.setFreeCoinCount = obj.FreeCoinCount
      e.setPayCoinCount = obj.PayCoinCount
      e.setRefundFreeCoinCount = obj.RefundFreeCoinCount
      e.setRefundPayCoinCount = obj.RefundPayCoinCount
      e.setOrderType = obj.OrderType
      e.setOrderType = obj.OrderType
      e.setMemo = obj.Memo
      e.setReceiptInfo = obj.ReceiptInfo
      return e
    }
    // 库存报警事件
    if (InCardSkuRemindEvent.EVENT == event) {
      let e = new InCardSkuRemindEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setCardId = obj.CardId
      e.setDetail = obj.Detail
      return e
    }
    // 卡券核销事件推送
    if (InUserConsumeCardEvent.EVENT == event) {
      let e = new InUserConsumeCardEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setCardId = obj.CardId
      e.setUserCardCode = obj.UserCardCode
      e.setConsumeSource = obj.ConsumeSource
      e.setLocationName = obj.LocationName
      e.setStaffOpenId = obj.StaffOpenId
      e.setVerifyCode = obj.VerifyCode
      e.setRemarkAmount = obj.RemarkAmount
      e.setOuterStr = obj.OuterStr
      return e
    }
    // 卡券删除事件推送
    if (InUserCardEvent.EVENT_USER_DEL == event) {
      let e = new InUserCardEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setCardId = obj.CardId
      e.setUserCardCode = obj.UserCardCode
      return e
    }
    // 从卡券进入公众号会话事件推送
    if (InUserCardEvent.EVENT_USER_ENTER == event) {
      let e = new InUserCardEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setCardId = obj.CardId
      e.setUserCardCode = obj.UserCardCode
      return e
    }
    // 卡券领取事件推送
    if (InUserGetCardEvent.EVENT == event) {
      let e = new InUserGetCardEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setCardId = obj.CardId
      e.setIsGiveByFriend = obj.IsGiveByFriend
      e.setUserCardCode = obj.UserCardCode
      e.setFriendUserName = obj.FriendUserName
      e.setOuterId = obj.OuterId
      e.setOldUserCardCode = obj.OldUserCardCode
      e.setOuterStr = obj.OuterStr
      e.setIsRestoreMemberCard = obj.IsRestoreMemberCard
      e.setIsRecommendByFriend = obj.IsRecommendByFriend
      return e
    }
    // 卡券转赠事件推送
    if (InUserGiftingCardEvent.EVENT == event) {
      let e = new InUserGiftingCardEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setCardId = obj.CardId
      e.setUserCardCode = obj.UserCardCode
      e.setIsReturnBack = obj.IsReturnBack
      e.setFriendUserName = obj.FriendUserName
      e.setIsChatRoom = obj.IsChatRoom
      return e
    }
    // 任务卡片事件推送
    if (InTaskEvent.EVENT == event) {
      let e = new InTaskEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setEventKey = eventKey
      e.setTaskId = obj.TaskId
      e.setAgentId = obj.AgentId
      return e
    }
    // 异步任务完成通知
    if (InBatchJobResultEvent.EVENT == event) {
      let e = new InBatchJobResultEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      let batchJob = obj.BatchJob
      e.setEventCode = batchJob.ErrCode
      e.setEventMsg = batchJob.ErrMsg
      e.setJobId = batchJob.JobId
      e.setJobType = batchJob.JobType
      return e
    }
    // 标签/成员/部门变更事件
    if (InUpdateUserEvent.EVENT == event) {
      let changeType = obj.ChangeType

      if (InUpdateTagEvent.CHANGE_TYPE == changeType) {
        let e = new InUpdateTagEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
        e.setTagId = obj.TagId
        e.setAddUserItems = obj.AddUserItems
        e.setDelUserItems = obj.DelUserItems
        e.setAddPartyItems = obj.AddPartyItems
        e.setDelPartyItems = obj.DelPartyItems
        return e
      } else if (InUpdatePartyEvent.CREATE_PARTY == changeType) {
        let e = new InUpdatePartyEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
        e.setChangeType = changeType
        e.setId = obj.Id
        e.setName = obj.Name
        e.setParentId = obj.ParentId
        e.setOrder = obj.Order
        return e
      } else if (InUpdatePartyEvent.UPDATE_PARTY == changeType) {
        let e = new InUpdatePartyEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
        e.setChangeType = changeType
        e.setId = obj.Id
        e.setName = obj.Name
        e.setParentId = obj.ParentId
        return e
      } else if (InUpdatePartyEvent.DELETE_PARTY == changeType) {
        let e = new InUpdatePartyEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
        e.setChangeType = changeType
        e.setId = obj.Id
        return e
      } else if (InUpdateUserEvent.CREATE_USER == changeType) {
        let e = new InUpdateUserEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
        e.setChangeType = changeType
        e.setUserId = obj.UserID
        e.setName = obj.Name
        e.setDepartment = obj.Department
        e.setIsLeaderInDept = obj.IsLeaderInDept
        e.setPosition = obj.Position
        e.setMobile = obj.Mobile
        e.setGender = obj.Gender
        e.setEmail = obj.Email
        e.setStatus = obj.Status
        e.setAvatar = obj.Avatar
        e.setAlias = obj.Alias
        e.setTelephone = obj.Telephone
        e.setAlias = obj.Alias
        e.setAddress = obj.Address
        e.setExtAttr = obj.ExtAttr
        return e
      } else if (InUpdateUserEvent.UPDATE_USER == changeType) {
        let e = new InUpdateUserEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
        e.setChangeType = changeType
        e.setUserId = obj.UserID
        e.setNewUserId = obj.NewUserID
        e.setName = obj.Name
        e.setDepartment = obj.Department
        e.setIsLeaderInDept = obj.IsLeaderInDept
        e.setPosition = obj.Position
        e.setMobile = obj.Mobile
        e.setGender = obj.Gender
        e.setEmail = obj.Email
        e.setStatus = obj.Status
        e.setAvatar = obj.Avatar
        e.setAlias = obj.Alias
        e.setTelephone = obj.Telephone
        e.setAlias = obj.Alias
        e.setAddress = obj.Address
        e.setExtAttr = obj.ExtAttr
        return e
      } else if (InUpdateUserEvent.DELETE_USER == changeType) {
        let e = new InUpdateUserEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
        e.setChangeType = changeType
        e.setUserId = obj.UserID
        return e
      }
    }
    // 企业客户事件
    if (InExternalContactEvent.EVENT == event) {
      let e = new InExternalContactEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.changeType = obj.ChangeType
      e.userId = obj.UserID
      e.externalUserId = obj.ExternalUserID
      e.setState = obj.State
      e.welcomeCode = obj.WelcomeCode
      return e
    }
    console.error(`无法识别的事件类型 ${event}，请前往 https://gitee.com/javen205/TNWX/issues 提 issues`)
    return new InNotDefinedEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
  }

  // 推送suite_ticket
  private static parseInSuiteTicket(obj: any): BaseMsg {
    return new InSuiteTicket(obj.SuiteId, obj.InfoType, obj.TimeStamp, obj.SuiteTicket)
  }

  // 授权通知事件
  private static InAuthEvent(obj: any): BaseMsg {
    let infoType = obj.InfoType
    if (InAuthEvent.CREATE_AUTH === infoType) return new InAuthEvent(obj.SuiteId, obj.InfoType, obj.TimeStamp, obj.AuthCode)
    if (InAuthEvent.CHANGE_AUTH === infoType || InAuthEvent.CANCEL_AUTH === infoType) return new InAuthEvent(obj.SuiteId, obj.InfoType, obj.TimeStamp, undefined, obj.AuthCorpId)
  }

  // 异步任务回调通知
  private static parseInBatchJobResult(obj: any): BaseMsg {
    let batchJob = obj.BatchJob
    return new InBatchJobResult(obj.ServiceCorpId, obj.InfoType, obj.TimeStamp, obj.AuthCorpId, batchJob.JobId, batchJob.JobType)
  }

  // 外部联系人事件
  private static parseInExternalContact(obj: any): BaseMsg {
    return new InExternalContact(obj.SuiteId, obj.AuthCorpId, obj.InfoType, obj.TimeStamp, obj.ChangeType, obj.UserID, obj.ExternalUserID, obj.WelcomeCode)
  }

  // 注册完成回调事件
  private static parseInRegisterCorp(obj: any): BaseMsg {
    let contactSync = obj.ContactSync
    return new InRegisterCorp(
      obj.ServiceCorpId,
      obj.InfoType,
      obj.TimeStamp,
      obj.RegisterCode,
      obj.AuthCorpId,
      contactSync.AccessToken,
      contactSync.ExpiresIn,
      obj.AuthUserInfo.UserId,
      obj.State,
      obj.TemplateId
    )
  }
}
