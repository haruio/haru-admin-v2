/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import moment from 'moment'
import {Container} from 'flux/utils'
import cn from 'classnames'

import debug from 'debug'
const log = debug('application:BanMember.jsx')

import PageList from '../../../components/PageList'
import AppActions from '../../../actions/AppActions'

import MemberStore from '../../../stores/MemberStore'
import PaginationStore from '../../../stores/PaginationStore'
import intlStores from '../../../utils/IntlStore'

const userDefault = require('image!../../../assets/img/default.png')


class BanMember extends React.Component {
  static getStores() {
    return [MemberStore, PaginationStore]
  }

  static calculateState() {
    return {
      members: MemberStore.getMembers(),
      pagination: PaginationStore.getPagination()
    }
  }

  componentDidMount() {
    this.listUsers()
  }

  listUsers(searchObj =  {
    searchStartDate: '',
    searchEndDate: '',
    searchField: '',
    searchText: '',
    searchUserStat: ''
  }) {
    AppActions.getUserList(searchObj)
  }

  editRecommendPost(recommendSeq) {

  }

  /***
   * Move Page
   * @param page {number} - 이동할 페이지
   */
  movePage(page) {

  }

  searchUserList() {

  }

  onPopupUserProfile(user) {

  }

  onImageError(e) {
    e.target.src = userDefault
  }

  get banList() {
    return <tr>
      <td colSpan="7">{intlStores.get('sm.SM_MSG_NO_CONTENTS')}</td>
    </tr>
  }
  render() {
    return (
      <article>
        <hgroup>
          <h2>정지된 유저리스트</h2>
          <fieldset id="search_box">
            <p>
              <label>검색조건</label>
              <select id="searchField" ref="searchField">
                <option value="NICKNAME">닉네임</option>
                <option value="EMAIL">이메일</option>
              </select>
            </p>
            <p>
              <label>회원상태</label>
              <select id="searchUserStat" ref="searchUserStat">
                <option value="">전체</option>
                <option value="ACT">정상</option>
                <option value="BAN">정지</option>
                <option value="DEL">탈퇴</option>
              </select>
            </p>
            <input type="text" placeholder="Search" id="searchText"/><a onClick={this.searchUserList} className="btn_search"></a>
          </fieldset>
        </hgroup>
        <div id="contents">
          <p className="table_info">{intlStores.get('common.COMMON_FLD_TOTAL') + ' ' + this.state.pagination.get('totalCount') + ' ' + intlStores.get('common.COMMON_FLD_COUNT')}</p>
          <div className="table_wrap">
            <table className="listTable">
              <colgroup>
                <col width="5%"/>
                <col width="10%"/>
                <col width="*"/>
                <col width="14%"/>
                <col width="14%"/>
                <col width="15%"/>
                <col width="15%"/>
              </colgroup>
              <thead>
              <tr>
                <th><input type="checkbox" id="checkAll" value="-1" onClick={this.checkAllHandler}/></th>
                <th>프로필</th>
                <th>닉네임(아이디)</th>
                <th>나이(성별)</th>
                <th>회원상태</th>
                <th>가입일</th>
                <th>푸쉬</th>
              </tr>
              </thead>
              <tbody>
              {this.banList}
              </tbody>
            </table>
          </div>
          <PageList pageObj={this.state.pagination} clickAction={this.movePage}/>
          <p className="btn_r">
            <a onClick={this.editRecommendPost.bind(null, '')}
               className="purple btn_w140">{intlStores.get('common.COMMON_BTN_REGISTER')}</a>
            <a onClick={this.deleteSelectedItem}>{intlStores.get('common.COMMON_BTN_DELETE')}</a>
          </p>
        </div>
      </article>
    )
  }
}
const MemberContainer = Container.create(BanMember)
export default MemberContainer
