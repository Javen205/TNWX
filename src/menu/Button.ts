export class Button {
    private name: string = '';
    private type: string = '';

    public get Name(): string {
        return this.name;
    }
    public set Name(name: string) {
        this.name = name;
    }

    public get Type(): string {
        return this.type;
    }
    public set Type(type: string) {
        this.type = type;
    }
}