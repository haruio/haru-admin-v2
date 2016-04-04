import React from 'react'

import debug from 'debug'
const log = debug('application:ContentDetailPopup.jsx')

const btn_prev = require("image!../../assets/img/btn_prev.png")
const btn_next = require("image!../../assets/img/btn_next.png")
const btn_pop_close = require("image!../../assets/img/btn_pop_close.png")


/**
 * A component to ContentDetailPopup
 * author : jungun.park
 */


export default class ContentDetailPopup extends React.Component {

  componentDidMount() {
    // detail list cycle
    $('#detail_list>div').cycle({
      fx: 'scrollHorz',
      timeout: 0,
      speed: '2000',
      after: onAfter,
      prev: '#prev_list',
      next: '#next_list'
    })
    function onAfter(curr, next, opts) {
      var index = opts.currSlide;
      $('#prev_list')[index == 0 ? 'hide' : 'show']()
      $('#next_list')[index == opts.slideCount - 1 ? 'hide' : 'show']()
    }
  }

  render() {
    return (
      <div id="contents_detail">
        <div id="detail_info">
          <p style={{backgroundImage:'url(http://assets2.moncast.com/image/0ac19364b6e7057c.jpeg)'}}><em>애교섞인 말투와, 나를 바라보며 미소짓는 모습을 봤을때 애교섞인 말투와, </em></p>
          <table className="writeTable">
            <colgroup><col width="200px" /><col width="*" /></colgroup>
            <tbody>
            <tr>
              <th>출처</th>
              <td><input type="text" className="txt" /></td>
            </tr>
            <tr>
              <th>설명</th>
              <td>
                <textarea></textarea>
                <p>최대 100자 이내로 작성해 주세요. (0/100)</p>
              </td>
            </tr>
            <tr>
              <th>파일명</th>
              <td>아이유.png</td>
            </tr>
            <tr>
              <th>사이즈</th>
              <td>120*160</td>
            </tr>
            <tr>
              <th>압축</th>
              <td>120*160</td>
            </tr>
            <tr>
              <th>수평 해상도</th>
              <td>120*160</td>
            </tr>
            <tr>
              <th>수직 해상도</th>
              <td>120*160</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div id="detail_list">
          <div>
            <ul>
              <li><p style={{"backgroundImage":"url(http://assets2.moncast.com/thumb/ed073321aeae200c.jpeg)"}}></p></li>
              <li><p style={{"backgroundImage":"url(http://assets2.moncast.com/image/0ac19364b6e7057c.jpeg)"}}></p></li>
              <li><p style={{"backgroundImage":"url(http://assets2.moncast.com/image/8ab535fd27d7b6bb.jpeg)"}}></p></li>
              <li><p style={{"backgroundImage":"url(http://assets2.moncast.com/image/0ac19364b6e7057c.jpeg)"}}></p></li>
              <li><p style={{"backgroundImage":"url(http://assets2.moncast.com/thumb/ed073321aeae200c.jpeg)"}}></p></li>
              <li><p style={{"backgroundImage":"url(http://assets2.moncast.com/image/0ac19364b6e7057c.jpeg)"}}></p></li>
              <li><p style={{"backgroundImage":"url(http://assets2.moncast.com/image/8ab535fd27d7b6bb.jpeg)"}}></p></li>
            </ul>
            <ul>
              <li><p style={{"backgroundImage":"url(http://assets2.moncast.com/image/0ac19364b6e7057c.jpeg)"}}></p></li>
              <li><p style={{"backgroundImage":"url(http://assets2.moncast.com/image/8ab535fd27d7b6bb.jpeg)"}}></p></li>
              <li><p style={{"backgroundImage":"url(http://assets2.moncast.com/image/0ac19364b6e7057c.jpeg)"}}></p></li>
              <li><p style={{"backgroundImage":"url(http://assets2.moncast.com/thumb/ed073321aeae200c.jpeg)"}}></p></li>
              <li><p style={{"backgroundImage":"url(http://assets2.moncast.com/image/0ac19364b6e7057c.jpeg)"}}></p></li>
              <li><p style={{"backgroundImage":"url(http://assets2.moncast.com/image/8ab535fd27d7b6bb.jpeg)"}}></p></li>
              <li><p style={{"backgroundImage":"url(http://assets2.moncast.com/image/0ac19364b6e7057c.jpeg)"}}></p></li>
            </ul>
            <ul>
              <li><p style={{"backgroundImage":"url(http://assets2.moncast.com/image/0ac19364b6e7057c.jpeg)"}}></p></li>
              <li><p style={{"backgroundImage":"url(http://assets2.moncast.com/image/8ab535fd27d7b6bb.jpeg)"}}></p></li>
              <li><p style={{"backgroundImage":"url(http://assets2.moncast.com/image/0ac19364b6e7057c.jpeg)"}}></p></li>
            </ul>
          </div>
          <input type="image" src={btn_prev} alt="이전" id="prev_list" />
          <input type="image" src={btn_next} alt="다음" id="next_list" />
        </div>
        <input type="image" src={btn_pop_close} alt="닫기" className="pop_close" onClick={this.popClose} />
      </div>
    )
  }

  popClose = (e) => {
    $("#contents_detail").animate({'margin-top': '-100%', opacity: 0}, 200)
  }

}
