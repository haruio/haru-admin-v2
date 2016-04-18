/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import { Link } from 'react-router'
import {Container} from 'flux/utils'
import moment from 'moment'

import debug from 'debug'
const log = debug('application:MainFeed.jsx')

const btn_prev2 = require('image!../../../assets/img/btn_prev2.png')
const btn_next2 = require('image!../../../assets/img/btn_next2.png')
const btn_add3 = require('image!../../../assets/img/btn_add3.png')
const bg_calendar = require('image!../../../assets/img/bg_calendar.png')

import MainFeedTemplate from '../../../components/MainFeedTemplate'

import MainfeedStore from '../../../stores/MainfeedStore'
import AppActions from '../../../actions/AppActions'

class MainFeed extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static getStores() {
    return [MainfeedStore]
  }

  static calculateState(prevState, props) {
    // TODO 날짜를 바꾸고싶을땐 어떻게 하지???
    let searchDate = MainfeedStore.getSearchDate()
    if (props.query != undefined && props.query.searchDate != undefined) {
      searchDate = this.props.query.searchDate
    }

    return {
      mainfeeds: MainfeedStore.getMainfeeds(),
      searchDate:searchDate
    }
  }

  componentDidMount() {
    this._initCalendar()
    this.getMainFeedList(this.state.searchDate)
  }

  _initCalendar = () => {
    const _self = this
    $('#mainfeedDate').datepicker({
      dateFormat: 'yy-mm-dd',
      onClose: function (dateText) {
        AppActions.changeMainFeedSearchDate(dateText)

        _self.getMainFeedList(dateText)
      }
    }).datepicker('setDate', this.state.searchDate)
  }

  getMainFeedList(searchDate) {
    const publishStartDate  = moment(searchDate+' 00:00:00').format('YYYY-MM-DD HH:mm:ss')
    const publishEndDate = moment(searchDate +' 23:59:59').format('YYYY-MM-DD HH:mm:ss')

    AppActions.listMainFeedTemplate({publishDate:moment(publishStartDate).utc().toISOString(), publishEndDate:moment(publishEndDate).utc().toISOString()})
  }

  render() {
    return (
      <article>
        <hgroup>
          <h2>메인피드 관리</h2>
        </hgroup>
        <div id="main_feed_timeline">
          <fieldset>
            <time >
              <input type="image" src={btn_prev2} alt="이전" onClick={this.changeSearchDate.bind(null, 'prev')} />
              <input type="text" id="mainfeedDate" style={{display:'none'}}/>
              <b onClick={this.onShowCalendar}>{this.state.searchDate} ({moment(this.state.searchDate, 'YYYY-MM-DD').format('dddd')})</b>
              <input type="image" src={btn_next2} alt="다음" onClick={this.changeSearchDate.bind(null, 'next')} />
              <a onClick={this.onShowCalendar} style={{verticalAlign:'-6px'}}><img src={bg_calendar} alt="달력"/></a>
            </time>

            <Link to="/service/mgmt/mainfeed/new"><img src={btn_add3} alt="추가" /></Link>
          </fieldset>
          {this.renderMainfeeds}
        </div>
      </article>
    )
  }

  get renderMainfeeds() {
    if(this.state.mainfeeds.size === 0) {
      return null
    }

    return this.state.mainfeeds.map((mainfeed) => {
      return (
        <div key={mainfeed.get('feedGroupId')}>
          <time>{moment(mainfeed.get('publishStartDt')).format('a H:mm ')}</time>
          <MainFeedTemplate mainfeed={mainfeed} readonly={true} />
          <p className="btn_c">
            <Link to={'/service/mgmt/mainfeed/' + mainfeed.get('feedGroupId')} className="purple">수정하기</Link>
            <a onClick={this.onMainFeedDelete.bind(this, mainfeed.get('feedGroupId'))} className="gray">삭제하기</a>
          </p>
        </div>
      )
    })
  }
  onMainFeedDelete(groupid) {
    if(confirm('정말 삭제하시겠습니까?')) {
      AppActions.deleteMainFeed(groupid, this.state.searchDate)
    }
  }

  changeSearchDate = (action) => {
    let searchDate = moment(this.state.searchDate)
    if (action === 'prev') {
      searchDate = searchDate.subtract(1, 'day').format('YYYY-MM-DD')
    } else if (action === 'next') {
      searchDate = searchDate.add(1, 'day').format('YYYY-MM-DD')
    }
    AppActions.changeMainFeedSearchDate(searchDate)
    this.getMainFeedList(searchDate)
  }

  onShowCalendar() {
    $('#mainfeedDate').show().focus().hide()
  }
}

const MainFeedContainer = Container.create(MainFeed, {withProps:true})
export default MainFeedContainer

