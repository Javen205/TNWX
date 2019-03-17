/**
 * @author Javen 
 * @copyright 2019-03-17 14:45:40 javendev@126.com 
 * @description 接收语音识别结果，与 InVoiceMsg 唯一的不同是多了一个 Recognition 标记
 */
import { InVoiceMsg } from "./InVoiceMsg";

export class InSpeechRecognitionResults extends InVoiceMsg {
    private recognition!: string;

    constructor(toUserName: string, fromUserName: string, createTime: number, msgType: string) {
        super(toUserName, fromUserName, createTime, msgType);
    }

    public get getRecognition(): string {
        return this.recognition;
    }

    public set setRecognition(recognition: string) {
        this.recognition = recognition;
    }
}