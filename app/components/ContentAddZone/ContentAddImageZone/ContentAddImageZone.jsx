import React from 'react'


import debug from 'debug'
const log = debug('application:ContentAddImageZone.jsx')

import intlStores from '../../../utils/IntlStore'

const txt1 = require('image!../../../assets/img/txt1.png')
const icon_images = require('image!../../../assets/img/icon_images.png')

/**
 * A component to ContentAddImageZone
 * author : jungun.park
 */

export default class ContentAddImageZone extends React.Component {

  componentDidMount() {
    //드래그 리스트 sortable 처리
    $('#drag_list').sortable({ placeholder: 'placeholder' })

    //팝업띄우기
    $('#drag_list li').click(function () {
      $('#contents_detail').animate({ 'margin-top': '0', opacity: 1 }, 200)
    })
  }

  get EmptyDescriptionDropImageZone() {
    return (
    <div id="drag_area_info">
      <dl>
        <dt><img src={txt1} alt="Drag & Drop"/></dt>
        <dd><b>※ 이곳에 이미지를 끌어다 넣으세요!</b></dd>
        <dd>(이미지 파일을 <u>최대 10개</u>까지 한꺼번에 등록할 수 있습니다.)</dd>
      </dl>
      <table className="listTable">
        <colgroup>
          <col width="30%"/>
          <col width="*"/>
          <col width="30%"/>
        </colgroup>
        <thead>
        <tr>
          <th>확장자</th>
          <th>사이즈</th>
          <th>용량</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><img src={icon_images} alt=""/><br />GIF, JPG, PNG</td>
          <td>540px×960px 이내<br />정사각형일 경우 600px 이내</td>
          <td>150KB<em>(0.15MB)</em> 이내</td>
        </tr>
        <tr>
          <td>움짤 (GIF)</td>
          <td></td>
          <td>15MB이내</td>
        </tr>
        </tbody>
      </table>
      <p>※ 사이즈와 용량이 제한을 넘을 경우 등록 자체가 되지 않습니다.</p>
    </div>)
  }

  replaceAll(str, target, replacement) {
    if(str) {
      return str.split(target).join(replacement)
    } else {
      return str
    }
  }

  get renderContents() {
    // content가 empty일때
    if(this.props.content.get('contents') == undefined || this.props.content.get('contents').size == 0) {
      return this.EmptyDescriptionDropImageZone
    } else {
      let contentlist = this.props.content.get('contents').map((content) => {
        let getHtmlBody = () => {return {__html: this.replaceAll(content.get('body'), '\n', '<br />')}}

        return (
          <li key={content.get('contentSeq')}>
            <p style={{backgroundImage:'url('+content.get('contentUrl')+')'}}><em dangerouslySetInnerHTML={getHtmlBody()}></em></p>
            <a href="" className="btn_close"></a>
          </li>
        )
      })

      contentlist.push(<li key="empty">
        <dl>
          <dt><img src={txt1} alt="Drag & Drop"/></dt>
          <dd><b>※ 이곳에 이미지를 끌어다 넣으세요!</b></dd>
          <dd>(이미지 파일을 <u>최대 10개</u>까지 <br />한꺼번에 등록할 수 있습니다.)</dd>
        </dl>
      </li>)

      return (
        <ul id="drag_list">
          {contentlist}
        </ul>
      )
    }
  }
  render() {
    return (
      <div id="add_images">
        <h3>컨텐츠 내용</h3>

        {this.renderContents}
        <p className="btn_r">
          <a className="gray">{intlStores.get('cms.CMS_BTN_LIST')}</a>
          <a className="tinyGreen">{intlStores.get('cms.CMS_BTN_TEMP_SAVE')}</a>
          <a className="purple btn_w340">{intlStores.get('cms.CMS_BTN_REQUEST')}</a>
        </p>
      </div>
    )
  }
}
