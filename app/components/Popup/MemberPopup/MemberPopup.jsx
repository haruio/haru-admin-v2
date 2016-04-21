/**
 * Created by jungenpark on 3/22/16.
 */
import React from 'react'
import cn from 'classnames'

const USERPROFILE = 1
const COMMENT = 2

import UserProfile from './tab/UserProfileTab'
import Comment from './tab/CommentTab'
import debug from 'debug'
const log = debug('application:MemberPopup.jsx')
import AppActions from '../../../actions/AppActions'
import Alert from 'react-s-alert'
import intlStores from '../../../utils/IntlStore'

export default class MemberPopup extends React.Component {
  static propTypes = {
    userId: React.PropTypes.string,
    tab: React.PropTypes.number
  }

  static defaultProps = {
    tab: USERPROFILE
  }

  state = {tab: this.props.tab}

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
          <a onClick={this.banUser} className="gray">Ban</a>
          <a onClick={this.deleteUser} className="purple">강제탈퇴</a>&nbsp;&nbsp;&nbsp;
          <a onClick={this.props.close}>닫기</a>
        </p>
      )
    } else {
      return (
        <p className="btn_c">
          <a onClick={this.deleteComment} className="gray">삭제하기</a>
          <a onClick={this.blindComment} className="purple">블라인드</a>&nbsp;&nbsp;&nbsp;
          <a onClick={this.props.close}>닫기</a>
        </p>
      )
    }
  }
  banUser = () => {
    if (window.confirm('해당 유저를 Ban 하시겠습니까?')) {
      AppActions.banUser({userId: this.props.userId})

      Alert.success('Ban 등록이 완료되었습니다', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
    }
  }

  deleteUser = () => {
    if (window.confirm(intlStores.get('common.COMMON_MSG_DEL'))) {
      AppActions.deleteUser({userId : this.props.userId})

      Alert.success('강제 탈퇴되었습니다', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })

      this.props.close()
    }
  }

  deleteComment() {
    // TODO 미구현
    Alert.warning('준비중입니다', {
      position: 'top-right',
      effect: 'slide',
      timeout: 3000
    })
  }

  blindComment() {
    // TODO 미구현
    Alert.warning('준비중입니다', {
      position: 'top-right',
      effect: 'slide',
      timeout: 3000
    })
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
}
