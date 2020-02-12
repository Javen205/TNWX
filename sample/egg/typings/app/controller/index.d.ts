// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportJssdk from '../../../app/controller/jssdk';
import ExportMpMsg from '../../../app/controller/mpMsg';
import ExportQyMsg from '../../../app/controller/qyMsg';
import ExportQyjssdk from '../../../app/controller/qyjssdk';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    jssdk: ExportJssdk;
    mpMsg: ExportMpMsg;
    qyMsg: ExportQyMsg;
    qyjssdk: ExportQyjssdk;
  }
}
