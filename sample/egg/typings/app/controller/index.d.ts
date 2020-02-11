// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportMpMsg from '../../../app/controller/mpMsg';
import ExportQyMsg from '../../../app/controller/qyMsg';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    mpMsg: ExportMpMsg;
    qyMsg: ExportQyMsg;
  }
}
