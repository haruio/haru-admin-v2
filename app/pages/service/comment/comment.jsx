/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Container} from 'flux/utils'
import moment from 'moment'

import debug from 'debug'
const log = debug('application:Comment.jsx')

import AppActions from '../../../actions/AppActions'
import PopupActions from '../../../actions/PopupActions'
import PageList from '../../../components/PageList'

import CommentsStore from '../../../stores/CommentsStore'
import PaginationStore from '../../../stores/PaginationStore'

import intlStores from '../../../utils/IntlStore'
import util from '../../../utils/util'
import {POPUP} from '../../../constants/AppConstants'

const defaultImage = require('image!../../../assets/img/default.png')

class Comment extends React.Component {
  static getStores() {
    return [CommentsStore, PaginationStore]
  }

  static calculateState() {
    return {
      comments: CommentsStore.getComments(),
      pagination: PaginationStore.getPagination()
    }
  }

  componentDidMount() {
    this.requetsCommentList({pageNo: 1})
  }

  // TODO : 꼭 변경하자. this.state 에 값을 넣고 있음.
  requetsCommentList = (searchObj) => {
    const searchObject = $.extend({
      searchStartDate: '',
      searchEndDate: '',
      searchField: '',
      searchText: ''
    }, searchObj)
    AppActions.getCommentList(searchObject)
  }

  /***
   * Move Page
   * @param page {number} - 이동할 페이지
   */
  movePage = (pageNo) => {
    this.requetsCommentList({userId: '', pageNo: pageNo})
  }

  /***
   * Search Content
   * searchField : Author, BODY
   * searchText {String} - 검색할 단어
   */
  searchContents = () => {
    this.requetsCommentList({
      searchField: this.refs.searchField.value,
      searchText: this.refs.searchText.value
    })
  }

  /***
   * 전체 체크 / 해지 하는 이벤트 핸들러
   * @param event {MouseEvent} - mouse event object
     */
  _checkAllHandler(event) {
    $('tbody input:checkbox').attr('checked', $(event.target).is(':checked'))
  }

  onPopupUserProfile(userId) {
    PopupActions.openPopup(POPUP.MEMBER, userId)
  }

  /***
   * 검색시에 엔터키를 누르면 searchContent 함수를 호출
   * @param e
   * @private
     */
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.searchContents()
    }
  }

  get getCommentList() {
    return this.state.comments.map((comment) => {
      return (<tr key={comment.get('commentSeq')}>
        <td><input type="checkbox" value={comment.get('commentSeq')} onClick={this.checkBoxHandler}/></td>
        <td onClick={this.onPopupUserProfile.bind(null, {userId:comment.get('userId'), tab:2})}><img src={comment.get('postThumbnailUrl') || ''} onError={(e) => {e.target.src = defaultImage}} className="thumbnail"/></td>
        <td onClick={this.onPopupUserProfile.bind(null, {userId:comment.get('userId'), tab:2})} className="al">{comment.get('postTitle')}</td>
        <td onClick={this.onPopupUserProfile.bind(null, {userId:comment.get('userId'), tab:2})} className="al">{comment.get('commentTxt')}</td>
        <td onClick={this.onPopupUserProfile.bind(null, {userId:comment.get('userId'), tab:2})}>{comment.get('commentAuthor')}</td>
        <td onClick={this.onPopupUserProfile.bind(null, {userId:comment.get('userId'), tab:2})}>{moment(comment.createDt).format('YYYY-MM-DD')}</td>
      </tr>)
    })
  }

  render() {
    return (
      <article>
        <hgroup>
          <h2>{intlStores.get('sm.MENU_TXT_COMMENT_MGMT')}</h2>
          <fieldset id="search_box">
            <p>
              <label>{intlStores.get('common.COMMON_FLD_SEARCH_ITEM')}</label>
              <select id="searchField" ref="searchField">
                <option value="BODY">댓글내용</option>
                <option value="AUTHOR">닉네임</option>
              </select>
            </p>
            <input type="text" placeholder="Search" ref="searchText" id="searchText" onKeyPress={this._handleKeyPress}/><a onClick={this.searchContents}
                                                                                         className="btn_search"></a>
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
                <th><input type="checkbox" id="checkAll" value="-1" onClick={this._checkAllHandler}/></th>
                <th>{intlStores.get('sm.SM_FLD_THUMBNAIL')}</th>
                <th>POST {intlStores.get('sm.SM_FLD_TITLE')}</th>
                <th>{intlStores.get('sm.SM_FLD_REPLY')}</th>
                <th>{intlStores.get('sm.SM_FLD_USERNAME')}</th>
                <th>{intlStores.get('sm.SM_FLD_DATE')}</th>
              </tr>
              </thead>
              <tbody>
              {this.getCommentList}
              </tbody>
            </table>
          </div>
          <PageList pageObj={this.state.pagination} clickAction={this.movePage}/>
          <p className="btn_r">
            <a onClick={this.deleteComment} className="purple btn_w140">선택된 댓글 {intlStores.get('common.COMMON_BTN_DELETE')}</a>
          </p>
        </div>
      </article>
    )
  }
}

const CommentContainer = Container.create(Comment)
export default CommentContainer
