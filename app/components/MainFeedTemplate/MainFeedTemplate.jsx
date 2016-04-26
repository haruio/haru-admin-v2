import React from 'react'
import cn from 'classnames'

import debug from 'debug'
const log = debug('application:MainFeedTemplate.jsx')

// 컨텐츠 수정할때 사용함
const ct_edit1 = require('image!../../assets/img/ct_edit1.png')

import PopupActions from '../../actions/PopupActions'
import {POPUP} from '../../constants/AppConstants'

/**
 * A component to MainFeedTemplate
 * author : jungun.park
 */

export default class MainFeedTemplate extends React.Component {
  //TODO readonly 처리 필요 ??? 
  render() {
    if(this.props.mainfeed.get('feeds').size === 0) {
      return null
    }

    const templetType = this.props.mainfeed.get('templeteType')

    // create feedList
    const feedList = this.props.mainfeed.get('feeds').map((feed, i) => {
      const style = cn({
        row2: feed.get('feedStyleCd') == 'V',
        col2: feed.get('feedStyleCd') == 'H',
        right: (templetType == 6 || templetType == 8)
      })
      const feedStyleCd = feed.get('feedStyleCd')

      // 컨텐츠가 있다면, thumbnailUrl 이 있는것으로 판단함
      if (feed.get('thumbnailUrl') !== '') {
        return (
          <li key={i} className={style + ' item'} onMouseOver={this.movseOver} onMouseOut={this.mouseOut}>
            <a onClick={this.onPopupFeedList.bind(null, {feedIdx:i, feedStyleCd:feedStyleCd})}>
              <div>
                <em style={{backgroundImage: 'url('+feed.get('thumbnailUrl')+')'}}>
                    <span className={feed.get('postTypeCd') != 'VDO' ? 'cnt': ''}>
                      {feed.get('postTypeCd') != 'VDO' ? feed.get('imageCnt') : feed.get('strDuration')}
                    </span>
                </em>
                <p>{feed.get('postTitle')}</p>
              </div>
            </a>
            <span className="modifi">
              <a onClick={this.onPopupFeedList.bind(null, {feedIdx:i, feedStyleCd:feedStyleCd})}>
                <img src={ct_edit1} alt="수정" title="수정"/>
              </a>
            </span>
          </li>)
      } else {
        return (
          <li key={i} className={style}>
            <a onClick={this.onPopupFeedList.bind(null, {feedIdx:i, feedStyleCd:feedStyleCd})}>
              <span key={i + 'c'} className="add">{feed.get('postTitle')}</span>
            </a>
          </li>)
      }
    })

    return (<ul className="main_list">{feedList}</ul>)
  }

  onPopupFeedList(feedObj) {
    PopupActions.openPopup(POPUP.MAINFEED, feedObj)
  }

  movseOver = (e) => {
    const target = this._getTargetClass($(e.target), 'item')
    $(target).find('.modifi').stop().fadeIn(300).stop().animate({opacity: 1}, 100)
  }

  mouseOut = (e) => {
    const target = this._getTargetClass($(e.target), 'item')
    $(target).find('.modifi').stop().fadeOut(300)
  }

  _getTargetClass(el, targetClass) {
    let tempEl = el[0]
    if (tempEl.className == targetClass) {
      return tempEl
    } else {
      while (tempEl.parentNode) {
        tempEl = tempEl.parentNode
        if (tempEl.className && tempEl.className.indexOf(targetClass) != -1)
          return tempEl
      }
    }
    return null
  }
}
