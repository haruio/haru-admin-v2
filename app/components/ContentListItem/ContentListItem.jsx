import React from 'react'
import {Link} from 'react-router'

import debug from 'debug'
const log = debug('application:ContentListItem.jsx')

import { CONTENT, POPUP } from '../../constants/AppConstants'
import ContentActions from '../../actions/ContentActions'
import PopupActions from '../../actions/PopupActions'
import intlStores from '../../utils/IntlStore'

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

  showHistoryPopup() {
    PopupActions.openPopup(POPUP.HISTORY, {postSeq:this.props.content.get('postSeq')})
  }
  showPublishPopup() {
    PopupActions.openPopup(POPUP.PUBLISH, {postSeq:this.props.content.get('postSeq')})
  }
  showRejectPopup() {
    PopupActions.openPopup(POPUP.REJECT, {postSeq:this.props.content.get('postSeq')})
  }
  showDeletePopup() {
    if(window.confirm(intlStores.get('common.COMMON_MSG_DEL'))) {
      ContentActions.deleteContent(this.props.content.get('postSeq'))
    }
  }
  showCancelRequest() {
    if(window.confirm(intlStores.get('cms.CMS_MSG_NEED_APPROVE'))) {
      ContentActions.requestCancelRequest(this.props.content.get('postSeq'))
    }
  }

  get getHoverButton() {
    const content = this.props.content

    let contenttype = 'video'

    if(this.props.type == CONTENT.PUBLISHED ||
      this.props.type == CONTENT.RESERVED ||
      this.props.type == CONTENT.DELETEED) {
      const postTypeCd = content.get('postTypeCd')
      if(postTypeCd == 'VDO') {
        contenttype = 'video'
      } else {
        contenttype = 'image'
      }
    } else {
      const content_type = content.get('type')
      if(content_type == 'VDO') {
        contenttype = 'video'
      } else {
        contenttype = 'image'
      }
    }

    let contentid = this.props.content.get('postSeq')
    switch (this.props.type) {
      case CONTENT.CREATE:
      case CONTENT.RETRUN:
        return (
          <span>
            <Link to={`/content/compose/${contenttype}/${contentid}`} ><img src={ct_edit1} alt="" title="수정"/></Link>
            <a onClick={this.showDeletePopup}><img src={ct_edit2} alt="" title="삭제"/></a>
            <a onClick={this.showHistoryPopup}><img src={ct_edit3} alt="" title="히스토리"/></a>
          </span>)
      case CONTENT.WAITING:
        return (
          <span>
            <a onClick={this.showHistoryPopup}><img src={ct_edit3} alt="" title="히스토리"/></a>
            <a onClick={this.showCancelRequest}><img src={ct_edit7} alt="" title="취소"/></a>
          </span>)
      case CONTENT.PUBLISHED:
      case CONTENT.RESERVED:
        return (
          <span>
            <Link to={`/content/compose/${contenttype}/${contentid}`} ><img src={ct_edit1} alt="" title="수정"/></Link>
            <a onClick={this.showDeletePopup}><img src={ct_edit2} alt="" title="삭제"/></a>
            <a onClick={this.showHistoryPopup}><img src={ct_edit3} alt="" title="히스토리"/></a>
          </span>
        )
      case CONTENT.DELETEED:
        return (
          <span>
            <Link to={`/content/compose/${contenttype}/${contentid}`} ><img src={ct_edit1} alt="" title="수정"/></Link>
            <a onClick={this.showHistoryPopup}><img src={ct_edit3} alt="" title="히스토리"/></a>
          </span>)
      case CONTENT.INSPECTION:
        return (
          <span>
            <Link to={`/content/compose/${contenttype}/${contentid}`} ><img src={ct_edit1} alt="" title="수정"/></Link>
          <a onClick={this.showDeletePopup}><img src={ct_edit2} alt="" title="삭제"/></a>
          <a onClick={this.showHistoryPopup}><img src={ct_edit3} alt="" title="히스토리"/></a>
          <a onClick={this.showRejectPopup}><img src={ct_edit5} alt="" title="반려"/></a>
          <a onClick={this.showPublishPopup}><img src={ct_edit6} alt="" title="발행"/></a>
        </span>)
      default:
        return (
          <span>
            <Link to={`/content/compose/${contenttype}/${contentid}`} ><img src={ct_edit1} alt="" title="수정"/></Link>
            <a onClick={this.showDeletePopup}><img src={ct_edit2} alt="" title="삭제"/></a>
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

  get renderTypeIcon() {
    const content = this.props.content
    let contenttype = 'VDO'
    if(this.props.type == CONTENT.PUBLISHED ||
      this.props.type == CONTENT.RESERVED ||
      this.props.type == CONTENT.DELETEED) {
      contenttype = content.get('postTypeCd')

    } else {
      contenttype= content.get('type')
    }

    if(contenttype === 'VDO') {
      return <span className="movie">{content.get('strDuration')}</span>
    } else {
      return <span className="images">{content.get('imageCnt')}</span>
    }
  }

  movseOver = () => {
    $(this.refs.item).find('div p').stop().fadeIn(300).stop().animate({ opacity:1 }, 100)
  }
  mouseOut = () => {
    $(this.refs.item).find('div p').stop().fadeOut(300)
  }

  render() {
    const content = this.props.content

    let thumnail
    let author
    let title
    if(this.props.type == CONTENT.PUBLISHED ||
      this.props.type == CONTENT.RESERVED ||
      this.props.type == CONTENT.DELETEED) {
      thumnail = content.get('thumbnailUrl')
      author = content.get('postAuthor')
      title = content.get('postTitle')
    } else {
      thumnail = content.get('thumbnail')
      author = content.get('author')
      title = content.get('title')
    }

    return (
      <li ref="item" onMouseOver={this.movseOver} onMouseOut={this.mouseOut}>
        <div>
          <span><img src={content.getIn(['channel', 'iconImageUrl'], null)} alt=""/></span>
          <b></b>
          <em style={{ backgroundImage:'url('+thumnail+')' }}>
            {this.renderTypeIcon}
          </em>
          <p>
            {this.getHoverButton}
          </p>
        </div>
        {this.publishInfo}
        <dl>
          <dt>{title}</dt>
          <dd>임시저장 : 2015-08-08 PM 12:25</dd>
          <dd>{'작성자 : ' + author}</dd>
        </dl>
      </li>
    )
  }
}
