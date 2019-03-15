export class TemplateItem {
    private value: string;
    private color: string;

    constructor(value: string, color: string) {
        this.value = value;
        this.color = color;
    }

    public get Value(): string {
        return this.value;
    }
    public set Value(value: string) {
        this.value = value;
    }

    public get Color(): string {
        return this.color;
    }
    public set Color(color: string) {
        this.color = color;
    }
}