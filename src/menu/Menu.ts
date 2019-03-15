import { Button } from "./Button";
import { Matchrule } from "./Matchrule";

export class Menu {
    private button: Button[] = [];
    private matchrule: Matchrule = new Matchrule();

    public get Button(): Button[] {
        return this.button;
    }
    public set Button(button: Button[]) {
        this.button = button;
    }

    public get Matchrule(): Matchrule {
        return this.matchrule;
    }
    public set Matchrule(matchrule: Matchrule) {
        this.matchrule = matchrule;
    }
}