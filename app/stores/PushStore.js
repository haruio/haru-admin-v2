/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:PushStore.jsx')

class PushStore extends ReduceStore {
  getInitialState() {
    return Immutable.List()
  }

  getPushes() {
    return this.getState()
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_PUSH_LIST:
        return Immutable.fromJS(action.pushList)
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new PushStore(AppDispatcher)
export default instance
