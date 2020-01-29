export class News {
  private title: string
  private description: string
  private picUrl: string
  private url: string

  public static getInstantiationNews(title: string, description: string, picUrl: string, url: string): News {
    let news = new News()
    news.title = title
    news.description = description
    news.picUrl = picUrl
    news.url = url
    return news
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

  public get getPicUrl(): string {
    return this.picUrl
  }

  public set setPicUrl(picUrl: string) {
    this.picUrl = picUrl
  }

  public get getUrl(): string {
    return this.url
  }

  public set setUrl(url: string) {
    this.url = url
  }
}
