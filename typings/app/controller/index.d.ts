// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportMsg from '../../../app/controller/msg';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    msg: ExportMsg;
  }
}
