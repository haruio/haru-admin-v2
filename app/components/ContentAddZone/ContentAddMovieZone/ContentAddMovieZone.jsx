import React from 'react'


import debug from 'debug'
const log = debug('application:ContentAddMovieZone.jsx')

import intlStores from '../../../utils/IntlStore'

const txt1 = require('image!../../../assets/img/txt1.png')
const icon_images = require('image!../../../assets/img/icon_text.png')
const icon_images2 = require('image!../../../assets/img/icon_images2.png')
const btn_close = require('image!../../../assets/img/btn_close.png')

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
    return (
      <div id="add_images">
        <h3>컨텐츠 내용</h3>
        <div className="moive">
          <dl className="info">
            <dt>영상 미리보기</dt>
            <dd>(Youtube영상이 아닐 경우 동영상 파일을 끌어다 놓으세요!!)</dd>
          </dl>
        </div>
        <div className="moive">
          <p><img src="http://assets2.moncast.com/thumb/d231327b9111e655.jpeg" alt="" /></p>
        </div>
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
          <a href=""><img src={icon_images2} alt="이미지추가" /></a>
          <a href=""><img src={icon_images} alt="텍스트추가" /></a>
        </p>
        <p className="btn_r">
          <a href="" className="gray">목록으로</a>
          <a href="" className="purple btn_w340">승인요청</a>
        </p>
      </div>
    )
  }
}
