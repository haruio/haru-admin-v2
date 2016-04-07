/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Container} from 'flux/utils'
import moment from 'moment'

import debug from 'debug'
const log = debug('application:ReportPost.jsx')

import PageList from '../../../components/PageList'
import intlStores from '../../../utils/IntlStore'

import PaginationStore from '../../../stores/PaginationStore'
import ReportPostsStore from '../../../stores/ReportPostsStore'
import AppActions from '../../../actions/AppActions'

class ReportPost extends React.Component {
  static getStores() {
    return [ReportPostsStore, PaginationStore]
  }

  static calculateState() {
    return {
      posts: ReportPostsStore.getReportPosts(),
      pagination: PaginationStore.getPagination()
    }
  }


  componentDidMount() {
    //TODO
    AppActions.getReportPostList({})

  }

  render() {
    log(this.state.posts.toJS())
    return (
      <article>
        <hgroup>
          <h2>컨텐츠 신고관리</h2>
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
          <p className="table_info">{intlStores.get('common.COMMON_FLD_TOTAL')+' '+this.state.pagination.get('totalCount')+' '+intlStores.get('common.COMMON_FLD_COUNT')}</p>
          <div className="table_wrap">
            <table className="listTable">
              <colgroup><col width="6%" /><col width="4%" /><col width="18%" /><col width="18%" /><col width="*" /><col width="10%" /><col width="14%" /></colgroup>
              <thead>
              <tr>
                <th><input type="checkbox" id="checkAll" value="-1" ref="checkAll" onClick={this.toggleCheckBox} /></th>
                <th>No</th>
                <th>포스트 섬네일</th>
                <th>포스트 이름</th>
                <th>신고 이유</th>
                <th>신고 상태</th>
                <th>신고 날짜</th>
              </tr>
              </thead>
              <tbody>
                {this.renderContent}
              </tbody>
            </table>
          </div>
          <PageList pageObj={this.state.pagination} clickAction={this.movePage} />
          <p className="btn_r">
            <a  className="purple">삭제하기</a>
          </p>
        </div>
      </article>
    )
  }

  get renderContent() {
    if (this.state.posts.size == 0) {
      return ( <tr>
        <td colSpan="7">{intlStores.get('sm.SM_MSG_NO_CONTENTS')}</td>
      </tr>)
    }

    return this.state.posts.map((post, i) => {
      return (
        <tr key={i}>
          <td><input type="checkbox" name="postBox"/></td>
          <td>{post.get('reportSeq')}</td>
          <td><img src={post.getIn(['post', 'thumbnailUrl'], '')} onError={this.onImageError} width="140px" className="thumbnailUrl" alt="userProfile"/></td>
          <td>{post.getIn(['post', 'postTitle'], '')}</td>
          <td>{post.get('reportReason')}</td>
          <td>{post.get('reportStsCd')}</td>
          <td>{moment(post.get('createDt')).format('YYYY-MM-DD')}</td>
        </tr>
      )
    })
  }

  /***
   * Move Page
   * @param page {number} - 이동할 페이지
   */
  movePage(pageNo) {
    //TODO
    AppActions.getReportPostList({pageNo: pageNo})
  }

  searchContents() {
    //TODO
  }


  toggleCheckBox = () => {
    $("input[name='postBox']").prop('checked', $(this.refs.checkAll).prop('checked'))
  }
}
const ReportPostContainer = Container.create(ReportPost)
export default ReportPostContainer
