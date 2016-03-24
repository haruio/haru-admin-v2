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
        return Immutable.fromJS(action.contents)
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new MemberStore(AppDispatcher)
export default instance
