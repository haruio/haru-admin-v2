/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Container} from 'flux/utils'
import {Link} from 'react-router'

import debug from 'debug'
const log = debug('application:BannerEdit.jsx')

import ImageUploader from '../../../components/ImageUploader'
import {POPUP} from '../../../constants/AppConstants'
import AppActions from '../../../actions/AppActions'
import PopupActions from '../../../actions/PopupActions'
import BannerDetailStore from '../../../stores/BannerDetailStore'

const edit1 = require('image!../../../assets/img/ct_edit1.png')
const icon_plus = require('image!../../../assets/img/icon_plus.png')

class BannerEdit extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static getStores() {
    return [BannerDetailStore]
  }

  static calculateState() {
    return {
      banner: BannerDetailStore.getBanner()
    }
  }

  componentWillMount() {
    // param이 있고 postdetail이 없는 경우 서버에 요청함
    if (this.props.params.id !== undefined) {
      AppActions.getBanner(this.props.params.id)
    } else {
      setTimeout(() => {
        AppActions.clearBanner()
      })
    }
  }

  /***
   * Event Handlers
   */
  SeachPublishedPost() {
    PopupActions.openPopup(POPUP.PUBLISHEDCONTENT, {view: 'banner', title: '추천 컨텐츠 검색'})
  }

  /***
   * Recommend Post Render
   */
  get RecommendPost() {
    // new 상태일때
    if ((this.props.params.id == undefined && this.state.banner.size === 0)
      || this.state.banner.get('post') == undefined) {
      return (
        <ul className="list">
          <li ref="item" onMouseOver={this.movseOver} onMouseOut={this.mouseOut}>
            <div id="recommend_empty" onClick={this.SeachPublishedPost}>
              <img src={icon_plus}/>
            </div>
          </li>
        </ul>)
    } else {
      const banner = this.state.banner
      // TODO : channel 이 여러개일땐 어떻게 하지?
      return (
        <ul className="list">
          <li ref="item" onMouseOver={this.movseOver} onMouseOut={this.mouseOut}>
            <div>
              <span><img src={banner.getIn(['post', 'channel', 'iconImageUrl'], '')} alt="channel icon"/></span>
              <b><span>{banner.getIn(['post', 'channel', 'name'], '')}</span></b>
              <em style={{ backgroundImage:'url('+ banner.getIn(['post','thumbnailUrl'], '') +')' }}></em>
              <p>
                <span><a onClick={this.SeachPublishedPost}><img src={edit1} alt="" title="수정"/></a></span>
              </p>
            </div>
            <dl>
              <dt>{banner.getIn(['post', 'postTitle'], '')}</dt>
            </dl>
          </li>
        </ul>)
    }
  }

  render() {
    const banner = this.state.banner
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
                <th>PC Image</th>
                <ImageUploader id="imgLargeUrl" type="BANNER" value={banner} ref="imgLargeUrl"/>
              </tr>
              <tr>
                <th>Mobile Image</th>
                <ImageUploader id="imgSmallUrl" type="BANNER" value={banner} ref="imgSmallUrl"/>
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
                  {this.RecommendPost}
                </td>
              </tr>
              <tr>
                <th>노출 시작</th>
                <td>
                  <input type="text" placeholder="2015-08-08" className="txt t3"/>
                  <a href="" className="btn_calendar"></a>
                  <select style={{width:'70px'}}>

                    <option>12시</option>
                  </select>
                  <select style={{width:'70px'}}>

                    <option>00분</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th>노출 종료</th>
                <td>
                  <input type="text" placeholder="2015-08-08" className="txt t3"/>
                  <a href="" className="btn_calendar"></a>
                  <select style={{width:'70px'}}>
                    <option>12시</option>
                  </select>
                  <select style={{width:'70px'}}>
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
const BannerEditContainer = Container.create(BannerEdit)
export default BannerEditContainer
