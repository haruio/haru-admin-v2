/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'

import debug from 'debug'
const log = debug('application:MainFeedEdit.jsx')

const ct_edit1 = require('image!../../../assets/img/ct_edit1.png')
const ct_edit2 = require('image!../../../assets/img/ct_edit2.png')

import AppActions from '../../../actions/AppActions'

export default class MainFeedEdit extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    //메인피트 리스트
    $(".main_list>li").hover(function(){
      $(this).find(".modifi").stop().fadeIn(300).stop().animate({opacity:1}, 100);
    }, function(){
      $(this).find(".modifi").stop().fadeOut(300);
    });
  }

  render() {
    return (
      <article>
        <hgroup>
          <h2>메인피드 관리</h2>
        </hgroup>
        <div id="main_feed_modifi">
          <table className="writeTable">
            <colgroup>
              <col width="154px"/>
              <col width="*"/>
            </colgroup>
            <tbody>
            <tr>
              <th>컨텐츠 등록개수</th>
              <td>6개 (1set)</td>
            </tr>
            <tr>
              <th>노출 시간</th>
              <td>
                <input type="text" placeholder="2015-08-08" className="txt t3"/><a href="" className="btn_calendar"></a>
                <select style={{ width:'70px' }}>
                  <option>12시</option>
                </select>
                <select style={{ width:'70px' }}>
                  <option>00분</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Layout 선택</th>
              <td>
                <p className="layout_list">
                  <a href="" className="on"></a>
                  <a href=""></a>
                  <a href=""></a>
                  <a href=""></a>
                  <a href=""></a>
                  <a href=""></a>
                  <a href=""></a>
                  <a href=""></a>
                  <a href=""></a>
                </p>
              </td>
            </tr>
            </tbody>
          </table>
          <ul className="main_list">
            <li className="col2"><a href=""><span className="add">Contents (2×1)</span></a></li>
            <li className="row2 right"><a href=""><span className="add">Contents (1×2)</span></a></li>
            <li><a href=""><span className="add">Contents (1×1)</span></a></li>
            <li><a href=""><span className="add">Contents (1×1)</span></a></li>
          </ul>
          <ul className="main_list">
            <li className="row2">
              <em style={{ backgroundImage:'url(http://assets2.moncast.com/thumb/cdaa3b672428cf45.jpeg)' }}><span
                className="cnt">209</span></em>
					<span className="modifi">
						<a href=""><img src={ct_edit1} alt="" title="수정"/></a>
						<a href=""><img src={ct_edit2} alt="" title="삭제"/></a>
					</span>
            </li>
            <li>
              <em
                style={{ backgroundImage:'url(http://assets2.moncast.com/thumb/4ada80b7b068013a.jpeg)' }}><span>00:40</span></em>
              <p>백주부도 흉내 내지 못할 뒤집기 기술백주부도 흉내 내지 못할 뒤집기 기술백주부도 흉내 내지 못할 뒤집기 기술백주부도 흉내 내지 못할 뒤집기 기술</p>
					<span className="modifi">
						<a href=""><img src={ct_edit1} alt="" title="수정"/></a>
						<a href=""><img src={ct_edit2} alt="" title="삭제"/></a>
					</span>
            </li>
            <li>
              <em style={{ backgroundImage:'url(http://assets2.moncast.com/thumb/1219f9f5cf29b60b.jpeg)' }}><span
                className="cnt">999</span></em>
              <p>백주부도 흉내 내지 못할 뒤집기 기술</p>
					<span className="modifi">
							<a href=""><img src={ct_edit1} alt="" title="수정"/></a>
						<a href=""><img src={ct_edit2} alt="" title="삭제"/></a>
					</span>
            </li>
            <li className="col2">
              <em
                style={{ backgroundImage:'url(http://assets2.moncast.com/thumb/edd0b2692409995a.jpeg)' }}><span>00:40</span></em>
					<span className="modifi">
						<a href=""><img src={ct_edit1} alt="" title="수정"/></a>
						<a href=""><img src={ct_edit2} alt="" title="삭제"/></a>
					</span>
            </li>
          </ul>
          <p className="btn_r">
            <a href="" className="purple">예약하기</a>
            <a href="" className="gray">삭제하기</a>
          </p>
        </div>
      </article>
    )
  }
}
