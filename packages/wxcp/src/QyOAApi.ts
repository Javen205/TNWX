import * as util from 'util'
import { HttpKit } from '@tnwx/kits'
import { AccessToken, QyAccessTokenApi } from '@tnwx/accesstoken'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description OA 相关接口
 */
export class QyOAApi {
  private static addCalendarUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/calendar/add?access_token=%s'

  /**
   * 创建日历
   * @param organizer 指定的组织者userid
   * @param summary 日历标题。1 ~ 128 字符
   * @param color 日历在终端上显示的颜色，RGB颜色编码16进制表示，例如：”#0000FF” 表示纯蓝色
   * @param description 日历描述。0 ~ 512 字符
   * @param shares 日历共享成员列表。最多2000人
   */
  public static async addCalendar(organizer: string, summary: string, color: string, description?: string, shares?: Array<Attendees>) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.addCalendarUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        calendar: {
          organizer: organizer,
          summary: summary,
          color: color,
          description: description,
          shares: shares
        }
      })
    )
  }

  private static updateCalendarUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/calendar/update?access_token=%s'

  /**
   * 更新日历
   * @param calId 日历ID
   * @param summary 日历标题。1 ~ 128 字符
   * @param color 日历在终端上显示的颜色，RGB颜色编码16进制表示，例如：”#0000FF” 表示纯蓝色
   * @param description 日历描述。0 ~ 512 字符
   * @param shares 日历共享成员列表。最多2000人
   */
  public static async updateCalendar(calId: string, summary: string, color: string, description?: string, shares?: Array<Attendees>) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.updateCalendarUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        calendar: {
          cal_id: calId,
          summary: summary,
          color: color,
          description: description,
          shares: shares
        }
      })
    )
  }

  private static getCalendarUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/calendar/get?access_token=%s'

  /**
   * 获取日历
   * @param calIdList 日历ID列表。一次最多可获取1000条
   */
  public static async getCalendar(calIdList: Array<string>) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.getCalendarUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        cal_id_list: calIdList
      })
    )
  }

  private static delCalendarUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/calendar/del?access_token=%s'

  /**
   * 删除日历
   * @param calId 日历ID
   */
  public static async delCalendar(calId: string) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.delCalendarUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        cal_id: calId
      })
    )
  }

  private static addScheduleUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/schedule/add?access_token=%s'

  /**
   * 创建日程
   * @param organizer 组织者
   * @param startTime 日程开始时间，Unix时间戳
   * @param endTime 日程结束时间，Unix时间戳
   * @param attendees 日程参与者列表。最多支持2000人
   * @param summary 日程标题。0 ~ 128 字符。不填会默认显示为“新建事件”
   * @param description 日程描述。0 ~ 512 字符
   * @param reminders 提醒相关信息
   * @param location 日程地址。0 ~ 128 字符
   * @param calId 日程所属日历ID
   */
  public static async addSchedule(
    organizer: string,
    startTime: number,
    endTime: number,
    attendees?: Array<Attendees>,
    summary?: string,
    description?: string,
    reminders?: Reminders,
    location?: string,
    calId?: string
  ) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.addScheduleUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        schedule: {
          organizer: organizer,
          start_time: startTime,
          end_time: endTime,
          attendees: attendees,
          summary: summary,
          description: description,
          reminders: reminders,
          location: location,
          cal_id: calId
        }
      })
    )
  }

  private static updateScheduleUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/schedule/update?access_token=%s'

  /**
   * 更新日程
   * @param organizer 组织者
   * @param scheduleId 日程ID
   * @param startTime 日程开始时间，Unix时间戳
   * @param endTime 日程结束时间，Unix时间戳
   * @param attendees 日程参与者列表。最多支持2000人
   * @param summary 日程标题。0 ~ 128 字符。不填会默认显示为“新建事件”
   * @param description 日程描述。0 ~ 512 字符
   * @param reminders 提醒相关信息
   * @param location 日程地址。0 ~ 128 字符
   * @param calId 日程所属日历ID
   */
  public static async updateSchedule(
    organizer: string,
    scheduleId: string,
    startTime: number,
    endTime: number,
    attendees?: Array<Attendees>,
    summary?: string,
    description?: string,
    reminders?: Reminders,
    location?: string,
    calId?: string
  ) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.updateScheduleUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        schedule: {
          organizer: organizer,
          schedule_id: scheduleId,
          start_time: startTime,
          end_time: endTime,
          attendees: attendees,
          summary: summary,
          description: description,
          reminders: reminders,
          location: location,
          cal_id: calId
        }
      })
    )
  }

  private static getScheduleUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/schedule/get?access_token=%s'

  /**
   * 获取日程
   * @param scheduleIdList 日程ID列表。一次最多拉取1000条
   */
  public static async getSchedule(scheduleIdList: Array<string>) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.getScheduleUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        schedule_id_list: scheduleIdList
      })
    )
  }

  private static delScheduleUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/schedule/del?access_token=%s'

  /**
   * 删除日程
   * @param scheduleId 日程ID
   */
  public static async delSchedule(scheduleId: string) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.delScheduleUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        schedule_id: scheduleId
      })
    )
  }

  private static getScheduleByCalendarUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/schedule/get_by_calendar?access_token=%s'

  /**
   * 获取日历下的日程列表
   * @param calId 日历ID
   * @param offset 分页，偏移量, 默认为0
   * @param limit 分页，预期请求的数据量，默认为500，取值范围 1 ~ 1000
   */
  public static async getScheduleByCalendar(calId: string, offset = 0, limit = 500) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.getScheduleByCalendarUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        cal_id: calId,
        offset: offset,
        limit: limit
      })
    )
  }

  private static getDialRecordUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/dial/get_dial_record?access_token=%s'

  /**
   * 获取公费电话拨打记录
   * @param startTime 查询的起始时间戳
   * @param endTime 查询的结束时间戳
   * @param offset 分页查询的偏移量
   * @param limit 分页查询的每页大小,默认为100条，如该参数大于100则按100处理
   */
  public static async getDialRecord(startTime: number, endTime: number, offset = 0, limit: 100) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.getDialRecordUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        start_time: startTime,
        end_time: endTime,
        offset: offset,
        limit: limit
      })
    )
  }

  private static getCheckInDataUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/checkin/getcheckindata?access_token=%s'

  /**
   * 获取打卡数据
   * @param checkInType 打卡类型。1：上下班打卡；2：外出打卡；3：全部打卡
   * @param startTime 获取打卡记录的开始时间。Unix时间戳
   * @param endTime 获取打卡记录的结束时间。Unix时间戳
   * @param userIdList 需要获取打卡记录的用户列表
   */
  public static async getCheckInData(checkInType: number, startTime: number, endTime: number, userIdList: Array<string>) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.getCheckInDataUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        opencheckindatatype: checkInType,
        starttime: startTime,
        endtime: endTime,
        useridlist: userIdList
      })
    )
  }

  private static getCheckInoptionUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/checkin/getcheckinoption?access_token=%s'

  /**
   * 获取打卡规则
   * @param datetime 需要获取规则的日期当天0点的Unix时间戳
   * @param userIdList 需要获取打卡规则的用户列表
   */
  public static async getCheckInoption(datetime: number, userIdList: Array<string>) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.getCheckInoptionUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        datetime: datetime,
        useridlist: userIdList
      })
    )
  }

  private static getTemplateDetailUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/gettemplatedetail?access_token=%s'

  /**
   * 获取审批模板详情
   * @param templateId 模板的唯一标识id
   */
  public static async getTemplateDetail(templateId: string) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.getTemplateDetailUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        template_id: templateId
      })
    )
  }
}

