/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import { ReduceStore } from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

class ChannelStore extends ReduceStore {
  getInitialState() {
    return Immutable.Map()
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_BANNER:
        return state.set('test', 'test')
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new ChannelStore(AppDispatcher)
export default instance
