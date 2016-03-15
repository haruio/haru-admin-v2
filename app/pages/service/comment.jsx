/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import moment from 'moment'

import debug from 'debug'
const log = debug('application:Comment.jsx')

import PageList from '../../components/PageList'
import intlStores from '../../stores/IntlStore'


export default class Comment extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      contents : [],
      pagination : {
        startPageNo : 0,
        endPageNo : 0,
        pageNo:0,
        totalCount : 0
      }
    }
  }

  componentDidMount() {

  }

  editRecommendPost(recommendSeq) {

  }

  /***
   * Move Page
   * @param page {number} - 이동할 페이지
   */
  movePage(page) {

  }

  searchContents() {

  }

  render() {


    return (
      <article>
        <hgroup>
          <h2>{intlStores.get("sm.MENU_TXT_COMMENT_MGMT")}</h2>
          <fieldset id="search_box">
            <p>
              <label>{intlStores.get('common.COMMON_FLD_SEARCH_ITEM')}</label>
              <select id="searchField">
                <option value="TITLE">{intlStores.get('cms.CMS_FLD_TITLE')}</option>
              </select>
            </p>
            <input type="text" placeholder="Search" id="searchText" /><a onClick={this.searchContents} className="btn_search"></a>
          </fieldset>
        </hgroup>
        <div id="contents">
          <p className="table_info">{intlStores.get('common.COMMON_FLD_TOTAL')+' '+this.state.pagination.totalCount+' '+intlStores.get('common.COMMON_FLD_COUNT')}</p>
          <div className="table_wrap">
            <table className="listTable">
              <colgroup><col width="6%" /><col width="13%" /><col width="27%" /><col width="27%" /><col width="*" /><col width="14%" /></colgroup>
              <thead>
              <tr>
                <th><input type="checkbox" id="checkAll" value="-1" onClick={this.checkAllHandler} /></th>
                <th>{intlStores.get('sm.SM_FLD_THUMBNAIL')}</th>
                <th>{intlStores.get('sm.SM_FLD_TITLE')}</th>
                <th>{intlStores.get('sm.SM_FLD_REPLY')}</th>
                <th>{intlStores.get('sm.SM_FLD_USERNAME')}</th>
                <th>{intlStores.get('sm.SM_FLD_DATE')}</th>
              </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
          <PageList pageObj={this.state.pagination} clickAction={this.movePage} />
          <p className="btn_r">
            <a onClick={this.deleteComment} className="purple">삭제하기</a>
          </p>
        </div>
      </article>
    )
  }
}
//        <UserProfilePopup ref="userProfile" userId={this.state.userId} />
