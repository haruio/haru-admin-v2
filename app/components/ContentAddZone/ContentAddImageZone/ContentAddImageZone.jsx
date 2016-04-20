import React from 'react'

import debug from 'debug'
const log = debug('application:ContentAddImageZone.jsx')

import intlStores from '../../../utils/IntlStore'

const txt1 = require('image!../../../assets/img/txt1.png')
const icon_images = require('image!../../../assets/img/icon_images.png')

import ContentActions from '../../../actions/ContentActions'
import PopupActions from '../../../actions/PopupActions'
import {POPUP, PUBLISH} from '../../../constants/AppConstants'
/**
 * A component to ContentAddImageZone
 * author : jungun.park
 */

export default class ContentAddImageZone extends React.Component {
  componentDidMount() {
    //드래그 리스트 sortable 처리
    setTimeout(function () {
      $('#drag_list').sortable({
        placeholder: 'placeholder',
        stop: function () {
          let idLists = []
          $('#drag_list > li').each(function (idx, el) {
            if($(el).attr('data-id') != undefined) {
              idLists.push($(el).attr('data-id'))
            }
          })
          return false
        }
      })
    }, 200)
  }
  
  render() {
    return (
      <div id="add_images">
        <h3>컨텐츠 내용</h3>
        <div id="drag_area_info" ref="dragarea"
             onDragOver={this.imgOver}
             onDragEnter={this.imgEnter}
             onDrop={this.imgDrop}>
          {this.renderContents}
        </div>
        <p className="btn_r">
          <a className="gray">{intlStores.get('cms.CMS_BTN_LIST')}</a>
          <a className="tinyGreen" onClick={this.submitContent.bind(this, PUBLISH.TEMP)}>{intlStores.get('cms.CMS_BTN_TEMP_SAVE')}</a>
          <a className="purple btn_w340" onClick={this.submitContent.bind(this, PUBLISH.APPROVE)}>{intlStores.get('cms.CMS_BTN_REQUEST')}</a>
        </p>
      </div>
    )
  }

  get renderContents() {
    // content가 empty일때
    if(this.props.content.get('contents') == undefined
      || this.props.content.get('contents').size == 0) {
      return this.EmptyDescriptionDropImageZone
    } else {
      let contentlist = this.props.content.get('contents').map((content) => {
        let getHtmlBody = () => {return {__html: this.replaceAll(content.get('body'), '\n', '<br />')}}

        return (
          <li key={content.get('contentSeq')} onClick={this.onPopupUserProfile.bind(this, content.get('contentSeq'))}>
            <p style={{backgroundImage:'url('+content.get('contentUrl')+')'}}><em dangerouslySetInnerHTML={getHtmlBody()}></em></p>
            <a onClick={this.clickRemoveBtn.bind(this, content.get('contentSeq'))} className="btn_close"></a>
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

  clickRemoveBtn(contentSeq) {
    ContentActions.deleteSubContent(contentSeq)
  }

  get EmptyDescriptionDropImageZone() {
    return (
      <div id="drag_area_intro">
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
            <th>{intlStores.get('cms.CMS_TXT_SIZE')}</th>
            <th>{intlStores.get('cms.CMS_TXT_CAPACITY')}</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><img src={icon_images} alt=""/><br />GIF, JPG, PNG</td>
            <td>{intlStores.get('cms.CMS_TXT_ERROR_DISPLAY3')}<br />정사각형일 경우 600px 이내</td>
            <td>150KB<em>(0.15MB)</em> 이내</td>
          </tr>
          <tr>
            <td>{intlStores.get('cms.CMS_TXT_GIF')}</td>
            <td></td>
            <td>15MB이내</td>
          </tr>
          </tbody>
        </table>
        <p>{intlStores.get('cms.CMS_TXT_ERROR_DISPLAY1')}</p>
      </div>)
  }

  replaceAll(str, target, replacement) {
    if(str) {
      return str.split(target).join(replacement)
    } else {
      return str
    }
  }

  /***
   * 발행 버튼
   * @param type {String} - temp, approve
     */
  submitContent = (type) => {
    this.props.onSubmit(type)
  }

  /**
   * 이미지 드래그 후 타겟 영역에 마우스가 들어왔을 때, 해당 타겟 영역의 라인스타일을 도트로 바꿈
   */
  imgEnter = (e) => {
    e.stopPropagation()
    e.preventDefault()
    this.refs.dragarea.style.border = '2px solid #d2d2d4'
  }


  /**
   * 타겟 영역에 마우스 오버 이벤트 제거
   */
  imgOver(e) {
    e.stopPropagation()
    e.preventDefault()
  }

  /**
   * 이미지 드래그 후 타겟 영역에 아이템을 드랍.
   * 해당 타겟 영역의 라인 스타일을 이전으로 되돌림.
   * 파일 업로드 요청
   */
  imgDrop = (e) => {
    e.preventDefault()
    this.refs.dragarea.style.border = '2px dashed #d2d2d4'

    let files = e.nativeEvent.dataTransfer.files
    this._handleFileUpload(files)
  }

  imgLeave = (e) => {
    log('leave')
    e.preventDefault()
    e.stopPropagation()

    this.refs.dragarea.style.border = '2px dashed #d2d2d4'
  }

  /**
   * 업로드 요청 된 파일들 formData로 변환
   */
  _handleFileUpload(files) {
    for (let i = 0; i < files.length; i++) {
      ContentActions.uploadImagesUpdateSubContent(files[i])
    }
  }


  /***
   * PopUp User Profile
   * @param user {User} - user object
   */
  onPopupUserProfile(contentSeq) {
    PopupActions.openPopup(POPUP.CONTENTDETAIL, {contentSeq:contentSeq})
  }
}
