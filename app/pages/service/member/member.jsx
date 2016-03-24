/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import moment from 'moment'
import {Container} from 'flux/utils'
import cn from 'classnames'

import debug from 'debug'
const log = debug('application:Member.jsx')

import PageList from '../../../components/PageList'
import AppActions from '../../../actions/AppActions'
import PopupActions from '../../../actions/PopupActions'

import MemberStore from '../../../stores/MemberStore'
import PaginationStore from '../../../stores/PaginationStore'
import intlStores from '../../../utils/IntlStore'
import {POPUP} from '../../../constants/AppConstants'
const userDefault = require('image!../../../assets/img/default.png')


class Member extends React.Component {
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

  /***
   * PopUp User Profile 
   * @param user {User} - user object
     */
  onPopupUserProfile(user) {
    PopupActions.openPopup(POPUP.MEMBER, user)
  }

  onImageError(e) {
    e.target.src = userDefault
  }

  banUserList() {
    let userList = []
    userList = $("input:checked").toArray().map((row, i)=> {
      return ({userId:row.value})
    })

    if(userList.length > 0) {
      userList.forEach(function(user, index) {
        //UserActions.banUser(user)
      })
    }else {
      alert('유저를 선택하세요.')
    }
  }

  get getMemberlist() {
    return this.state.members.map((user, i) => {
      const gender = user.get('genderCd')
      return (
        <tr key={i}>
          <td><input type="checkbox" data-value={user.get('userId')} /></td>
          <td><img src={user.get('profileImageUrl') || ''} onError={this.onImageError} className="porfile" alt="userProfile" /></td>
          <td><a onClick={this.onPopupUserProfile.bind(null, {userId:user.get('userId')})}>{user.get('nickNm')}({user.get('userId')})</a></td>
          <td>{moment().diff(moment(user.get('birthdayDt')).subtract(1, 'YEAR') || moment().year(), 'YEAR')} ({('' == gender || 'NK' == gender ? ' ' : gender != 'M') ? '여자':'남자'})</td>
          <td>{cn({
            정상: user.get('userStsCd') == 'ACT',
            탈퇴: user.get('userStsCd') == 'DEL',
            정지: user.get('userStsCd') == 'BAN'
          })}</td>
          <td>{moment(user.get('createDt')).format('YYYY-MM-DD')}</td>
          <td>{user.get('pushAllowCd') != 'Y' ? 'X' : '○'}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <article>
        <hgroup>
          <h2>유저리스트</h2>
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
              {this.getMemberlist}
              </tbody>
            </table>
          </div>
          <PageList pageObj={this.state.pagination} clickAction={this.movePage}/>
          <p className="btn_r">
            <a onClick={this.banUserList} className="purple btn_w140">Select List Ban</a>
          </p>
        </div>
      </article>
    )
  }
}
const MemberContainer = Container.create(Member)
export default MemberContainer
