import React from 'react'
import {Link} from 'react-router'
import moment from 'moment'

import debug from 'debug'
const log = debug('application:ContentListItem.jsx')

import {CONTENT, POPUP} from '../../constants/AppConstants'
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
  render() {
    const content = this.props.content

    let thumnail
    let author
    let title
    if (this.props.type == CONTENT.PUBLISHED ||
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
            {this.renderHoverButton}
          </p>
        </div>
        {this.renderPublishInfo}
        <dl>
          <dt>{title}</dt>
          {this.renderDate}
          <dd>{'작성자 : ' + author}</dd>
        </dl>
      </li>
    )
  }

  get renderTypeIcon() {
    const content = this.props.content
    let contenttype = 'VDO'
    if (this.props.type == CONTENT.PUBLISHED ||
      this.props.type == CONTENT.RESERVED ||
      this.props.type == CONTENT.DELETEED) {
      contenttype = content.get('postTypeCd')

    } else {
      contenttype = content.get('type')
    }

    if (contenttype === 'VDO') {
      return <span className="movie">{content.get('strDuration')}</span>
    } else {
      return <span className="images">{content.get('imageCnt')}</span>
    }
  }

  get renderHoverButton() {
    const content = this.props.content

    let contenttype = 'video'

    if (this.props.type == CONTENT.PUBLISHED ||
      this.props.type == CONTENT.RESERVED ||
      this.props.type == CONTENT.DELETEED) {
      const postTypeCd = content.get('postTypeCd')
      if (postTypeCd == 'VDO') {
        contenttype = 'video'
      } else {
        contenttype = 'image'
      }
    } else {
      const content_type = content.get('type')
      if (content_type == 'VDO') {
        contenttype = 'video'
      } else {
        contenttype = 'image'
      }
    }

    let contentid = this.props.content.get('postSeq')
    switch (this.props.type) {
      case CONTENT.CREATE: // 작성중
      case CONTENT.RETRUN: // 반려
        return (
          <span>
            <Link to={`/content/compose/${contenttype}/${contentid}`}><img src={ct_edit1} alt="" title="수정"/></Link>
            <a onClick={this.showDeletePopup}><img src={ct_edit2} alt="" title="삭제"/></a>
            <a onClick={this.showHistoryPopup}><img src={ct_edit3} alt="" title="히스토리"/></a>
          </span>)
      case CONTENT.WAITING: // 승인요청
        return (
          <span>
            <a onClick={this.showHistoryPopup}><img src={ct_edit3} alt="" title="히스토리"/></a>
            <a onClick={this.showCancelRequest}><img src={ct_edit7} alt="" title="취소"/></a>
          </span>)
      case CONTENT.PUBLISHED: // 발행된
      case CONTENT.RESERVED:  // 예약된
        return (
          <span>
            <Link to={`/content/compose/${contenttype}/${contentid}`}><img src={ct_edit1} alt="" title="수정"/></Link>
            <a onClick={this.showPublishDeletePopup}><img src={ct_edit2} alt="" title="삭제"/></a>
            <a onClick={this.showHistoryPopup}><img src={ct_edit3} alt="" title="히스토리"/></a>
          </span>
        )
      case CONTENT.DELETEED: // 삭제된
        return (
          <span>
            <Link to={`/content/compose/${contenttype}/${contentid}`}><img src={ct_edit1} alt="" title="수정"/></Link>
            <a onClick={this.showHistoryPopup}><img src={ct_edit3} alt="" title="히스토리"/></a>
          </span>)
      case CONTENT.INSPECTION: // 검수
        return (
          <span>
            <Link to={`/content/inspection/${contenttype}/${contentid}`}><img src={ct_edit1} alt="" title="수정"/></Link>
          <a onClick={this.showPublishDeletePopup}><img src={ct_edit2} alt="" title="삭제"/></a>
          <a onClick={this.showHistoryPopup}><img src={ct_edit3} alt="" title="히스토리"/></a>
          <a onClick={this.showRejectPopup}><img src={ct_edit5} alt="" title="반려"/></a>
          <a onClick={this.showPublishPopup}><img src={ct_edit6} alt="" title="발행"/></a>
        </span>)
      default:
        return (
          <span>
            <Link to={`/content/compose/${contenttype}/${contentid}`}><img src={ct_edit1} alt="" title="수정"/></Link>
            <a onClick={this.showDeletePopup}><img src={ct_edit2} alt="" title="삭제"/></a>
          </span>)
    }
  }

  get renderPublishInfo() {
    // Mycontent 화면과 inspection 화면에는 publish 된적이 없기 때문에 해당 정보를 띄우지 않는다.
    if (this.props.type == CONTENT.INSPECTION
      || this.props.type == CONTENT.CREATE
      || this.props.type == CONTENT.WAITING
      || this.props.type == CONTENT.RETRUN)
      return null

    const content = this.props.content
    return (
      <p>
        <span>
          <i title="뷰">{content.get('viewCnt')}</i>
          <i title="좋아요">{content.get('likeCnt')}</i>
          <i title="댓글">{content.get('commentCnt')}</i>
          <i title="공유">{content.get('shareCnt')}</i>
        </span>
      </p>)
  }

  get renderDate() {
    switch (this.props.type) {
      case CONTENT.CREATE: // 작성중
        return <dd>{intlStores.get('cms.CMS_BTN_TEMP_SAVE')} : {moment(this.props.content.get('updateDt')).format('YYYY-MM-DD a hh:mm')}</dd>
      case CONTENT.WAITING: // 승인요청
        return <dd>{intlStores.get('cms.CMS_BTN_REQUEST')} : {moment(this.props.content.get('updateDt')).format('YYYY-MM-DD a hh:mm')}</dd>
      case CONTENT.RETRUN: // 반려
        return <dd>{intlStores.get('cms.CMS_FLD_REJECT')} : {moment(this.props.content.get('updateDt')).format('YYYY-MM-DD a hh:mm')}</dd>
      case CONTENT.PUBLISHED: // 발행된
        return <dd>{intlStores.get('cms.CMS_FLD_SUBMITTED_DATE')} : {moment(this.props.content.get('publishStartDt')).format('YYYY-MM-DD a hh:mm')}</dd>
      case CONTENT.RESERVED:  // 예약된
        return <dd>{intlStores.get('cms.CMS_FLD_SCHEDULED_DATE')} : {moment(this.props.content.get('publishStartDt')).format('YYYY-MM-DD a hh:mm')}</dd>
      case CONTENT.DELETEED: // 삭제된
        return <dd>{intlStores.get('cms.CMS_FLD_DELETED_DATE')} : {moment(this.props.content.get('publishEndDt')).format('YYYY-MM-DD a hh:mm')}</dd>
      case CONTENT.INSPECTION: // 검수
        return <dd>{intlStores.get('cms.CMS_BTN_REQUEST')} : {moment(this.props.content.get('updateDt')).format('YYYY-MM-DD a hh:mm')}</dd>
      default:
        return <dd>{intlStores.get('cms.CMS_BTN_REQUEST')} : {moment(this.props.content.get('updateDt')).format('YYYY-MM-DD a hh:mm')}</dd>
    }
  }

  /***
   * 컨텐츠 히스토리 팝업
   */
  showHistoryPopup = ()=> {
    PopupActions.openPopup(POPUP.HISTORY, {postSeq: this.props.content.get('postSeq')})
  }

  /***
   * 검수 완료 후 발행 팝업
   */
  showPublishPopup = ()=> {
    PopupActions.openPopup(POPUP.PUBLISH, {postSeq: this.props.content.get('postSeq')})
  }

  /***
   * 검수시 검수 거절 팝업
   */
  showRejectPopup = ()=> {
    PopupActions.openPopup(POPUP.REJECT, {postSeq: this.props.content.get('postSeq')})
  }

  /***
   * 작성중인 상태에서 삭제 클릭시 이벤트
   */
  showDeletePopup = ()=> {
    if (window.confirm(intlStores.get('common.COMMON_MSG_DEL'))) {
      ContentActions.deleteContent(this.props.content.get('postSeq'))
    }
  }

  /***
   * 승인요청된 상태에서 삭제 클릭시 이벤트
   */
  showPublishDeletePopup = ()=> {
    if (window.confirm(intlStores.get('common.COMMON_MSG_DEL'))) {
      switch (this.props.type) {
        case CONTENT.PUBLISHED :
          return ContentActions.deleteContents(this.props.content.get('postSeq'), ContentActions.getViewedContents)
        case CONTENT.RESERVED :
          return ContentActions.deleteContents(this.props.content.get('postSeq'), ContentActions.getReservedContents)
        case CONTENT.INSPECTION :
          return ContentActions.deleteContents(this.props.content.get('postSeq'), ContentActions.getInspectionContent)
        default :
          break
      }
    }
  }

  /***
   * 승인 취소 클릭 이벤트
   */
  showCancelRequest = ()=> {
    if (window.confirm('승인 취소를 하시겠습니까?')) {
      ContentActions.requestCancelRequest(this.props.content.get('postSeq'))
    }
  }

  /***
   * Mose Hover Event
   */
  movseOver = () => {
    $(this.refs.item).find('div p').stop().fadeIn(300).stop().animate({opacity: 1}, 100)
  }
  mouseOut = () => {
    $(this.refs.item).find('div p').stop().fadeOut(300)
  }
}
