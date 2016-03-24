/**
 * Created by jungenpark on 3/9/16.
 */
import React from 'react'
import { Link } from 'react-router'
import { Container } from 'flux/utils'
import classNames from 'classnames'
import styles from '../../assets/style/hide.css'
let cx = classNames.bind(styles)

import AuthActions from '../../actions/AuthActions.js'
import LangSelector from '../../components/Layout/LangSelector'
import UserStore from '../../stores/UserStore'
import intlStores from '../../utils/IntlStore.js'
import utility from '../../utils/util'

const logo2 = require('image!../../assets/img/logo2.png')

const NO_ERROR = 0
const NO_INPUT_EMAIL = 1
const INVALID_EMAIL = 2
const NO_INPUT_PW = 3
const LOGINFAIL = 4

/**
 * A pages to Login
 */
class Login extends React.Component {
  static getStores() {
    return [UserStore]
  }

  static calculateState() {
    return {
      user: UserStore.getUser(),
      error: UserStore.getError()
    }
  }

  /***
   * handle 'enter key'
   * @param e {KeyboardEvent} - keyboard event listener object
   */
  handlekeydown = (e) => {
    if (e.keyCode === 13) {
      if (this.refs.pwd.value.length === 0) {
        this.refs.pwd.focus()
      } else {
        this.handleSubmit()
      }
    }
  }

  /***
   * handle Submit Button (Login Button)
   */
  handleSubmit = () => {
    const email = this.refs.email
    const emailval = email.value
    const pwd = this.refs.pwd
    const pwdval = pwd.value

    if (emailval.length === 0) {
      this.setState({error: {code: NO_INPUT_EMAIL, msg: intlStores.get('user.LOGIN_MSG_ERROR_EMAIL')}})
      email.focus()
      return
    }

    if (utility.emailcheck(emailval)) {
      this.setState({error: {code: INVALID_EMAIL, msg: '이메일 형식을 확인하세요'}})
      email.focus()
      return
    }

    if (pwdval.length === 0) {
      this.setState({error: {code: NO_INPUT_PW, msg: intlStores.get('user.LOGIN_MSG_ERROR_PWD')}})
      pwd.focus()
      return
    }

    let userData = {}
    userData.email = emailval
    userData.password = utility.getEncryptionData(emailval, pwdval)
    AuthActions.LoginWithEmail(userData)
  }

  render() {
    // Error className 지정
    const iserror = this.state.error.code == NO_INPUT_EMAIL
      || this.state.error.code == INVALID_EMAIL
      || this.state.error.code == LOGINFAIL

    let emailError = cx('txt', {error: iserror})
    let emailAlert = cx('account_alert', {hide: !(iserror)})

    let passwordError = cx('txt', {error: this.state.error.code == NO_INPUT_PW})
    let passwordAlert = cx('account_alert', {hide: this.state.error.code != NO_INPUT_PW})

    return (
      <div id="login" className="account_form login_box">
        <header>
          <LangSelector lang="ko_KR"/>
        </header>
        <div>
          <h1>
            <img src={logo2} alt="logo"/>
            <strong>{intlStores.get('user.LOGIN_TXT_WELCOME')}</strong>
            {intlStores.get('user.LOGIN_TXT_DISPLAY')}
          </h1>
          <ul>
            <li>
              <input type="text" className={emailError} ref="email" placeholder={intlStores.get('user.LOGIN_FLD_EMAIL')}
                     onKeyDown={this.handlekeydown}/>
              <div className={emailAlert}>{this.state.error.msg}</div>
            </li>
            <li>
              <input type="password" className={passwordError} ref="pwd"
                     placeholder={intlStores.get('user.LOGIN_FLD_PWD')} onKeyDown={this.handlekeydown}/>
              <div className={passwordAlert}>{intlStores.get('user.LOGIN_MSG_ERROR_PWD')}</div>
            </li>
          </ul>
          <a onClick={this.handleSubmit}
             className="btn_account btn_account_blue">{intlStores.get('user.LOGIN_BTN_LOGIN')}</a>
          <Link to="/join" className="btn_account btn_account_purple">{intlStores.get('user.LOGIN_TXT_SIGNUP')}</Link>
          <p
            className="txt_gray">{intlStores.get('user.LOGIN_TXT_CONTACT1')}<br />{intlStores.get('user.LOGIN_TXT_CONTACT2')}
          </p>
        </div>
      </div>
    )
  }
}

const LoginContainer = Container.create(Login)
export default LoginContainer
