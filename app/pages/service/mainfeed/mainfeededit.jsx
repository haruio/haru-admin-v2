/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Link} from 'react-router'
import {Container} from 'flux/utils'
import cn from 'classnames'

import debug from 'debug'
const log = debug('application:MainFeedEdit.jsx')


import AppActions from '../../../actions/AppActions'
import MainFeedDetailStore from '../../../stores/MainfeedDetailStore'

import MainFeedTemplate from '../../../components/MainFeedTemplate'
import moment from 'moment'
import Alert from 'react-s-alert'

class MainFeedEdit extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static getStores() {
    return [MainFeedDetailStore]
  }

  static calculateState() {
    return {
      mainfeed: MainFeedDetailStore.getMainfeed()
    }
  }

  componentDidMount() {
    this._initCalendar()

    if (this.props.params.id !== undefined) {
      AppActions.readMainFeedTemplate(this.props.params.id)
    } else {
      setTimeout(() => {
        AppActions.createMainFeedTemplate(1)
      })
    }
  }

  _initCalendar = () => {
    $('#mainfeedDate').datepicker({
      dateFormat: 'yy-mm-dd',
      onClose: (dateText) => {
        const datesplit = dateText.split('-')
        const date = this.state.mainfeed.get('publishStartDt')
        let changeddate = moment(date).set('year', datesplit[0]).set('month', datesplit[1] - 1).set('date', datesplit[2])
        AppActions.updateMainFeedDate(changeddate.valueOf())
      }
    }).datepicker('setDate', moment(this.state.mainfeed.get('publishStartDt')).format('YYYY-MM-DD'))
  }

  render() {
    log(this.state.mainfeed.toJS())
    return (
      <article>
        <hgroup>
          <h2>메인피드 관리</h2>
        </hgroup>
        <div id="main_feed_modifi">
          <table className="writeTable">
            <colgroup>
              <col width="154px"/>
              <col width="*"/>
            </colgroup>
            <tbody>
            <tr>
              <th>노출 시간</th>
              <td>
                <input type="text" className="txt t3" id="mainfeedDate" ref="mainfeedDate"/>
                <a onClick={this.showCalendar} className="btn_calendar"></a>
                <select style={{ width:'70px' }} ref="publishHour"
                        value={moment(this.state.mainfeed.get('publishStartDt')).format('HH')}
                        onChange={this.onChangeTime.bind(this, 'hour')}>
                  <option value="00">0시</option>
                  <option value="01">1시</option>
                  <option value="02">2시</option>
                  <option value="03">3시</option>
                  <option value="04">4시</option>
                  <option value="05">5시</option>
                  <option value="06">6시</option>
                  <option value="07">7시</option>
                  <option value="08">8시</option>
                  <option value="09">9시</option>
                  <option value="10">10시</option>
                  <option value="11">11시</option>
                  <option value="12">12시</option>
                  <option value="13">13시</option>
                  <option value="14">14시</option>
                  <option value="15">15시</option>
                  <option value="16">16시</option>
                  <option value="17">17시</option>
                  <option value="18">18시</option>
                  <option value="19">19시</option>
                  <option value="20">20시</option>
                  <option value="21">21시</option>
                  <option value="22">22시</option>
                  <option value="23">23시</option>
                </select>
                <select style={{ width:'70px' }} ref="publishMinute"
                        value={moment(this.state.mainfeed.get('publishStartDt')).format('mm')}
                        onChange={this.onChangeTime.bind(this, 'minute')}>
                  <option value="00">00분</option>
                  <option value="10">10분</option>
                  <option value="20">20분</option>
                  <option value="30">30분</option>
                  <option value="40">40분</option>
                  <option value="50">50분</option>
                </select>
              </td>
            </tr>
            {this.renderSelectTemplate}
            </tbody>
          </table>
          <MainFeedTemplate mainfeed={this.state.mainfeed} />
          {this.renderButton}
        </div>
      </article>
    )
  }

  onChangeTime = (timetype, e) => {
    const publishStartDt = this.state.mainfeed.get('publishStartDt')
    if(timetype === 'hour') {
      AppActions.updateMainFeedDate(moment(publishStartDt).hour(e.target.value).valueOf())
    } else {
      AppActions.updateMainFeedDate(moment(publishStartDt).minute(e.target.value).valueOf())
    }
  }

  showCalendar() {
    $('#mainfeedDate').datepicker('show')
  }

  get renderSelectTemplate() {
    // 신규로 만들때만 Layout을 선택할 수 있다. 기획이 그렇다고 한다
    // 작성 후에 레이아웃을 변경하려면 기존 메인피드를 삭제하고 새로만들어라
    if (this.props.params.id !== undefined) {
      return null
    }

    const templetType = this.state.mainfeed.get('templeteType')
    return (
      <tr>
        <th>Layout 선택</th>
        <td>
          <p className="layout_list">
            <a onClick={this._changeTemplate.bind(this, 0)} className={cn({'on': 0 == templetType})}></a>
            <a onClick={this._changeTemplate.bind(this, 1)} className={cn({'on': 1 == templetType})}></a>
            <a onClick={this._changeTemplate.bind(this, 2)} className={cn({'on': 2 == templetType})}></a>
            <a onClick={this._changeTemplate.bind(this, 3)} className={cn({'on': 3 == templetType})}></a>
            <a onClick={this._changeTemplate.bind(this, 4)} className={cn({'on': 4 == templetType})}></a>
            <a onClick={this._changeTemplate.bind(this, 5)} className={cn({'on': 5 == templetType})}></a>
            <a onClick={this._changeTemplate.bind(this, 6)} className={cn({'on': 6 == templetType})}></a>
            <a onClick={this._changeTemplate.bind(this, 7)} className={cn({'on': 7 == templetType})}></a>
            <a onClick={this._changeTemplate.bind(this, 8)} className={cn({'on': 8 == templetType})}></a>
          </p>
        </td>
      </tr>)
  }

  _changeTemplate(index) {
    AppActions.changeMainFeedTemplate(index)
  }
  
  get renderButton() {
    if (this.props.params.id === undefined) {
      return (<p className="btn_r">
        <a onClick={this.reserveMainFeed} className="blue">예약하기</a>
        <Link to="/service/mgmt/mainfeed" className="gray">취소하기</Link>
      </p>)
    } else {
      return (<p className="btn_r">
        <a onClick={this.reserveMainFeed} className="blue">수정하기</a>
        <a onClick={this.onMainFeedDelete.bind(this, this.state.mainfeed.get('feedGroupId'))} className="purple">삭제하기</a>
        <Link to="/service/mgmt/mainfeed" className="gray">취소하기</Link>
      </p>)
    }
  }

  reserveMainFeed = () => {
    const allregister = this.state.mainfeed.get('feeds').every((feed) => {
      return feed.get('thumbnailUrl') === ''
    })

    if(allregister) {
      /* 임시 저장후 메인으로 가야하는것인가? */
      Alert.error('빈 부분을 다 채워주십시오', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
      return
    }

    let reserve = moment(this.state.mainfeed.get('publishStartDt'))

    const publishvalid = this.state.mainfeed.get('feeds').every((feed) => {
      return moment(feed.get('publishStartDt')).diff(reserve) > 0
    })

    if(publishvalid) {
      /* 임시 저장후 메인으로 가야하는것인가? */
      Alert.error('컨텐츠 발행일시가 메인피드 노출시간보다 늦은 컨텐츠가 있습니다.', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
      return
    }

    if(confirm('메인피드를 예약(등록) 하겠습니까?')) {
      if(this.state.mainfeed.get('feedGroupId') === '') {
        AppActions.reserveMainFeed(this.state.mainfeed.toJS())
      } else {
        AppActions.updateMainFeed(this.state.mainfeed.toJS(), this.state.mainfeed.get('feedGroupId'))
      }
    }
  }

  onMainFeedDelete(groupid) {
    if(confirm('정말 삭제하시겠습니까?')) {
      AppActions.deleteMainFeedItem(groupid)
    }
  }

}

const MainFeedEditContainer = Container.create(MainFeedEdit)
export default MainFeedEditContainer
