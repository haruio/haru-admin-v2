/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import { ReduceStore } from 'flux/utils'
import { browserHistory } from 'react-router'
import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:MemberStore.jsx')

/***
 * 사용자 store
 * /page/service/member/member - 사용자 전체 관리
 * /page/service/member/banmember - 금지된 사용자만 관리
 * 같은 UI라서 같은 스토어를 활용함
 */
class MemberStore extends ReduceStore {
  getInitialState() {
    return Immutable.List()
  }

  getMembers() {
    return this.getState()
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_USERS:
        return Immutable.fromJS(action.contents || {})
      case AppConstants.GET_BAN_USERS:
        return Immutable.fromJS(action.contents || {})
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new MemberStore(AppDispatcher)
export default instance
