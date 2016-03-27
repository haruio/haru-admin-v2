/**
 * Created by jungenpark on 3/22/16.
 */
import React from 'react'
import {Container} from 'flux/utils'
import cn from 'classnames'
import moment from 'moment'

import PageList from '../../PageList'
import PopupPaginationStore from '../../../stores/PopupPaginationStore'
import PublishedListStore from '../../../stores/PublishedListStore'
import ContentActions from '../../../actions/ContentActions'
import AppActions from '../../../actions/AppActions'

import debug from 'debug'
const log = debug('application:MainFeedPopup.jsx')

class MainFeedPopup extends React.Component {

  static getStores() {
    return [PublishedListStore, PopupPaginationStore]
  }

  static calculateState() {
    return {
      publish: PublishedListStore.getContentList(),
      pagination: PopupPaginationStore.getPagination()
    }
  }

  componentWillMount() {
    ContentActions.getPublishContents()
  }


  /***
   * Move Page
   * @param page {number} - 이동할 페이지
   */
  movePage(page) {
    ContentActions.getPublishContents(page)

  }

  selectItem(id) {
    AppActions.getPostDetail(PublishedListStore.getContentListById(id))
    //this.props.close()
  }
  /***
   * 상위 이벤트가 하위에 내려오는 것을 맊는 기능
   * 팝업 밖을 클릭할때 팝업을 닫는 기능이 있는데 팝업을 누를때도 먹을 수 있어서 기능이 내려가지 않도록 stopPropagation함
   * @param e {MoveEvent} - click event clear
   */
  clearEvent(e) {
    e.stopPropagation()
  }

  get PublishedList() {
    return this.state.publish.map((item, i) => {
      return (<tr key={i} onClick={this.selectItem.bind(this, item.get('postSeq'))} style={{cursor:'pointer'}}>
        <td><img src={item.get('thumbnailUrl')} alt="thumbnail" /></td>
        <td className="al">{item.get('postTitle')}</td>
        <td>{item.get('isMain') ? <span className="ico_main">Main</span> : null}</td>
        <td>{item.get('isReserved') ? <span className="ico_reserve">예약</span> : null}</td>
        <td>{moment(item.get('publishStartDt')).format('YYYY-MM-DD')}<br/>{moment(item.get('publishStartDt')).format('hh:mm')}</td>
        <td><a href="" className="btn_select">선택</a></td>
      </tr>)
    })
  }

  get registerThumbnail() {
    return (<table className="writeTable">
      <colgroup><col width="90px" /><col width="*" /></colgroup>
      <tbody>
      <tr>
        <th>썸네일 등록</th>
        <td>
          <input type="text" className="txt w42" id="filen" /><span className="btn_file">Choose file<input type="file" onchange="javascript: document.getElementById('filen').value = this.value" /></span>
          <a href="#" className="btn_preview has"><img src="http://assets2.moncast.com/channel/713f94bf61bb8b8c.jpeg" alt="" /></a>
          <a href="" className="btn_del"></a>
        </td>
      </tr>
      </tbody>
    </table>)
  }
  render() {
    return (
      <div className="pop_wrap">
        <div className="pop pop2" id="main_feed_add" onClick={this.clearEvent}>
          <h2>{this.props.title || '메인피드(컨텐츠) 등록'}<span><a onClick={this.props.close} className="btn_close"></a></span></h2>
          <fieldset id="search_box">
            <input type="text" placeholder="검색어를 입력해주세요." /><a href="" className="btn_search"></a>
          </fieldset>
          <div className="table_wrap">
            <table className="listTable">
              <colgroup><col width="16%" />
                <col width="*" /><col width="6%" /><col width="6%" />
                <col width="16%" /><col width="12%" /></colgroup>
              <thead>
              <tr>
                <th>썸네일</th>
                <th colSpan="3">제목</th>
                <th>발행일시</th>
                <th>선택</th>
              </tr>
              </thead>
              <tbody>
              {this.PublishedList}
              </tbody>
            </table>
          </div>
          <PageList pageObj={this.state.pagination} clickAction={this.movePage} />
          {this.registerThumbnail}
          <p className="btn_c">
            <a href="" className="purple">확인</a>
            <a onClick={this.props.close} className="gray">취소</a>
          </p>
        </div>
      </div>
    )
  }
}
const MainFeedPopupContainer = Container.create(MainFeedPopup)
export default MainFeedPopupContainer
