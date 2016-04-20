/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import { MapStore } from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:CategoryStore.jsx')

class CategoryDetailStore extends MapStore {
  getInitialState() {
    return Immutable.Map(this._init())
  }

  getCategory() {
    return this.getState()
  }

  _init() {
    return {
      name:'',
      shortNm:'',
      urlNm:'',
      iconImageUrl:'',
      bgImageUrl: '',
      categoryViewCd: 'Y',
      description: '',
      delYn: 'N'
    }
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_CATEGORY_DETAIL:
        return Immutable.Map(action.contents)
      case AppConstants.CLEAR_CATEGORY_DETAIL:
        return Immutable.fromJS(this._init())
      case AppConstants.UPLOAD_CATEGORY_IMAGE:
        return state.set(action.target, action.image.resourceUrl)
      case AppConstants.CLEAR_CATEGORY_IMAGE:
        return state.set(action.target, '')
      case AppConstants.UPDATE_CATEGORY_META:
        return state.set(action.key, action.data)
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new CategoryDetailStore(AppDispatcher)
export default instance
