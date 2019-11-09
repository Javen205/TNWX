export class MenuMsg {
  private id: string
  private content: string

  constructor(id: string, content: string) {
    this.id = id
    this.content = content
  }

  public get getId(): string {
    return this.id
  }

  public set setId(id: string) {
    this.id = id
  }

  public get getContent(): string {
    return this.content
  }

  public set setContent(content: string) {
    this.content = content
  }
}
