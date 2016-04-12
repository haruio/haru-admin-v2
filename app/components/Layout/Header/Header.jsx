import React from 'react'
import {Container} from 'flux/utils'
import { Link } from 'react-router'

import debug from 'debug'
const log = debug('application:Header.jsx')

import LangSelector from '../LangSelector'


const logo = require('image!../../../assets/img/login_logo.png')
const defaultimg = require('image!../../../assets/img/default.png')
import UserStore from '../../../stores/UserStore'

import AuthActions from '../../../actions/AuthActions'
/**
 * A component to Header
 * author : jungun.park
 */

class Header extends React.Component {

  static getStores() {
    return [UserStore]
  }

  static calculateState() {
    return {
      user : UserStore.getUser()
    }
  }

  render() {
    return (
      <header>
        <h1><Link to="/content/mycontent"><img src={logo} alt="MAKE US" style={{width:'160px'}}/></Link></h1>
        <ul>
          <li><Link to="/content" activeClassName="on">Contents Management</Link></li>
          <li><Link to="/service" activeClassName="on">Service Management</Link></li>
          <li><Link to="/stats" activeClassName="on">Statistic Management</Link></li>
          <li><Link to="/system" activeClassName="on">System Management</Link></li>
        </ul>
        <LangSelector lang="ko_KR" />
        <p onClick={this.onLogOut} style={{cursor:'pointer'}}>
          <b><a >{this.state.user.realNm}</a></b>
          <img src={defaultimg} alt="default" /><a href=""></a>
        </p>
      </header>
    )
  }

  onLogOut() {
    if(confirm('are you logout??')) {
      AuthActions.Logout()
    }
  }
}

const HeaderContainer = Container.create(Header)
export default HeaderContainer
