/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:ContentListStore.jsx')

/***
 * content > list 전체를 담는 스토어
 * publish, reserved, deleted 상태
 * inspection 상태 데이터
 */
class ContentListStore extends ReduceStore {
  getInitialState() {
    return Immutable.Map({
      contents:Immutable.List(),
      searchType:'ALL'
    })
  }

  getContentList() {
    return this.getState().get('contents')
  }

  getSearchType() {
    return this.getState().get('searchType')
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_VIEWED_CONTENT : //GET_PUBLISH_CONTENT:
        return state.set('contents', Immutable.fromJS(action.contents || []))
      case AppConstants.GET_RESERVED_CONTENT:
        return state.set('contents', Immutable.fromJS(action.contents || []))
      case AppConstants.GET_DELETE_CONTENT:
        return state.set('contents', Immutable.fromJS(action.contents || []))
      case AppConstants.GET_INSPECTION_CONTENT:
        return state.set('contents', Immutable.fromJS(action.contents || []))
      case AppConstants.CHANGE_SEARCHTYPE:
        return state.set('searchType', action.searchType)
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new ContentListStore(AppDispatcher)
export default instance
