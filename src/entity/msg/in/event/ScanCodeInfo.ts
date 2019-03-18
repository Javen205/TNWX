/**
 * @author Javen 
 * @copyright 2019-03-17 17:28:34 javendev@126.com 
 * @description 菜单二维码扫描的结果
 */

export class ScanCodeInfo {
    private ScanType: string;
    private ScanResult: string;

    constructor(scanType: string, scanResult: string) {
        this.ScanType = scanType;
        this.ScanResult = scanResult;
    }

    public get getScanType(): string {
        return this.ScanType;
    }
    public set setScanType(scanType: string) {
        this.ScanType = scanType;
    }
    public get getScanResult(): string {
        return this.ScanResult;
    }
    public set setScanResult(scanResult: string) {
        this.ScanResult = scanResult;
    }
}