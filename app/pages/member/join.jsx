/**
 * Created by jungenpark on 3/9/16.
 */
import React from 'react'
import { Link } from 'react-router'

import debug from 'debug'
const log = debug('application:join.jsx')

import intlStores from '../../stores/IntlStore.js'

import LangSelector from '../../components/Layout/LangSelector'
const logo2 = require('image!../../assets/img/logo2.png')

import util from '../../utils/util.js'
/**
 * A pages to Join
 */
export default class Join extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    util.localStorageClear()
    util.urlParser()
  }

  render() {
    return (
      <div id="join" className="account_form join_box">
        <header>
          <LangSelector lang="ko_KR" />
        </header>
        <div>
          <h1>
            <img src={logo2} alt="logo"/>
            <strong>{intlStores.get('user.JOIN_TXT_SIGNUP')}</strong>
          </h1>
          <ul>
            <li><input type="text" className="txt" placeholder={intlStores.get('user.JOIN_FLD_NAME')}/></li>
            <li><input type="text" className="txt" placeholder={intlStores.get('user.JOIN_FLD_EMAIL')}/></li>
            <li><input type="password" className="txt" placeholder={intlStores.get('user.JOIN_FLD_PWD')}/></li>
            <li><input type="password" className="txt" placeholder={intlStores.get('user.JOIN_FLD_PWD_CONFIRM')}/></li>
            <li>
              <input type="text" className="txt" placeholder={intlStores.get('user.JOIN_FLD_SLACK')} />
              <div className="account_alert2">{intlStores.get('user.JOIN_TXT_SLACK')}</div>
            </li>
          </ul>
          <a className="btn_account btn_account_purple" href="#">{intlStores.get('user.JOIN_TXT_SIGNUP')}</a>
        </div>
      </div>
    )
  }
}
