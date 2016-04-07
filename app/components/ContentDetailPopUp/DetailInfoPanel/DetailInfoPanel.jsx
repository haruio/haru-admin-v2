import React from 'react'
import {Container} from 'flux/utils'

import debug from 'debug'
const log = debug('application:DetailInfoPanel.jsx')

import intlStores from '../../../utils/IntlStore'
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
    const currentImg = this.props.content.get('contents').find((item) => {
      return item.get('contentSeq') === this.state.contentSeq
    })

    return (
        <div id="detail_info">
          <p style={{backgroundImage:'url(' +currentImg.get('contentUrl') + ')'}}><em dangerouslySetInnerHTML={this.getHtmlBody()}></em></p>
          <table className="writeTable">
            <colgroup><col width="200px" /><col width="*" /></colgroup>
            <tbody>
            <tr>
              <th>{intlStores.get('cms.CMS_FLD_SOURCE')}</th>
              <td><input type="text" className="txt"
                         onChange={this.changeInputData.bind(this, 'source')}
                         value={currentImg.get('sourceDescription') || ''} /></td>
            </tr>
            <tr>
              <th>{intlStores.get('cms.CMS_FLD_SOURCE_LINK')}</th>
              <td><input type="text" id="input-source-url" className="txt"
                         onChange={this.changeInputData.bind(this, 'sourceurl')}
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

  getHtmlBody = () => {
    return {__html: this.replaceAll(this.props.content.get('body'), '\n', '<br />')}
  }

  replaceAll(str, target, replacement) {
    if(str) {
      return str.split(target).join(replacement)
    } else {
      return str
    }
  }

  /**
   * 팝업 Form의 내용 수정 시 해당 input의 타입에 따라 Store의 내용 변경
   */
  changeInputData(inputType) {
    if(inputType == 'source') {

    } else if(inputType == 'sourceurl') {
      // 기존에 HTTP로 대문자일때 오류가 나기 때문에 소문자로 치환
      //this.state.responseImagePostObj.contents[this.props.index].sourceUrl = $('#input-source-url').val().replace('HTTPS', 'https').replace('HTTP', 'http').trim()
    } else if(inputType == 'body') {

    }
  }
}
