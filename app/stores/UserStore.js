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

class UserStore extends ReduceStore {
  getInitialState() {
    // restore user data
    const token = localStorage.getItem('ls.AccessToken')
    const user = JSON.parse(localStorage.getItem('ls.UserModel'))

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
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new UserStore(AppDispatcher)
export default instance
