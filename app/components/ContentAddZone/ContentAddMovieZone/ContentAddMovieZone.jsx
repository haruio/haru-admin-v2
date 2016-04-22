import React from 'react'
import {Link} from 'react-router'
import debug from 'debug'
const log = debug('application:ContentAddMovieZone.jsx')

import intlStores from '../../../utils/IntlStore'

const icon_images = require('image!../../../assets/img/icon_text.png')
const icon_images2 = require('image!../../../assets/img/icon_images2.png')
const btn_close = require('image!../../../assets/img/btn_close.png')

import VideoPreview from '../../VideoPreview'
import ContentActions from '../../../actions/ContentActions'
import SubContentItem from './SubContentItem'
import {PUBLISH} from '../../../constants/AppConstants'

/**
 * A component to ContentAddImageZone
 * author : jungun.park
 */

export default class ContentAddMovieZone extends React.Component {
  componentDidMount() {
    //드래그 리스트 sortable 처리
    $('#drag_list2').sortable({placeholder: 'placeholder'})
  }

  render() {
    return (
      <div id="add_images">
        <h3>{intlStores.get('cms.CMS_FLD_CONTENTS')}</h3>
        <VideoPreview content={this.props.content}/>
        <ul id="drag_list2">
          {this.renderContents}
        </ul>
        {this.renderAddSubContent}
        <p className="btn_r">
          <Link to="/content/mycontent" className="gray">{intlStores.get('cms.CMS_BTN_LIST')}</Link>
          <a className="tinyGreen" onClick={this.submitContent.bind(this, PUBLISH.TEMP)}>{intlStores.get('cms.CMS_BTN_TEMP_SAVE')}</a>
          <a className="purple" onClick={this.submitContent.bind(this, PUBLISH.APPROVE)}>{intlStores.get('cms.CMS_BTN_REQUEST')}</a>
        </p>
      </div>
    )
  }

  get renderContents() {
    if (this.props.content.get('contents') == undefined)
      return null

    return this.props.content.get('contents').map((content) => {
      return <SubContentItem content={content} key={content.get('contentSeq')}/>
    })
  }

  get renderAddSubContent() {
    if(this.props.inspection) {
      return null
    }

    return (<p className="btn_add">
      <a onClick={this.videoContentAddEmptyImage}><img src={icon_images2} alt={intlStores.get('cms.CMS_BTN_ADD_IMAGE')}/></a>
      <a onClick={this.videoContentAddEmptyText}><img src={icon_images} alt={intlStores.get('cms.CMS_BTN_ADD_TXT')}/></a>
    </p>)
  }

  submitContent = (type) => {
    this.props.onSubmit(type)
  }

  videoContentAddEmptyImage() {
    if(this.props.inspection) {
      return
    }
    ContentActions.addSubContent({
      contentSeq: Date.now(),
      type: 'IMG',
      contentUrl: '',
      body: '',
      contentResourceSeq: ''
    })
  }

  videoContentAddEmptyText() {
    if(this.props.inspection) {
      return
    }

    ContentActions.addSubContent({
      contentSeq: Date.now(),
      type: 'TXT',
      contentUrl: '',
      body: '',
      contentResourceSeq: ''
    })
  }
}
