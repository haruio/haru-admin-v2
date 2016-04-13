/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:PostTrendPopupStore.jsx')

class PostTrendPopupStore extends ReduceStore {
  getInitialState() {
    return Immutable.Map({})
  }

  getPostTrendData() {
    return this.getState()
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_POST_DAILY_TREND_DATA:
        return Immutable.fromJS(action.postTrendData || [])
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new PostTrendPopupStore(AppDispatcher)
export default instance
