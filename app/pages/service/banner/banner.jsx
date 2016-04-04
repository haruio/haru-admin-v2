/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Container} from 'flux/utils'
import {Link} from 'react-router'
import cn from 'classnames'
import moment from 'moment'

import debug from 'debug'
const log = debug('application:BannerList.jsx')

import AppActions from '../../../actions/AppActions'
import intlStores from'../../../utils/IntlStore'

const btn_prev2 = require('image!../../../assets/img/btn_prev2.png')
const btn_next2 = require('image!../../../assets/img/btn_next2.png')
const bg_calendar = require('image!../../../assets/img/bg_calendar.png')

import BannerStore from '../../../stores/BannerStore'

/***
 * Banner List
 * author : jungun.park
 */
class BannerList extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static getStores() {
    return [BannerStore]
  }

  static calculateState(prevState, props) {
    // TODO 날짜를 바꾸고싶을땐 어떻게 하지???
    let searchDate = BannerStore.getBannerSearchDate()
    if (props.query != undefined && props.query.searchDate != undefined) {
      searchDate = this.props.query.searchDate
    }

    return {
      banners: BannerStore.getBanners(),
      searchDate:searchDate,
      platform:BannerStore.getBannerSearchPlatform()
    }
  }

  componentDidMount() {
    this.setInitCalendar()

    let initdate = moment().format('YYYY-MM-DD')
    $('#bannerDate').datepicker('setDate', initdate)

    let platform = 'AND'
    if (this.props.query != undefined && this.props.query.searchPlatform != undefined) {
      this.state.platform = this.props.query.searchPlatform
    }

    this.getBannerList(1, initdate, platform)
  }

  setInitCalendar() {
    const _self = this
    $('#bannerDate').datepicker({
      dateFormat: 'yy-mm-dd',
      onClose: function (dateText) {
        //_self.setState({searchDate: dateText})
        AppActions.ChangeSearchDate(dateText)

        _self.getBannerList(1, dateText) //???
      }
    })
  }

  getBannerList(page, initdate, platform) {
    const startDate = moment(initdate + ' 00:00:00', 'YYYYMMDD HH:mm:ss').utc().format('YYYY-MM-DD HH:mm:ss')
    const endDate = moment(initdate + ' 23:59:59', 'YYYYMMDD HH:mm:ss').utc().format('YYYY-MM-DD HH:mm:ss')

    AppActions.getBannerList(page, 10, startDate, endDate, platform)
  }

  render() {
    return (
      <article>
        <hgroup>
          <h2>배너 관리</h2>
        </hgroup>
        <div id="contents">
          {this.renderPlatformTab}
          {this.renderCalendarHead}
          <div id="calendar_area">
            <table>
              <colgroup>
                <col width="130px"/>
                <col width="*"/>
              </colgroup>
              {this.renderTableHeader}
              <tbody>
              {this.ScheduleBar}
              </tbody>
            </table>
          </div>
          <div className="table_wrap">
            <table className="listTable">
              <colgroup>
                <col width="5%"/>
                <col width="11%"/>
                <col width="*"/>
                <col width="13%"/>
                <col width="12%"/>
                <col width="17%"/>
                <col width="17%"/>
              </colgroup>
              <thead>
              <tr>
                <th><input type="checkbox" ref="checkAll" onClick={this.toggleCheckBox}/></th>
                <th>순서</th>
                <th>배너</th>
                <th>타입</th>
                <th>노출 플랫폼</th>
                <th>노출 시작</th>
                <th>노출 종료</th>
              </tr>
              </thead>
              <tbody>
                {this.renderBannerList}
              </tbody>
            </table>
          </div>
          <p className="btn_r">
            <Link to="/service/mgmt/banner/new"
                  className="purple btn_w140">{intlStores.get('common.COMMON_BTN_REGISTER')}</Link>&nbsp;
            <a href="">{intlStores.get('common.COMMON_BTN_DELETE')}</a>
          </p>
        </div>
      </article>
    )
  }

  get renderPlatformTab() {
    return (
      <ul id="tab_btns">
        <li><button onClick={this.changePlatform.bind(this, 'AND')} className={cn({'on': this.state.platform == 'AND'})}>Android</button></li>
        <li><button onClick={this.changePlatform.bind(this, 'IOS')} className={cn({'on': this.state.platform == 'IOS'})}>IOS</button></li>
        <li><button onClick={this.changePlatform.bind(this, 'PC')}  className={cn({'on': this.state.platform == 'PC'})}>PC Web</button></li>
        <li><button onClick={this.changePlatform.bind(this, 'MW')}  className={cn({'on': this.state.platform == 'MW'})}>Mobile Web</button></li>
      </ul>)
  }

  get renderCalendarHead() {
    return (
      <div id="calendar_head">
        <time id="bannertime" onClick={this.onShowCalendar} style={{cursor:'pointer'}}><input type="text" id="bannerDate" style={{display:'none'}}/>{this.state.searchDate} (금)</time>
        <input type="image" src={btn_prev2} alt="prev" className="prev"/>
        <input type="image" src={btn_next2} alt="next" className="next"/>
        <a onClick={this.onShowCalendar}><img src={bg_calendar} alt="달력"/></a>
      </div>
    )
  }

  get renderTableHeader() {
    const header = [1,2,3,4,5,6,7,8,9,10,11].map((i) => {
      return <th key={i}>{i}</th>
    })
    return (
      <thead>
      <tr>
        <th></th>
        <th>am 12:00</th>
        {header}
        <th>pm 12:00</th>
        {header}
      </tr>
      </thead>
    )
  }

  // TODO : 나중에 리팩토링 하자!!
  get ScheduleBar() {
    log('ScheduleBar')
    log(this.state.banners.toJS())
    return this.state.banners.map((content, i) => {
      log(content)
      let StartHour = (moment(this.state.searchDate + ' 00:00:00', 'YYYYMMDD HH:mm:ss') >= moment(content.get('bannerStartDt')) ? 0 : moment(content.get('bannerStartDt')).hour())
      let EndHour = (moment(this.state.searchDate + ' 23:59:59', 'YYYYMMDD HH:mm:ss') <= moment(content.get('bannerEndDt')) ? 24 : moment(content.get('bannerEndDt')).hour())
      let StartMin = (moment(this.state.searchDate + ' 00:00:00', 'YYYYMMDD HH:mm:ss') >= moment(content.get('bannerStartDt')) ? 0 : moment(content.get('bannerStartDt')).minute())
      let EndMin = (moment(this.state.searchDate + ' 23:59:59', 'YYYYMMDD HH:mm:ss') <= moment(content.get('bannerEndDt')) ? 60 : moment(content.get('bannerEndDt')).minute())
      let StartMargin = (StartMin / 60) * 100
      let StartWidth = 100 - StartMargin
      let EndWidth = (EndMin / 60) * 100
      if (StartHour == EndHour) {
        StartWidth = EndWidth - StartMargin
      }

      let StartStyle = {
        width: StartWidth+'%',
        marginLeft: StartMargin+'%'
      }
      let EndStyle = {
        width: EndWidth+'%'
      }
      let TdList = []
      for( let h = 0; h < 24; h++ ) {
        let BG = (h == 0 || h == 12) ? 'bg' : ''

        if(h == StartHour) {
          TdList.push(<td key={h} className={BG}><p style={StartStyle} ></p></td>)
        } else if(h == EndHour) {
          TdList.push(<td key={h} className={BG}><p style={EndStyle} ></p></td>)
        } else if (h > StartHour && h < EndHour) {
          TdList.push(<td key={h} className={BG}><p></p></td>)
        } else {
          TdList.push(<td key={h} className={BG}></td>)
        }
      }

      return(
        <tr className={'bn' + (i % 5 + 1)} key={content.get('bannerSeq')}>
          <th>{content.get('bannerSeq')}</th>
          {TdList}
        </tr>
      )
    })
  }

  _moveBannerDetail=(bannerSeq)=>{
    this.context.router.push('/service/mgmt/banner/' + bannerSeq)
  }


  get renderBannerList() {
    if(this.state.banners.size == 0) {
      return (
        <tr>
          <td colSpan="7">{intlStores.get('sm.SM_MSG_NO_CONTENTS')}</td>
        </tr>)
    }

    return this.state.banners.map((banner) => {
      let bannertype = 'Post'
      switch (banner.get('bannerTypeCd')) {
        case 'LNK':
          bannertype = 'Link'
          break
        case 'INT':
          bannertype = 'Link_internal'
          break
        case 'PST':
          bannertype = 'Post'
          break
        case 'CAT':
          bannertype = 'Category'
          break
        case 'CHN':
          bannertype = 'Channel'
          break
        default :
          bannertype = 'Post'
          break
      }

      let platform = 'ALL'
      switch (banner.get('platformCd')) {
        case 'AND':
          platform = 'Android'
          break
        case 'IOS':
          platform = 'iOS'
          break
        case 'PC':
          platform = 'PC Web'
          break
        case 'MW':
          platform = 'Mobile Web'
          break
        default :
          let platform = 'ALL'
          break
      }

      return (
        <tr key={banner.get('bannerSeq')}>
          <td><input type="checkbox" name="postBox" /></td>
          <td className="bn1" onClick={this._moveBannerDetail.bind(this, banner.get('bannerSeq'))}>{banner.get('bannerSeq')}</td>
          <td onClick={this._moveBannerDetail.bind(this, banner.get('bannerSeq'))}><img className="thumbnail" src={banner.get('imgSmallUrl')} alt="thumbnail"/></td>
          <td onClick={this._moveBannerDetail.bind(this, banner.get('bannerSeq'))}>{bannertype}</td>
          <td onClick={this._moveBannerDetail.bind(this, banner.get('bannerSeq'))}>{platform}</td>
          <td onClick={this._moveBannerDetail.bind(this, banner.get('bannerSeq'))}>{moment(banner.get('bannerStartDt')).format('YYYY-MM-DD HH:MM')}</td>
          <td onClick={this._moveBannerDetail.bind(this, banner.get('bannerSeq'))}>{moment(banner.get('bannerEndDt')).format('YYYY-MM-DD HH:MM')}</td>
        </tr>
      )
    })
  }

  // Event

  toggleCheckBox = () => {
    $("input[name='postBox']").prop('checked', $(this.refs.checkAll).prop('checked'))
  }

  onShowCalendar() {
    $('#bannerDate').show().focus().hide()
  }


  changePlatform(platform) {
    AppActions.ChangePlatform(platform)
  }

}

const BannerListContainer = Container.create(BannerList, {withProps:true})
export default BannerListContainer
