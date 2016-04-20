/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Container} from 'flux/utils'
import {Link} from 'react-router'
import Alert from 'react-s-alert'
import moment from 'moment'
import debug from 'debug'
const log = debug('application:BannerEdit.jsx')

import ImageUploader from '../../../components/ImageUploader'
import {POPUP} from '../../../constants/AppConstants'
import AppActions from '../../../actions/AppActions'
import PopupActions from '../../../actions/PopupActions'

import BannerDetailStore from '../../../stores/BannerDetailStore'
import CategoryStore from '../../../stores/CategoryStore'
import ChannelStore from '../../../stores/ChannelStore'

const edit1 = require('image!../../../assets/img/ct_edit1.png')
const icon_plus = require('image!../../../assets/img/icon_plus.png')

import util from '../../../utils/util'
import intlStores from '../../../utils/IntlStore'


class BannerEdit extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static getStores() {
    return [BannerDetailStore, CategoryStore, ChannelStore]
  }

  static calculateState() {
    return {
      banner: BannerDetailStore.getBanner(),
      categories: CategoryStore.getCategories(),
      channels: ChannelStore.getChannels()
    }
  }

  componentWillMount() {
    // param이 있고 postdetail이 없는 경우 서버에 요청함
    if (this.props.params.id !== undefined) {
      AppActions.getBanner(this.props.params.id)
    } else {
      setTimeout(() => {
        AppActions.clearBanner()
      })
    }
  }

  componentDidMount() {
    $('#start-datepicker').datepicker({
      dateFormat: 'yy-mm-dd',
      onClose: (dateText) => {
        const datesplit = dateText.split('-')
        log(datesplit)
        const date = this.state.banner.get('bannerStartDt')
        let changeddate = moment(date).set('year', datesplit[0]).set('month', datesplit[1] - 1).set('date', datesplit[2])
        AppActions.updateBannerDate('bannerStartDt', changeddate.valueOf())
      }
    })
    .datepicker('setDate', moment(this.state.banner.get('bannerStartDt')).format('YYYY-MM-DD'))

    $('#end-datepicker').datepicker({
      dateFormat: 'yy-mm-dd',
      onClose: (dateText) => {
        const datesplit = dateText.split('-')
        const date = this.state.banner.get('bannerEndDt')
        let changeddate = moment(date).set('year', datesplit[0]).set('month', datesplit[1] - 1).set('date', datesplit[2])
        AppActions.updateBannerDate('bannerEndDt', changeddate.valueOf())
      }
    })
    .datepicker('setDate', moment(this.state.banner.get('bannerEndDt')).format('YYYY-MM-DD'))
  }

  render() {
    const banner = this.state.banner
    log(banner.toJS())
    return (
      <article>
        <hgroup>
          <h2>{intlStores.get('sm.SM_FLD_BANNER_REG')}</h2>
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
                <th><b>{intlStores.get('sm.SM_FLD_EXP_PLATFORM')}</b></th>
                <td>
                  <p className="input_margin">
                    <input type="radio" id="publish5" name="publish"
                           checked={banner.get('platformCd') == 'ALL'}
                           onChange={this.handlePlatformChange.bind(this, 'ALL')}/>
                    <label htmlFor="publish5">All</label>
                    <input type="radio" id="publish1" name="publish"
                           checked={banner.get('platformCd') == 'AND'}
                           onChange={this.handlePlatformChange.bind(this, 'AND')}/>
                    <label htmlFor="publish1">Android</label>
                    <input type="radio" id="publish2" name="publish"
                           checked={banner.get('platformCd') == 'IOS'}
                           onChange={this.handlePlatformChange.bind(this, 'IOS')}/>
                    <label htmlFor="publish2">iOS</label>
                    <input type="radio" id="publish3" name="publish"
                           checked={banner.get('platformCd') == 'PC'}
                           onChange={this.handlePlatformChange.bind(this, 'PC')}/>
                    <label htmlFor="publish3">PC</label>
                    <input type="radio" id="publish4" name="publish"
                           checked={banner.get('platformCd') == 'MW'}
                           onChange={this.handlePlatformChange.bind(this, 'MW')}/>
                    <label htmlFor="publish4">Mobile</label>
                  </p>
                </td>
              </tr>
              {this.renderMobileThumbnail}
              {this.renderPCThumbnail}
              <tr>
                <th>{intlStores.get('sm.SM_FLD_BANNER_TYPE')}</th>
                <td>
                  <p className="input_margin">
                    <input type="radio" id="bannertype3" name="bannertype"
                           checked={banner.get('bannerTypeCd') == 'PST'}
                           onChange={this.handleTypeChange.bind(this, 'PST')}/>
                    <label htmlFor="bannertype3">Post</label>
                    <input type="radio" id="bannertype4" name="bannertype"
                           checked={banner.get('bannerTypeCd') == 'CHN'}
                           onChange={this.handleTypeChange.bind(this, 'CHN')}/>
                    <label htmlFor="bannertype4">Channel</label>
                    <input type="radio" id="bannertype5" name="bannertype"
                           checked={banner.get('bannerTypeCd') == 'CAT'}
                           onChange={this.handleTypeChange.bind(this, 'CAT')}/>
                    <label htmlFor="bannertype5">Category</label>
                    <input type="radio" id="bannertype1" name="bannertype"
                           checked={banner.get('bannerTypeCd') == 'LNK'}
                           onChange={this.handleTypeChange.bind(this, 'LNK')}/>
                    <label htmlFor="bannertype1">Link</label>
                  </p>
                </td>
              </tr>
              {this.renderConnectContent}
              <tr>
                <th>{intlStores.get('sm.SM_FLD_START_ON')}</th>
                <td>
                  <input type="text" placeholder="2015-08-08" className="txt t3" id="start-datepicker"/>
                  <a onClick={this.onShowStartCalendar} className="btn_calendar"></a>
                  <select style={{width:'70px'}} value={moment(banner.get('bannerStartDt')).hour()}
                          onChange={this.onTimeChange.bind(this, 'bannerStartDt', 'hour')}>
                    {this.renderHourList}
                  </select>
                  <select style={{width:'70px'}} value={moment(banner.get('bannerStartDt')).minute()}
                          onChange={this.onTimeChange.bind(this, 'bannerStartDt', 'minute')}>
                    {this.renderMinuteList}
                  </select>
                </td>
              </tr>
              <tr>
                <th>{intlStores.get('sm.SM_FLD_END_ON')}</th>
                <td>
                  <input type="text" placeholder="2015-08-08" className="txt t3" id="end-datepicker"/>
                  <a onClick={this.onShowEndCalendar} className="btn_calendar"></a>
                  <select style={{width:'70px'}} value={moment(banner.get('bannerEndDt')).hour()}
                          onChange={this.onTimeChange.bind(this, 'bannerEndDt', 'hour')}>
                    {this.renderHourList}
                  </select>
                  <select style={{width:'70px'}} value={moment(banner.get('bannerEndDt')).minute()}
                          onChange={this.onTimeChange.bind(this, 'bannerEndDt', 'minute')}>
                    {this.renderMinuteList}
                  </select>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          {this.renderButton}
        </div>
      </article>
    )
  }

  get renderMobileThumbnail() {
    const banner = this.state.banner
    const platform = banner.get('platformCd')
    if(platform === 'PC') {
      return null
    }
    return (
    <tr>
      <th>Mobile Image</th>
      <ImageUploader id="imgSmallUrl" type="BANNER" value={banner} ref="imgSmallUrl"/>
    </tr>
    )
  }
  get renderPCThumbnail() {
    const banner = this.state.banner
    const platform = banner.get('platformCd')

    if(!(platform === 'ALL' || platform === 'PC')) {
      return null
    }

    return (
      <tr>
        <th>PC Image</th>
        <ImageUploader id="imgLargeUrl" type="BANNER" value={banner} ref="imgLargeUrl"/>
      </tr>
    )
  }

  handlePlatformChange = (value) => {
    AppActions.updateBannerPlatform(value)
  }
  handleTypeChange = (value) => {
    AppActions.updateBannerType(value)
  }

  get renderConnectContent() {
    switch (this.state.banner.get('bannerTypeCd')) {
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
      <th>연결될 컨텐츠</th>
      <td>
        {this.renderRecommendPost}
      </td>
    </tr>)
  }

  /***
   * Recommend Post Render
   */
  get renderRecommendPost() {
    // new 상태일때
    if ((this.props.params.id == undefined && this.state.banner.size === 0)
      || this.state.banner.get('post') == undefined) {
      return (
        <ul className="list">
          <li ref="item" onMouseOver={this.movseOver} onMouseOut={this.mouseOut}>
            <div id="recommend_empty" onClick={this.SeachPublishedPost}>
              <img src={icon_plus}/>
            </div>
          </li>
        </ul>)
    } else {
      const banner = this.state.banner
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

    const bannerUrl = this.state.banner.get('bannerUrl')
    let defaultCategory = bannerUrl.indexOf('channel') >= 0 ? bannerUrl.split(/channel\//)[1] : ''

    this.state.channels.map((channel, i) => {
      ChannelList.push(<option key={i} value={channel.get('urlNm')}>{channel.get('name') + ' ' + ((channel.get('channelViewCd') == 'N') ? '(' + intlStores.get('common.COMMON_FLD_PRIVATE') + ')' : '')}</option>)
    })
    return (
      <tr>
        <th>{intlStores.get('sm.SM_FLD_NEED_CHANNEL')}</th>
        <td>
          <select id="channelList" style={{width:'360px'}} value={defaultCategory} onChange={this.onChangeChannel}>
            <option>--- channel ---</option>
            {ChannelList}
          </select>
        </td>
      </tr>
    )
  }

  onChangeChannel(e) {
    AppActions.updateBannerURL('dingo://channel/' + e.target.value)
  }

  get renderCategory() {
    let CategoryList = []

    const bannerUrl = this.state.banner.get('bannerUrl')
    let defaultCategory = bannerUrl.indexOf('category') >= 0 ? bannerUrl.split(/category\//)[1] : ''

    this.state.categories.map((category, i) => {
      CategoryList.push(<option key={i}
                                value={category.get('urlNm')}>{category.get('name') + ' ' + ((category.get('categoryViewCd') == 'N') ? '(' + intlStores.get('common.COMMON_FLD_PRIVATE') + ')' : '')}</option>)
    })
    return (
      <tr>
        <th>{intlStores.get('sm.SM_FLD_NEED_CATEGORY')}</th>
        <td>
          <select id="categoryList" style={{width:'360px'}} value={defaultCategory} onChange={this.onChangeCategory}>
            <option>--- category ---</option>
            {CategoryList}
          </select>
        </td>
      </tr>
    )
  }


  onChangeCategory(e) {
    AppActions.updateBannerURL('dingo://category/' + e.target.value)
  }

  get renderLink() {
    return (
      <tr>
        <th>{intlStores.get('sm.SM_FLD_NEED_LINK')}</th>
        <td>
          <input type="text" className="txt t6" id="linkUrl" placeholder="http://"
                 defaultValue={this.state.banner.get('bannerUrl') || ''} onBlur={this.onChangeLink}/>
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
      AppActions.updateBannerURL(e.target.value)
    } else {
      Alert.error('올바른 URL이 아닙니다.', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })

      e.target.focus()
    }
  }

  get renderHourList() {
    //memorized
    if(this.hourList === undefined) {
      this.hourList = []
      for (let i = 0; i < 24; i++) {
        let HH = (i < 10) ? '0' + i : i
        this.hourList.push(<option key={i} value={HH}>{HH}시</option>)
      }
    }

    return this.hourList
  }

  get renderMinuteList() {
    //memorized
    if(this.minuteList === undefined) {
      this.minuteList = []
      for (let i = 0; i < 60; i++) {
        let mm = (i < 10) ? '0' + i : i
        this.minuteList.push(<option key={i} value={mm}>{mm}분</option>)
      }
    }
    return this.minuteList
  }

  onTimeChange = (datetype, typetime, e) => {
    let date = this.state.banner.get(datetype)

    if(typetime === 'hour') {
      AppActions.updateBannerDate(datetype, moment(date).hour(e.target.value).valueOf())
    } else {
      AppActions.updateBannerDate(datetype, moment(date).minute(e.target.value).valueOf())
    }
  }


  get renderButton() {
    let buttonName = '등록하기'
    if (this.props.params.id !== undefined) {
      buttonName = '수정하기'
    }

    return (
      <p className="btn_r btnbox_w960">
        <a onClick={this.handleSubmit} className="purple">{buttonName}</a>&nbsp;
        <Link to="/service/mgmt/banner/list" className="gray">취소하기</Link>
      </p>
    )
  }

  handleSubmit = () => {
    // PC Banner validation
    if(this.state.banner.get('platformCd') === 'ALL'
      || this.state.banner.get('platformCd') === 'PC') {
      if(this.refs.imgLargeUrl !== undefined && this.refs.imgLargeUrl.getImagePath() === '') {
        Alert.error('PC Image을 올려주세요', {
          position: 'top-right',
          effect: 'slide',
          timeout: 3000
        })
        return
      }
    }

    // Mobile Banner validation
    if(this.refs.imgSmallUrl !== undefined && this.refs.imgSmallUrl.getImagePath() === '') {
      Alert.error('Mobile Image을 올려주세요', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
      return
    }

    //TODO : Content validation
    if(this.state.banner.get('bannerUrl') === '') {
      Alert.error('추가적인 입력이 부족합니다.', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
      return
    }

    // Submit
    if(this.state.banner.get('bannerSeq') === null) {
      if (confirm('배너 등록을 하겠습니까?')) {
        AppActions.createBanner(this.state.banner.toJS(), () => {
          this.context.router.push('/service/mgmt/banner')
        })
      }
    } else {
      if (confirm('해당 배너 수정을 하겠습니까?')) {
        AppActions.modifyBanner(this.state.banner.get('bannerSeq'), this.state.banner.toJS(), () => {
          this.context.router.push('/service/mgmt/banner')
        })
      }
    }
  }

  // hover event
  movseOver = () => {
    $(this.refs.item).find('div p').stop().fadeIn(300).stop().animate({opacity: 1}, 100)
  }
  mouseOut = () => {
    $(this.refs.item).find('div p').stop().fadeOut(300)
  }

  // calendar event
  onShowStartCalendar() {
    $('#start-datepicker').datepicker('show')
  }

  onShowEndCalendar() {
    $('#end-datepicker').datepicker('show')
  }

}
const BannerEditContainer = Container.create(BannerEdit)
export default BannerEditContainer
