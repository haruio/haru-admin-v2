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
      AppActions.getUserList({pageNo: 1, searchField: '', searchText: '', searchUserStat: ''})
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
            <input type="text" placeholder="Search" id="searchText" ref="searchText" onKeyPress = {this._handleKeyPress} />
            <a onClick={this.searchUserList} className="btn_search"></a>
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
                <th><input type="checkbox" id="checkAll" value="-1" ref="checkAll" onClick={this.toggleCheckBox}/></th>
                <th>프로필</th>
                <th>닉네임(아이디)</th>
                <th>나이(성별)</th>
                <th>회원상태</th>
                <th>가입일</th>
                <th>푸쉬</th>
              </tr>
              </thead>
              <tbody>
              {this.renderMemberlist}
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

  get renderMemberlist() {
    if(this.state.members.size == 0) {
      return <tr>
        <td colSpan="7">{intlStores.get('sm.SM_MSG_NO_CONTENTS')}</td>
      </tr>
    } else {
      return this.state.members.map((user, i) => {
        let gender
        switch (user.get('genderCd')) {
          case 'M':
            gender = '남자'
            break
          case 'F':
            gender = '여자'
            break
          case 'NK':
            gender = '말하지 않음'
            break
          default:
            gender = '알수없음'
            break
        }

        let userStatus = '정상(ACT)'
        switch (user.get('userStsCd')) {
          case 'DEL':
            userStatus = '탈퇴(DEL)'
            break
          case 'BAN':
            userStatus = '정지(BAN)'
            break
        }

        return (
          <tr key={i}>
            <td><input type="checkbox" name="postBox" data-value={user.get('userId')}/></td>
            <td onClick={this.onPopupUserProfile.bind(null, {userId:user.get('userId')})}><img
              src={user.get('profileImageUrl') || ''} onError={this.onImageError} className="porfile"
              alt="userProfile"/></td>
            <td onClick={this.onPopupUserProfile.bind(null, {userId:user.get('userId')})}><a
            >{user.get('nickNm')}({user.get('userId')})</a>
            </td>
            <td
              onClick={this.onPopupUserProfile.bind(null, {userId:user.get('userId')})}>{moment().diff(moment(user.get('birthdayDt')).subtract(1, 'YEAR') || moment().year(), 'YEAR')}
              ({gender})
            </td>
            <td onClick={this.onPopupUserProfile.bind(null, {userId:user.get('userId')})}>{userStatus}</td>
            <td
              onClick={this.onPopupUserProfile.bind(null, {userId:user.get('userId')})}>{moment(user.get('createDt')).format('YYYY-MM-DD')}</td>
            <td
              onClick={this.onPopupUserProfile.bind(null, {userId:user.get('userId')})}>{user.get('pushAllowCd') != 'Y' ? 'X' : '○'}</td>
          </tr>
        )
      })
    }
  }


  /***
   * Move Page
   * @param page {number} - 이동할 페이지
   */
  movePage = (pageNo) => {
    this.searchUserList(pageNo)
  }

  /***
   * Keyboard Event handler
   * @param page {KeyboardEvent} - 키보드 이벤트
   */
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.searchUserList()
    }
  }

  /***
   * request search user
   * @param page {number} - 이동할 페이지
   */
  searchUserList =(pageNo=1)=> {
    const searchField = this.refs.searchField.value
    const searchText = this.refs.searchText.value
    let searchUserStat = this.refs.searchUserStat.value

    if(searchUserStat === '전체') {
      searchUserStat = ''
    }
    AppActions.getUserList({pageNo: pageNo, searchField: searchField,  searchUserStat:searchUserStat, searchText:searchText})
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
    userList = $('input:checked').toArray().map((row, i)=> {
      return {userId: row.value}
    })

    if (userList.length > 0) {
      userList.forEach(function (user, index) {
        //UserActions.banUser(user)
      })
    } else {
      alert('유저를 선택하세요.')
    }
  }

  toggleCheckBox = () => {
    $("input[name='postBox']").prop('checked', $(this.refs.checkAll).prop('checked'))
  }

}
const MemberContainer = Container.create(Member)
export default MemberContainer
