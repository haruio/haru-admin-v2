/**
 * Created by jungenpark on 3/22/16.
 */
import React from 'react'
import {Container} from 'flux/utils'
import moment from 'moment'

import debug from 'debug'
const log = debug('application:PublishedContentPopup.jsx')

import PageList from '../../PageList'
import PopupPageinationStore from '../../../stores/PopupPaginationStore'
import PublishedListStore from '../../../stores/PublishedListStore'
import ContentActions from '../../../actions/ContentActions'
import AppActions from '../../../actions/AppActions'
import intlStores from '../../../utils/IntlStore'


class PublishedContentPopup extends React.Component {

  static getStores() {
    return [PublishedListStore, PopupPageinationStore]
  }

  static calculateState() {
    return {
      publish: PublishedListStore.getContentList(),
      pagination: PopupPageinationStore.getPagination()
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
    if(this.props.view == 'banner') {

      AppActions.getBannerPost(PublishedListStore.getContentListById(id))
    } else {
      AppActions.getPostDetail(PublishedListStore.getContentListById(id))
    }
    this.props.close()
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
        <td>{moment(item.get('publishStartDt')).format('YYYY-MM-DD')}<br/>{moment(item.get('publishStartDt')).format('hh:mm')}</td>
        <td><a href="" className="btn_select">선택</a></td>
      </tr>)
    })
  }

  render() {
    return (
      <div className="pop_wrap">
        <div className="pop pop2" id="main_feed_add" onClick={this.clearEvent}>
        <h2>추천 컨텐츠 등록</h2>
        <fieldset id="search_box">
          <input type="text" placeholder="검색어를 입력해주세요." /><a href="" className="btn_search"></a>
        </fieldset>
        <div className="table_wrap">
          <table className="listTable">
            <colgroup><col width="18%" /><col width="*" /><col width="15%" /><col width="15%" /></colgroup>
            <thead>
            <tr>
              <th>{intlStores.get('cms.CMS_FLD_THUMBNAIL')}</th>
              <th>{intlStores.get('cms.CMS_FLD_TITLE')}</th>
              <th>{intlStores.get('common.COMMON_FLD_SUBMITTED_TIME')}</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {this.PublishedList}
            </tbody>
          </table>
        </div>
        <PageList pageObj={this.state.pagination} clickAction={this.movePage} />
        <p className="btn_c">
          <a href="" className="purple">확인</a>
          <a onClick={this.props.close} className="gray">취소</a>
        </p>
      </div>
      </div>
    )
  }
}
const PublishedContentPopupContainer = Container.create(PublishedContentPopup)
export default PublishedContentPopupContainer
