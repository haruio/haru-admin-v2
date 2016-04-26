/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Link} from 'react-router'
import {Container} from 'flux/utils'
import moment from 'moment'

import debug from 'debug'
const log = debug('application:RecommendPostEdit.jsx')

import AppActions from '../../../actions/AppActions'
import PopupActions from '../../../actions/PopupActions'
import {POPUP} from '../../../constants/AppConstants'
import PostStore from '../../../stores/RecommendPostStore'
import intlStores from '../../../utils/IntlStore'

const edit1 = require('image!../../../assets/img/ct_edit1.png')
const icon_plus = require('image!../../../assets/img/icon_plus.png')


import $ from 'jquery'
/* ref : http://www.daterangepicker.com/ : bootstrap daterangepicker */
import '../../../assets/vendor/daterangepicker-custom.css'
import '../../../assets/vendor/daterangepicker.js'


class RecommendPostEdit extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static getStores() {
    return [PostStore]
  }

  static calculateState() {
    return {
      postdetail: PostStore.getRecommendPost(),
      post: PostStore.getPost()
    }
  }

  componentWillMount() {
    // param이 있고 postdetail이 없는 경우 서버에 요청함
    if (this.props.params.id !== undefined) {
      AppActions.getRecommendPost(this.props.params.id)
    } else {
      setTimeout(() => {
        AppActions.clearPostDetail()
      })
    }
  }

  componentDidMount() {
    /* 어쩔수 없이 jQuery로 개발 daterangepicker 초기화 */
    $('.txt.daterange').daterangepicker({
      locale: {format: 'YYYY-MM-DD'}
    })
    $('.txt.daterange').on('apply.daterangepicker', (ev, picker) => {
      $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'))
      AppActions.updateRecommendDate('date', picker.startDate.valueOf(), picker.endDate.valueOf())
    })

    $('.txt.daterange').data('daterangepicker').setStartDate(moment(this.state.postdetail.get('recommendStartDt')).format('YYYY-MM-DD'))
    $('.txt.daterange').data('daterangepicker').setEndDate(moment(this.state.postdetail.get('recommendEndDt')).format('YYYY-MM-DD'))
  }

  render() {
    log(this.state.postdetail.toJS())

    return (
      <article>
        <hgroup>
          <h2>{intlStores.get('sm.SM_FLD_FEATURED_CONTENT_REG')}</h2>
        </hgroup>
        <div id="contents">
          <div id="service_add">
            <table className="writeTable">
              <colgroup>
                <col width="154px"/>
                <col width="*"/>
              </colgroup>
              <tbody>
              <tr>
                <th>{intlStores.get('sm.SM_FLD_FEATURED_CONTENT')}</th>
                <td>
                  {this.renderRecommendPost}
                </td>
              </tr>
              <tr>
                <th>추천 시간</th>
                <td>
                  <input type="text" className="txt daterange"/><a href="" className="btn_calendar"></a>
                </td>
              </tr>
              <tr>
                <th>{intlStores.get('sm.SM_FLD_PROBABLE')}</th>
                <td>
                  <p className="btn_w340">
                    <input type="range" min="0" max="100" value={this.state.postdetail.get('recommendPct')} step="5"
                           className="txt btn_w300" onChange={this.onChangePercent}/>
                    <span style={{float:'right'}}>{this.state.postdetail.get('recommendPct') + '%'}</span>
                  </p>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <p className="btn_r btnbox_w960">
            <a onClick={this.handleSubmit}
               className="purple btn_w140">{this.props.params.id ? intlStores.get('cms.CMS_BTN_EDIT') : intlStores.get('common.COMMON_BTN_REGISTER')}</a>
            <Link to="/service/mgmt/post" className="gray">{intlStores.get('common.COMMON_BTN_CANCEL')}</Link>
          </p>
        </div>
      </article>
    )
  }

  /***
   * Recommend Post Render
   */
  get renderRecommendPost() {
    // new 상태일때
    if (this.props.params.id == undefined && this.state.post.size === 0) {
      return (
        <ul className="list">
          <li ref="item" onMouseOver={this.movseOver} onMouseOut={this.mouseOut}>
            <div id="recommend_empty" onClick={this.SeachPublishedPost}>
              <img src={icon_plus}/>
            </div>
          </li>
        </ul>)
    } else {
      const post = this.state.post
      return (
        <ul className="list">
          <li ref="item" onMouseOver={this.movseOver} onMouseOut={this.mouseOut}>
            <div>
              <span><img src={post.getIn(['channel', 'iconImageUrl'], null)} alt="channel icon"/></span>
              <b><span>{post.getIn(['channel', 'name'], null)}</span></b>
              <em style={{ backgroundImage:'url('+ post.get('thumbnailUrl') +')' }}></em>
              <p>
                <span><a onClick={this.SeachPublishedPost}><img src={edit1} alt="" title="수정"/></a></span>
              </p>
            </div>
            <dl>
              <dt>{post.get('postTitle')}</dt>
            </dl>
          </li>
        </ul>)
    }
  }
  /***
   * Event Handlers
   */
  SeachPublishedPost() {
    PopupActions.openPopup(POPUP.PUBLISHEDCONTENT, {view: 'recommendpost', title: '추천 컨텐츠 검색'})
  }
  // range 변경 이벤트
  onChangePercent = (e) => {
    AppActions.updateRecommendMeta('recommendPct', e.target.value)
  }
  // hover event
  movseOver = () => {
    $(this.refs.item).find('div p').stop().fadeIn(300).stop().animate({opacity: 1}, 100)
  }
  mouseOut = () => {
    $(this.refs.item).find('div p').stop().fadeOut(300)
  }

  // 발행 이벤트
  handleSubmit = ()=> {
    if (this.state.post.size == 0) {
      alert(intlStores.get('sm.SM_MSG_NEED_REC_CONTENT'))
      return
    }

    let requestData = {}
    requestData.postSeq = this.state.post.get('postSeq')

    // 기존에 값이 있다면 초기값 셋팅
    requestData.recommendStartDt = moment(this.state.postdetail.get('recommendStartDt')).format('YYYY-MM-DD')
    requestData.recommendEndDt = moment(this.state.postdetail.get('recommendEndDt')).format('YYYY-MM-DD')
    requestData.recommendPct = this.state.postdetail.get('recommendPct')

    if (this.props.params.id == undefined) {
      //insert
      if (window.confirm(intlStores.get('common.COMMON_MSG_REG'))) {
        AppActions.createRecommendPost(requestData, () => {
          this.context.router.push('/service/mgmt/post')
        })
      }
    } else {
      //update
      if (window.confirm(intlStores.get('common.COMMON_MSG_EDIT'))) {
        AppActions.modifyRecommendPost(this.props.params.id, requestData, () => {
          this.context.router.push('/service/mgmt/post')
        })
      }
    }
  }
}
const RecommendPostEditContainer = Container.create(RecommendPostEdit)
export default RecommendPostEditContainer
