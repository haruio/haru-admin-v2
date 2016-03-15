import CryptoJS from 'crypto-js'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////         URL Parsing 관련 메소드              ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default {
  /**
   * post 작성 시, 해당 리소스 url valition (http/https 포함 + domain 형식 여부 확인)
   */
  sourceUrlCheck(url, opt) {
    let validationRegex
    if(opt == undefined) {
      // http/https를 꼭 포함해야할 때
      validationRegex = /^((http(s?))\:\/\/)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/;
    } else {
      // 꼭 포함하지 않아도 될 때
      validationRegex = /^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/;
    }

    return validationRegex.test(url)
  },

  /**
   * iteration 작업 할 object의 empty 여부 check
   */
  emptyObjectCheck(object) {
    return object != undefined && Object.keys(object).length != 0
  },

  /**
   * iteration 작업 할 array의 empty 여부 check
   */
  emptyArrayCheck(object) {
    return object != undefined && object.length != 0
  },

  /**
   * 서버 response의 user token 관련 error handler
   */
  errorHandler(err, res) {
    if(res.body && res.body.errorCode && (res.body.errorCode == 'ADMIN.MISSING_SESSION_TOKEN' || res.body.errorCode == 'ADMIN.INVALID_SESSION_TOKEN')) {
      alert(res.body.message)
      location.href = '/'
      return true
    } else if(res.body && res.body.errorCode && res.body.message) {
      alert(res.body.message)
      return true
    }

    if(err != null) {
      if(res.body && res.body.errorCode && res.body.message) {
        alert(res.body.message)
        return true
      } else {
        alert(res.text)
        return true
      }
    }

    return false;
  },

  /***
   *  로그인/회원가입 시 사용자 패스워드 암호화
   * @param key {string} - email
   * @param value {string} - password
   * @returns {string} - EncryptionData
     */
  getEncryptionData(key, value) {
    let salt = CryptoJS.lib.WordArray.random(16)

    let iv = CryptoJS.lib.WordArray.random(16)
    let iv_hex = CryptoJS.enc.Hex.stringify(iv)

    let key_hex = CryptoJS.PBKDF2(key, salt, { keySize: 256/32, iterations: 10 })

    let encrypted = CryptoJS.AES.encrypt(value, key_hex, { iv: iv })

    // ----- base64 encoding ----------
    let encryptedtxt = iv_hex + ':' + encrypted.ciphertext.toString(CryptoJS.enc.Base64) + ':' + CryptoJS.enc.Hex.stringify(salt)

    return encryptedtxt
  },

  /***
   * 사용자 패스워드 복호화
   * @param key {string}
   * @param encValue {string}
   * @returns {*}
     */
  getDecryptionData(key, encValue) {
    var values = encValue.split(':')
    var iv_hex = values[0];
    var encData = values[1];
    var salt_hex = values[2];
    var salt = CryptoJS.enc.Hex.parse(salt_hex);
    var key_hex = CryptoJS.PBKDF2(key, salt, { keySize: 256/32, iterations: 10 });
    var iv = CryptoJS.enc.Hex.parse(iv_hex);

    var decrypted = CryptoJS.AES.decrypt(encData, key_hex,{iv: iv});

    return decrypted.toString(CryptoJS.enc.Utf8);

  },

  /**
   * localStorage clear
   */
  localStorageClear() {
    localStorage.removeItem("ls.AccessToken")
    localStorage.removeItem("ls.UserModel")
    localStorage.removeItem("ls.Protocol")
    localStorage.removeItem("ls.Host")
  },
  /**
   * ADMIN 접속 시, 해당 접속 페이지의 sub domain 및 url schema parse
   */
  urlParser() {
    let protocol = window.location.protocol + '//'
    let host = window.location.host

    if(host.indexOf('localhost') != -1 || host.indexOf('127.0.0.1') != -1) {
      /**
       * dev env
       * @type {string}
       */
      host = 'dev-admin.dingo.tv';
    }

    localStorage.setItem("ls.Protocol", protocol);
    localStorage.setItem("ls.Host", host);
  },

  getProtocol() {
    return localStorage.getItem("ls.Protocol");
  },

  getHost() {
    return localStorage.getItem("ls.Host");
  },

  getUrl(type) {
    var host = this._getRequestServiceType(type);
    return (localStorage.getItem("ls.Protocol") + host);
  },

  getUserUrl(type) {
    var host = this._getRequestServiceType(type);
    return ('https://' + host);
  },

  getServiceUrl() {
    var prelocale = /\w*([\-])/g.exec(this.getHost());
    //console.log(prelocale != null ? prelocale[0].replace("-", "") : "");
    var predomain = prelocale != null ? prelocale[0].replace("-", ".") : "";

    return "http://"+ predomain + "dingo.tv/v/";
  },

  _getRequestServiceType(type) {
    let host = "dev-admin.dingo.tv"
    if(type == null || type == undefined) {
      host = host + "/kerberos"
    } else {
      host = host + "/" + type
    }

    return host
  },

  isManager() {
    let managerYn = JSON.parse(localStorage.getItem("ls.UserModel")).managerYn
    if(managerYn != null
      && managerYn != undefined
      && managerYn == 'Y') {
      return true
    }

    return false
  },

  isMyContents(createCid) {
    let userSeq = JSON.parse(localStorage.getItem("ls.UserModel")).userSeq
    if( userSeq != null
      && userSeq != undefined
      && userSeq == createCid) {
      return true
    }

    return false
  },


  emailcheck(strValue) {
    let regExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/
    //입력을 안했으면
    if (strValue.length === 0) {
      return true
    }
    //이메일 형식에 맞지않으면
    if (!strValue.match(regExp)) {
      return true
    }
    return false
  }

}
