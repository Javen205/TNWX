/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 将消息转发到多客服
 */
export class TransInfo {
  // 指定会话接入的客服账号
  private KfAccount: string

  constructor(KfAccount: string) {
    this.KfAccount = KfAccount
  }

  public get getKfAccount(): string {
    return this.KfAccount
  }

  public set setKfAccount(kfAccount: string) {
    this.KfAccount = kfAccount
  }
}