export class Attendees {
  private userid: string

  constructor(userId: string) {
    this.userid = userId
  }

  public get userId(): string {
    return this.userid
  }

  public set userId(userId: string) {
    this.userid = userId
  }
}

export class Reminders {
  private is_remind: number
  private remind_before_event_secs: number
  private is_repeat: number
  private repeat_type: number

  constructor(isRemind: number, remindBeforeEventSecs: number, isRepeat: number, repeatType: number) {
    this.is_remind = isRemind
    this.remind_before_event_secs = remindBeforeEventSecs
    this.is_repeat = isRepeat
    this.repeat_type = repeatType
  }

  public get isRemind(): number {
    return this.is_remind
  }

  public set isRemind(isRemind: number) {
    this.is_remind = isRemind
  }

  public get remindBeforeEventSecs(): number {
    return this.remind_before_event_secs
  }

  public set remindBeforeEventSecs(remindBeforeEventSecs: number) {
    this.remind_before_event_secs = remindBeforeEventSecs
  }

  public get isRepeat(): number {
    return this.is_repeat
  }

  public set isRepeat(isRepeat: number) {
    this.is_repeat = isRepeat
  }

  public get repeatType(): number {
    return this.repeat_type
  }

  public set repeatType(repeatType: number) {
    this.repeat_type = repeatType
  }
}
