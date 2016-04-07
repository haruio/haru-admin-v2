/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'

import debug from 'debug'
const log = debug('application:app.jsx')

import Header from '../components/Layout/Header'
import LeftMenu from '../components/Layout/LeftMenu'

import AppAction from '../actions/AppActions'
import {POPUP} from '../constants/AppConstants'

import Popup from '../components/Popup'
import MemberPopup from '../components/Popup/MemberPopup'
import HistoryPopup from '../components/Popup/HistoryPopup'
import RejectPopup from '../components/Popup/RejectPopup'
import PublishPopup from '../components/Popup/PublishPopup'
import MainFeedPopup from '../components/Popup/MainFeedPopup'
import PublishedContentPopup from '../components/Popup/PublishedContentPopup'
import ContentDetailPopup from '../components/ContentDetailPopUp'
/*
import ga from 'react-google-analytics'
var GAInitiailizer = ga.Initializer
*/
import Alert from 'react-s-alert';

export default class App extends React.Component {
  constructor(props) {
    super(props)

    AppAction.getChannels()
    AppAction.getCategories()
  }

  componentDidMount() {
    //GA initalize
    //var GA_TRACKING_CODE = 'UA-53731828-10'
    //ga('create', GA_TRACKING_CODE, 'auto')

  }
  render() {
    return (
      <section>
        <Header />
        <section id="container">
          <LeftMenu/>
          {this.props.children}
        </section>
        <Popup>
          <MemberPopup key={POPUP.MEMBER}/>
          <HistoryPopup key={POPUP.HISTORY}/>
          <RejectPopup key={POPUP.REJECT}/>
          <PublishPopup key={POPUP.PUBLISH}/>
          <MainFeedPopup key={POPUP.MAINFEED}/>
          <PublishedContentPopup key={POPUP.PUBLISHEDCONTENT}/>
          <ContentDetailPopup key={POPUP.CONTENTDETAIL}/>
        </Popup>
        <Alert stack={{limit: 3}} />
      </section>
    )
  }
  //<GAInitiailizer />
}

//import ContentDetailPopup from '../../components/ContentDetailPopUp'

