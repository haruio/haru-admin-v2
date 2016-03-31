/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:MyContentListStore.jsx')

class MyContentListStore extends ReduceStore {
  getInitialState() {
    return Immutable.Map({writing:Immutable.List(),
      ready:Immutable.List(),
      reject:Immutable.List(),
      searchType:'ALL' // ALL, VDO, IMS
    })
  }

  getContentsInWriting() {
    return this.getState().get('writing')
  }
  getContentsInReady() {
    return this.getState().get('ready')
  }
  getContentsInReject() {
    return this.getState().get('reject')
  }
  getSearchType() {
    return this.getState().get('searchType')
  }

  _getMyContent(state, action) {
    let writing = []
    let ready = []
    let reject = []

    // W (작성중), N (승인대기), R (리젝)
    action.contents.forEach((content) => {
      switch(content.status) {
        case 'W' :
          writing.push(content)
          break
        case 'N' :
          ready.push(content)
          break
        case 'R' :
          reject.push(content)
          break
      }
    })
    
    return state.set('writing', Immutable.fromJS(writing))
                .set('ready', Immutable.fromJS(ready))
                .set('reject', Immutable.fromJS(reject))
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_MYCONTENT:
        return this._getMyContent(state, action)
      case AppConstants.CHANGE_SEARCHTYPE:
        return state.set('searchType', action.searchType)
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new MyContentListStore(AppDispatcher)
export default instance
