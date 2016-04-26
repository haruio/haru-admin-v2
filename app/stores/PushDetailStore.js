/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import {MapStore} from 'flux/utils'
import moment from 'moment'
import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:PushDetailStore.jsx')

class PushDetailStore extends MapStore {
  getInitialState() {
    return Immutable.fromJS(this._init())
  }

  _init() {
    return {
      pushId: null,
      publishDt: moment().valueOf(),
      pushStatus: 'DRCT', // DRCT, RVED, PUED
      condition: {
        osType:'',
        gender:'',
        user:'',
        channelSeq:''
      },
      message: {
        title:'',
        body:'',
        type:'PST',
        url:''
      },
      options: {
        gcm: {},
        apns: {}
      }
    }
  }

  getPushDetail() {
    return this.getState()
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.PUSH_DETAIL:
        return Immutable.fromJS(action.content || {})
      case AppConstants.CLEAR_PUSH:
        return Immutable.fromJS(this._init())
      case AppConstants.PUSH_CHANGE_CONDITION:
        return state.setIn(['condition', action.key], action.value)
      case AppConstants.PUSH_CHANGE_MESSAGE:
        return state.setIn(['message', action.key], action.value)
      case AppConstants.PUSH_CHANGE_SENDTYPE:
        return state.set('pushStatus', action.value)
      case AppConstants.PUSH_CHANGE_URL:
        return state.setIn(['message', 'url'], action.url)
      case AppConstants.SELECT_BANNER_POST_DETAIL:
        // bannerURL 변경이 post의 경우는 팝업에서 받아야 해서 여기서 변경 한다.
        // 유지보수하시는 분께 죄송합니다. 저의 한계입니다
        return state.set('post', action.post).setIn(['message', 'url'], 'dingo://post/' + action.post.get('shortUrl'))
      case AppConstants.GET_POST_DETAIL_BYURL:
        return state.set('post', Immutable.fromJS(action.post))
      case AppConstants.PUSH_CHANGE_DATE:
            return state.set('publishDt', action.publishDt)
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new PushDetailStore(AppDispatcher)
export default instance
