import axios from 'axios'
import * as fs from 'fs'
import { HttpDelegate } from './HttpKit'
import * as FormData from 'form-data'
import * as https from 'https'
import concat = require('concat-stream')

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 使用 Axios 实现网络请求
 */
export class AxiosHttpKit implements HttpDelegate {
  httpGet(url: string, options?: any): Promise<any> {
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

  httpGetToResponse(url: string, options?: any): Promise<any> {
    return new Promise(resolve => {
      axios
        .get(url, options)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          resolve(error.response)
        })
    })
  }

  httpPost(url: string, data: string, options?: any): Promise<any> {
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

  httpPostToResponse(url: string, data: string, options?: any): Promise<any> {
    return new Promise(resolve => {
      axios
        .post(url, data, options)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          resolve(error.response)
        })
    })
  }

  httpPutToResponse(url: string, data: string, options?: any): Promise<any> {
    return new Promise(resolve => {
      axios
        .put(url, data, options)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          resolve(error.response)
        })
    })
  }

  httpDeleteToResponse(url: string, options?: any): Promise<any> {
    return new Promise(resolve => {
      axios
        .delete(url, options)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          resolve(error.response)
        })
    })
  }

  httpPostWithCert(url: string, data: string, certFileContent: Buffer, passphrase: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let httpsAgent = new https.Agent({
        pfx: certFileContent,
        passphrase
      })

      axios
        .post(url, data, { httpsAgent })
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
                resolve(response.data)
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

  uploadToResponse(url: string, filePath: string, params?: string, options?: any): Promise<any> {
    return new Promise(resolve => {
      let formData = new FormData()
      formData.append('file', fs.createReadStream(filePath))
      if (params) {
        formData.append('meta', params)
      }
      formData.pipe(
        concat({ encoding: 'buffer' }, async data => {
          axios
            .post(url, data, options)
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              console.log(error)
              resolve(error.response)
            })
        })
      )
    })
  }
}
