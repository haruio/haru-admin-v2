/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Container} from 'flux/utils'
import moment from 'moment'

import debug from 'debug'
const log = debug('application:Comment.jsx')

import AppActions from '../../../actions/AppActions'
import PageList from '../../../components/PageList'
import CommentsStore from '../../../stores/CommentsStore'
import PaginationStore from '../../../stores/PaginationStore'
import intlStores from '../../../utils/IntlStore'

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
    this.state.searchObj = (searchObj != null) ? $.extend(this.state.searchObj, searchObj) : {
      searchStartDate: '',
      searchEndDate: '',
      searchField: '',
      searchText: ''
    }
    AppActions.getCommentList(this.state.searchObj)
  }

  /***
   * Move Page
   * @param page {number} - 이동할 페이지
   */
  movePage = (pageNo) => {
    this.requetsCommentList({userId: '', pageNo: pageNo})
  }

  searchContents = () => {
    this.requetsCommentList({
      searchField: this.refs.searchField.value,
      searchText: this.refs.searchText.value
    })
  }

  checkAllHandler() {
    $('tbody input:checkbox').attr('checked', $(event.target).is(':checked'))
  }

  openPost(shortUrl) {
    window.open('http://kr.dingo.tv/' + shortUrl, '_blank')
  }

  onPopupUserProfile(userId) {
    /*
     if(userId != null) {
     this.refs['userProfile'].readUserProfile({userId:userId})
     $('#user_info').toggleClass('hide');
     }*/
  }

  onImageError(e) {
    e.target.src = defaultImage
  }

  get getCommentList() {
    log(this.state.comments)
    return this.state.comments.map((comment, i) => {
      return (<tr key={i}>
        <td><input type="checkbox" value={comment.get('commentSeq')} onClick={this.checkBoxHandler}/></td>
        <td><img src={comment.get('postThumbnailUrl') || ''} onError={this.onImageError} className="thumbnail"/></td>
        <td className="al"><a
          onClick={this.openPost.bind(null, comment.get('postShortUrl'))}>{comment.get('postTitle')}</a></td>
        <td className="al">{comment.get('commentTxt')} </td>
        <td>
          <a onClick={this.onPopupUserProfile.bind(null, comment.userId)}>{comment.get('commentAuthor')}</a>
        </td>
        <td>{moment(comment.createDt).format('YYYY-MM-DD')}</td>
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
                <option value="TITLE">{intlStores.get('cms.CMS_FLD_TITLE')}</option>
                <option value="BODY">댓글내용</option>
              </select>
            </p>
            <input type="text" placeholder="Search" ref="searchText" id="searchText"/><a onClick={this.searchContents}
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
                <th><input type="checkbox" id="checkAll" value="-1" onClick={this.checkAllHandler}/></th>
                <th>{intlStores.get('sm.SM_FLD_THUMBNAIL')}</th>
                <th>{intlStores.get('sm.SM_FLD_TITLE')}</th>
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
            <a onClick={this.deleteComment} className="purple">{intlStores.get('common.COMMON_BTN_DELETE')}</a>
          </p>
        </div>
      </article>
    )
  }
}
//        <UserProfilePopup ref="userProfile" userId={this.state.userId} />

const CommentContainer = Container.create(Comment)
export default CommentContainer
