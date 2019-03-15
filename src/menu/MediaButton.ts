import { Button } from "./Button";

export class MediaButton extends Button {
    private media_id!: string;

    public get mediaId(): string {
        return this.media_id;
    }
    public set mediaId(media_id: string) {
        this.media_id = media_id;
    }
}