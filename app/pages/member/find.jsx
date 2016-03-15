/**
 * Created by jungenpark on 3/9/16.
 */
import React from 'react'
import { Link } from 'react-router'

import debug from 'debug'
const log = debug('application:find.jsx')

/**
 * A pages to Find
 */
export default class Find extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    log('main render')

    return (
      <div class="account_find">
        <div id="find_pw" class="account_form find_pw">
          <form>
            <h1>
              <strong>비밀번호 찾기</strong>
            </h1>
            <h2>
              이메일과 OTP를 입력하시면<br />
              이메일로 <span>임시 비밀번호</span>를 보내 드립니다!!
            </h2>
            <ul>
              <li><input type="text" class="txt" placeholder="이메일"/></li>
              <li><input type="text" class="txt" placeholder="OPT"/></li>
            </ul>
            <a class="btn_account btn_account_blue" href="#">비밀번호 찾기</a>
          </form>
        </div>
        <div id="find_otp" class="account_form find_otp">
          <form>
            <h1>
              <strong>OTP 재발급</strong>
            </h1>
            <h2>
              이메일과 비밀번호를 입력하시면<br />
              이메일로 <span class="txt_blue">새로운 OTP</span>를 보내 드립니다!!
            </h2>
            <ul>
              <li><input type="text" class="txt" placeholder="이메일"/></li>
              <li><input type="password" class="txt" placeholder="비밀번호"/></li>
            </ul>
            <a class="btn_account btn_account_blue2" href="#">OTP 재발급</a>
          </form>
        </div>
      </div>
    )
  }
}
