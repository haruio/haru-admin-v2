import React from 'react'


import debug from 'debug'
const log = debug('application:ContentListItem.jsx')

import { CONTENT } from '../../constants/AppConstants'

const ct_edit1 = require('image!../../assets/img/ct_edit1.png')
const ct_edit2 = require('image!../../assets/img/ct_edit2.png')
const ct_edit3 = require('image!../../assets/img/ct_edit3.png')
const ct_edit4 = require('image!../../assets/img/ct_edit4.png')
const ct_edit5 = require('image!../../assets/img/ct_edit5.png')
const ct_edit6 = require('image!../../assets/img/ct_edit6.png')
const ct_edit7 = require('image!../../assets/img/ct_edit7.png')


/**
 * A component to ContentList
 * author : jungun.park
 */

export default class ContentListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: {
        viewCnt: 0,
        likeCnt: 0,
        commentCnt: 0,
        shareCnt: 0
      }
    }
  }

  get getHoverButton() {
    switch (this.props.type) {
      case CONTENT.CREATE:
      case CONTENT.RETRUN:
        return (
          <span>
            <a href=""><img src={ct_edit1} alt="" title="수정"/></a>
            <a href=""><img src={ct_edit2} alt="" title="삭제"/></a>
            <a href=""><img src={ct_edit3} alt="" title="히스토리"/></a>
          </span>)
      case CONTENT.WAITING:
          return (
            <span>
              <a href=""><img src={ct_edit3} alt="" title="히스토리"/></a>
              <a href=""><img src={ct_edit7} alt="" title="취소"/></a>
            </span>)
      case CONTENT.PUBLISHED:
      case CONTENT.RESERVED:
        return (
          <span>
            <a href=""><img src={ct_edit1} alt="" title="수정"/></a>
            <a href=""><img src={ct_edit2} alt="" title="삭제"/></a>
            <a href=""><img src={ct_edit3} alt="" title="히스토리"/></a>
          </span>
        )
      case CONTENT.DELETEED:
        return (
          <span>
            <a href=""><img src={ct_edit1} alt="" title="수정"/></a>
            <a href=""><img src={ct_edit3} alt="" title="히스토리"/></a>
          </span>)
      case CONTENT.INSPECTION:
        return (
          <span>
          <a href=""><img src={ct_edit1} alt="" title="수정"/></a>
          <a href=""><img src={ct_edit2} alt="" title="삭제"/></a>
          <a href=""><img src={ct_edit3} alt="" title="히스토리"/></a>
          <a href=""><img src={ct_edit5} alt="" title="반려"/></a>
          <a href=""><img src={ct_edit6} alt="" title="발행"/></a>
        </span>)
      default:
        return (
          <span>
            <a href=""><img src={ct_edit1} alt="" title="수정"/></a>
            <a href=""><img src={ct_edit2} alt="" title="삭제"/></a>
          </span>)
    }
  }


  get publishInfo() {
    // Mycontent 화면과 inspection 화면에는 publish 된적이 없기 때문에 해당 정보를 띄우지 않는다.
    if (this.props.type == CONTENT.INSPECTION
      || this.props.type == CONTENT.CREATE
      || this.props.type == CONTENT.WAITING
      || this.props.type == CONTENT.RETRUN)
      return null

    const content = this.state.content
    return (
      <p>
        <span>
          <i title="뷰">{content.viewCnt}</i>
          <i title="좋아요">{content.likeCnt}</i>
          <i title="댓글">{content.commentCnt}</i>
          <i title="공유">{content.shareCnt}</i>
        </span>
      </p>)
  }

  render() {
    return (
      <li>
        <div>
          <span><img src="http://assets2.moncast.com/channel/713f94bf61bb8b8c.jpeg" alt=""/></span>
          <b></b>
          <em style={{ backgroundImage:'url(http://assets2.moncast.com/thumb/1219f9f5cf29b60b.jpeg)' }}>
            <span className="movie">3:45</span></em>
          <p>
            {this.getHoverButton}
          </p>
        </div>
        {this.publishInfo}
        <dl>
          <dt>다비치 이해리가 아이유의 노래를 불렀다니 이해리가 아이유</dt>
          <dd>임시저장 : 2015-08-08 PM 12:25</dd>
          <dd>작성자 : 김태희</dd>
        </dl>
      </li>
    )
  }
}
