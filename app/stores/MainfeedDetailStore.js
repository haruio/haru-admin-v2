/**
 * Created by jungenpark on 2/15/16.
 */
import Immutable from 'immutable'
import {MapStore} from 'flux/utils'

import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:MainfeedDetailStore.jsx')

import moment from 'moment'

class MainfeedDetailStore extends MapStore {
  getInitialState() {
    return Immutable.Map(this._initialState())
  }

  getMainfeed() {
    return this.getState()
  }
  getMainfeedbyIndex(idx) {
    return this.getState().getIn(['feeds', idx], Immutable.Map({}))
  }

  _initialState() {
    return Immutable.fromJS({
      createDt: null,
      feedGroupId: '',
      publishStartDt: moment().utc().format('YYYY-MM-DDT00:00:00.000Z'),
      publishEndDt: '9999-12-31T00:00:00.000Z',
      templeteType: '1',
      feeds: [
        {'postSeq':0,'feedTypeCd':'M','feedStyleCd':'D','thumbnailUrl':'','postTitle':'Content (1x1)'},
        {'postSeq':0,'feedTypeCd':'M','feedStyleCd':'D','thumbnailUrl':'','postTitle':'Content (1x1)'},
        {'postSeq':0,'feedTypeCd':'M','feedStyleCd':'D','thumbnailUrl':'','postTitle':'Content (1x1)'},
        {'postSeq':0,'feedTypeCd':'M','feedStyleCd':'D','thumbnailUrl':'','postTitle':'Content (1x1)'},
        {'postSeq':0,'feedTypeCd':'M','feedStyleCd':'D','thumbnailUrl':'','postTitle':'Content (1x1)'},
        {'postSeq':0,'feedTypeCd':'M','feedStyleCd':'D','thumbnailUrl':'','postTitle':'Content (1x1)'}
      ]
    })
  }

  _changeTypeMainfeed(state, action) {
    // typeindex를 바꾸면, 무족건 feeds를 삭제한다 알람도 띄워줘야할듯
    let dataObj = {templateType:1, cellCnt:6}

    switch(action.typeindex) {
      case 0:
        dataObj = {templateType:0, cellCnt:2}
        break
      case 1:
        dataObj = {templateType:1, cellCnt:6}
        break
      case 2:
        dataObj = {templateType:2, cellCnt:5, mergeCellIdx:0, mergeCellStyle:'H', mergeCellTitle:'Content (2x1)'}
        break
      case 3:
        dataObj = {templateType:3, cellCnt:5, mergeCellIdx:2, mergeCellStyle:'H', mergeCellTitle:'Content (2x1)'}
        break
      case 4:
        dataObj = {templateType:4, cellCnt:5, mergeCellIdx:4, mergeCellStyle:'H', mergeCellTitle:'Content (2x1)'}
        break
      case 5:
        dataObj = {templateType:5, cellCnt:5, mergeCellIdx:0, mergeCellStyle:'V', mergeCellTitle:'Content (1x2)'}
        break
      case 6:
        dataObj = {templateType:6, cellCnt:5, mergeCellIdx:1, mergeCellStyle:'V', mergeCellTitle:'Content (1x2)'}
        break
      case 7:
        dataObj = {templateType:7, cellCnt:5, mergeCellIdx:2, mergeCellStyle:'V', mergeCellTitle:'Content (1x2)'}
        break
      case 8:
        dataObj = {templateType:8, cellCnt:5, mergeCellIdx:3, mergeCellStyle:'V', mergeCellTitle:'Content (1x2)'}
        break
      default:
        dataObj = {templateType:1, cellCnt:6}
        break
    }

    let templateFeeds = []
    const feedDefaultOption = {
      'postSeq': 0,
      'feedTypeCd': 'M',
      'feedStyleCd': 'D',
      'thumbnailUrl': '',
      'postTitle': 'Content (1x1)'
    }

    for (let idx = 0; idx < dataObj.cellCnt; idx++) {
      let cloneFeedOption = $.extend(true, {}, feedDefaultOption)

      if (idx == dataObj.mergeCellIdx) {
        cloneFeedOption.feedStyleCd = dataObj.mergeCellStyle
        cloneFeedOption.postTitle = dataObj.mergeCellTitle
      }

      templateFeeds.push(cloneFeedOption)
    }
    state = state.set('feeds', Immutable.fromJS(templateFeeds))
    return state.set('templeteType', action.typeindex)
  }

  reduce(state, action) {
    switch (action.type) {
      case AppConstants.READ_MAINFEED:
        return Immutable.fromJS(action.contents || [])
      case AppConstants.CREATE_MAINFEED:
        return this._initialState()
      case AppConstants.CHANGE_TYPE_MAINFEED:
        return this._changeTypeMainfeed(state, action)
      case AppConstants.UPLOAD_MAINFEED_IMAGE:
        return state.setIn(['feeds', action.selectedindex, 'thumbnailUrl'], action.image.resourceUrl)
      case AppConstants.CLEAR_MAINFEED_IMAGE:
        return state.setIn(['feeds', action.selectedindex, 'thumbnailUrl'], action.url)
      case AppConstants.UPDATE_MAINFEEDITEM:
        // 해당 인덱스에 feeds를 찾아서 변경한다
        let mainfeeds = state.getIn(['feeds', action.index], null)
        let feed = mainfeeds.merge(action.feeditem)
        feed = feed.set('thumbnailUrl', mainfeeds.get('thumbnailUrl'))
        return state.setIn(['feeds', action.index], feed)
      case AppConstants.DELETE_MAINFEEDITEM:
        // 해당 인덱스에 feeds를 찾아서 삭제한다
        return state
      default:
        return state
    }
  }
}

// Export a singleton instance of the store
const instance = new MainfeedDetailStore(AppDispatcher)
export default instance
