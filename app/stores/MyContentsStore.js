/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import {ReduceStore} from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:MyContentsStore.jsx')

class MyContentsStore extends ReduceStore {
  getInitialState() {
    return Immutable.Map({writing:Immutable.List(), ready:Immutable.List(), reject:Immutable.List()})
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


  reduce(state, action) {
    let writing = []
    let ready = []
    let reject = []

    switch (action.type) {
      case AppConstants.GET_MYCONTENT:
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
        return state.set('writing', Immutable.fromJS(writing)).set('ready', Immutable.fromJS(ready)).set('reject', Immutable.fromJS(reject))
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new MyContentsStore(AppDispatcher)
export default instance
