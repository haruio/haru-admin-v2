/**
 * Created by jungenpark on 2/14/16.
 */

import debug from 'debug'
const log = debug('application:AuthActions.jsx')


import AppDispatcher from '../dispatcher/AppDispatcher.js'
import AppConstants from '../constants/AppConstants.js'

import request from 'superagent'

import utility from '../utils/util.js'

export const APPVERSION = 'v0.9'
export const BUILDVERSION = '10'

const API_VERSION = 'v1'
export const DINGOURL = `http://dev-id-api.dingo.tv/${API_VERSION}`


import { currentuser, URL } from './AuthActions.js'


/**
 * middleware_accesstoken
 * superagent middleware : access token 이 있으면 header에 추가
 */
function middleware_accesstoken(request) {
  if (currentuser.accesstoken != null) {
    request.set('x-auth-token', currentuser.accesstoken)
  }
  return request
}

const AppActions = {
  getBanner() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.GET_BANNER,
      test: 'test'
    })
    /*
     request.get(DINGOURL + '/banners')
     .end(function (err, res) {
     if (err !== null) {
     return
     }

     AppDispatcher.handleViewAction({
     actionType: AppConstants.GET_BANNER,
     LangSelector: res.body
     })
     })
     }*/
  },
  getChannels() {
    request.get(URL+'/sm/channels/')
      .use(middleware_accesstoken)
      .end(function (err, res) {
        log(res)
        if(utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          actionType: AppConstants.GET_CHANNELS,
          contents : res.body
        })
      })
  }
}

export default AppActions
