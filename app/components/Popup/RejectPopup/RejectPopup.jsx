/**
 * Created by jungenpark on 3/22/16.
 */
import React from 'react'
import cn from 'classnames'

import debug from 'debug'
const log = debug('application:RejectPopup.jsx')

export default class RejectPopup extends React.Component {
  render() {
    return (
      <div className="pop_wrap">
        <div className="pop" id="pop_return" onClick={this.clearEvent}>
          <h2>contents 반려</h2>
          <fieldset>
            <textarea placeholder="반려사유를 적어주세요"></textarea>
          </fieldset>
          <p className="btn_c">
            <a href="" className="purple">확인</a>
            <a onClick={this.props.close} className="gray">취소</a>
          </p>
        </div>
      </div>
    )
  }

  clearEvent(e) {
    e.stopPropagation()
  }
}
