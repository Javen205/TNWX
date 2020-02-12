// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportJssdk from '../../../app/middleware/jssdk';
import ExportQyjssdk from '../../../app/middleware/qyjssdk';

declare module 'egg' {
  interface IMiddleware {
    jssdk: typeof ExportJssdk;
    qyjssdk: typeof ExportQyjssdk;
  }
}
