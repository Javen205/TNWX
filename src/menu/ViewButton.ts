import { Button } from "./Button";

export class ViewButton extends Button {
    private url: string;

    constructor(name?: string, type?: string, url?: string) {
        super(name, type);
        this.url = url || '';
    }

    public get getUrl(): string {
        return this.url;
    }
    public set setUrl(url: string) {
        this.url = url;
    }
}