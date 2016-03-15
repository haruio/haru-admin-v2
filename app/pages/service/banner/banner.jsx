/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import { Link } from 'react-router'

import debug from 'debug'
const log = debug('application:BannerList.jsx')

import intlStores from'../../../stores/IntlStore'

const btn_prev2 = require('image!../../../assets/img/btn_prev2.png')
const btn_next2 = require('image!../../../assets/img/btn_next2.png')
const bg_calendar = require('image!../../../assets/img/bg_calendar.png')


export default class BannerList extends React.Component {
  constructor(props) {
    super(props)

  }

  get TableHeader() {
    return (
      <thead>
      <tr>
        <th></th>
        <th>am 12:00</th>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
        <th>6</th>
        <th>7</th>
        <th>8</th>
        <th>9</th>
        <th>10</th>
        <th>11</th>
        <th>pm 12:00</th>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
        <th>6</th>
        <th>7</th>
        <th>8</th>
        <th>9</th>
        <th>10</th>
        <th>11</th>
      </tr>
      </thead>
    )
  }

  render() {
    return (
        <article>
          <hgroup>
            <h2>배너 관리</h2>
          </hgroup>
          <div id="contents">
            <ul id="tab_btns">
              <li><button className="on">Android</button></li>
              <li><button>IOS</button></li>
              <li><button>PC Web</button></li>
              <li><button>Mobile Web</button></li>
            </ul>
            <div id="calendar_head">
              <time>2015-09-04(금)</time>
              <input type="image" src={btn_prev2} alt="prev" className="prev" />
              <input type="image" src={btn_next2} alt="next" className="next" />
              <a href=""><img src={bg_calendar} alt="달력" /></a>
            </div>
            <div id="calendar_area">
              <table>
                <colgroup><col width="130px" /><col width="*" /></colgroup>
                {this.TableHeader}
                <tbody>
                <tr className="bn1">
                  <th>banner 01</th>
                  <td className="bg"><p style={{width:'2400%'}}>24시간(1시간 100% / 5분 8.33% / 15분 25% / 30분 50% / 45분 75%)</p></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="bg"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr className="bn2">
                  <th>banner 02</th>
                  <td className="bg"><p style={{ width:'250%' }}>2시간30분</p></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="bg"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr className="bn3">
                  <th>banner 03</th>
                  <td className="bg"><p style={{ width:'525%',marginLeft:'25%' }}>5시간15분(시작 15분)</p></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="bg"><p style={{ width:'200%' }}></p></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr className="bn4">
                  <th>banner 04</th>
                  <td className="bg"><p style={{ width:'1050%',marginLeft:'50%' }}>10시간30분(시작 30분)</p></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="bg"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr className="bn5">
                  <th>banner 05</th>
                  <td className="bg"><p style={{ width:'375%',marginLeft:'75%' }}>3시간45분(시작 45분)</p></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><p style={{ width:'1500%'}}></p></td>
                  <td></td>
                  <td></td>
                  <td className="bg"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr className="bn0">
                  <th>default banner</th>
                  <td className="bg"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><p style={{ width:'200%'}}></p></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="bg"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                </tbody>
              </table>
            </div>
            <div className="table_wrap">
              <table className="listTable">
                <colgroup><col width="5%" /><col width="11%" /><col width="*" /><col width="13%" /><col width="12%" /><col width="17%" /><col width="17%" /></colgroup>
                <thead>
                <tr>
                  <th><input type="checkbox" /></th>
                  <th>순서</th>
                  <th>배너</th>
                  <th>타입</th>
                  <th>노출 플랫폼</th>
                  <th>노출 시작</th>
                  <th>노출 종료</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td className="bn1">banner 01</td>
                  <td><img className="thumbnail" src="http://assets2.moncast.com/thumb/4ada80b7b068013a.jpeg" alt="" /></td>
                  <td>Link_internal</td>
                  <td>Android</td>
                  <td>2011-08-12 pm 4:00</td>
                  <td>2011-08-12 pm 4:00</td>
                </tr>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td className="bn2">banner 02</td>
                  <td><img className="thumbnail" src="http://assets2.moncast.com/thumb/4ada80b7b068013a.jpeg" alt="" /></td>
                  <td>Link_internal</td>
                  <td>Android</td>
                  <td>2011-08-12 pm 4:00</td>
                  <td>2011-08-12 pm 4:00</td>
                </tr>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td className="bn3">banner 03</td>
                  <td><img className="thumbnail" src="http://assets2.moncast.com/thumb/4ada80b7b068013a.jpeg" alt="" /></td>
                  <td>Link_internal</td>
                  <td>Android</td>
                  <td>2011-08-12 pm 4:00</td>
                  <td>2011-08-12 pm 4:00</td>
                </tr>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td className="bn4">banner 04</td>
                  <td><img className="thumbnail" src="http://assets2.moncast.com/thumb/4ada80b7b068013a.jpeg" alt="" /></td>
                  <td>Link_internal</td>
                  <td>Android</td>
                  <td>2011-08-12 pm 4:00</td>
                  <td>2011-08-12 pm 4:00</td>
                </tr>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td className="bn5">banner 05</td>
                  <td><img className="thumbnail" src="http://assets2.moncast.com/thumb/4ada80b7b068013a.jpeg" alt="" /></td>
                  <td>Link_internal</td>
                  <td>Android</td>
                  <td>2011-08-12 pm 4:00</td>
                  <td>2011-08-12 pm 4:00</td>
                </tr>
                <tr>
                  <td><input type="checkbox" /></td>
                  <td className="bn0">default banner</td>
                  <td><img className="thumbnail" src="http://assets2.moncast.com/thumb/4ada80b7b068013a.jpeg" alt="" /></td>
                  <td>Link_internal</td>
                  <td>Android</td>
                  <td>2011-08-12 pm 4:00</td>
                  <td>2011-08-12 pm 4:00</td>
                </tr>
                </tbody>
              </table>
            </div>
            <p className="btn_r">
              <Link to="/service/mgmt/banner/new" className="purple btn_w140">{intlStores.get('common.COMMON_BTN_REGISTER')}</Link>&nbsp;
              <a href="">{intlStores.get('common.COMMON_BTN_DELETE')}</a>
            </p>
          </div>
        </article>
      )
    }
  }
