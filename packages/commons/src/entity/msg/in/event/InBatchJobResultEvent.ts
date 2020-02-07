import { EventInMsg } from './EventInMsg'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 异步任务完成通知
 */
export class InBatchJobResultEvent extends EventInMsg {
  public static EVENT: string = 'batch_job_result'

  private jobId: string
  private jobType: string
  private eventCode: number
  private eventMsg: string

  constructor(toUserName: string, fromUserName: string, createTime: number, event: string) {
    super(toUserName, fromUserName, createTime, event)
  }

  public get getJobId(): string {
    return this.jobId
  }

  public set setJobId(jobId: string) {
    this.jobId = jobId
  }

  public set setJobType(jobType: string) {
    this.jobType = jobType
  }

  public get getJobType(): string {
    return this.jobType
  }

  public set setEventCode(eventCode: number) {
    this.eventCode = eventCode
  }

  public get getEventCode(): number {
    return this.eventCode
  }

  public set setEventMsg(eventMsg: string) {
    this.eventMsg = eventMsg
  }
  public get getEventMsg(): string {
    return this.eventMsg
  }
}
