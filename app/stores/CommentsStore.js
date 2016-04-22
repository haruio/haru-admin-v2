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

/***
 * 댓글 관리 store
 * /page/service/comment
 */
class CommentsStore extends ReduceStore {
  getInitialState() {
    return Immutable.List()
  }

  getComments() {
    return this.getState()
  }

  _deleteComment(state, action) {
    const index = state.findIndex(function (item) {
      return item.get('commentSeq') == action.commentSeq
    })

    return state.delete(index)
  }

  _updateComment(state, action) {
    const index = state.findIndex(function (item) {
      return item.get('commentSeq') == action.commentSeq
    })

    return state.setIn([index, 'commentStsCd'], 'B')
  }
  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_COMMENTS:
        return Immutable.fromJS(action.contents)
      case AppConstants.DELETE_COMMENTS:
        return this._deleteComment(state, action)
      case AppConstants.BLIND_COMMENTS:
        return this._updateComment(state, action)
      default:
        return state
    }
  }
}

const instance = new CommentsStore(AppDispatcher)
export default instance
