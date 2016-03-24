/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:ReportCommentsStore.jsx')

class ReportCommentsStore extends ReduceStore {
  getInitialState() {
    return Immutable.List()
  }

  getReportComments() {
    return this.getState()
  }

  reduce(state, action) {
    switch (action.type) {
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new ReportCommentsStore(AppDispatcher)
export default instance
