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
 */
class ContentListStore extends ReduceStore {
  getInitialState() {
    return Immutable.List()
  }

  getContentList() {
    return this.getState()
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_VIEWED_CONTENT : //GET_PUBLISH_CONTENT:
        return Immutable.fromJS(action.contents)
      case AppConstants.GET_RESERVED_CONTENT:
        if(action.contents === undefined) {
          action.contents = []
        }
        return Immutable.fromJS(action.contents)
      case AppConstants.GET_DELETE_CONTENT:
        return Immutable.fromJS(action.contents)
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new ContentListStore(AppDispatcher)
export default instance
