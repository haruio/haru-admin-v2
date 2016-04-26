/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import { Link } from 'react-router'
import {Container} from 'flux/utils'
import cn from 'classnames'
import moment from 'moment'

import debug from 'debug'
const log = debug('application:PushEdit.jsx')

import intlStores from '../../../utils/IntlStore'
import AppActions from '../../../actions/AppActions'
import PopupActions from '../../../actions/PopupActions'
import {POPUP} from '../../../constants/AppConstants'
import PushDetailStore from '../../../stores/PushDetailStore'
import CategoryStore from '../../../stores/CategoryStore'
import ChannelStore from '../../../stores/ChannelStore'

import Alert from 'react-s-alert'

const edit1 = require('image!../../../assets/img/ct_edit1.png')
const icon_plus = require('image!../../../assets/img/icon_plus.png')
import util from '../../../utils/util'


class PushEdit extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static getStores() {
    return [PushDetailStore, CategoryStore, ChannelStore]
  }

  static calculateState() {
    return {
      push: PushDetailStore.getPushDetail(),
      categories: CategoryStore.getCategories(),
      channels: ChannelStore.getChannels()
    }
  }

  componentDidMount() {
    this.refs.push_title.focus()
    this._initCalendar()


    if (this.props.params.id !== undefined) {
      AppActions.getPushDetail(this.props.params.id)
    } else {
      setTimeout(() => {
        AppActions.clearPush()
      })
    }
  }

  _initCalendar() {
    $('#pushDate').datepicker({
      dateFormat: 'yy-mm-dd',
      onClose: (dateText) => {
        const datesplit = dateText.split('-')

        const date = this.state.push.get('publishDt')
        let changeddate = moment(date).set('year', datesplit[0]).set('month', datesplit[1] - 1).set('date', datesplit[2])
        AppActions.updatePushDate(changeddate.valueOf())
      }
    }).datepicker('setDate', moment(this.state.push.get('publishDt')).format('YYYY-MM-DD'))
  }

  render() {
    log(this.state.push.toJS())
    return (
      <article>
        <hgroup>
          <h2>Push 관리</h2>
        </hgroup>
        <div id="contents">
          <div style={{width:'640px', float:'left'}}>
            <table className="writeTable">
              <colgroup>
                <col width="154px"/>
                <col width="*"/>
              </colgroup>
              <tbody>
              <tr>
                <th>{intlStores.get('cms.CMS_FLD_TITLE')}</th>
                <td><input type="text" ref="push_title" id="input-title" className="txt t6"
                           value={this.state.push.getIn(['message', 'title'], '')}
                           onChange={this.onChangeMessage.bind(this, 'title')} /></td>
              </tr>
              <tr>
                <th>본문</th>
                <td>
                  <textarea id="input-push-body" style={{width:'490px'}} ref="push_body"
                            value={this.state.push.getIn(['message', 'body'], '')}
                            onChange={this.onChangeMessage.bind(this, 'body')}></textarea>
                </td>
              </tr>
              <tr>
                <th>Push Type</th>
                <td>
                  <p className="input_margin">
                    <input type="radio" id="pushType2" name="pushType" value="PST" onChange={this.onChangePushType.bind(this, 'PST')} checked={this.state.push.getIn(['message', 'type'], '') == 'PST'} /> <label htmlFor="pushType2">Post</label>
                    <input type="radio" id="pushType3" name="pushType" value="CHN" onChange={this.onChangePushType.bind(this, 'CHN')} checked={this.state.push.getIn(['message', 'type'], '') == 'CHN'} /> <label htmlFor="pushType3">Channel</label>
                    <input type="radio" id="pushType4" name="pushType" value="CAT" onChange={this.onChangePushType.bind(this, 'CAT')} checked={this.state.push.getIn(['message', 'type'], '') == 'CAT'} /> <label htmlFor="pushType4">Category</label>
                    <input type="radio" id="pushType1" name="pushType" value="LNK" onChange={this.onChangePushType.bind(this, 'LNK')} checked={this.state.push.getIn(['message', 'type'], '') == 'LNK'} /> <label htmlFor="pushType1">Link</label>
                  </p>
                </td>
              </tr>
              {this.renderConnectContent}
              <tr>
                <th style={{borderTop:'1px solid #ddd', paddingTop:'15px'}}>{intlStores.get('sm.SM_FLD_MEMBER_TYPE')}</th>
                <td style={{borderTop:'1px solid #ddd', paddingTop:'15px'}}>
                  <select id="userType" style={{width:'490px'}}
                          value={this.state.push.getIn(['condition', 'user'], '')}
                          onChange={this.handleChange.bind(this, 'user')}>
                    <option value="">전체</option>
                    <option value="MEMBER">회원</option>
                    <option value="GUEST">비회원</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th>{intlStores.get('sm.SM_FLD_CHANNEL_TYPE')}</th>
                <td>
                  <select id="channelType"  style={{width:'490px'}}
                          value={this.state.push.getIn(['condition', 'channelSeq'], '')}
                          onChange={this.handleChange.bind(this, 'channelSeq')}>
                    <option value="">미선택</option>
                    {this.state.channels.map((channel, i) =>
                      <option key={i} value={channel.get('channelSeq')}>{channel.get('name')}</option>
                    )}
                  </select>
                </td>
              </tr>
              <tr>
                <th>{intlStores.get('sm.SM_FLD_TARGET_PLATFORM')}</th>
                <td>
                  <select id="platformType"  style={{width:'490px'}}
                          value={this.state.push.getIn(['condition', 'osType'], '')}
                          onChange={this.handleChange.bind(this, 'osType')}>
                    <option value="">전체</option>
                    <option value="AND">Android</option>
                    <option value="IOS">iOS</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th style={{paddingBottom:'20px'}}>{intlStores.get('sm.SM_FLD_GENDER_TYPE')}</th>
                <td style={{paddingBottom:'20px'}}>
                  <select id="genderType" style={{width:'490px'}}
                          value={this.state.push.getIn(['condition', 'gender'], '')}
                          onChange={this.handleChange.bind(this, 'gender')}>
                    <option value="">전체</option>
                    <option value="M">남성</option>
                    <option value="F">여성</option>
                    <option value="NK">응답안함</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th style={{borderTop:'1px solid #ddd', paddingTop:'20px'}}>{intlStores.get('sm.SM_FLD_SEND_TYPE')}</th>
                <td style={{borderTop:'1px solid #ddd', paddingTop:'20px'}}>
                  <p className="input_margin">
                    <input type="radio" id="sendType1" name="sendType" value="DRCT" onChange={this.onChangeSendType.bind(this, 'DRCT')} checked={this.state.push.get('pushStatus') === 'DRCT'} /><label htmlFor="sendType1">즉시발송</label>
                    <input type="radio" id="sendType2" name="sendType" value="RVED" onChange={this.onChangeSendType.bind(this, 'RVED')} checked={this.state.push.get('pushStatus') === 'RVED'} /><label htmlFor="sendType1">예약발송</label>
                  </p>
                </td>
              </tr>
              <tr>
                <th><span className = {this.state.push.get('pushStatus') != 'RVED' ? 'hide': ''}>{intlStores.get('sm.SM_FLD_SEND_DATE')}</span></th>
                <td>
                  <p className = {this.state.push.get('pushStatus') != 'RVED' ? 'hide': ''}>
                    <input type="text" id="pushDate" className="txt" ref="pushDate" defaultValue={moment().format('YYYY-MM-DD')}  /><a onClick={this.onShowCalendar} className="btn_calendar"></a>
                    <select className="ml10" ref="pushHour"
                            value={moment(this.state.push.get('publishDt')).format('HH')}
                            onChange={this.onChangeDate.bind(this, 'hour')}
                            style={{width:'70px'}}>
                      {Array(24).fill(1).map((el, i) =>
                        <option key={i} value={moment({ minute:i }).format('mm')}>{moment({hour:i}).format('HH') + '시'}</option>
                      )}
                    </select>
                    <select className="ml10" ref="pushMinute"
                            value={moment(this.state.push.get('publishDt')).format('mm')}
                            onChange={this.onChangeDate.bind(this, 'minute')}
                            style={{width:'70px'}}>
                      {Array(60).fill(1).map((el, i) =>
                        <option key={i} value={moment({ minute:i }).format('mm')}>{moment({minute:i}).format('mm') + '분'}</option>
                      )}
                    </select>
                  </p>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div id="push_preview">
            <p>{this.state.push.getIn(['message', 'title'], '')}</p>
          </div>

          {this.renderButton}
        </div>
      </article>
    )
  }

  onChangeDate = (datetype, e) => {
    if(datetype === 'hour') {

      let hour = e.target.value
      log(hour)
      let changeddate = moment(this.state.push.get('publishDt')).set('hour', hour)
      AppActions.updatePushDate(changeddate.valueOf())

    } else if(datetype === 'minute') {
      let minute = e.target.value
      log(minute)
      let changeddate = moment(this.state.push.get('publishDt')).set('minute', minute)
      AppActions.updatePushDate(changeddate.valueOf())
    }
  }
  onChangeMessage(messagetype, e) {
    AppActions.updatePushMessage(messagetype, e.target.value)
  }

  handleChange(metatype, e) {
    if (this.props.params.id !== undefined) {
      Alert.error('푸시 조건은 수정이 불가능합니다. 예약 취소하고 다시 생성해주세요', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
      return
    }
    AppActions.updatePushCondition(metatype, e.target.value)
  }

  onChangePushType(pushtype) {
    AppActions.updatePushMessage('type', pushtype)
  }

  onChangeSendType(sendtype) {
    if (this.props.params.id !== undefined) {
      Alert.error('푸시 조건은 수정이 불가능합니다. 예약 취소하고 다시 생성해주세요', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
      return
    }
    AppActions.updatePushSendType(sendtype)
  }

  onShowCalendar() {
    $('#pushDate').datepicker('show')
  }

  get renderConnectContent() {
    switch (this.state.push.getIn(['message', 'type'], '')) {
      case 'PST' :
        return this.renderPost
      case 'CHN' :
        return this.renderChannel
      case 'CAT' :
        return this.renderCategory
      case 'LNK' :
        return this.renderLink
    }
  }

  get renderPost() {
    return (<tr>
      <th style={{paddingBottom:'15px'}}>연결될 컨텐츠</th>
      <td style={{paddingBottom:'15px'}}>
        {this.renderRecommendPost}
      </td>
    </tr>)
  }

  /***
   * Recommend Post Render
   */
  get renderRecommendPost() {
    // new 상태일때
    if ((this.props.params.id == undefined && this.state.push.size === 0)
      || this.state.push.get('post') == undefined) {
      return (
        <ul className="list">
          <li ref="item" onMouseOver={this.movseOver} onMouseOut={this.mouseOut}>
            <div id="recommend_empty" onClick={this.SeachPublishedPost}>
              <img src={icon_plus}/>
            </div>
          </li>
        </ul>)
    } else {
      const banner = this.state.push
      // TODO : channel 이 여러개일땐 어떻게 하지?
      return (
        <ul className="list">
          <li ref="item" onMouseOver={this.movseOver} onMouseOut={this.mouseOut}>
            <div>
              <span><img src={banner.getIn(['post', 'channel', 'iconImageUrl'], '')} alt="channel icon"/></span>
              <b><span>{banner.getIn(['post', 'channel', 'name'], '')}</span></b>
              <em style={{ backgroundImage:'url('+ banner.getIn(['post','thumbnailUrl'], '') +')' }}></em>
              <p>
                <span><a onClick={this.SeachPublishedPost}><img src={edit1} alt="" title="수정"/></a></span>
              </p>
            </div>
            <dl>
              <dt>{banner.getIn(['post', 'postTitle'], '')}</dt>
            </dl>
          </li>
        </ul>)
    }
  }

  /***
   * 배너에 등록할 포스트 검색
   */
  SeachPublishedPost() {
    PopupActions.openPopup(POPUP.PUBLISHEDCONTENT, {view: 'banner', title: '배너 등록 컨텐츠 검색'})
  }

  get renderChannel() {
    let ChannelList = []

    const pushurl = this.state.push.getIn(['message', 'url'], '')
    let defaultCategory = pushurl.indexOf('channel') >= 0 ? pushurl.split(/channel\//)[1] : ''

    this.state.channels.map((channel, i) => {
      ChannelList.push(<option key={i} value={channel.get('urlNm')}>{channel.get('name') + ' ' + ((channel.get('channelViewCd') == 'N') ? '(' + intlStores.get('common.COMMON_FLD_PRIVATE') + ')' : '')}</option>)
    })
    return (
      <tr>
        <th style={{paddingBottom:'15px'}}>{intlStores.get('sm.SM_FLD_NEED_CHANNEL')}</th>
        <td style={{paddingBottom:'15px'}}>
          <select id="channelList" style={{width:'360px'}} value={defaultCategory} onChange={this.onChangeChannel}>
            <option>--- channel ---</option>
            {ChannelList}
          </select>
        </td>
      </tr>
    )
  }

  onChangeChannel(e) {
    AppActions.updatePushURL('dingo://channel/' + e.target.value)
  }

  get renderCategory() {
    let CategoryList = []

    const pushurl = this.state.push.getIn(['message', 'url'], '')
    let defaultCategory = pushurl.indexOf('category') >= 0 ? pushurl.split(/category\//)[1] : ''

    this.state.categories.map((category, i) => {
      CategoryList.push(<option key={i}
                                value={category.get('urlNm')}>{category.get('name') + ' ' + ((category.get('categoryViewCd') == 'N') ? '(' + intlStores.get('common.COMMON_FLD_PRIVATE') + ')' : '')}</option>)
    })
    return (
      <tr>
        <th style={{paddingBottom:'15px'}}>{intlStores.get('sm.SM_FLD_NEED_CATEGORY')}</th>
        <td style={{paddingBottom:'15px'}}>
          <select id="categoryList" style={{width:'360px'}} value={defaultCategory} onChange={this.onChangeCategory}>
            <option>--- category ---</option>
            {CategoryList}
          </select>
        </td>
      </tr>
    )
  }


  onChangeCategory(e) {
    AppActions.updatePushURL('dingo://category/' + e.target.value)
  }

  get renderLink() {
    return (
      <tr>
        <th style={{paddingBottom:'15px'}}>{intlStores.get('sm.SM_FLD_NEED_LINK')}</th>
        <td style={{paddingBottom:'15px'}}>
          <input type="text" className="txt t6" id="linkUrl" placeholder="http://"
                 defaultValue={this.state.push.get('pushUrl') || ''} onBlur={this.onChangeLink}/>
        </td>
      </tr>
    )
  }

  onChangeLink(e) {
    // 아무것도 안입력했을때는 validation check하지 않게함. 편의성을 위해서
    if (e.target.value === '') {
      return
    }

    // URL validation
    if (util.sourceUrlCheck(e.target.value)) {
      AppActions.updatePushURL(e.target.value)
    } else {
      Alert.error('올바른 URL이 아닙니다.', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })

      e.target.focus()
    }
  }

  get renderButton() {
    if (this.props.params.id !== undefined) {
      return (
        <p className="btn_c" style={{clear:'both'}}>
          <a onClick={this.updatePush} className="blue">수정하기</a>
          <a onClick={this.cancelPush} className="purple">예약취소</a>
          <Link to="/service/push" className="gray">리스트</Link>
        </p>
      )
    } else {
      return (
        <p className="btn_c" style={{clear:'both'}}>
          <a onClick={this.sendPush} className="purple">{intlStores.get('sm.SM_FLD_DO_SAVE')}</a>
          <Link to="/service/push" className="gray">{intlStores.get('sm.SM_FLD_DO_CANCEL')}</Link>
        </p>
      )
    }

  }

  sendPush = () => {
    if(this.state.push.getIn(['message', 'title'], '') === '') {
      Alert.error('타이틀을 입력해주십시오', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
      this.refs.push_title.focus()
      return
    }

    if(this.state.push.getIn(['message', 'body'], '') === '') {
      Alert.error('본문을 입력해주십시오', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
      this.refs.push_body.focus()
      return
    }

    if(this.state.push.getIn(['message', 'url'], '') === '') {
      Alert.error('연결될 링크을 입력해주십시오', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
      return
    }

    AppActions.sendPush(this.state.push.toJS(),  () => {
      this.context.router.push('/service/push')
    })
  }

  cancelPush = () => {
    AppActions.cancelPush(this.props.params.id,  () => {
      this.context.router.push('/service/push')
    })
  }

  updatePush = () => {
    if(this.state.push.getIn(['message', 'title'], '') === '') {
      Alert.error('타이틀을 입력해주십시오', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
      this.refs.push_title.focus()
      return
    }

    if(this.state.push.getIn(['message', 'body'], '') === '') {
      Alert.error('본문을 입력해주십시오', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
      this.refs.push_body.focus()
      return
    }

    if(this.state.push.getIn(['message', 'url'], '') === '') {
      Alert.error('연결될 링크을 입력해주십시오', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
      return
    }

    AppActions.updatePush(this.state.push.toJS(), this.props.params.id, () => {
      this.context.router.push('/service/push')
    })
  }
}

const PushEditContainer = Container.create(PushEdit)
export default PushEditContainer
