import React from 'react'


import debug from 'debug'
const log = debug('application:VideoMetaPanel.jsx')

import intlStores from '../../../utils/IntlStore'

/**
 * A component to ImageInfoPanel
 * author : jungun.park
 */

export default class VideoMetaPanel extends React.Component {

  componentDidMount() {
    // 컨텐츠 내용 부분을 내리는 로직
    // 지금 시점에 $("#add_info").height();가 부적확함 왜일가?
    log(this.refs.add_info.style.height)
    $("#contents_add").animate({'padding-top': 580 + 123}, 0)
  }

  /**
   * toggle InfoPanel
   * @param {object} e - click event object
   */
  toggleInfoBtn = (e) => {
    if ($(e.target).hasClass("close")) {
      $(e.target).removeClass("close")
        .parent().animate({'height': this.h}, 200) // 패널 높이 조절
        .find("table").fadeIn(200); // 표 숨기기
      // 컨텐츠 내용 부분을 내리는 로직
      $("#contents_add").animate({'padding-top': this.h + 120}, 200);
    } else {
      this.h = $("#add_info").height();
      log(this.h)
      $(e.target).addClass("close")
        .parent().animate({'height': '30px'}, 200) // 패널 높이 조절
        .find("table").fadeOut(200); // 표 숨기기
      // 컨텐츠 내용 부분을 올리는 로직
      $("#contents_add").animate({'padding-top': '153px'}, 200);
    }
  }

  render() {
    return (
      <div id="add_info" ref="add_info">
        <table className="writeTable">
          <colgroup>
            <col width="154px"/>
            <col width="*"/>
          </colgroup>
          <tbody>
          <tr>
            <th>제목</th>
            <td><input type="text" className="txt t1" placeholder="최대 한글 25자, 영문 50자를 넘지 않게 해 주세요.."/></td>
          </tr>
          <tr>
            <th>썸네일</th>
            <td>
              <input type="text" className="txt t2" id="filen2"/><span className="btn_file">Choose file<input
              type="file" onchange="javascript: document.getElementById('filen2').value = this.value"/></span>
              <a href="#" className="btn_preview"></a>
            </td>
          </tr>
          <tr>
            <th>공유화면 이미지</th>
            <td>
              <input type="text" className="txt t2" id="filen"/><span className="btn_file">Choose file<input type="file"
                                                                                                             onchange="javascript: document.getElementById('filen').value = this.value"/></span>
              <a href="#" className="btn_preview has"><img
                src="http://assets2.moncast.com/channel/713f94bf61bb8b8c.jpeg" alt=""/></a>
              <a href="" className="btn_del"></a>
            </td>
          </tr>
          <tr>
            <th>라스트커버 이미지</th>
            <td>
              <input type="text" className="txt t2" id="filen3"/><span className="btn_file">Choose file<input
              type="file" onchange="javascript: document.getElementById('filen2').value = this.value"/></span>
              <a href="#" className="btn_preview"></a>
            </td>
          </tr>
          <tr>
            <th>채널</th>
            <td>
              <p className="channel_list">
                <a href="" className="on">Humor</a>
                <a href="">Issue</a>
                <a href="">Entertainment</a>
                <a href="" className="on">Music</a>
                <a href="">Good Tip</a>
                <a href="">Beauty</a>
                <a href="">NSFW</a>
              </p>
            </td>
          </tr>
          <tr>
            <th>카테고리</th>
            <td>
              <select style={{ width:'360px' }}>
                <option>두근두근 가상연애</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>키워드</th>
            <td><input type="text" className="txt t1" placeholder="검색에 사용되며, 엔터, 쉼표(.) 키를 누르면 등록됩니다."/></td>
          </tr>
          <tr>
            <th>영상 주소</th>
            <td><input type="text" className="txt t1"/></td>
          </tr>
          <tr>
            <th>출처</th>
            <td><input type="text" className="txt t1"/></td>
          </tr>
          <tr>
            <th>컨텐츠 설명</th>
            <td><textarea defaultValue="텍스트를 입력하세요."></textarea></td>
          </tr>
          </tbody>
        </table>
        <button id="add_info_btn" onClick={this.toggleInfoBtn}></button>
      </div>
    )
  }
}
