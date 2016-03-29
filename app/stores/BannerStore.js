/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import {MapStore} from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:BannerStore.jsx')

import moment from 'moment'

class BannerStore extends MapStore {
  getInitialState() {
    return Immutable.Map({banners:Immutable.List(), searchDate:moment().format('YYYY-MM-DD'), platform:'AND'})
  }

  getBanners() {
    return this.getState().get('banners')
  }
  getBannerSearchDate() {
    return this.getState().get('searchDate')
  }
  getBannerSearchPlatform() {
    return this.getState().get('platform')
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_BANNER_LIST:
        return state.set('banners', Immutable.fromJS(action.contents || {}))
      case AppConstants.CHANGE_PLATFORM:
        return state.set('platform', action.platform)
      case AppConstants.CHANGE_SEACHDATE:
        return state.set('searchDate', action.searchDate)
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new BannerStore(AppDispatcher)
export default instance
