export class Button {
    private name: string;
    private type: string;

    constructor(name?: string, type?: string) {
        this.name = name || '';
        this.type = type || '';
    }

    public get getName(): string {
        return this.name;
    }
    public set setName(name: string) {
        this.name = name;
    }

    public get getType(): string {
        return this.type;
    }
    public set setType(type: string) {
        this.type = type;
    }
}