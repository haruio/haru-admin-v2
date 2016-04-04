/**
 * Created by jungenpark on 3/22/16.
 */
import React from 'react'
import cn from 'classnames'

import debug from 'debug'
const log = debug('application:HistoryPopup.jsx')

export default class HistoryPopup extends React.Component {
  render() {
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
              <tr>
                <td>홍길동</td>
                <td>2015-08-08 PM 12:25</td>
                <td className="point_blue">승인요청</td>
                <td className="al"></td>
              </tr>
              <tr>
                <td>홍길동</td>
                <td>2015-08-08 PM 12:25</td>
                <td className="point_red">반려</td>
                <td className="al">다른 컨텐츠와 너무 비슷함.</td>
              </tr>
              <tr>
                <td>홍길동</td>
                <td>2015-08-08 PM 12:25</td>
                <td>재승인 요청</td>
                <td className="al"></td>
              </tr>
              <tr>
                <td>홍길동</td>
                <td>2015-08-08 PM 12:25</td>
                <td className="point_red">반려</td>
                <td className="al">..</td>
              </tr>
              <tr>
                <td>홍길동</td>
                <td>2015-08-08 PM 12:25</td>
                <td>재승인 요청</td>
                <td className="al"></td>
              </tr>
              <tr>
                <td>홍길동</td>
                <td>2015-08-08 PM 12:25</td>
                <td className="point_blue">승인요청</td>
                <td className="al"></td>
              </tr>
              <tr>
                <td>홍길동</td>
                <td>2015-08-08 PM 12:25</td>
                <td className="point_red">반려</td>
                <td className="al">다른 컨텐츠와 너무 비슷함.</td>
              </tr>
              <tr>
                <td>홍길동</td>
                <td>2015-08-08 PM 12:25</td>
                <td>재승인 요청</td>
                <td className="al"></td>
              </tr>
              <tr>
                <td>홍길동</td>
                <td>2015-08-08 PM 12:25</td>
                <td className="point_red">반려</td>
                <td className="al">..</td>
              </tr>
              <tr>
                <td>홍길동</td>
                <td>2015-08-08 PM 12:25</td>
                <td>재승인 요청</td>
                <td className="al"></td>
              </tr>
              </tbody>
            </table>
          </div>
          <p className="btn_c"><a onClick={this.props.close} className="blue">Close</a></p>
        </div>
      </div>
    )
  }

  clearEvent(e) {
    e.stopPropagation()
  }
}
