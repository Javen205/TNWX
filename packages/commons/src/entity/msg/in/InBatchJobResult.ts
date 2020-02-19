import { BaseMsg } from '../BaseMsg'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 异步任务回调通知
 */

export class InBatchJobResult extends BaseMsg {
  public static INFO_TYPE: string = 'batch_job_result'

  private servicecorpid: string
  private infotype: string
  private timestamp: number
  private authcorpid: string
  private jobid: string
  private jobtype: string

  constructor(serviceCorpId: string, infoType: string, timeStamp: number, authCorpId: string, jobId: string, jobType: string) {
    super()
    this.servicecorpid = serviceCorpId
    this.infotype = infoType
    this.timestamp = timeStamp
    this.authcorpid = authCorpId
    this.jobid = jobId
    this.jobtype = jobType
  }

  public get serviceCorpId(): string {
    return this.servicecorpid
  }

  public set serviceCorpId(serviceCorpId: string) {
    this.servicecorpid = serviceCorpId
  }

  public get infoType(): string {
    return this.infotype
  }

  public set infoType(infoType: string) {
    this.infotype = infoType
  }

  public get timeStamp(): number {
    return this.timestamp
  }

  public set timeStamp(timeStamp: number) {
    this.timestamp = timeStamp
  }

  public get authCorpId(): string {
    return this.authcorpid
  }

  public set authCorpId(authCorpId: string) {
    this.authCorpId = authCorpId
  }

  public get jobId(): string {
    return this.jobid
  }

  public set jobId(jobId: string) {
    this.jobid = jobId
  }

  public get jobType(): string {
    return this.jobtype
  }

  public set jobType(jobType: string) {
    this.jobtype = jobType
  }
}
