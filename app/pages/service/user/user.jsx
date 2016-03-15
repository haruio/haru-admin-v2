/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import moment from 'moment';

import cn from 'classnames'
import debug from 'debug'
const log = debug('application:User.jsx')

import PageList from '../../../components/PageList'
import intlStores from '../../../stores/IntlStore'


export default class User extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users : [],
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

  searchUserList() {

  }

  render() {
    const ContentList = this.state.users.map((user, i) => {
      return(
        <tr key={i}>
          <td><input type="checkbox" value={user.userId} onClick={this.checkBoxHandler} /></td>
          <td><img src={user.profileImageUrl||userProfile} onError={this.onImageError} className="porfile" alt="userProfile" /></td>
          <td><a onClick={this.onPopupUserProfile.bind(null, {userId:user.userId})}>{user.nickNm}({user.userId})</a></td>
          <td>{moment().diff(moment(user.birthdayDt).subtract(1, 'YEAR') || moment().year(), 'YEAR')} ({("" == user.genderCd || "NK" == user.genderCd) ? " " : user.genderCd != "M" ? "여자":"남자"})</td>
          <td>{cn({
            정상: user.userStsCd == 'ACT',
            탈퇴: user.userStsCd == 'DEL',
            정지: user.userStsCd == 'BAN'
          })}</td>
          <td>{moment(user.createDt).format('YYYY-MM-DD')}</td>
          <td>{user.pushAllowCd != 'Y' ? 'X' : '○'}</td>
          {/* 가입종료? 왜 안나오게 했을까? Backend 확인
           <td>
           <img src={iconJoin1} alt="" title="email" className="icon_join" />
           <img src={iconJoin2} alt="" title="facebook" className="icon_join" />
           </td>
           */}
        </tr>
      )
    })

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
            <input type="text" placeholder="Search" id="searchText" /><a onClick={this.searchUserList} className="btn_search"></a>
          </fieldset>
        </hgroup>
        <div id="contents">
          <p className="table_info">{intlStores.get('common.COMMON_FLD_TOTAL')+' '+this.state.pagination.totalCount+' '+intlStores.get('common.COMMON_FLD_COUNT')}</p>
          <div className="table_wrap">
            <table className="listTable">
              <colgroup><col width="5%" /><col width="5%" /><col width="10%" /><col width="*" /><col width="10%" /><col width="13%" /><col width="13%" /><col width="10%" /></colgroup>
              <thead>
              <tr>
                <th><input type="checkbox" id="checkAll" value="-1" onClick={this.checkAllHandler} /></th>
                <th>프로필</th>
                <th>닉네임(아이디)</th>
                <th>나이(성별)</th>
                <th>회원상태</th>
                <th>가입일</th>
                <th>푸쉬</th>
              </tr>
              </thead>
              <tbody>
              {ContentList}
              </tbody>
            </table>
          </div>
          <PageList pageObj={this.state.pagination} clickAction={this.movePage} />
          <p className="btn_r">
            <a onClick={this.editRecommendPost.bind(null, '')} className="purple btn_w140">{intlStores.get('common.COMMON_BTN_REGISTER')}</a>
            <a onClick={this.deleteSelectedItem}>{intlStores.get('common.COMMON_BTN_DELETE')}</a>
          </p>
        </div>

      </article>
    )
  }
}
