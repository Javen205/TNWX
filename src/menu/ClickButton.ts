import { Button } from "./Button";

export class ClickButton extends Button {
    private key: string;

    constructor(name?: string, type?: string, key?: string) {
        super(name, type);
        this.key = key || '';
    }

    public get getKey(): string {
        return this.key;
    }
    public set setKey(key: string) {
        this.key = key;
    }
}