import React from 'react'

import debug from 'debug'
const log = debug('application:DetailInfoPanel.jsx')

import ContentActions from '../../../../actions/ContentActions'
import intlStores from '../../../../utils/IntlStore'
import util from '../../../../utils/util'

/**
 * A component to ContentDetailPopup
 * author : jungun.park
 */


export default class DetailInfoPanel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      contentSeq : props.contentSeq
    }
  }

  changeSelectedImage = (index) => {
    this.setState({contentSeq :index})
  }

  render() {
    log(this.props.content.toJS())
    const currentImg = this.props.content.get('contents').find((item) => {
      return item.get('contentSeq') === this.state.contentSeq
    })

    // TODO : 아무것도 없는 상태에서 랜더링 되면 에러가 나서 막음. 나중에 제대로 분석해서 정리할수 있음 하자
    if(!currentImg) {
      return null
    }

    return (
        <div id="detail_info">
          <p style={{backgroundImage:'url(' +currentImg.get('contentUrl') + ')'}}><em dangerouslySetInnerHTML={this.getHtmlBody()}></em></p>
          <table className="writeTable">
            <colgroup><col width="200px" /><col width="*" /></colgroup>
            <tbody>
            <tr>
              <th>{intlStores.get('cms.CMS_FLD_SOURCE')}</th>
              <td><input type="text" className="txt"
                         onChange={this.changeInputData.bind(this, 'sourceDescription')}
                         value={currentImg.get('sourceDescription') || ''} /></td>
            </tr>
            <tr>
              <th>{intlStores.get('cms.CMS_FLD_SOURCE_LINK')}</th>
              <td><input type="text" id="input-source-url" className="txt"
                         onChange={this.changeInputData.bind(this, 'sourceUrl')}
                         onBlur={this.onBlurSourceURL}
                         value={currentImg.get('sourceUrl') || ''} /></td>
            </tr>
            <tr>
              <th>{intlStores.get('cms.CMS_FLD_DESC')}</th>
              <td>
                <textarea onChange={this.changeInputData.bind(this, 'body')}
                          placeholder={intlStores.get('cms.CMS_MSG_NEED_CONTENT_DESCRIPTION')}
                          value={currentImg.get('body') || ''}></textarea>
                <p>최대 100자 이내로 작성해 주세요. (0/100)</p>
              </td>
            </tr>
            <tr>
              <th>{intlStores.get('cms.CMS_FLD_CAPACITY')}</th>
              <td>{Math.round(currentImg.get('contentSize') / 1024)  + 'KB'}</td>
            </tr>
            <tr>
              <th>{intlStores.get('cms.CMS_FLD_SIZE')}</th>
              <td>{currentImg.get('contentWidth') + ' * ' + currentImg.get('contentHeight')}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th></th>
              <td></td>
            </tr>
            </tbody>
          </table>
        </div>
    )
  }

  /***
   * dangerouslySetInnerHTML 넣기 위한 body를 만드는 부분
   * @returns {{__html: (*|string)}} - html 내용
     */
  getHtmlBody = () => {
    return {__html: util.replaceAll(this.props.content.get('body'), '\n', '<br />')}
  }

  /***
   * 팝업 Form의 내용 수정 시 해당 input의 타입에 따라 Store의 내용 변경
   * @param inputType {string} - 입력되는 종류 (sourceDescription, sourceUrl, body)
   * @param e
     */
  changeInputData(inputType, e) {
    let value = e.target.value.trim()
    if(inputType === 'sourceUrl') {
      value = value.replace('HTTPS', 'https').replace('HTTP', 'http').trim()
    }

    ContentActions.updateSubContentImage(this.state.contentSeq, inputType, value)
  }

  /***
   * SourceURL이 blur 될때 URL validation 처리
   * @event sourceUrl#onBlur
   * @param e {Object} - onBlur event
     */
  onBlurSourceURL(e) {
    //TODO: VALIDATION url

    ContentActions.updateSubContentImage(this.state.contentSeq, 'sourceUrl', e.target.value)
  }

}
