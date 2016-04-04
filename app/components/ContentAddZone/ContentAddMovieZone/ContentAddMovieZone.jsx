import React from 'react'

import debug from 'debug'
const log = debug('application:ContentAddMovieZone.jsx')

import intlStores from '../../../utils/IntlStore'

const icon_images = require('image!../../../assets/img/icon_text.png')
const icon_images2 = require('image!../../../assets/img/icon_images2.png')
const btn_close = require('image!../../../assets/img/btn_close.png')

import VideoPreview from '../../VideoPreview'
import ContentActions from '../../../actions/ContentActions'

/**
 * A component to ContentAddImageZone
 * author : jungun.park
 */

export default class ContentAddMovieZone extends React.Component {
  componentDidMount() {
    //드래그 리스트 sortable 처리
    $('#drag_list2').sortable({placeholder: 'placeholder'})
  }

  videoContentAddImage() {
    ContentActions.addSubContent({
      contentSeq: Date.now(),
      type: 'IMG',
      contentUrl: '',
      body: '',
      contentResourceSeq: ''
    })
  }

  videoContentAddText() {
    ContentActions.addSubContent({
      contentSeq: Date.now(),
      type: 'TXT',
      contentUrl: '',
      body: '',
      contentResourceSeq: ''
    })
  }

  render() {
    return (
      <div id="add_images">
        <h3>{intlStores.get('cms.CMS_FLD_CONTENTS')}</h3>
        <VideoPreview content={this.props.content}/>
        <ul id="drag_list2">
          {this.renderContent}
        </ul>
        <p className="btn_add">
          <a onClick={this.videoContentAddImage}><img src={icon_images2} alt={intlStores.get('cms.CMS_BTN_ADD_IMAGE')}/></a>
          <a onClick={this.videoContentAddText}><img src={icon_images} alt={intlStores.get('cms.CMS_BTN_ADD_TXT')}/></a>
        </p>
        <p className="btn_r">
          <a className="gray">{intlStores.get('cms.CMS_BTN_LIST')}</a>
          <a className="tinyGreen">{intlStores.get('cms.CMS_BTN_TEMP_SAVE')}</a>
          <a className="purple btn_w340">{intlStores.get('cms.CMS_BTN_REQUEST')}</a>
        </p>
      </div>
    )
  }

  get renderContent() {
    // 컨텐츠가 없을때 첫 렌더링때는 contents가 없음
    if (this.props.content.get('contents') == undefined)
      return null

    return this.props.content.get('contents').map((content) => {
      if (content.get('type') === 'IMG') {
        return (
          <li key={content.get('contentSeq')}>
            <p className="img">{this.subcontentimg(content)}</p>
            <p className="text">
              <textarea placeholder={intlStores.get('cms.CMS_MSG_ERROR_DESC')}
                        defaultValue={content.get('body')}
                        onBlur={this.onSubContentUpdate.bind(this, content.get('contentSeq'))}></textarea>
            </p>
            <input type="image" src={btn_close} alt="닫기" onClick={this.clickRemoveBtn.bind(this, content.get('contentSeq'))} />
          </li>
        )
      } else {
        return (
          <li key={content.get('contentSeq')}>
            <p className="text"><textarea placeholder={intlStores.get('cms.CMS_MSG_ERROR_DESC')}></textarea></p>
            <input type="image" src={btn_close} alt="닫기" onClick={this.clickRemoveBtn.bind(this, content.get('contentSeq'))} />
          </li>
        )
      }
    })
  }

  subcontentimg(content) {
    if (content.get('contentUrl') === '') {
      return <b className="info">{intlStores.get('cms.CMS_TXT_DRAG_IMAGE')}</b>
    } else {
      return <img src={content.get('contentUrl')} alt="image"/>
    }
  }

  onSubContentUpdate(contentSeq, e) {
    ContentActions.updateSubContent({
      contentSeq: contentSeq,
      type: 'IMG',
      contentUrl: '',
      body: e.target.value,
      contentResourceSeq: ''
    })
  }
  
  clickRemoveBtn(contentSeq) {
    ContentActions.deleteSubContent(contentSeq)
  }

}
