import React from 'react'


import debug from 'debug'
const log = debug('application:VideoInfoPanel.jsx')

import intlStores from '../../utils/IntlStore'

const txt1 = require('image!../../assets/img/txt1.png')
const icon_images = require('image!../../assets/img/icon_images.png')

/**
 * A component to ContentAddImageZone
 * author : jungun.park
 */

export default class ContentAddImageZone extends React.Component {

  componentDidUpdate() {
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

  render() {
    return (
      <div id="add_images">
        <h3>컨텐츠 내용</h3>
        {this.EmptyDescriptionDropImageZone}
        <ul id="drag_list">
          <li>
            <p style={{"backgroundImage":"url(http://assets2.moncast.com/thumb/ed073321aeae200c.jpeg)"}}><em></em>
            </p>
            <a href="" className="btn_close"></a>
          </li>
          <li>
            <p style={{"backgroundImage":"url(http://assets2.moncast.com/image/0ac19364b6e7057c.jpeg)"}}><em>애교섞인
              말투와, 나를 바라보며 미소짓는 모습을 봤을때 애교섞인 말투와, 나를 바라보며 미소짓는 모습을 봤을때</em></p>
            <a href="" className="btn_close"></a>
          </li>
          <li>
            <p style={{"backgroundImage":"url(http://assets2.moncast.com/image/8ab535fd27d7b6bb.jpeg)"}}><em>애교섞인
              말투와, 나를 바라보며 미소짓는 모습을 봤을때</em></p>
            <a href="" className="btn_close"></a>
          </li>
          <li>
            <p style={{"backgroundImage":"url(http://assets2.moncast.com/image/0ac19364b6e7057c.jpeg)"}}><em></em>
            </p>
            <a href="" className="btn_close"></a>
          </li>
          <li>
            <dl>
              <dt><img src={txt1} alt="Drag & Drop"/></dt>
              <dd><b>※ 이곳에 이미지를 끌어다 넣으세요!</b></dd>
              <dd>(이미지 파일을 <u>최대 10개</u>까지 <br />한꺼번에 등록할 수 있습니다.)</dd>
            </dl>
          </li>
        </ul>
        <p className="btn_r">
          <a href="" className="gray">목록으로</a>
          <a href="" className="purple">승인요청</a>
        </p>
      </div>
    )
  }
}
