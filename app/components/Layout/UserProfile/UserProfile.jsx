import React from 'react'
import {Container} from 'flux/utils'
import {Link} from 'react-router'

import debug from 'debug'
const log = debug('application:UserProfile.jsx')

const logo = require('image!../../../assets/img/login_logo.png')
const defaultimg = require('image!../../../assets/img/default.png')
import UserStore from '../../../stores/UserStore'

import AuthActions from '../../../actions/AuthActions'
/**
 * A component to Header
 * author : jungun.park
 */

class UserProfile extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static getStores() {
    return [UserStore]
  }

  static calculateState() {
    return {
      user: UserStore.getUser()
    }
  }

  render() {
    return (
      <p onClick={this.onLogOut} style={{cursor:'pointer'}}>
        <b><a>{this.state.user.realNm}</a></b>
        <img src={defaultimg} alt="default"/><a href=""></a>
      </p>
    )
  }

  /***
   * 로그아웃 이벤트
   */
  onLogOut() {
    if (confirm('are you logout??')) {
      AuthActions.Logout()
    }
  }
}

const UserProfileContainer = Container.create(UserProfile)
export default UserProfileContainer
