/**
 * Created by jungenpark on 3/22/16.
 */
import React from 'react'
import {Container} from 'flux/utils'
import moment from 'moment'

import debug from 'debug'
const log = debug('application:UserComment.jsx')

import AppActions from '../../../../actions/AppActions'
import PageList from '../../../../components/PageList'
import util from '../../../../utils/util'
import MemberCommentStore from '../../../../stores/MemberCommentStore'
import PopupPaginationStore from '../../../../stores/PopupPaginationStore'

const icon_delete = require('image!../../../../assets/img/icon_delete.png')
const btn_preview = require('image!../../../../assets/img/btn_preview.png')


class UserCommentTab extends React.Component {
  static getStores() {
    return [MemberCommentStore, PopupPaginationStore]
  }

  static calculateState() {
    return {
      comments: MemberCommentStore.getMemberComment(),
      pagination: PopupPaginationStore.getPagination()
    }
  }

  componentWillMount() {
    this._readUserComment({pageNo:1})
  }
  
  _readUserComment = (userObj) => {
    AppActions.getUserCommentList({userId:this.props.userId, pageNo:userObj.pageNo})
  }

  render() {
    return (
      <div className="tab_ct">
        <div className="table_wrap">
          <table className="listTable modify">
            <colgroup>
              <col width="6%"/>
              <col width="13%"/>
              <col width="28%"/>
              <col width="28%"/>
              <col width="*"/>
              <col width="14%"/>
            </colgroup>
            <thead>
            <tr>
              <th><input type="checkbox"/></th>
              <th>썸네일</th>
              <th>제목</th>
              <th>댓글 내용</th>
              <th>냠냠</th>
              <th>작성일</th>
            </tr>
            </thead>
            <tbody>
            {this.renderCommentList}
            </tbody>
          </table>
        </div>
        <PageList pageObj={this.state.pagination} clickAction={this.movePage} />
      </div>
    )
  }

  get renderCommentList() {
    if(this.state.comments.size == 0) {
      return <tr><td colSpan="6">리스트가 없습니다.</td></tr>
    }

    return this.state.comments.map((item) => {
      return (<tr key={item.get('commentSeq')}>
        <td><input type="checkbox"/></td>
        <td><img src={item.get('postThumbnailUrl')} alt="thumbnail" className="thumb"/></td>
        <td className="al">{item.get('postTitle')}</td>
        <td className="al">{item.get('commentTxt')}</td>
        <td>
          <em className="more">
            <a href={util.getServiceUrl() + item.get('postShortUrl')} target="_blank"><img src={btn_preview} alt="보기"/></a>
            <a href=""><img src={icon_delete} alt="삭제"/></a>
          </em>
        </td>
        <td>{moment(item.get('createDt')).format('YYYY-MM-DD')}</td>
      </tr>)
    })
  }

  movePage = (pageNo) => {
    AppActions.getUserCommentList({userId:this.props.userId, pageNo:pageNo})
  }
}

const UserCommentTabContainer = Container.create(UserCommentTab)
export default UserCommentTabContainer
