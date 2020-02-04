import { QyBaseMsg } from './QyBaseMsg'
import { QySendMessageType } from '../QySendMsgApi'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 图文消息 mpnews
 */
export class QyMpNewsMsg extends QyBaseMsg {
  private mpnews: QyMpNewsArticles

  constructor(
    mpnews: QyMpNewsArticles,
    agentId?: string,
    toUser?: string,
    toParty?: string,
    toTag?: string,
    safe = 0,
    enableIdTrans = 0,
    enableDuplicateCheck = 0,
    duplicateCheckInterval = 1800
  ) {
    super(QySendMessageType.MPNEWS, agentId, toUser, toParty, toTag, safe, enableIdTrans, enableDuplicateCheck, duplicateCheckInterval)
    this.mpnews = mpnews
  }

  public get mpNews(): QyMpNewsArticles {
    return this.mpnews
  }

  public set mpNews(mpnews: QyMpNewsArticles) {
    this.mpnews = mpnews
  }
}

export class QyMpNewsArticles {
  private articles: Array<QyMpNews>

  constructor(articles: Array<QyMpNews>) {
    this.articles = articles
  }

  public set setArticles(articles: Array<QyMpNews>) {
    this.articles = articles
  }

  public get getArticles(): Array<QyMpNews> {
    return this.articles
  }
}

export class QyMpNews {
  private title: string
  private thumb_media_id: string
  private author: string
  private content_source_url: string
  private content: string
  private digest: string

  constructor(title: string, thumbMediaId: string, content: string, author?: string, contentSourceUrl?: string, digest?: string) {
    this.title = title
    this.thumb_media_id = thumbMediaId
    this.author = author
    this.content = content
    this.digest = digest
  }

  public get getTitle(): string {
    return this.title
  }

  public set setTitle(title: string) {
    this.title = title
  }

  public get thumbMediaId(): string {
    return this.thumb_media_id
  }

  public set thumbMediaId(thumbMediaId: string) {
    this.thumb_media_id = thumbMediaId
  }

  public get getAuthor(): string {
    return this.author
  }

  public set setAuthor(author: string) {
    this.author = author
  }

  public get contentSourceUrl(): string {
    return this.content_source_url
  }

  public set contentSourceUrl(contentSourceUrl: string) {
    this.content_source_url = contentSourceUrl
  }

  public get getContent(): string {
    return this.content
  }

  public set setContent(content: string) {
    this.content = content
  }

  public get getDigest(): string {
    return this.digest
  }

  public set setDigest(digest: string) {
    this.digest = digest
  }
}
