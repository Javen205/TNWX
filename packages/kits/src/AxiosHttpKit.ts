import { ApiConfigKit } from '@tnwx/accesstoken'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 使用 request 实现网络请求
 */
import axios from 'axios'
import * as fs from 'fs'
import { HttpDelegate } from './HttpKit'
import * as FormData from 'form-data'
import * as https from 'https'
import concat = require('concat-stream')

export class AxiosHttpKit implements HttpDelegate {
  httpGet(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(response => {
          if (response.status === 200) {
            resolve(JSON.stringify(response.data))
          } else {
            reject(`error code ${response.status}`)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  httpGetWitchOptions(url: string, options?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(url, options)
        .then(response => {
          if (response.status === 200) {
            resolve(response.data)
          } else {
            reject(`error code ${response.status}`)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  httpPost(url: string, data: string): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then(response => {
          if (response.status === 200) {
            resolve(JSON.stringify(response.data))
          } else {
            reject(`error code ${response.status}`)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  httpPostWitchOptions(url: string, data: string, options?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data, options)
        .then(response => {
          if (response.status === 200) {
            resolve(response.data)
          } else {
            reject(`error code ${response.status}`)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  httpPostWithCert(url: string, data: string, certFileContent: Buffer, caFileContent: Buffer, passphrase: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let httpsAgent = new https.Agent({
        rejectUnauthorized: false,
        ca: caFileContent,
        pfx: certFileContent,
        passphrase
      })

      axios
        .post(url, data, { httpsAgent })
        .then(response => {
          if (response.status === 200) {
            resolve(JSON.stringify(response.data))
          } else {
            reject(`error code ${response.status}`)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  upload(url: string, filePath: string, params?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let formData = new FormData()
      formData.append('media', fs.createReadStream(filePath))
      if (params) {
        formData.append('description', params)
      }
      formData.pipe(
        concat({ encoding: 'buffer' }, async data => {
          axios
            .post(url, data, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(response => {
              if (response.status === 200) {
                resolve(JSON.stringify(response.data))
              } else {
                reject(`error code ${response.status}`)
              }
            })
            .catch(error => {
              reject(error)
            })
        })
      )
    })
  }
}
