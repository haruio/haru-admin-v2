/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import { MapStore } from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:SearchOptionStore.jsx')

// ContentList에서 검색시 나올수 검색 조건을 저장하는 스토어
class SearchOptionStore extends MapStore {
  getInitialState() {
    return Immutable.Map({
      orderField: '',
      orderMethod: '',
      searchField: '',
      searchText: '',
      channel: '',
      categories: '',
      type: ''
    })
  }

  getSearchOption() {
    return this.getState()
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_DELETE_CONTENT:
        return Immutable.fromJS(action.searchOpt)
      case AppConstants.GET_INSPECTION_CONTENT:
        return Immutable.fromJS(action.searchOpt)
      case AppConstants.GET_RESERVED_CONTENT:
        return Immutable.fromJS(action.searchOpt)
      case AppConstants.GET_VIEWED_CONTENT:
        return Immutable.fromJS(action.searchOpt)
      case AppConstants.GET_PUBLISH_CONTENT:
        return Immutable.fromJS(action.searchOpt)
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new SearchOptionStore(AppDispatcher)
export default instance
