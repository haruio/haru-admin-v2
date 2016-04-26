/**
 * Created by jungenpark on 3/22/16.
 */
import React from 'react'
import cn from 'classnames'

import debug from 'debug'
const log = debug('application:RejectPopup.jsx')

import intlStores from '../../../utils/IntlStore'
import ContentActions from '../../../actions/ContentActions'

export default class RejectPopup extends React.Component {
  render() {
    return (
      <div className="pop_wrap">
        <div className="pop" id="pop_return" onClick={this.clearEvent}>
          <h2>{intlStores.get('cms.MENU_TXT_CONTENTS_REJECTION')}</h2>
          <fieldset>
            <textarea placeholder={intlStores.get('cms.CMS_TXT_REASON_REJECTION')} ref="rejectReason"></textarea>
          </fieldset>
          <p className="btn_c">
            <a onClick={this.onRejectContent} className="purple">{intlStores.get('cms.CMS_BTN_CONFIRM')}</a>
            <a onClick={this.props.close} className="gray">{intlStores.get('cms.CMS_BTN_CANCEL')}</a>
          </p>
        </div>
      </div>
    )
  }

  /***
   * 승인 거절하는 함수
   */
  onRejectContent = () => {
    ContentActions.requestContentReject(this.props.postSeq, this.refs.rejectReason.value)

    // 팝업 닫기
    this.props.close()
  }

  clearEvent(e) {
    e.stopPropagation()
  }
}
