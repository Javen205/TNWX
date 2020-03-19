// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportJssdk from '../../../app/middleware/jssdk';
import ExportOpenjssdk from '../../../app/middleware/openjssdk';
import ExportQyjssdk from '../../../app/middleware/qyjssdk';

declare module 'egg' {
  interface IMiddleware {
    jssdk: typeof ExportJssdk;
    openjssdk: typeof ExportOpenjssdk;
    qyjssdk: typeof ExportQyjssdk;
  }
}
