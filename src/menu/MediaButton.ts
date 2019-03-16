import { Button } from "./Button";

export class MediaButton extends Button {
    private media_id: string;

    constructor(name?: string, type?: string, media_id?: string) {
        super(name, type);
        this.media_id = media_id || '';
    }

    public get getMediaId(): string {
        return this.media_id;
    }
    public set setMediaId(media_id: string) {
        this.media_id = media_id;
    }
}