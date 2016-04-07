/**
 * Created by jungenpark on 3/22/16.
 */
import React from 'react'
import {Container} from 'flux/utils'
import moment from 'moment'

const userDefault = require('image!../../../../assets/img/default_.png')
const icon_join1 = require('image!../../../../assets/img/icon_join1.png')
const icon_join2 = require('image!../../../../assets/img/icon_join2.png')
import AppActions from '../../../../actions/AppActions'

import MemberProfileStore from '../../../../stores/MemberProfileStore'
import intlStores from '../../../../utils/IntlStore'

import debug from 'debug'
const log = debug('application:UserProfile.jsx')


class UserProfileTab extends React.Component {
  static getStores() {
    return [MemberProfileStore]
  }

  static calculateState() {
    return {
      profile: MemberProfileStore.getMemberProfile()
    }
  }

  componentWillMount() {
    AppActions.readUserProfile(this.props.userId)
  }

  onImageError(e) {
    e.target.src = userDefault
  }

  render() {
    let gender
    switch (this.state.profile.get('genderCd')) {
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
    switch (this.state.profile.get('userStsCd')) {
      case 'DEL':
        userStatus = '정상(ACT)'
        break
      case 'BAN':
        userStatus = '정지(BAN)'
        break
    }

    let jointype = icon_join2
    let jointypename = 'Email'
    switch(this.state.profile.get('authTypeCd')) {
      case 'EM':
        jointype = icon_join1
        jointypename = 'Email'
        break
      case 'FB':
        jointype = icon_join2
        jointypename = 'Facebook'
        break
    }

    return (
      <div className="tab_ct profile">
        <p><img src={this.state.profile.get('profileImageUrl')} onError={this.onImageError} alt=""/></p>
        <table>
          <colgroup>
            <col width="35%"/>
            <col width="*"/>
          </colgroup>
          <tbody>
          <tr>
            <th>{intlStores.get('sm.SM_FLD_USERNAME')}</th>
            <td>{this.state.profile.get('nickNm')}</td>
          </tr>
          <tr>
            <th>{intlStores.get('sm.SM_FLD_EMAIL')}</th>
            <td>{this.state.profile.get('email')}</td>
          </tr>
          <tr>
            <th>{intlStores.get('sm.SM_FLD_GENDER')}</th>
            <td>{gender}</td>
          </tr>
          <tr>
            <th>{intlStores.get('sm.SM_FLD_BIRTH')}</th>
            <td>{moment(this.state.profile.get('birthdayDt')).format('YYYY-MM-DD') || ''} ({moment().diff(moment(this.state.profile.get('birthdayDt')).subtract(1, 'YEAR') || moment().year(), 'YEAR') + "살"})</td>
          </tr>
          <tr>
            <th>{intlStores.get('sm.SM_FLD_JOIN_DATE')}</th>
            <td>{moment(this.state.profile.get('createDt')).format('YYYY-MM-DD HH:mm:ss')}</td>
          </tr>
          <tr>
            <th>마지막 로그인</th>
            <td>준비중</td>
          </tr>
          <tr>
            <th>가입 종류</th>
            <td><img src={jointype} /> {jointypename}</td>
          </tr>
          <tr>
            <th>{intlStores.get('sm.SM_FLD_USER_STATUS')}</th>
            <td>{userStatus}
            </td>
          </tr>
          <tr>
            <th>디바이스</th>
            <td>준비중</td>
          </tr>
          <tr>
            <th>푸시 허용여부</th>
            <td>{this.state.profile.get('pushAllowCd') != 'Y' ? '비수신' : '수신'}</td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const UserProfileContainer = Container.create(UserProfileTab)
export default UserProfileContainer
