/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import {ReduceStore} from 'flux/utils'
import {browserHistory} from 'react-router'
import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:UserStore.jsx')
import Alert from 'react-s-alert'

class UserStore extends ReduceStore {
  getInitialState() {
    // restore user data
    const token = localStorage.getItem('ls.AccessToken')
    let user = JSON.parse(localStorage.getItem('ls.UserModel'))
    if(user === undefined) {
      user = {realNm:'',userSeq:0,userTypeSeq:0,managerYn:'N'}
    }
    return Immutable.Map({error: {code: 0, msg: ''}, user: user, token: token})
  }

  getUser() {
    return this.getState().get('user')
  }

  getAccessToken() {
    return this.getState().get('token')
  }

  isLoginSuccess() {
    return !!this.getState().get('token')
  }

  getError() {
    return this.getState().get('error')
  }

  clearUserData() {
    localStorage.removeItem('ls.AccessToken')
    localStorage.removeItem('ls.UserModel')

    setTimeout(function () {
      Alert.warning('토큰이 말료되었습니다. 다시 로그인해주세요', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
    }, 300)
    // login
    browserHistory.replace('/login')
  }

  _userLogin(state, action) {
    // TODO : 관련 로직 추가적으로 생각해보자 아직은 답이 없어서 ㅠㅠ
    setTimeout(function () {
      browserHistory.replace('/content/mycontent')
    })
    return state.set('user', action.user).set('token', action.accessToken)
  }

  _userJoin(state, action) {
    setTimeout(function () {
      Alert.success('회원가입 완료, 로그인 하세요.', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
    }, 300)
    browserHistory.replace('/login')

    return state
  }


  reduce(state, action) {
    switch (action.type) {
      case AppConstants.USER_LOGIN:
        return this._userLogin(state, action)
      case AppConstants.USER_LOGINFAIL:
        return state.clear().set('error', {code: 4, msg: action.message})
      case AppConstants.USER_LOGOUT:
        this.clearUserData()
        return state.clear().set('error', {code: 0, msg: ''})
      case AppConstants.INVALID_SESSION_TOKEN:
        this.clearUserData()
        return state.clear().set('error', {code: 0, msg: ''})
      case AppConstants.USER_JOIN:
        return this._userJoin(state,action)
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new UserStore(AppDispatcher)
export default instance
