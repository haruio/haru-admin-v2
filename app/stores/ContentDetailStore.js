/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import {MapStore} from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:ContentDetailStore.jsx')

/***
 * 컨텐츠를 저장하는 store
 */

class ContentDetailStore extends MapStore {
  getInitialState() {
    return this._initialState()
  }

  _initialState() {
    return Immutable.fromJS({
      postSeq: null,
      title: '',
      type: '',
      thumbnail: '',
      shareImage: '',
      lastImageUrl: '',
      channelSeq: null,
      keywords: [],
      categories: [],
      categoriesSeq: [],
      videoUrl: '',
      sourceDescription: '',
      body: '',
      contents: []
    })
  }

  getContent() {
    return this.getState()
  }

  _createSubContent(state, action) {
    let contents
    if(state.get('contents') === undefined) {
      contents = Immutable.List([Immutable.fromJS(action.subcontent)])
    } else {
      contents = state.get('contents').push(Immutable.fromJS(action.subcontent))
    }
    return state.set('contents', contents)
  }

  _updateSubContent(state, action) {
    const index = state.get('contents').findIndex(function (item) {
      return item.get('contentSeq') === action.subcontent.contentSeq
    })
    return state.setIn(['contents',  index], Immutable.fromJS(action.subcontent))
  }

  _deleteSubContent(state, action) {
    const index = state.get('contents').findIndex(function (item) {
      return item.get('contentSeq') === action.contentSeq
    })
    return state.deleteIn(['contents', index])
  }

  _updateContentMeta(state, action) {
    if(action.meta.key == 'keywords') {
      log(action.meta.value.split(','))
      return state.set('keywords', Immutable.List(action.meta.value.split(',')))
    } else {
      return state.set(action.meta.key, action.meta.value)
    }
  }

  _updateContentAddCategory(state, action) {
    // push categoriesseq
    const categoriesSeq = state.get('categoriesSeq').push(action.categorySeq)
    state.set('categoriesSeq', categoriesSeq)

    // push categories
    const categories = state.get('categories').push(action.category)
    state.set('categories', categories)
    return state
  }

  _updateContentDeleteCategory(state, action) {
    // 삭제할 카테고리Seq를 찾는다
    const index = state.get('categoriesSeq').findIndex(function (item) {
      return item === action.categorySeq
    })
    const categoriesSeq = state.get('categoriesSeq').delete(index)
    state.set('categoriesSeq', categoriesSeq)

    // 삭제할 카테고리를 찾는다
    const index2 = state.get('categories').findIndex(function (item) {
      return item.get('categorySeq') === action.categorySeq
    })
    const categories = state.get('categories').delete(index2)
    state.set('categories', categories)

    return state
  }

  _uploadContentAction(state, action) {
    if(action.target === 'thumbnail') {
      return state.set('thumbnail', action.image.resourceUrl)
    } else if (action.target === 'shareImage') {
      return state.set('shareImage', action.image.resourceUrl)
    } else if (action.target === 'lastImageUrl') {
      return state.set('lastImageUrl', action.image.resourceUrl)
    }
    return state
  }

  _clearContentAction(state, action) {
    if(action.target === 'thumbnail') {
      return state.set('thumbnail', '')
    } else if (action.target === 'shareImage') {
      return state.set('shareImage', '')
    } else if (action.target === 'lastImageUrl') {
      return state.set('lastImageUrl', '')
    }
    return state
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_POST_OBJ:
        return Immutable.fromJS(action.content)
      case AppConstants.CLEAR_POST_OBJ:
        return this._initialState()
      case AppConstants.CREATE_SUBCONTENT:
        return this._createSubContent(state, action)
      case AppConstants.UPDATE_SUBCONTENT:
        return this._updateSubContent(state, action)
      case AppConstants.DELETE_SUBCONTENT:
        return this._deleteSubContent(state, action)
      case AppConstants.UPDATE_CONTENTMETA:
        return this._updateContentMeta(state, action)
      case AppConstants.UPDATE_CONTENT_ADDCATEGORY:
        return this._updateContentAddCategory(state, action)
      case AppConstants.UPDATE_CONTENT_REMOVECATEGORY:
        return this._updateContentDeleteCategory(state, action)
      case AppConstants.UPLOAD_CONTENT_IMAGE:
        return this.__uploadContentAction(state, action)
      case AppConstants.CLEAR_CONTENT_IMAGE:
        return this._clearContentAction(state, action)
      case AppConstants.GET_POST_DETAIL:
        return Immutable.Map(action.contents)
      case AppConstants.CLEAR_POST_DETAIL:
        return this.initialState()
      case AppConstants.UPLOAD_POST_IMAGE:
        return state.set(action.target, action.image.resourceUrl)
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new ContentDetailStore(AppDispatcher)
export default instance
