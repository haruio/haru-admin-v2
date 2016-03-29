import React from 'react'


import debug from 'debug'
const log = debug('application:ContentAddMovieZone.jsx')

import intlStores from '../../../utils/IntlStore'

const icon_images = require('image!../../../assets/img/icon_text.png')
const icon_images2 = require('image!../../../assets/img/icon_images2.png')
const btn_close = require('image!../../../assets/img/btn_close.png')

import VideoPreview from '../../VideoPreview'
/**
 * A component to ContentAddImageZone
 * author : jungun.park
 */

export default class ContentAddMovieZone extends React.Component {

  componentDidMount() {
    //드래그 리스트 sortable 처리
    $('#drag_list').sortable({ placeholder: 'placeholder' })

    //팝업띄우기
    $('#drag_list li').click(function () {
      $('#contents_detail').animate({ 'margin-top': '0', opacity: 1 }, 200)
    })
  }

  render() {
    log(this.props.content)
    return (
      <div id="add_images">
        <h3>{intlStores.get('cms.CMS_FLD_CONTENTS')}</h3>
        <VideoPreview content={this.props.content}/>
        <ul id="drag_list2">
          <li>
            <p className="img"><img src="http://assets2.moncast.com/attach/1435305041384_410dd53e3068d622079463771adfb900" alt="" /></p>
            <p className="text">입력된 텍스트입니다. 입력된 텍스트입니다. 입력된 텍스트입니다. 입력된 텍스트입니다. 입력된 텍스트입니다. 입력된 텍스트입니다. 입력된 텍스트입니다. 입력된 텍스트입니다. 입력된 텍스트입니다. 입력된 텍스트입니다. 입력된 텍스트입니다. </p>
            <input type="image" src={btn_close} alt="닫기" />
          </li>
          <li>
            <p className="img"><b className="info">※ 이곳에 이미지를 끌어다 넣으세요!</b></p>
            <p className="text"><textarea defaultValue="텍스트를 입력하세요."></textarea></p>
            <input type="image" src={btn_close} alt="닫기" />
          </li>
          <li>
            <p className="text"><textarea defaultValue="텍스트를 입력하세요."></textarea></p>
            <input type="image" src={btn_close} alt="닫기" />
          </li>
        </ul>
        <p className="btn_add">
          <a href=""><img src={icon_images2} alt={intlStores.get('cms.CMS_BTN_ADD_IMAGE')} /></a>
          <a href=""><img src={icon_images} alt={intlStores.get('cms.CMS_BTN_ADD_TXT')} /></a>
        </p>
        <p className="btn_r">
          <a className="gray">{intlStores.get('cms.CMS_BTN_LIST')}</a>
          <a className="tinyGreen">{intlStores.get('cms.CMS_BTN_TEMP_SAVE')}</a>
          <a className="purple btn_w340">{intlStores.get('cms.CMS_BTN_REQUEST')}</a>
        </p>
      </div>
    )
  }
}
