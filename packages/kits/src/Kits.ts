/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 常用的工具方法
 */
import { parseString, Builder } from 'xml2js';
import * as crypto from 'crypto';
import * as md5 from 'md5';
import * as uuid from 'uuid';

export enum SIGN_TYPE {
	SIGN_TYPE_HMACSHA256 = 'HMAC-SHA256',
	SIGN_TYPE_MD5 = 'MD5'
}

export class Kits {
	public static FIELD_SIGN = 'sign';
	public static FIELD_SIGN_TYPE = 'sign_type';
	/**
  	 *  加密方法
  	 *  @param key  加密key
  	 *  @param iv   向量
  	 *  @param data 需要加密的数据
  	 */
	public static aes128cbcEncrypt(key: Buffer, iv: Buffer, data: string) {
		let cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
		let crypted = cipher.update(data, 'utf8', 'binary');
		crypted += cipher.final('binary');
		crypted = new Buffer(crypted, 'binary').toString('base64');
		return crypted;
	}
	/**
  	 *  解密方法
  	 *  @param key      解密的key
  	 *  @param iv       向量
  	 *  @param crypted  密文
  	 */
	public static aes128cbcDecrypt(key: Buffer, iv: Buffer, crypted: string) {
		crypted = new Buffer(crypted, 'base64').toString('binary');
		let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
		// 设置自动 padding 为 true，删除填充补位
		decipher.setAutoPadding(true);
		let decoded = decipher.update(crypted, 'binary', 'utf8');
		decoded += decipher.final('utf8');
		return decoded;
	}
	/**
	 * hmacsha256 加密
	 * @param data
	 * @param key
	 */
	public static hmacsha256(data: string, key: string): string {
		return crypto.createHmac('sha256', key).update(data, 'utf8').digest('hex').toUpperCase();
	}
	/**
     * sha1加密
     * @param data 
     */
	public static sha1(data: string) {
		return crypto.createHash('sha1').update(data).digest('hex').toUpperCase();
	}
	/**
	 * md5 加密
	 * @param data
	 */
	public static md5(data: string | Buffer | Array<number>): string {
		return md5(data).toUpperCase();
	}
	/**
	 * 随机生成字符串
	 */
	public static generateStr() {
		return uuid.v4().replace(/\-/g, '');
	}

	/**
	 * 生成签名
	 * @param data
	 * @param key api key
	 * @param signTypeParam 签名类型
	 */
	public static generateSignature(data: any, key: string, signTypeParam: SIGN_TYPE) {
		let signType = signTypeParam || SIGN_TYPE.SIGN_TYPE_MD5;
		if (signType !== SIGN_TYPE.SIGN_TYPE_MD5 && signType !== SIGN_TYPE.SIGN_TYPE_HMACSHA256) {
			throw new Error('Invalid signType: ' + signType);
		}
		let combineStr = '';
		let sortArray = Object.keys(data).sort();
		for (let i = 0; i < sortArray.length; ++i) {
			let key = sortArray[i];
			if (key !== this.FIELD_SIGN && data[key]) {
				let value = String(data[key]);
				if (value.length > 0) {
					combineStr = combineStr + key + '=' + value + '&';
				}
			}
		}
		if (combineStr.length === 0) {
			throw new Error('There is no data to generate signature');
		} else {
			combineStr = combineStr + 'key=' + key;
			if (signType === SIGN_TYPE.SIGN_TYPE_MD5) {
				return this.md5(combineStr);
			} else if (signType === SIGN_TYPE.SIGN_TYPE_HMACSHA256) {
				return this.hmacsha256(combineStr, key);
			} else {
				throw new Error('Invalid signType: ' + signType);
			}
		}
	}
	/**
	 * 生成带有签名的 xml 数据
	 * @param data
	 * @param key
	 * @param signType
	 */
	public static generateSignedXml(data: object, key: string, signType: SIGN_TYPE) {
		let that = this;
		let clonedData = JSON.parse(JSON.stringify(data));
		// 添加签名 sign
		clonedData[this.FIELD_SIGN] = this.generateSignature(data, key, signType);
		return new Promise(function(resolve, reject) {
			that
				.obj2xml(clonedData)
				.then(function(xmlStr) {
					resolve(xmlStr);
				})
				.catch(function(err) {
					reject(err);
				});
		});
	}

	/**
	 * xml 字符串转换成对象
	 * @param xmlStr
	 */
	public static xml2obj(xmlStr: string) {
		return new Promise(function(resolve, reject) {
			parseString(xmlStr, function(err, result) {
				if (err) {
					reject(err);
				} else {
					let data = result['xml'];
					let obj: any = {};
					Object.keys(data).forEach(function(key) {
						if (data[key].length > 0) {
							obj[key] = data[key][0];
						}
					});
					resolve(obj);
				}
			});
		});
	}

	/**
	 * 普通对象转换成 xml 字符串
	 * @param obj
	 */
	public static obj2xml(obj: Object) {
		return new Promise(function(resolve, reject) {
			let builder = new Builder({ cdata: true, rootName: 'xml' });
			try {
				let xmlStr = builder.buildObject(obj);
				resolve(xmlStr);
			} catch (err) {
				reject(err);
			}
		});
	}
}
