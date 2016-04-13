/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:StatContentListStore.jsx')

class StatUserStore extends ReduceStore {
  getInitialState() {
    return Immutable.Map({
      genderType: Immutable.List(),
      ageType: Immutable.List(),
      joinType: Immutable.List(),
      userchart: Immutable.List(),
      usertable: Immutable.List()
    })
  }

  getGenderType() {
    return this.getState().get('genderType')
  }

  getAgeType() {
    return this.getState().get('ageType')
  }

  getJoinType() {
    return this.getState().get('joinType')
  }

  getUserChart() {
    return this.getState().get('userchart')
  }

  getUserTable() {
    return this.getState().get('usertable')
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_GENDER_CHART_DATA:
        return state.set('genderType', Immutable.fromJS(action.genderTypeData || []))
      case AppConstants.GET_AGE_CHART_DATA:
        return state.set('ageType', Immutable.fromJS(action.ageTypeData || []))
      case AppConstants.GET_JOIN_CHART_DATA:
        return state.set('joinType', Immutable.fromJS(action.joinTypeData || []))
      case AppConstants.GET_USER_CHART_DATA:
        return state.set('userchart', Immutable.fromJS(action.userChartData || []))
      case AppConstants.GET_USER_TABLE_DATA:
        return state.set('usertable', Immutable.fromJS(action.userTableData || []))
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new StatUserStore(AppDispatcher)
export default instance
