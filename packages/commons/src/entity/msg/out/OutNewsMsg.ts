import { OutMsg } from './OutMsg'
import { News } from './News'
import { InMsg } from '../in/InMsg'

export class OutNewsMsg extends OutMsg {
  private articles: News[] = []

  constructor(inMsg: InMsg) {
    super(inMsg)
    this.msgType = 'news'
  }
  public toXml(): string {
    let str = super.toXml()
    str += '<ArticleCount>' + this.getArticleCount + '</ArticleCount>\n<Articles>\n'
    this.articles.forEach(item => {
      str += '<item>\n'
      str += '<Title><![CDATA[' + item.getTitle + ']]></Title>\n'
      str += '<Description><![CDATA[' + item.getDescription + ']]></Description>\n'
      str += '<PicUrl><![CDATA[' + item.getPicUrl + ']]></PicUrl>\n'
      str += '<Url><![CDATA[' + item.getUrl + ']]></Url>\n'
      str += '</item>\n'
    })
    str += '</Articles>\n'
    str += '</xml>\n'
    return str
  }

  public get getArticleCount(): number {
    return this.articles.length
  }

  public get getArticles(): News[] {
    return this.articles
  }

  public set setArticles(articles: News[]) {
    if (articles != null) this.articles = articles
  }

  public addNews(articles: News[]): OutNewsMsg {
    if (articles != null) this.articles.concat(articles)
    return this
  }

  public addArticle(title: string, description: string, picUrl: string, url: string): OutNewsMsg {
    this.articles.push(News.getInstantiationNews(title, description, picUrl, url))
    return this
  }

  public addNew(news: News): OutNewsMsg {
    this.articles.push(news)
    return this
  }
}
