/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import {ReduceStore} from 'flux/utils'
import moment from 'moment'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:RecommendPostStore.jsx')


class RecommendPostStore extends ReduceStore {
  getInitialState() {
    return Immutable.fromJS(this._init())
  }

  _init() {
    return {
      contents: Immutable.List([]), // RecommendPost list에서 활용
      post: Immutable.Map({}),      // RecommendEdit 에서 선택된 post 정보
      recommendpost: Immutable.Map({
        recommendStartDt:moment().valueOf(),
        recommendEndDt:moment().add(1, 'days').valueOf(),
        recommendPct:50,
        postSeq:null
      })
    }
  }
  /***
   * 전체 RecommendPost 리스트를 리턴
   * @returns {Object} - 전체 RecommendPost 리스트
     */
  getRecommendPosts() {
    return this.getState().get('contents')
  }

  getRecommendPost() {
    return this.getState().get('recommendpost')
  }

  getPost() {
    return this.getState().get('post')
  }

  _updateMeta(state, action) {
    return state.setIn(['recommendpost', action.key], action.data)
  }

  _updateDate(state, action) {
    return state.setIn(['recommendpost', 'recommendStartDt'], action.startDate)
                .setIn(['recommendpost', 'recommendEndDt'], action.endDate)
  }
  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_RECOMMEND_POST_LIST:
        return state.set('contents', Immutable.fromJS(action.contents || []))
      case AppConstants.GET_RECOMMEND_POST:
        return state.set('post', Immutable.fromJS(action.post)).set('recommendpost', Immutable.fromJS(action.recommendpost))
      case AppConstants.GET_RECOMMEND_POST_DETAIL:
        return state.set('post', action.post)
      case AppConstants.CLEAR_RECOMMEND_POST_DETAIL:
        return Immutable.fromJS(this._init())
      case AppConstants.UPDATE_RECOMMEND_META:
        return this._updateMeta(state, action)
      case AppConstants.UPDATE_RECOMMEND_DATE:
        return this._updateDate(state, action)
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new RecommendPostStore(AppDispatcher)
export default instance
