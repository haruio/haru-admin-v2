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

const icon_c01 = require("image!../../../assets/img/icon_c01.png")
const icon_c02 = require("image!../../../assets/img/icon_c02.png")

export default class Category extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    //TODO : sortable component 제작 필요
    $('#category_list').sortable({});
  }

  render() {
    return (
      <article>
        <hgroup>
          <h2>카테고리 관리</h2>
        </hgroup>
        <div id="service_head">
          <ul>
            <li className="icon_add"><Link to="/service/mgmt/category/new">추가</Link></li>
            <li className="icon_apply"><a href="#">순서적용</a></li>
          </ul>
        </div>
        <div id="service_contents">
          <ul className="hover_effect" id="category_list">
            <li style={{"backgroundImage":"url(http://assets2.moncast.com/category/150527_bg_category_humor.png)"}}>
              <div className="service_title">
                <span className="icon_category" style={{ backgroundImage:'url("+icon_c01+")' }}></span>
                <em>Entertainment</em>
              </div>
              <div className="e_bg">
                <a href=""><img src={ct_edit1} alt="" title="수정"/></a>
                <a href=""><img src={ct_edit2} alt="" title="삭제"/></a>
              </div>
            </li>
            <li style={{"backgroundImage":"url(http://assets2.moncast.com/category/150527_bg_category_entertain.png)"}}>
              <div className="service_title">
                <span className="icon_category" style={{"backgroundImage":"url("+icon_c01+")"}}></span>
                <em>Entertainment</em>
              </div>
              <div className="e_bg">
                <a href=""><img src={ct_edit1} alt="" title="수정"/></a>
                <a href=""><img src={ct_edit2} alt="" title="삭제"/></a>
              </div>
            </li>
            <li style={{"backgroundImage":"url(http://assets2.moncast.com/category/150527_bg_category_humor.png)"}}>
              <div className="service_title">
                <span className="icon_category" style={{"backgroundImage":"url("+icon_c02+")"}}></span>
                <em>Entertainment</em>
              </div>
              <div className="e_bg">
                <a href=""><img src={ct_edit1} alt="" title="수정"/></a>
                <a href=""><img src={ct_edit2} alt="" title="삭제"/></a>
              </div>
            </li>
            <li style={{"backgroundImage":"url(http://assets2.moncast.com/category/150527_bg_category_humor.png)"}}>
              <div className="service_title">
                <span className="icon_category" style={{"backgroundImage":"url("+icon_c02+")"}}></span>
                <em>Entertainment</em>
              </div>
              <div className="e_bg">
                <a href=""><img src={ct_edit1} alt="" title="수정"/></a>
                <a href=""><img src={ct_edit2} alt="" title="삭제"/></a>
              </div>
            </li>
            <li style={{"backgroundImage":"url(http://assets2.moncast.com/category/150527_bg_category_entertain.png)"}}>
              <div className="service_title">
                <span className="icon_category" style={{"backgroundImage":"url("+icon_c01+")"}}></span>
                <em>Entertainment</em>
              </div>
              <div className="e_bg">
                <a href=""><img src={ct_edit1} alt="" title="수정"/></a>
                <a href=""><img src={ct_edit2} alt="" title="삭제"/></a>
              </div>
            </li>
            <li style={{"backgroundImage":"url(http://assets2.moncast.com/category/150527_bg_category_humor.png)"}}>
              <div className="service_title">
                <span className="icon_category" style={{"backgroundImage":"url("+icon_c02+")"}}></span>
                <em>Entertainment</em>
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
