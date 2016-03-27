/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import { Router, IndexRoute, IndexRedirect, Route, browserHistory } from 'react-router'

import debug from 'debug'
const log = debug('application:router')

// content
import MyContent from './pages/content/mycontent.jsx'
import Compose from './pages/content/compose.jsx'
import Inspection from './pages/content/Inspection.jsx'
import Publish from './pages/content/Publish.jsx'
import Reserved from './pages/content/reserved.jsx'
import Deleted from './pages/content/deleted.jsx'
// service
import BannerEdit from './pages/service/banner/banneredit.jsx'
import Banner from './pages/service/banner/banner.jsx'
import MainFeed from './pages/service/mainfeed/mainfeed.jsx'
import MainFeedEdit from './pages/service/mainfeed/mainfeededit.jsx'
import Channel from './pages/service/channel/channel.jsx'
import ChannelEdit from './pages/service/channel/channeledit.jsx'
import Category from './pages/service/category/category.jsx'
import CategoryEdit from './pages/service/category/categoryedit.jsx'
import Recommendkeyword from './pages/service/recommend/keyword.jsx'
import RecommendPost from './pages/service/recommend/post.jsx'
import RecommendPostEdit from './pages/service/recommend/postedit.jsx'

import Member from './pages/service/member/member'
import BanMember from './pages/service/member/banmember'


import Comment from './pages/service/comment/comment'
import ReportComment from './pages/service/report/comment'
import ReportPost from './pages/service/report/post'

import Push from './pages/service/push/push'
import PushEdit from './pages/service/push/pushedit'


// User
import Login from './pages/member/login.jsx'
import Join from './pages/member/join.jsx'
import Find from './pages/member/find.jsx'
// Error Page
import NotFound from './pages/notFound.jsx'

import App from './pages/app.jsx'

import UserStore from './stores/UserStore'


export default class extends React.Component {
  constructor(props) {
    super(props)

    if(browserHistory != undefined) {
      browserHistory.listen((location) => {
        log('listen', location)
      })
    }
  }

  requireAuth(nextState, replace) {
    if (!UserStore.isLoginSuccess()) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }

  render() {
    return (
      <Router history={browserHistory}>

        <Route path="login" component={ Login }/>
        <Route path="join" component={ Join } />
        <Route path="find" component={ Find } />

        <Route path="/" component={ App } onEnter={this.requireAuth}>
          <IndexRedirect to="/content/mycontent" />
          <Route path="content">
            <IndexRedirect to="mycontent" />
            <Route path="mycontent" component={ MyContent }/>
            <Route path="inspection" component={ Inspection }/>
            <Route path="list" >
              <Route path="publish" component={ Publish }/>
              <Route path="reserved" component={ Reserved }/>
              <Route path="deleted" component={ Deleted }/>
            </Route>
            <Route path="compose">
              <IndexRedirect to="video" />
              <Route path="video" component={ Compose }/>
              <Route path="image" component={ Compose }/>
            </Route>
          </Route>

          <Route path="service">
            <IndexRedirect to="mgmt/banner" />
            <Route path="mgmt">
              <IndexRedirect to="banner" />
              <Route path="mainfeed" component={ MainFeed }/>
              <Route path="mainfeed/new" component={ MainFeedEdit }/>
              <Route path="mainfeed/:id" component={ MainFeedEdit }/>

              <Route path="banner" component={ Banner }/>
              <Route path="banner/new" component={ BannerEdit }/>
              <Route path="banner/:id" component={ BannerEdit }/>

              <Route path="keyword" component={ Recommendkeyword }/>

              <Route path="post" component={ RecommendPost }/>
              <Route path="post/new" component={ RecommendPostEdit }/>
              <Route path="post/:id" component={ RecommendPostEdit }/>

              <Route path="channel" component={ Channel }/>
              <Route path="channel/new" component={ ChannelEdit }/>
              <Route path="channel/:id" component={ ChannelEdit }/>

              <Route path="category" component={ Category }/>
              <Route path="category/new" component={ CategoryEdit }/>
              <Route path="category/:id" component={ CategoryEdit }/>
            </Route>
            <Route path="user">
              <IndexRedirect to="list" />
              {/*activeclass 이슈로 이렇게 처리함 list를 인덱스로 잡으면 stat, ban시에도 on이 되기 때문*/}
              <Route path="list" component={ Member }/>
              <Route path="stat" component={ Member }/>
              <Route path="ban" component={ BanMember }/>
            </Route>

            <Route path="comment" component={ Comment }/>
            <Route path="report">
              <IndexRedirect to="post" />
              <Route path="post" component={ ReportPost }/>
              <Route path="post/new" component={ ReportPost }/>
              <Route path="post/:id" component={ ReportPost }/>
              <Route path="comment" component={ ReportComment }/>
            </Route>
            <Route path="push">
              <IndexRoute component={ Push }/>
              <Route path="new" component={ PushEdit }/>
              <Route path=":id" component={ PushEdit }/>
            </Route>
        </Route>


        </Route>
        <Route path="*" component={ NotFound }/>
      </Router>
    )
  }
}

/* <Route path="stats" component={ Service }/>
 <Route path="system" component={ Service }/>*/

