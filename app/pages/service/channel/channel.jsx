/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Link} from 'react-router'
import debug from 'debug'
const log = debug('application:mycontent.jsx')

import LeftMenu from '../../../components/Layout/LeftMenu'

const ct_edit1 = require("image!../../../assets/img/ct_edit1.png")
const ct_edit2 = require("image!../../../assets/img/ct_edit2.png")


export default class Channel extends React.Component {
  constructor(props) {
    super(props)


  }

  componentDidMount() {
    log($("#channel_list"))
    $('#channel_list').sortable({})
  }

  render() {
    return (
      <article>
        <hgroup>
          <h2>채널 관리</h2>
        </hgroup>
        <div id="service_head">
          <ul>
            <li className="icon_add"><Link to="/service/mgmt/channel/new">추가</Link></li>
            <li className="icon_apply"><a href="#">순서적용</a></li>
          </ul>
        </div>
        <div id="service_contents">
          <ul className="hover_effect" id="channel_list">
            <li className="ico_lock"
                style={{"backgroundImage":"url(http://assets2.moncast.com/channel/ef08a2c785f4ad52.jpeg)"}}>
              <div className="service_title2">
                <span className="icon_channel"
                      style={{"backgroundImage":"url(http://assets2.moncast.com/channel/062918fa1fb42951.jpeg)"}}></span>
                <em>세상에서 가장 웃긴 동영상세상에서 가장 웃긴 동영상</em>
              </div>
              <div className="e_bg">
                <a href=""><img src={ct_edit1} alt="" title="수정"/></a>
                <a href=""><img src={ct_edit2} alt="" title="삭제"/></a>
              </div>
            </li>
            <li className="ico_lock ico_unlock"
                style={{"backgroundImage":"url(http://assets2.moncast.com/channel/b7a97ab368aa7c85.jpeg)"}}>
              <div className="service_title2">
                <span className="icon_channel"
                      style={{"backgroundImage":"url(http://assets2.moncast.com/channel/36130b6ece5fd3c0.jpeg)"}}></span>
                <em>세상에서 가장 웃긴 동영상</em>
              </div>
              <div className="e_bg">
                <a href=""><img src={ct_edit1} alt="" title="수정"/></a>
                <a href=""><img src={ct_edit2} alt="" title="삭제"/></a>
              </div>
            </li>
            <li className="ico_lock"
                style={{"backgroundImage":"url(http://assets2.moncast.com/channel/ef08a2c785f4ad52.jpeg)"}}>
              <div className="service_title2">
                <span className="icon_channel"
                      style={{"backgroundImage":"url(http://assets2.moncast.com/channel/062918fa1fb42951.jpeg)"}}></span>
                <em>세상에서 가장 웃긴 동영상</em>
              </div>
              <div className="e_bg">
                <a href=""><img src={ct_edit1} alt="" title="수정"/></a>
                <a href=""><img src={ct_edit2} alt="" title="삭제"/></a>
              </div>
            </li>
            <li className="ico_lock ico_unlock"
                style={{"backgroundImage":"url(http://assets2.moncast.com/channel/b7a97ab368aa7c85.jpeg)"}}>
              <div className="service_title2">
                <span className="icon_channel"
                      style={{"backgroundImage":"url(http://assets2.moncast.com/channel/36130b6ece5fd3c0.jpeg)"}}></span>
                <em>세상에서 가장 웃긴 동영상</em>
              </div>
              <div className="e_bg">
                <a href=""><img src={ct_edit1} alt="" title="수정"/></a>
                <a href=""><img src={ct_edit2} alt="" title="삭제"/></a>
              </div>
            </li>
            <li className="ico_lock"
                style={{"backgroundImage":"url(http://assets2.moncast.com/channel/ef08a2c785f4ad52.jpeg)"}}>
              <div className="service_title2">
                <span className="icon_channel"
                      style={{"backgroundImage":"url(http://assets2.moncast.com/channel/062918fa1fb42951.jpeg)"}}></span>
                <em>세상에서 가장 웃긴 동영상</em>
              </div>
              <div className="e_bg">
                <a href=""><img src={ct_edit1} alt="" title="수정"/></a>
                <a href=""><img src={ct_edit2} alt="" title="삭제"/></a>
              </div>
            </li>
            <li className="ico_lock ico_unlock"
                style={{"backgroundImage":"url(http://assets2.moncast.com/channel/b7a97ab368aa7c85.jpeg)"}}>
              <div className="service_title2">
                <span className="icon_channel"
                      style={{"backgroundImage":"url(http://assets2.moncast.com/channel/36130b6ece5fd3c0.jpeg)"}}></span>
                <em>세상에서 가장 웃긴 동영상</em>
              </div>
              <div className="e_bg">
                <a href=""><img src={ct_edit1} alt="" title="수정"/></a>
                <a href=""><img src={ct_edit2} alt="" title="삭제"/></a>
              </div>
            </li>
          </ul>
        </div>
      </article>
    )
  }
}
