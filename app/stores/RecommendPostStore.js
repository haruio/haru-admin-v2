/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:RecommendPostStore.jsx')


class RecommendPostStore extends ReduceStore {
  getInitialState() {
    return Immutable.Map({
      contents: Immutable.List(),
      post: Immutable.Map(),
      recommendpost: Immutable.Map()
    })
  }

  getRecommendPosts() {
    return this.getState().get('contents')
  }

  /* 처음에 캐쉬 형태로 짯으나 post 데이터를 얻어 올수 없어서 ㅠㅠ 그냥 맘편하게 요청하는 걸로 마무리.. */
  getRecommendPost() {
    return this.getState().get('recommendpost')
  }

  getPost() {
    return this.getState().get('post')
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_RECOMMEND_POST_LIST:
        return state.set('contents', Immutable.fromJS(action.contents))
      case AppConstants.GET_RECOMMEND_POST_DETAIL:
        return state.set('post', action.post)
      case AppConstants.GET_RECOMMEND_POST:
        return state.set('post', Immutable.fromJS(action.post)).set('recommendpost', Immutable.fromJS(action.content))
      case AppConstants.CLEAR_RECOMMEND_POST_DETAIL:
        return state.set('post', Immutable.Map()).set('recommendpost', Immutable.Map())
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new RecommendPostStore(AppDispatcher)
export default instance
