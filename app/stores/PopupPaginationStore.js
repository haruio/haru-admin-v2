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
 * popup 전용 Pagination 전체를 관리하는 Store
 */
class PopupPaginationStore extends MapStore {
  getInitialState() {
    return Immutable.Map(this._initData())
  }

  _initData() {
    return {
      endPageNo: 1,
      finalPageNo: 1,
      firstPageNo: 1,
      nextPageNo: 1,
      pageNo: 1,
      pageSize: 30,
      prevPageNo: 1,
      startPageNo: 1,
      totalCount: 0
    }
  }
  getPagination() {
    return this.getState()
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_PUBLISH_CONTENT:
        return Immutable.fromJS(action.pagination || this._initData())
      case AppConstants.GET_USER_COMMENT:
        return Immutable.fromJS(action.pagination || this._initData())
      case AppConstants.GET_HISTORY_CONTENT:
        return Immutable.fromJS(action.pagination || this._initData())
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new PopupPaginationStore(AppDispatcher)
export default instance
