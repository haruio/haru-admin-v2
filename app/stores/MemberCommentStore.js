/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import { ReduceStore } from 'flux/utils'
import { browserHistory } from 'react-router'
import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:MemberCommentStore.jsx')

class MemberCommentStore extends ReduceStore {
  getInitialState() {
    return Immutable.Map()
  }

  getMemberComment() {
    return this.getState()
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_USER_COMMENT:
        return Immutable.fromJS(action.contents || {})
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new MemberCommentStore(AppDispatcher)
export default instance
