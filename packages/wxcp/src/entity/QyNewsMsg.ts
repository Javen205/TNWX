import { QyBaseMsg } from './QyBaseMsg'
import { QySendMessageType } from '../QySendMsgApi'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 图文消息
 */
export class QyNewsMsg extends QyBaseMsg {
  private news: QyArticles

  constructor(
    news: QyArticles,
    agentId: string,
    toUser?: string,
    toParty?: string,
    toTag?: string,
    safe = 0,
    enableIdTrans = 0,
    enableDuplicateCheck = 0,
    duplicateCheckInterval = 1800
  ) {
    super(QySendMessageType.NEWS, agentId, toUser, toParty, toTag, safe, enableIdTrans, enableDuplicateCheck, duplicateCheckInterval)
    this.news = news
  }

  public get getNews(): QyArticles {
    return this.news
  }

  public set setNews(news: QyArticles) {
    this.news = news
  }
}

export class QyArticles {
  private articles: Array<QyNews>

  constructor(articles: Array<QyNews>) {
    this.articles = articles
  }

  public set setArticles(articles: Array<QyNews>) {
    this.articles = articles
  }

  public get getArticles(): Array<QyNews> {
    return this.articles
  }
}

export class QyNews {
  private title: string
  private description: string
  private picurl: string
  private url: string

  constructor(title: string, description: string, picUrl: string, url: string) {
    this.title = title
    this.description = description
    this.picurl = picUrl
    this.url = url
  }

  public get getTitle(): string {
    return this.title
  }

  public set setTitle(title: string) {
    this.title = title
  }

  public get getDescription(): string {
    return this.description
  }

  public set setDescription(description: string) {
    this.description = description
  }

  public get picUrl(): string {
    return this.picurl
  }

  public set picUrl(picUrl: string) {
    this.picurl = picUrl
  }

  public get getUrl(): string {
    return this.url
  }

  public set setUrl(url: string) {
    this.url = url
  }
}
