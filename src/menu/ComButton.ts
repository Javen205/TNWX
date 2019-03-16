import { Button } from "./Button";

export class ComButton extends Button {
    private sub_button: Button[];

    constructor(name?: string, type?: string, sub_button?: Button[]) {
        super(name, type);
        this.sub_button = sub_button || [];
    }

    public get getSubButton(): Button[] {
        return this.sub_button;
    }
    public set setSubButton(sub_button: Button[]) {
        this.sub_button = sub_button;
    }
}