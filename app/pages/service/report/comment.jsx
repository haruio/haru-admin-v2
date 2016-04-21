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
import AppActions from '../../../actions/AppActions'
import Alert from 'react-s-alert'


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
    AppActions.getReportCommentList({})
  }

  render() {
    log(this.state.comments.toJS())
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
          <p className="table_info">{intlStores.get('common.COMMON_FLD_TOTAL') + ' ' + this.state.pagination.get('totalCount') + ' ' + intlStores.get('common.COMMON_FLD_COUNT')}</p>
          <div className="table_wrap">
            <table className="listTable">
              <colgroup><col width="6%" /><col width="3%" /><col width="20%" /><col width="25%" /><col width="*" /><col width="8%" /><col width="10%" /></colgroup>
              <thead>
              <tr>
                <th><input type="checkbox" id="checkAll" ref="checkAll" value="-1" onClick={this.toggleCheckBox}/></th>
                <th>No</th>
                <th>포스트 섬네일</th>
                <th>댓글 내용</th>
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
          <PageList pageObj={this.state.pagination} clickAction={this.movePage}/>
          <p className="btn_r">
            <a onClick={this.onHandleBlind} className="blue">블라인드</a>
            <a onClick={this.onHandleDelete} className="purple">삭제하기</a>
          </p>
        </div>
      </article>
    )
  }

  get renderContent() {
    if (this.state.comments.size == 0) {
      return ( <tr>
        <td colSpan="7">{intlStores.get('sm.SM_MSG_NO_CONTENTS')}</td>
      </tr>)
    }

    return this.state.comments.map((comment, i) => {
      let commenttxt = null
      if(comment.get('commentStsCd') === 'B') {
        commenttxt = <p title={comment.get('reportReason')}>신고되어 블라인드 처리된 댓글입니다</p>
      } else {
        commenttxt = comment.get('reportReason')
      }

      let reportStsCd = ''
      switch(comment.get('reportStsCd')) {
        case 'QUE':
          reportStsCd = '대기'
          break
        case 'REG':
          reportStsCd = '처리완료'
          break
      }

      return (
        <tr key={i}>
          <td><input type="checkbox" name="postBox" value={comment.get('reportSeq')}/></td>
          <td>{comment.get('reportSeq')}</td>
          <td><img src={comment.getIn(['post', 'thumbnailUrl'], '')} onError={this.onImageError} width="140px" className="thumbnailUrl" alt="userProfile"/></td>
          <td>{commenttxt}</td>
          <td>{comment.get('reportReason')}</td>
          <td>{reportStsCd}</td>
          <td>{moment(comment.get('createDt')).format('YYYY-MM-DD')}</td>
        </tr>
      )
    })
  }

  onHandleBlind() {
    let checkedList = []
    $("input[name='postBox']:checked").each(function () {
      checkedList.push($(this).val())
    })

    if (checkedList.length > 0 && window.confirm('블라인드 처리 하시겠습니까?')) {
      checkedList.forEach((value) => {
        AppActions.blindReportComment(value)
      })
      $("input[name='postBox']").prop('checked', false)
      Alert.success('블라인드 처리 되었습니다.', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
    }
  }

  onHandleDelete() {
    let checkedList = []
    $("input[name='postBox']:checked").each(function () {
      checkedList.push($(this).val())
    })

    if (checkedList.length > 0 && window.confirm(intlStores.get('common.COMMON_MSG_DEL'))) {
      checkedList.forEach((value) => {
        AppActions.deleteReportComment(value)
      })
      $("input[name='postBox']").prop('checked', false)

      Alert.success('삭제되었습니다', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
    }
  }

  /***
   * Move Page
   * @param page {number} - 이동할 페이지
   */
  movePage(pageNo) {
    AppActions.getReportCommentList({pageNo: pageNo})
  }

  searchContents() {
    //TODO
  }

  toggleCheckBox = () => {
    $("input[name='postBox']").prop('checked', $(this.refs.checkAll).prop('checked'))
  }
}
const ReportCommentContainer = Container.create(ReportComment)
export default ReportCommentContainer
