import { Button } from "./Button";

export class ComButton extends Button {
    private sub_button!: Button[];

    public get subButton(): Button[] {
        return this.sub_button;
    }
    public set subButton(sub_button: Button[]) {
        this.sub_button = sub_button;
    }
}