/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import {MapStore} from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:MainfeedStore.jsx')

import moment from 'moment'

class MainfeedStore extends MapStore {
  getInitialState() {
    return Immutable.Map({contents:Immutable.List(), searchDate:moment().format('YYYY-MM-DD')})
  }

  getMainfeeds() {
    return this.getState().get('contents')
  }
  
  getSearchDate() {
    return this.getState().get('searchDate')
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_MAINFEED:
        return state.set('contents', Immutable.fromJS(action.contents || []))
      case AppConstants.MAINFEED_CHANGE_SEACHDATE:
        return state.set('searchDate', action.searchDate)
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new MainfeedStore(AppDispatcher)
export default instance
