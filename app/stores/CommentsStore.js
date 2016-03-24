/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import { ReduceStore } from 'flux/utils'
import { browserHistory } from 'react-router'
import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:CommentsStore.jsx')

class CommentsStore extends ReduceStore {
  getInitialState() {
    return Immutable.List()
  }

  getComments() {
    return this.getState()
  }

  reduce(state, action) {

    switch (action.type) {
      case AppConstants.GET_COMMENTS:
        return Immutable.fromJS(action.contents)
      default:
        return state
    }
  }
}

const instance = new CommentsStore(AppDispatcher)
export default instance
