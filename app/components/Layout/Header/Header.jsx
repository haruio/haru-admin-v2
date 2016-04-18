import React from 'react'
import { Link } from 'react-router'

import debug from 'debug'
const log = debug('application:Header.jsx')

import LangSelector from '../LangSelector'
import UserProfile from '../UserProfile'

const logo = require('image!../../../assets/img/login_logo.png')
/**
 * A component to Header
 * history :
 * Container화 하면 해당 컴포넌트가 store의 변경 통지 아니면 setState하기전에는 재 랜더링이 안벌어져서.
 * react-router activeClassName이 작동안한다 ㅎㅎ
 * 그래서 UserProfile을 해당 컴포넌트로 분리해서 Store에 영향받는걸 최하위로 내려버림
 * author : jungun.park
 */

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <h1><Link to="/content/mycontent"><img src={logo} alt="MAKE US" style={{width:'160px'}}/></Link></h1>
        <ul>
          <li><Link to="/content" activeClassName="on">Contents Management</Link></li>
          <li><Link to="/service" activeClassName="on">Service Management</Link></li>
          <li><Link to="/stats"   activeClassName="on">Statistic Management</Link></li>
          <li><Link to="/system"  activeClassName="on">System Management</Link></li>
        </ul>
        <LangSelector lang="ko_KR" />
        <UserProfile />
      </header>
    )
  }
}
