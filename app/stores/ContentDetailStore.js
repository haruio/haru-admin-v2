/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import { MapStore } from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:ContentDetailStore.jsx')

/***
 * (발행된) 컨텐츠를 저장하는 store
 * -> 작성중인 컨텐츠를 저장하는건 ComposeContentDetailStore
 */
class ContentDetailStore extends MapStore {
  getContent() {
    return this.getState()
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_POST_OBJ:
        return Immutable.Map(action.content)
      case AppConstants.CLEAR_POST_OBJ:
        return state.clear()

      case AppConstants.GET_POST_DETAIL:
        return Immutable.Map(action.contents)
      case AppConstants.CLEAR_POST_DETAIL:
        return state.clear()
      case AppConstants.UPLOAD_POST_IMAGE:
        return state.set(action.target, action.image.resourceUrl)
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new ContentDetailStore(AppDispatcher)
export default instance
