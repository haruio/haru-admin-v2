/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:PublishedListStore.jsx')

/***
 * 예약 + 발행 완료된 리스트를 저장하는 곳
 */
class PublishedListStore extends ReduceStore {
  getInitialState() {
    return Immutable.List()
  }

  getContentList() {
    return this.getState()
  }
  getContentListById(id) {
    return this.getState().find((item) => {
      return item.get('postSeq') === id
    })
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_PUBLISH_CONTENT:
        return Immutable.fromJS(action.contents)
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new PublishedListStore(AppDispatcher)
export default instance
