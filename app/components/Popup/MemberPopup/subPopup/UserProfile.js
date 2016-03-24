/**
 * Created by jungenpark on 3/22/16.
 */
import React from 'react'

const userDefault = require('image!../../../../assets/img/default_.png')
const icon_join1 = require('image!../../../../assets/img/icon_join1.png')

export default class UserProfile extends React.Component {
  render() {
    return (
      <div className="tab_ct profile">
        <p><img src={userDefault} alt="" /></p>
        <table>
          <colgroup><col width="35%" /><col width="*" /></colgroup>
          <tbody>
          <tr>
            <th>닉네임</th>
            <td>pinkjjang</td>
          </tr>
          <tr>
            <th>이메일</th>
            <td>pinkjjang@makeus.com</td>
          </tr>
          <tr>
            <th>마지막 로그인</th>
            <td>2015-08-31 12:02:05</td>
          </tr>
          <tr>
            <th>가입일</th>
            <td>2015-08-31 12:02:05</td>
          </tr>
          <tr>
            <th>가입 종류</th>
            <td><img src={icon_join1} alt="" /></td>
          </tr>
          <tr>
            <th>상세 정보</th>
            <td></td>
          </tr>
          <tr>
            <th>생일</th>
            <td>2002-09-09</td>
          </tr>
          <tr>
            <th>성별</th>
            <td>여</td>
          </tr>
          <tr>
            <th>디바이스</th>
            <td></td>
          </tr>
          <tr>
            <th>푸시 허용여부</th>
            <td>허용</td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

