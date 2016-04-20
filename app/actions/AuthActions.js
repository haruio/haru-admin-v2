import debug from 'debug'
const log = debug('application:AuthActions.jsx')

import AppDispatcher from '../dispatcher/AppDispatcher.js'
import AppConstants from '../constants/AppConstants.js'
import request from 'superagent'
import utility from '../utils/util.js'

export const APPVERSION = 'v0.9'
export const BUILDVERSION = '10'

const API_VERSION = 'v1'
const CMSAPI_VERSION = 'v2'
export const DINGOURL = `http://dev-id-api.dingo.tv/${API_VERSION}`
export const URL = `http://dev-admin.dingo.tv/kerberos/${CMSAPI_VERSION}`
export const OLD_URL = 'http://dev-admin.dingo.tv/kerberos'
export let currentuser = {
  accesstoken: localStorage.getItem('ls.AccessToken'),
  location: localStorage.getItem('ls.i18n') != null || localStorage.getItem('ls.i18n') != undefined ? localStorage.getItem('ls.i18n') : 'en_US'
}

/***
 * middleware_accesstoken
 * superagent middleware : access token 이 있으면 header에 추가
 * @param request {object}
 * @returns {*}
 */
export function middleware_accesstoken(request) {
  if (currentuser.accesstoken != null) {
    request.set('x-auth-token', currentuser.accesstoken)
  }
  request.type('json')
  return request
}


const AuthActions = {
  /***
   * Email 회원가입
   * @param userData {object} - join user data
   */
  JoginWithEmail(userData) {
    request.post(utility.getUserUrl() + '/adminusers/signup')
      .set('Content-Type', 'application/json')
      .send(userData)
      .end(function (err, res) {
        if (err != null) {
          log('JoginWithEmail :' + err)
          return
        }

        if (res.body.errorCode && res.body.message) {
          log(res.body.message)
          return
        }

        if (res.body.otpKey != '') {
          AppDispatcher.handleViewAction({
            type: AppConstants.USER_JOIN
          })
        }
      })
  },
  /***
   * Email 로그인
   * @param userData {object} - email user data
   */
  LoginWithEmail(userData) {
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
    request.post(utility.getUserUrl() + '/adminusers/logout')
      .set('Content-Type', 'application/json')
      .use(middleware_accesstoken)
      .end(function (err, res) {

        AppDispatcher.handleViewAction({
          type: AppConstants.USER_LOGOUT
        })
      })
  }
}

export default AuthActions
