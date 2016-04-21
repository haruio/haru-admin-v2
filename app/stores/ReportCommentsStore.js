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

  _deleteReportComment(state, action) {
    const index = state.findIndex(function (item) {
      return item.get('reportSeq') == action.reportSeq
    })

    return state.delete(index)
  }

  _updateReportComment(state, action) {
    const index = state.findIndex(function (item) {
      // reportSeq 가 string으로 넘어옴 === 하기가 어려움
      return item.get('reportSeq') == action.reportSeq
    })
    return state.setIn([index, 'commentStsCd'], 'B').setIn([index, 'reportStsCd'], 'REG')
  }


  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_REPORT_COMMENT_LIST:
        return Immutable.fromJS(action.data || [])
      case AppConstants.BLIND_REPORT_COMMENT:
        return this._updateReportComment(state, action)
      case AppConstants.DELETE_REPORT_COMMENT:
        return this._deleteReportComment(state, action)
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new ReportCommentsStore(AppDispatcher)
export default instance
