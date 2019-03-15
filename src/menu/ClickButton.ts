import { Button } from "./Button";

export class ClickButton extends Button {
    private key!: string;

    public get Key(): string {
        return this.key;
    }
    public set Key(key: string) {
        this.key = key;
    }
}