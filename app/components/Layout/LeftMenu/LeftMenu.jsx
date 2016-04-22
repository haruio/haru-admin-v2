import React from 'react'
import { Link } from 'react-router'
import cn from 'classnames'


import debug from 'debug'
const log = debug('application:LeftMenu.jsx')


import intlStores from '../../../utils/IntlStore'

/**
 * A component to LeftMenu
 * author : jungun.park
 */
// TODO : 해당 페이지에서 세부 페이지로 가면 activeClassName 이 풀리는 버그.

export default class LeftMenu extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  render() {
    log('left')
    let router = this.context.router

    // URL을 기반으로 Left Menu를 뿌려줌. react-router isActive, activeClassName을 활용하여 개발
    if (router.isActive('/content')) {
      return (
        <nav>
          <Link to="/content/compose" activeClassName="on">{intlStores.get('cms.MENU_TXT_MAKE_CONTENT')}</Link>
          <ul id="lnb">
            <li className={cn({ 'on': router.isActive('/content/mycontent') })}>
              <Link to="/content/mycontent" className="l1_a">{intlStores.get('cms.MENU_TXT_MY_CONTENT')}</Link>
            </li>
            <li className={cn({ 'on': router.isActive('/content/list') })}>
              <Link to="/content/list/publish" className="l1_b">{intlStores.get('cms.MENU_TXT_CONTENT_LIST')}</Link>
              <ul>
                <li><Link to="/content/list/publish" activeClassName="on">{intlStores.get('cms.PUBLISHED_CONTENTS')}</Link></li>
                <li><Link to="/content/list/reserved" activeClassName="on">{intlStores.get('cms.RESERVED_CONTENTS')}</Link></li>
                <li><Link to="/content/list/deleted" activeClassName="on">{intlStores.get('cms.DELETED_CONTENTS')}</Link></li>
              </ul>
            </li>
            <li className={cn({ 'on': router.isActive('/content/inspection') })}>
              <Link to="/content/inspection" className="l1_c">{intlStores.get('cms.CONTENTS_INSPECTION')}</Link>
            </li>
          </ul>
        </nav>
      )
    } else if (router.isActive('/service')) {
      return (
        <nav>
          <ul id="lnb" className="service">
            <li className={cn({ 'on': router.isActive('/service/mgmt') })}><Link to="/service/mgmt/" className="l2_a">서비스 관리</Link>
              <ul>
                <li><Link to="/service/mgmt/mainfeed" activeClassName="on">메인피드 관리</Link></li>
                <li><Link to="/service/mgmt/banner" activeClassName="on">배너 관리(채널제외)</Link></li>
                <li><Link to="/service/mgmt/bannerrepeat" activeClassName="on">반복배너 관리(채널)</Link></li>
                <li><Link to="/service/mgmt/keyword" activeClassName="on">추천 검색어 관리</Link></li>
                <li><Link to="/service/mgmt/post" activeClassName="on">추천 컨텐츠</Link></li>
                <li><Link to="/service/mgmt/channel"  activeClassName="on">채널 관리</Link></li>
                <li><Link to="/service/mgmt/category" activeClassName="on">카테고리 관리</Link></li>
              </ul>
            </li>
            <li className={cn({ 'on': router.isActive('/service/user') })}><Link to="/service/user" className="l2_b">유저 관리</Link>
              <ul>
                <li><Link to="/service/user/list" activeClassName="on">유저 리스트</Link></li>
                <li><Link to="/service/user/ban" activeClassName="on">Ban 유저 리스트</Link></li>
              </ul>
            </li>
            <li className={cn({ 'on': router.isActive('/service/comment') })}><Link to="/service/comment" className="l2_c">댓글 관리</Link></li>
            <li className={cn({ 'on': router.isActive('/service/report') })}><Link to="/service/report" className="l2_d">신고 관리</Link>
              <ul>
                <li><Link to="/service/report/post"    activeClassName="on">컨텐츠</Link></li>
                <li><Link to="/service/report/comment" activeClassName="on">댓글</Link></li>
              </ul>
            </li>
            <li className={cn({ 'on': router.isActive('/service/push') })}><Link to="/service/push" className="l2_e">Push</Link></li>
          </ul>
        </nav>
      )
    } else if (router.isActive('/stats')) {
      return (
        <nav>
          <ul id="lnb" className="service">
            <li className={cn({ 'on': router.isActive('/stats/user') })}><Link to="/stats/user" className="l2_b">회원 통계</Link></li>
            <li className={cn({ 'on': router.isActive('/stats/content') })}><Link to="/stats/content" className="l2_a">컨텐츠 통계</Link>
              <ul>
                <li><Link to="/stats/content/stat" activeClassName="on">{intlStores.get('st.MENU_TXT_CONTENT_STAT')}</Link></li>
                <li><Link to="/stats/content/list" activeClassName="on">{intlStores.get('st.MENU_TXT_CONTENT_STAT_LIST')}</Link></li>
              </ul>
            </li>
          </ul>
        </nav>
      )
    } else if (router.isActive('/system')) {
      return (
        <nav>
        </nav>
      )
    } else {
      return (<nav />)
    }
  }
}
