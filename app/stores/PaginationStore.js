/**
 * Created by jungenpark on 3/20/16.
 */
import Immutable from 'immutable'
import { MapStore } from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:PaginationStore.jsx')

/***
 * Pagination 전체를 관리하는 Store
 */
class PaginationStore extends MapStore {
  getInitialState() {
    return Immutable.Map({
      endPageNo: 1,
      finalPageNo: 1,
      firstPageNo: 1,
      nextPageNo: 1,
      pageNo: 1,
      pageSize: 30,
      prevPageNo: 1,
      startPageNo: 1,
      totalCount: 0
    })
  }

  getPagination() {
    return this.getState()
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_VIEWED_CONTENT:
        return Immutable.fromJS(action.pagination)
      case AppConstants.GET_RESERVED_CONTENT:
        return Immutable.fromJS(action.pagination)
      case AppConstants.GET_DELETE_CONTENT:
        return Immutable.fromJS(action.pagination)
      case AppConstants.GET_INSPECTION_CONTENT:
        return Immutable.fromJS(action.pagination)
      case AppConstants.GET_BANNER_LIST:
        return Immutable.fromJS(action.pagination)
      case AppConstants.GET_RECOMMEND_POST_LIST:
        return Immutable.fromJS(action.pagination)
      case AppConstants.GET_USERS:
        return Immutable.fromJS(action.pagination)
      case AppConstants.GET_BAN_USERS:
        return Immutable.fromJS(action.pagination)
      case AppConstants.GET_COMMENTS:
        return Immutable.fromJS(action.pagination)
      case AppConstants.GET_PUSH_LIST:
        return Immutable.fromJS(action.pagination)
      case AppConstants.GET_REPORT_COMMENT_LIST:
        return Immutable.fromJS(action.pagination)
      case AppConstants.GET_REPORT_POST_LIST:
        return Immutable.fromJS(action.pagination)
      /*stat*/
      case AppConstants.GET_CONTENT_CHART_DATA:
        return Immutable.fromJS(action.pagination)
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new PaginationStore(AppDispatcher)
export default instance
