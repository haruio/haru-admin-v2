/**
 * Created by jungenpark on 3/9/16.
 */
import React from 'react'
import { Link } from 'react-router'

import debug from 'debug'
const log = debug('application:join.jsx')

import intlStores from '../../utils/IntlStore.js'

import LangSelector from '../../components/Layout/LangSelector'
const logo2 = require('image!../../assets/img/logo2.png')

import util from '../../utils/util.js'
import AuthActions from '../../actions/AuthActions'
/**
 * A pages to Join
 */
export default class Join extends React.Component {
  constructor(props) {
    super(props)

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
            <li><input type="text" className="txt" ref="name" placeholder={intlStores.get('user.JOIN_FLD_NAME')}/></li>
            <li><input type="text" className="txt" ref="email" placeholder={intlStores.get('user.JOIN_FLD_EMAIL')}/></li>
            <li><input type="password" className="txt" ref="passwd" placeholder={intlStores.get('user.JOIN_FLD_PWD')}/></li>
            <li><input type="password" className="txt" ref="repasswd" placeholder={intlStores.get('user.JOIN_FLD_PWD_CONFIRM')}/></li>
            <li>
              <input type="text" className="txt" placeholder={intlStores.get('user.JOIN_FLD_SLACK')} />
              <div className="account_alert2">{intlStores.get('user.JOIN_TXT_SLACK')}</div>
            </li>
          </ul>
          <a className="btn_account btn_account_purple" onClick={this.handleSubmit}>{intlStores.get('user.JOIN_TXT_SIGNUP')}</a>
        </div>
      </div>
    )
  }


  handleSubmit = (e) => {
    e.preventDefault()

    const realNm = this.refs.name
    const email = this.refs.email
    const password = this.refs.passwd
    const repassword = this.refs.repasswd
    var slackId = $('#input-slackId')

    if (realNm.value === '') {
      alert(intlStores.get('user.LOGIN_MSG_ERROR_NAME'))
      realNm.focus()
      return
    }
    if (email.value === '') {
      alert(intlStores.get('user.LOGIN_MSG_ERROR_EMAIL'))
      email.focus()
      return
    }
    if (this._emailcheck(email.value)) {
      alert('이메일 형식을 확인하세요')
      email.focus()
      return
    }
    if (password.value === '') {
      alert(intlStores.get('user.LOGIN_MSG_ERROR_PWD'))
      password.focus()
      return
    }
    if (repassword.value === '') {
      alert(intlStores.get('user.LOGIN_MSG_ERROR_PWD'))
      repassword.focus()
      return
    }
    if (password.value != repassword.value) {
      alert('패스워드를 확인하세요')
      repassword.focus()
      return
    }
    if (slackId.value === '') {
      alert(intlStores.get('user.LOGIN_MSG_ERROR_SLACK'))
      slackId.focus()
      return
    }

    let userData = {}
    userData.email = email.value
    userData.realNm = realNm.value
    userData.password = util.getEncryptionData(email.value, password.value)
    userData.slackId = slackId.value

    AuthActions.JoginWithEmail(userData)

  }

  _emailcheck(strValue) {
    let regExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
    if (strValue.length === 0) {
      return true
    }
    if (!strValue.match(regExp)) {
      return true
    }
    return false
  }
}
