/**
 * Created by jungenpark on 3/22/16.
 */
import React from 'react'
import {Container} from 'flux/utils'
import moment from 'moment'

import debug from 'debug'
const log = debug('application:HistoryPopup.jsx')

import ContentActions from '../../../actions/ContentActions'
import PostHistoryStore from '../../../stores/PostHistoryStore'
import PopupPaginationStore from '../../../stores/PopupPaginationStore'

/***
 * 컨텐츠 발행에 히스토리를 알려주는 페이지
 * TODO : 다국어 처리 필요
 * Author : jungun.park
 */
class HistoryPopup extends React.Component {
  static getStores() {
    return [PostHistoryStore, PopupPaginationStore]
  }

  static calculateState() {
    return {
      histories: PostHistoryStore.getPostHistory(),
      pagination: PopupPaginationStore.getPagination()
    }
  }

  componentDidMount() {
    ContentActions.getContentHistory(this.props.postSeq)
  }

  render() {
    log(this.state)
    return (
      <div className="pop_wrap">
        <div className="pop" onClick={this.clearEvent}>
          <h2>History</h2>
          <table className="listTable">
            <colgroup><col width="75px" /><col width="160px" /><col width="90px" /><col width="*" /></colgroup>
            <thead>
            <tr>
              <th>변경자</th>
              <th>변경시간</th>
              <th>변경상태</th>
              <th>설명</th>
            </tr>
            </thead>
          </table>
          <div className="pop_table_wrap">
            <table className="listTable">
              <colgroup><col width="75px" /><col width="160px" /><col width="90px" /><col width="*" /></colgroup>
              <tbody>
              {this.renderContent}
              </tbody>
            </table>
          </div>
          <p className="btn_c"><a onClick={this.props.close} className="blue">Close</a></p>
        </div>
      </div>
    )
  }

  get renderContent() {
    if(this.state.histories.size === 0) {
      return (
        <tr>
          <td colSpan="4">
            히스토리가 없습니다.
          </td>
        </tr>)
    }

    return this.state.histories.map((item) => {
      let className=''
      let msg=''

      switch(item.get('workNm')) {
        case 'CREATE_CONTENTS':
          msg = '작성중'
          break
        case 'UPDATE_CONTENTS':
          msg = '수정'
          break
        case 'REQUEST_CONTENTS':
          className = 'point_blue'
          msg = '승인 요청'
          break
        case 'CANCEL_REQUEST_CONTENTS':
          msg = '승인 취소'
          break
        case 'REJECT_CONTENTS':
          className = 'point_red'
          msg = '반려'
          break
        case 'RECOVER_CONTENTS':
          // TODO : 없다 멀하라는 걸까??? ㅋㅋㅋ
          break
        case 'PUBLISH_CONTENTS':
          msg = '승인'
          break
        case 'DELETE_CONTENTS':
          msg = '삭제'
          break
      }

      return (
        <tr key={item.get('workHistorySeq')}>
          <td>{item.get('userNm')}</td>
          <td>{moment(item.get('createDt')).format('YYYY-MM-DD HH:mm:ss')}</td>
          <td className={className}>{msg}</td>
          <td className="al">{item.get('description')}</td>
        </tr>
      )
    })
  }

  clearEvent(e) {
    e.stopPropagation()
  }
}

const HistoryPopupContainer = Container.create(HistoryPopup)
export default HistoryPopupContainer
