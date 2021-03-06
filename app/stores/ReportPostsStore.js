/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:ReportPostsStore.jsx')

class ReportPostsStore extends ReduceStore {
  getInitialState() {
    return Immutable.List()
  }

  getReportPosts() {
    return this.getState()
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_REPORT_POST_LIST:
        return Immutable.fromJS(action.data || [])
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new ReportPostsStore(AppDispatcher)
export default instance
