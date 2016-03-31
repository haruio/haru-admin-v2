/**
 * Created by jungenpark on 3/22/16.
 */
import React from 'react'
import cn from 'classnames'

const USERPROFILE = 1
const COMMENT = 2

import UserProfile from './subPopup/UserProfile'
import Comment from './subPopup/Comment'
import debug from 'debug'
const log = debug('application:MemberPopup.jsx')

export default class MemberPopup extends React.Component {
  static propTypes = {
    userId: React.PropTypes.string,
    tab: React.PropTypes.number
  }
  static defaultProps = {
    tab: 1
  }
  
  state = {tab: this.props.tab}

  get Body() {
    if (this.state.tab == USERPROFILE) {
      return <UserProfile userId={this.props.userId} />
    } else {
      return <Comment userId={this.props.userId} />
    }
  }

  get Footer() {
    if (this.state.tab === USERPROFILE) {
      return (
        <p className="btn_c">
          <a href="" className="gray">Ban</a>
          <a href="" className="purple">강제탈퇴</a>&nbsp;&nbsp;&nbsp;
          <a onClick={this.props.close}>닫기</a>
        </p>
      )
    } else {
      return (
        <p className="btn_c">
          <a href="" className="purple">삭제하기</a>
          <a onClick={this.props.close}>닫기</a>
        </p>
      )
    }
  }

  /***
   * 선택된 tab index
   * @param index {Integer} - selected tab index
     */
  onTabClick(index) {
    this.setState({tab: index})
  }

  clearEvent(e) {
    e.stopPropagation()
  }

  render() {
    return (
      <div className="pop_wrap">
        <div className="pop pop_ct" id="user_info" onClick={this.clearEvent}>
          <h2>유저 정보</h2>
          <ul id="tab_menu">
            <li><a onClick={this.onTabClick.bind(this, USERPROFILE)}
                   className={cn({'on' : this.state.tab == USERPROFILE})}>유저 프로필</a></li>
            <li><a onClick={this.onTabClick.bind(this, COMMENT)}
                   className={cn({'on' : this.state.tab == COMMENT})}>작성 댓글</a></li>
          </ul>
          {this.Body}
          {this.Footer}
        </div>
      </div>
    )
  }
}
