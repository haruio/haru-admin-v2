/**
 * Created by jungenpark on 3/22/16.
 */
import React from 'react'
import cn from 'classnames'

import debug from 'debug'
const log = debug('application:PublishPopup.jsx')

export default class PublishPopup extends React.Component {
  clearEvent(e) {
    e.stopPropagation()
  }

  render() {
    return (
      <div className="pop_wrap">
        <div className="pop" id="pop_publish" onClick={this.clearEvent}>
          <h2>contents 발행</h2>
          <fieldset>
            <p>
              <input type="radio" id="publish1" name="publish" defaultChecked={true} /> <label for="publish1">즉시 발행</label>
            </p>
            <p>
              <input type="radio" id="publish2" name="publish"  /> <label for="publish2">예약 발행</label>
              <input type="text" placeholder="2015-08-08" className="txt t3" /><a href="" className="btn_calendar"></a>
              <select style={{width:'70px'}}>
                <option>12시</option>
              </select>
              <select style={{width:'70px'}}>
                <option>00분</option>
              </select>
            </p>
          </fieldset>
          <p className="btn_c">
            <a href="" className="purple">확인</a>
            <a onClick={this.props.close} className="gray">취소</a>
          </p>
        </div>
      </div>
    )
  }
}
