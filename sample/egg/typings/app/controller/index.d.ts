// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportWxpay from '../../../app/controller/wxpay';
import ExportOpencpOpencpapi from '../../../app/controller/opencp/opencpapi';
import ExportOpenmpOpenmpapi from '../../../app/controller/openmp/openmpapi';
import ExportOpenmpOpenmpmsg from '../../../app/controller/openmp/openmpmsg';
import ExportWxcpQyapi from '../../../app/controller/wxcp/qyapi';
import ExportWxcpQyjssdk from '../../../app/controller/wxcp/qyjssdk';
import ExportWxcpQymsg from '../../../app/controller/wxcp/qymsg';
import ExportWxmpJssdk from '../../../app/controller/wxmp/jssdk';
import ExportWxmpMpmsg from '../../../app/controller/wxmp/mpmsg';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    wxpay: ExportWxpay;
    opencp: {
      opencpapi: ExportOpencpOpencpapi;
    }
    openmp: {
      openmpapi: ExportOpenmpOpenmpapi;
      openmpmsg: ExportOpenmpOpenmpmsg;
    }
    wxcp: {
      qyapi: ExportWxcpQyapi;
      qyjssdk: ExportWxcpQyjssdk;
      qymsg: ExportWxcpQymsg;
    }
    wxmp: {
      jssdk: ExportWxmpJssdk;
      mpmsg: ExportWxmpMpmsg;
    }
  }
}
