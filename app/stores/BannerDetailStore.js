/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import {MapStore} from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:BannerDetailStore.jsx')

class BannerDetailStore extends MapStore {
  getBanner() {
    return this.getState()
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_BANNER:
        return Immutable.fromJS(action.content || {})
      case AppConstants.GET_POST_DETAIL_BYURL:
        return state.set('post', Immutable.fromJS(action.post))
      case AppConstants.SELECT_BANNER_POST_DETAIL:
        return state.set('post', action.post)
      case AppConstants.CLEAR_BANNER:
        return state.clear()
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new BannerDetailStore(AppDispatcher)
export default instance
