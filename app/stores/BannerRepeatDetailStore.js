/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import {MapStore} from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:BannerChannelDetailStore.jsx')
import moment from 'moment'

class BannerChannelDetailStore extends MapStore {
  getInitialState() {
    return Immutable.Map(this._init())
  }

  _init() {
    let nextDate = new Date()
    nextDate.setDate(nextDate.getDate() + 1)

    return {
      bannerSeq: null,
      bannerStartDt: moment().valueOf(),
      bannerEndDt: 253402214400000,
      bannerTypeCd: 'CHN',
      bannerUrl: '',
      imgLargeUrl: '',
      imgSmallUrl: '',
      platformCd: 'ALL',
      showViewCd : 'R' // repeat
    }
  }

  getBanner() {
    return this.getState()
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.GET_BANNER:
        return Immutable.fromJS(action.content || {})
      case AppConstants.GET_POST_DETAIL_BYURL:
        return state.set('post', Immutable.fromJS(action.post))
      case AppConstants.SELECT_BANNER_POST_DETAIL:
        // bannerURL 변경이 post의 경우는 팝업에서 받아야 해서 여기서 변경 한다.
        // 유지보수하시는 분께 죄송합니다. 저의 한계입니다
        return state.set('post', action.post).set('bannerUrl', 'dingo://post/' + action.post.get('shortUrl'))
      case AppConstants.UPLOAD_BANNER_IMAGE:
        return state.set(action.target, action.image.resourceUrl)
      case AppConstants.CLEAR_BANNER_IMAGE:
        return state.set(action.target, '')
      case AppConstants.BANNER_CHANGE_PLATFORM:
        return state.set('platformCd', action.platform)
      case AppConstants.BANNER_CHANGE_TYPE:
        if (action.typeCd === 'LINK') {
          return state.set('bannerTypeCd', action.typeCd).set('bannerUrl', '')
        } else {
          return state.set('bannerTypeCd', action.typeCd)
        }
      case AppConstants.BANNER_CHANGE_URL:
        return state.set('bannerUrl', action.url)
      case AppConstants.BANNER_CHANGE_TIME:
        return state.set(action.datetype, action.value)
      case AppConstants.CLEAR_BANNER:
        state.clear()
        return Immutable.fromJS(this._init())
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new BannerChannelDetailStore(AppDispatcher)
export default instance
