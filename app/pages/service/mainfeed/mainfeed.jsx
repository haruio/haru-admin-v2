/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import { Link } from 'react-router'
import debug from 'debug'
const log = debug('application:MainFeed.jsx')

const btn_prev2 = require('image!../../../assets/img/btn_prev2.png')
const btn_next2 = require('image!../../../assets/img/btn_next2.png')
const btn_add3 = require('image!../../../assets/img/btn_add3.png')

export default class MainFeed extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    //메인피트 리스트
    $(".main_list>li").hover(function() {
      $(this).find('.modifi').stop().fadeIn(300).stop().animate({opacity:1}, 100)
    }, function() {
      $(this).find('.modifi').stop().fadeOut(300)
    })
  }

  render() {
    return (
      <article>
        <hgroup>
          <h2>메인피드 관리</h2>
        </hgroup>
        <div id="main_feed_timeline">
          <fieldset>
            <time>
              <input type="image" src={btn_prev2} alt="이전" />
              <b>2015-09-04 (금)</b>
              <input type="image" src={btn_next2} alt="다음" />
              <a href="" className="btn_calendar"></a>
            </time>
            <Link to="/service/mgmt/mainfeed/new"><img src={btn_add3} alt="추가" /></Link>
          </fieldset>
          <div>
            <time>am 11:00</time>
            <ul className="main_list">
              <li>
                <a href="">
                  <em style={{ backgroundImage:'url(http://assets2.moncast.com/thumb/4ada80b7b068013a.jpeg)' }}><span>00:40</span></em>
                  <p>백주부도 흉내 내지 못할 뒤집기 기술백주부도 흉내 내지 못할 뒤집기 기술백주부도 흉내 내지 못할 뒤집기 기술백주부도 흉내 내지 못할 뒤집기 기술</p>
                </a>
              </li>
              <li>
                <a href="">
                  <em style={{ backgroundImage:'url(http://assets2.moncast.com/thumb/1219f9f5cf29b60b.jpeg)' }}><span className="cnt">999</span></em>
                  <p>백주부도 흉내 내지 못할 뒤집기 기술</p>
                </a>
              </li>
              <li className="row2">
                <a href="">
                  <em style={{ backgroundImage:'url(http://assets2.moncast.com/thumb/cdaa3b672428cf45.jpeg)' }}><span className="cnt">209</span></em>
                </a>
              </li>
              <li>
                <a href="">
                  <em style={{ backgroundImage:'url(http://assets2.moncast.com/thumb/1219f9f5cf29b60b.jpeg)' }}><span className="cnt">40</span></em>
                  <p>백주부도 흉내 내지 못할 뒤집기 기술</p>
                </a>
              </li>
              <li>
                <a href="">
                  <em style={{ backgroundImage:'url(http://assets2.moncast.com/thumb/1219f9f5cf29b60b.jpeg)' }}><span className="cnt">40</span></em>
                  <p>백주부도 흉내 내지 못할 뒤집기 기술</p>
                </a>
              </li>
            </ul>
            <p className="btn_c">
              <a href="" className="purple">수정하기</a>
              <a href="" className="gray">삭제하기</a>
            </p>
          </div>
          <div>
            <time>am 11:00</time>
            <ul className="main_list">
              <li className="col2">
                <a href="">
                  <em style={{ backgroundImage:'url(http://assets2.moncast.com/thumb/edd0b2692409995a.jpeg)' }}><span>00:40</span></em>
                </a>
              </li>
              <li className="row2">
                <a href="">
                  <em style={{ backgroundImage:'url(http://assets2.moncast.com/thumb/cdaa3b672428cf45.jpeg)' }}><span className="cnt">209</span></em>
                </a>
              </li>
              <li>
                <a href="">
                  <em style={{ backgroundImage:'url(http://assets2.moncast.com/thumb/1219f9f5cf29b60b.jpeg)' }}><span className="cnt">40</span></em>
                  <p>백주부도 흉내 내지 못할 뒤집기 기술</p>
                </a>
              </li>
              <li>
                <a href="">
                  <em style={{ backgroundImage:'url(http://assets2.moncast.com/thumb/1219f9f5cf29b60b.jpeg)' }}><span className="cnt">40</span></em>
                  <p>백주부도 흉내 내지 못할 뒤집기 기술</p>
                </a>
              </li>
            </ul>
            <p className="btn_c">
              <a href="" className="purple">수정하기</a>
              <a href="" className="gray">삭제하기</a>
            </p>
          </div>
          <div>
            <time>am 11:00</time>
            <ul className="main_list">
              <li className="col2">
                <a href="">
                  <em style={{ backgroundImage:'url(http://assets2.moncast.com/thumb/edd0b2692409995a.jpeg)' }}><span>00:40</span></em>
                </a>
              </li>
              <li className="row2 right">
                <a href="">
                  <em style={{ backgroundImage:'url(http://assets2.moncast.com/thumb/cdaa3b672428cf45.jpeg)' }}><span className="cnt">209</span></em>
                </a>
              </li>
              <li>
                <a href="">
                  <em style={{ backgroundImage:'url(http://assets2.moncast.com/thumb/1219f9f5cf29b60b.jpeg)' }}><span className="cnt">40</span></em>
                  <p>백주부도 흉내 내지 못할 뒤집기 기술</p>
                </a>
              </li>
              <li>
                <a href="">
                  <em style={{ backgroundImage:'url(http://assets2.moncast.com/thumb/1219f9f5cf29b60b.jpeg)' }}><span className="cnt">40</span></em>
                  <p>백주부도 흉내 내지 못할 뒤집기 기술</p>
                </a>
              </li>
            </ul>
            <p className="btn_c">
              <a href="" className="purple">수정하기</a>
              <a href="" className="gray">삭제하기</a>
            </p>
          </div>
          <div>
            <time>am 11:00</time>
            <ul className="main_list">
              <li className="row2 right">
                <a href="">
                  <em style={{ backgroundImage:'url(http://assets2.moncast.com/thumb/cdaa3b672428cf45.jpeg)' }}><span className="cnt">209</span></em>
                </a>
              </li>
              <li>
                <a href="">
                  <em style={{ backgroundImage:'url(http://assets2.moncast.com/thumb/1219f9f5cf29b60b.jpeg)' }}><span className="cnt">40</span></em>
                  <p>백주부도 흉내 내지 못할 뒤집기 기술</p>
                </a>
              </li>
              <li>
                <a href="">
                  <em style={{ backgroundImage:'url(http://assets2.moncast.com/thumb/1219f9f5cf29b60b.jpeg)' }}><span className="cnt">40</span></em>
                  <p>백주부도 흉내 내지 못할 뒤집기 기술</p>
                </a>
              </li>
              <li className="col2">
                <a href="">
                  <em style={{ backgroundImage:'url(http://assets2.moncast.com/thumb/edd0b2692409995a.jpeg)' }}><span>00:40</span></em>
                </a>
              </li>
            </ul>
            <p className="btn_c">
              <a href="" className="purple">수정하기</a>
              <a href="" className="gray">삭제하기</a>
            </p>
          </div>
        </div>
      </article>
    )
  }
}
