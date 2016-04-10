import React from 'react'
import { Link } from 'react-router'

import debug from 'debug'
const log = debug('application:Header.jsx')

import LangSelector from '../LangSelector'


const logo = require('image!../../../assets/img/login_logo.png')
const defaultimg = require('image!../../../assets/img/default.png')


/**
 * A component to Header
 * author : jungun.park
 */

class Header extends React.Component {
  render() {
    // TODO : 유저 정보
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
        <p>
          <b><a href="">PinkjjangPinkjjang</a></b>
          <img src={defaultimg} alt="default" /><a href="">3</a>
        </p>
      </header>
    )
  }
}

export default Header
