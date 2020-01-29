import { OutMsg } from './OutMsg'
import { InMsg } from '../in/InMsg'

export class OutTextMsg extends OutMsg {
  private content: string

  constructor(inMsg: InMsg) {
    super(inMsg)
    this.msgType = 'text'
  }

  public toXml(): string {
    let str = super.toXml()
    if (!this.content) {
      throw new Error('content is null')
    }
    str += '<Content><![CDATA[' + this.content + ']]></Content>\n</xml>\n'
    return str
  }

  public get getContent(): string {
    return this.content
  }

  public setContent(content: string): OutTextMsg {
    this.content = content
    return this
  }
}
