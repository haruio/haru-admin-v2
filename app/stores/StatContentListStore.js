/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:StatContentListStore.jsx')

class StatContentListStore extends ReduceStore {
  getInitialState() {
    return Immutable.Map({chartdata : Immutable.List([]), searchObj:Immutable.Map({})})
  }

  getStatsContentList() {
    return this.getState().get('chartdata')
  }
  getSearchObj() {
    return this.getState().get('searchObj')
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_CONTENT_CHART_DATA:
        return state.set('chartdata', Immutable.fromJS(action.contentChartData || [])).set('searchObj',  Immutable.fromJS(action.searchObj || {}))
      default:
        return state
    }
  }
}

/*
 contentChartData: res.body.data,
 searchObj : searchObj,
 */

// Export a singleton instance of the store
const instance = new StatContentListStore(AppDispatcher)
export default instance
