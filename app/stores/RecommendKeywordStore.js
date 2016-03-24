/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import { ReduceStore } from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:RecommendKeywordStore.jsx')

class RecommendKeywordStore extends ReduceStore {
  getInitialState() {
    return Immutable.List()
  }

  getKeywordList() {
    return this.getState()
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_RECOMMEND_KEYWORD:
        return Immutable.fromJS(action.contents)
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new RecommendKeywordStore(AppDispatcher)
export default instance
