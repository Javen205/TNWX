export class Article {
  private title: string
  private description: string
  private url: string
  private picurl: string

  constructor(title: string, description: string, url: string, picurl: string) {
    this.title = title
    this.description = description
    this.url = url
    this.picurl = picurl
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
  public get getUrl(): string {
    return this.url
  }
  public set setUrl(url: string) {
    this.url = url
  }
  public get getPicurl(): string {
    return this.picurl
  }
  public set setPicurl(picurl: string) {
    this.picurl = picurl
  }
}
