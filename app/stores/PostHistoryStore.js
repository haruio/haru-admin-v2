/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:PostHistoryStore.jsx')

class PostHistoryStore extends ReduceStore {
  getInitialState() {
    return Immutable.List()
  }

  getPostHistory() {
    return this.getState()
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_HISTORY_CONTENT:
        return Immutable.fromJS(action.contents || [])
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new PostHistoryStore(AppDispatcher)
export default instance
