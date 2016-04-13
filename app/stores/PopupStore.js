import Immutable from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

class PopupStore extends ReduceStore {
  getInitialState() {
    return Immutable.Map()
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.OPEN_POPUP:
        return state.set(action.result.key, action.result.props || {})
      case AppConstants.CLOSE_POPUP:
        return state.delete(action.result.key)
      case AppConstants.CLOSE_ALL_POPUP:
        return state.clear()
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new PopupStore(AppDispatcher)
export default instance
