/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Container} from 'flux/utils'
import moment from 'moment'

import debug from 'debug'
const log = debug('application:ReportComment.jsx')

import PageList from '../../../components/PageList'
import intlStores from '../../../utils/IntlStore'

import PaginationStore from '../../../stores/PaginationStore'
import ReportCommentsStore from '../../../stores/ReportCommentsStore'

class ReportComment extends React.Component {
  static getStores() {
    return [ReportCommentsStore, PaginationStore]
  }

  static calculateState() {
    return {
      comments: ReportCommentsStore.getReportComments(),
      pagination: PaginationStore.getPagination()
    }
  }


  componentDidMount() {
    //TODO
  }

  /***
   * Move Page
   * @param page {number} - 이동할 페이지
   */
  movePage(page) {
    //TODO
  }

  searchContents() {
    //TODO
  }

  toggleCheckBox = () => {
    $("input[name='postBox']").prop('checked', $(this.refs.checkAll).prop('checked'))
  }

  render() {
    return (
      <article>
        <hgroup>
          <h2>댓글 신고관리</h2>
          <fieldset id="search_box">
            <p>
              <label>{intlStores.get('common.COMMON_FLD_SEARCH_ITEM')}</label>
              <select id="searchField" ref="searchField">
                <option value="TITLE">{intlStores.get('cms.CMS_FLD_TITLE')}</option>
              </select>
            </p>
            <input type="text" placeholder="Search" id="searchText" ref="searchText"/>
            <a onClick={this.searchContents} className="btn_search"></a>
          </fieldset>
        </hgroup>
        <div id="contents">
          <p
            className="table_info">{intlStores.get('common.COMMON_FLD_TOTAL') + ' ' + this.state.pagination.get('totalCount') + ' ' + intlStores.get('common.COMMON_FLD_COUNT')}</p>
          <div className="table_wrap">
            <table className="listTable">
              <colgroup>
                <col width="6%"/>
                <col width="13%"/>
                <col width="27%"/>
                <col width="27%"/>
                <col width="*"/>
                <col width="14%"/>
              </colgroup>
              <thead>
              <tr>
                <th><input type="checkbox" id="checkAll" ref="checkAll" value="-1" onClick={this.toggleCheckBox}/></th>
                <th>{intlStores.get('sm.SM_FLD_THUMBNAIL')}</th>
                <th>{intlStores.get('sm.SM_FLD_TITLE')}</th>
                <th>{intlStores.get('sm.SM_FLD_REPLY')}</th>
                <th>{intlStores.get('sm.SM_FLD_USERNAME')}</th>
                <th>{intlStores.get('sm.SM_FLD_DATE')}</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td colSpan="7">{intlStores.get('sm.SM_MSG_NO_CONTENTS')}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <PageList pageObj={this.state.pagination} clickAction={this.movePage}/>
          <p className="btn_r">
            <a className="purple">삭제하기</a>
          </p>
        </div>
      </article>
    )
  }
}
//        <UserProfilePopup ref="userProfile" userId={this.state.userId} />
const ReportCommentContainer = Container.create(ReportComment)
export default ReportCommentContainer
