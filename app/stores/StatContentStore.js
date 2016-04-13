/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:StatContentListStore.jsx')

class StatContentStore extends ReduceStore {
  getInitialState() {
    return Immutable.Map({
      posttype : Immutable.List(),
      channeltype:Immutable.List(),
      categorytype:Immutable.List(),
      contentdaily:Immutable.List()
    })
  }

  getPostType() {
    return this.getState().get('posttype')
  }

  getChannelType() {
    return this.getState().get('channeltype')
  }

  getCategoryType() {
    return this.getState().get('categorytype')
  }

  getContentDaily() {
    return this.getState().get('contentdaily')
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_CONTENT_POSTTYPE_CHART_DATA:
        return state.set('posttype', Immutable.fromJS(action.postTypeCharData || []))
      case AppConstants.GET_CONTENT_CHANNELTYPE_CHART_DATA:
        return state.set('channeltype', Immutable.fromJS(action.channelTypeCharData || []))
      case AppConstants.GET_CONTENT_CATEGORYTYPE_CHART_DATA:
        return state.set('categorytype', Immutable.fromJS(action.categoryTypeCharData || []))
      case AppConstants.GET_CONTENT_DAILY_TREND_DATA:
        return state.set('contentdaily', Immutable.fromJS(action.contentTableData || []))
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new StatContentStore(AppDispatcher)
export default instance
