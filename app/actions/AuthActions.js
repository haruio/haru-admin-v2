import debug from 'debug'
const log = debug('application:AuthActions.jsx')

import AppDispatcher from '../dispatcher/AppDispatcher.js'
import AppConstants from '../constants/AppConstants.js'
import request from 'superagent'
import utility from '../utils/util.js'

export const URL = 'http://dev-admin.dingo.tv/kerberos'
export let currentuser = {
  accesstoken: localStorage.getItem('ls.AccessToken'),
  location: localStorage.getItem('ls.i18n') != null || localStorage.getItem('ls.i18n') != undefined ? localStorage.getItem('ls.i18n') : 'en_US'
}

const AuthActions = {
  /***
   * Email 회원가입
   * @param userData {object} - join user data
   */
  JoginWithEmail(userData) {
    request.post(utility.getUserUrl() + '/adminusers/signup')
      .set('Content-Type', 'application/json')
      .send(userData).end(function (err, res) {
        if (res.body.errorCode && res.body.message) {
          log(res.body.message)
          return
        }

        if (err != null) {
          //TODO: error
          log('JoginWithEmail :' + err)
          return
        }

        if (res.body.otpKey != '') {
          alert('회원가입 완료, 로그인 하세요.')
          window.location.href = '/'
        }
      })
  },

  /***
   * Email 로그인
   * @param userData {object} - email user data
   */
  LoginWithEmail(userData) {
    log(userData)
    request.post(utility.getUserUrl() + '/adminusers/login')
      .set('Content-Type', 'application/json')
      .send(userData).end(function (err, res) {

        if (res.body.errorCode) {
          //alert(res.body.message) // 암호가 일치 하지 않을때???
          AppDispatcher.handleViewAction({
            type: AppConstants.USER_LOGINFAIL,
            message: res.body.message
          })
          return
        }

        if (err != null) {
          //TODO: error
          log(err)
          return
        }

        let user = {}
        user.realNm = res.body.realNm
        user.userSeq = res.body.userSeq
        user.userTypeSeq = res.body.userTypeSeq
        user.managerYn = res.body.managerYn
        currentuser.accesstoken = res.body.sessionToken

        localStorage.setItem('ls.AccessToken', res.body.sessionToken)
        localStorage.setItem('ls.UserModel', JSON.stringify(user))

        AppDispatcher.handleViewAction({
          type: AppConstants.USER_LOGIN,
          user: user,
          accessToken: res.body.sessionToken
        })
      })
  },
  Logout() {
    AppDispatcher.handleViewAction({
      type: AppConstants.USER_LOGOUT
    })
  }
}

export default AuthActions
