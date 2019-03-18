import { Button } from "./Button";
import { Matchrule } from "./Matchrule";

export class Menu {
    private button!: Button[];
    private matchrule!: Matchrule;

    public get getButton(): Button[] {
        return this.button;
    }
    public set setButton(button: Button[]) {
        this.button = button;
    }

    public get getMatchrule(): Matchrule {
        return this.matchrule;
    }
    public set setMatchrule(matchrule: Matchrule) {
        this.matchrule = matchrule;
    }
}