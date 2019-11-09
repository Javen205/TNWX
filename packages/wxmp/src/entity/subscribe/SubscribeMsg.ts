/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 订阅消息
 */
export class SubscribeMsg {
  private touser: string
  private template_id: string
  private url: string
  private miniprogram: MiniProgram
  private scene: number
  private title: string
  private data: Data

  constructor(touser: string, template_id: string, scene: number, title: string, data: Data) {
    this.touser = touser
    this.template_id = template_id
    this.scene = scene
    this.title = title
    this.data = data
  }

  public get getUrl(): string {
    return this.url
  }

  public set setUrl(url: string) {
    this.url = url
  }

  public get getMiniProgram(): MiniProgram {
    return this.miniprogram
  }

  public set setMiniProgram(miniprogram: MiniProgram) {
    this.miniprogram = miniprogram
  }
}

export class MiniProgram {
  private appid: string
  private pagepath: string
  constructor(appid: string, pagepath: string) {
    this.appid = appid
    this.pagepath = pagepath
  }
}

export class Data {
  private content: Content

  constructor(content: Content) {
    this.content = content
  }
}

export class Content {
  private value: string
  private color: string

  constructor(value: string, color: string) {
    this.value = value
    this.color = color
  }
}
