import { Button } from "./Button";

export class ViewButton extends Button {
    private url: string = '';

    public get Url(): string {
        return this.url;
    }
    public set Url(url: string) {
        this.url = url;
    }
}