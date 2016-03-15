/**
 * Created by jungenpark on 2/15/16.
 */
import { MapStore } from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

class MapStoreExample extends MapStore {
  reduce(state, action) {

    switch (action.type) {
      case AppConstants.GET_BANNER:
        return state.set(action.id, action.foo)
      default:
        return state
    }
  }
}

const instance = new MapStoreExample(AppDispatcher)
export default instance
