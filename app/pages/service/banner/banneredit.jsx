/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import { Link } from 'react-router'

import debug from 'debug'
const log = debug('application:BannerEdit.jsx')

import LeftMenu from '../../../components/Layout/LeftMenu'

export default class BannerEdit extends React.Component {
  constructor(props) {
    super(props)

  }


  render() {
    return (
        <article>
          <hgroup>
            <h2>배너 관리</h2>
          </hgroup>
          <div id="contents">
            <div id="service_add">
              <table className="writeTable">
                <colgroup>
                  <col width="154px"/>
                  <col width="*"/>
                </colgroup>
                <tbody>
                <tr>
                  <th>PC</th>
                  <td>
                    <input type="text" className="txt t6" id="filen1"/>
                    <span className="btn_file">Choose file<input type="file" onchange="javascript: document.getElementById('filen2').value = this.value"/></span>
                    <a href="#" className="btn_preview"></a>
                  </td>
                </tr>
                <tr>
                  <th>Mobile</th>
                  <td>
                    <input type="text" className="txt t6" id="filen2"/>
                    <span className="btn_file">Choose file<input type="file" onchange="javascript: document.getElementById('filen2').value = this.value"/></span>
                    <a href="#" className="btn_preview"></a>
                  </td>
                </tr>
                <tr>
                  <th>노출 플랫폼</th>
                  <td>
                    <p className="input_margin">
                      <input type="radio" id="publish1" name="publish" defaultChecked/> <label htmlFor="publish1">Android</label>
                      <input type="radio" id="publish2" name="publish"/> <label htmlFor="publish2">iOS</label>
                      <input type="radio" id="publish3" name="publish"/> <label htmlFor="publish3">PC</label>
                      <input type="radio" id="publish4" name="publish"/> <label htmlFor="publish4">Mobile</label>
                      <input type="radio" id="publish5" name="publish"/> <label htmlFor="publish5">All</label>
                    </p>
                  </td>
                </tr>
                <tr>
                  <th>배너 타입</th>
                  <td>
                    <p className="input_margin">
                      <input type="radio" id="bannertype1" name="bannertype" defaultChecked/>
                      <label htmlFor="bannertype1">Link</label>
                      <input type="radio" id="bannertype2" name="bannertype"/>
                      <label htmlFor="bannertype2">Link_internal</label>
                      <input type="radio" id="bannertype3" name="bannertype"/>
                      <label htmlFor="bannertype3">Post</label>
                      <input type="radio" id="bannertype4" name="bannertype"/>
                      <label htmlFor="bannertype4">Channel</label>
                      <input type="radio" id="bannertype5" name="bannertype"/>
                      <label htmlFor="bannertype5">Category</label>
                    </p>
                  </td>
                </tr>
                <tr>
                  <th>연결될 컨텐츠</th>
                  <td>
                    <input type="text" className="txt t6" id="filen3"/><span className="btn_file">Choose Contents
                    <input type="file" onchange="javascript: document.getElementById('filen2').value = this.value"/></span>
                  </td>
                </tr>
                <tr>
                  <th>노출 시작</th>
                  <td>
                    <input type="text" placeholder="2015-08-08" className="txt t3"/>
                    <a href="" className="btn_calendar"></a>
                    <select style={{"width":"70px"}}>
                      <option>12시</option>
                    </select>
                    <select style={{"width":"70px"}}>
                      <option>00분</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>노출 종료</th>
                  <td>
                    <input type="text" placeholder="2015-08-08" className="txt t3"/>
                    <a href="" className="btn_calendar"></a>
                    <select style={{"width":"70px"}}>
                      <option>12시</option>
                    </select>
                    <select style={{"width":"70px"}}>
                      <option>00분</option>
                    </select>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <p className="btn_r btnbox_w960">
              <a href="" className="purple">등록하기</a>&nbsp;
              <Link to="/service/banner" className="gray">취소하기</Link>
            </p>
          </div>
        </article>
    )
  }
}
