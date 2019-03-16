export class TemplateItem {
    private value: string;
    private color: string;

    constructor(value: string, color: string) {
        this.value = value;
        this.color = color;
    }

    public get getValue(): string {
        return this.value;
    }
    public set setValue(value: string) {
        this.value = value;
    }

    public get getColor(): string {
        return this.color;
    }
    public set setColor(color: string) {
        this.color = color;
    }
}