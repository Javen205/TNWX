// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportJssdk from '../../../app/controller/jssdk';
import ExportMpmsg from '../../../app/controller/mpmsg';
import ExportQyapi from '../../../app/controller/qyapi';
import ExportQyjssdk from '../../../app/controller/qyjssdk';
import ExportQymsg from '../../../app/controller/qymsg';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    jssdk: ExportJssdk;
    mpmsg: ExportMpmsg;
    qyapi: ExportQyapi;
    qyjssdk: ExportQyjssdk;
    qymsg: ExportQymsg;
  }
}
