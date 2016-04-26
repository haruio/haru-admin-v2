/**
 * Created by jungenpark on 3/22/16.
 */
import React from 'react'
import moment from 'moment'

import debug from 'debug'
const log = debug('application:PublishPopup.jsx')
import ContentActions from '../../../actions/ContentActions'

export default class PublishPopup extends React.Component {
  componentDidMount() {
    log(moment().format('YY-MM-DD'))
    $('#publishDate').datepicker({
      dateFormat: 'yy-mm-dd',
      startDate:moment().format('YY-MM-DD')
    }).datepicker('setDate', new Date())
  }

  render() {
    return (
      <div className="pop_wrap">
        <div className="pop" id="pop_publish" onClick={this.clearEvent}>
          <h2>contents 발행</h2>
          <fieldset>
            <p>
              <input type="radio" id="publish1" name="publish" defaultValue="immediately" defaultChecked={true} /> <label for="publish1">즉시 발행</label>
            </p>
            <p>
              <input type="radio" id="publish2" name="publish" defaultValue="reserve" /> <label for="publish2">예약 발행</label>
              <input type="text" className="txt t3" id="publishDate"/><a onClick={this.showCalendar} className="btn_calendar"></a>
              <select style={{width:'70px'}}>
                {this.renderHours}
              </select>
              <select style={{width:'70px'}}>
                {this.renderMinites}
              </select>
            </p>
          </fieldset>
          <p className="btn_c">
            <a onClick={this.requestContentInspection} className="purple">확인</a>
            <a onClick={this.props.close} className="gray">취소</a>
          </p>
        </div>
      </div>
    )
  }

  get renderHours() {
    let hourList = []
    for(let i = 0; i < 24; i++) {
      const HH = (i < 10) ? '0'+i : i
      hourList.push(<option key={i} defaultValue={HH} >{HH}</option>)
    }
    return hourList
  }

  get renderMinites() {
    let minuteList = []
    for(let i = 0; i < 60; i++) {
      const MM = (i < 10) ? '0'+i : i
      minuteList.push(<option key={i} defaultValue={MM} >{MM}</option>)
    }
    return minuteList
  }

  clearEvent(e) {
    e.stopPropagation()
  }

  /***
   * 달력을 보여주는 함수
   */
  showCalendar() {
    $('#publishDate').datepicker('show')
  }

  /***
   * 컨텐츠 발행을 하는 함수
   */
  requestContentInspection = () => {
    // TODO : Jquery 걷어내기

    const publishType = $('input[name=publish]:checked').val()

    let requestData = {}
    if (window.confirm('컨텐츠를 발행하시겠습니까?')) {
      //예약이라면 예약 데이터 만들기
      if(publishType == 'reserve') {
        const reserveDate = $('#publish-datepicker').val()
        const reserveHour = $('#reserve-hour option:selected').val()
        const reserveMinute = $('#reserve-minute option:selected').val()
        if(reserveDate.length <= 0) {
          alert('예약일을 선택하세요')
          return
        }

        const tempTime = moment(reserveDate + reserveHour + reserveMinute, 'YYYYMMDD HH:mm')
        requestData.publishStartDt = tempTime._d
      }

      // 발행하기
      ContentActions.requestContentInspection(this.props.postSeq, requestData)
    }

    this.props.close()
  }
}
