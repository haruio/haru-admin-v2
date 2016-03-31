/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import { MapStore } from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:ChannelStore.jsx')

class ChannelDetailStore extends MapStore {
  getChannel() {
    return this.getState()
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_CHANNEL_DETAIL:
        return Immutable.Map(action.contents)
      case AppConstants.CLEAR_CHANNEL_DETAIL:
        return state.clear()
      case AppConstants.UPLOAD_CHANNEL_IMAGE:
        return state.set(action.target, action.image.resourceUrl)
      case AppConstants.CLEAR_CHANNEL_IMAGE:
        return state.set(action.target, '')
      default:
        return state
    }
  }
}
// Export a singleton instance of the store
const instance = new ChannelDetailStore(AppDispatcher)
export default instance
