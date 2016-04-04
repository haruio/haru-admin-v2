/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Container} from 'flux/utils'
import debug from 'debug'
const log = debug('application:MyContent.jsx')

import TabMenu from '../../components/Layout/TabMenu'
import MyContentHead from '../../components/MyContentHead'
import ContentList from '../../components/ContentList'
import intlStores from '../../utils/IntlStore'

import { CONTENT } from '../../constants/AppConstants'
import ContentActions from '../../actions/ContentActions'
import MyContentListStore from '../../stores/MyContentListStore'

export default class MyContent extends React.Component {
  static getStores() {
    return [MyContentListStore]
  }

  static calculateState() {
    return {
      writing: MyContentListStore.getContentsInWriting(),
      ready: MyContentListStore.getContentsInReady(),
      reject: MyContentListStore.getContentsInReject(),
      searchType: MyContentListStore.getSearchType()
    }
  }

  componentWillMount() {
    ContentActions.getMyContents()
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollListener)
    this.scrollListener()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener)
  }

  scrollListener = () => {
    // get current scroll position
    const waitingpos = ReactDOM.findDOMNode(this.refs.waiting).offsetTop - 300
    const returnpos = ReactDOM.findDOMNode(this.refs.return).offsetTop - 310

    // validate changesection function
    const change = this.refs.mycontenthead.changeSection
    if (change === undefined) {
      return
    }

    if (this.currentScrollPosition >= waitingpos
      && this.currentScrollPosition <= returnpos) {
      change(CONTENT.WAITING)
    } else if (this.currentScrollPosition >= returnpos) {
      change(CONTENT.RETRUN)
    } else {
      change(CONTENT.CREATE)
    }
  }

  /***
   * Get Current ScrollPosition
   * return {number} - current scroll position value.
   */
  get currentScrollPosition() {
    return (window.pageYOffset !== undefined) ?
      window.pageYOffset :
      (document.documentElement || document.body.parentNode || document.body).scrollTop
  }

  render() {
    return (
      <article id="my_contents" ref="mycontent">
        <TabMenu onSearch={ContentActions.getMyContents}  searchType={this.state.searchType} />
        <MyContentHead ref="mycontenthead" moveSection={this.moveSection} />
        <ContentList ref="create"  listId="create"  listTitle={intlStores.get('cms.CMS_FLD_CREATING')} content={this.state.writing} type={CONTENT.CREATE}/>
        <ContentList ref="waiting" listId="waiting" listTitle={intlStores.get('cms.CMS_FLD_WAITING')}  content={this.state.ready} type={CONTENT.WAITING}/>
        <ContentList ref="return"  listId="return"  listTitle={intlStores.get('cms.CMS_FLD_REJECT')}   content={this.state.reject} type={CONTENT.RETRUN}/>
        {/* TODO: 밑에 공백이 필요해서 더 좋은 방법을 찾아보자 */}
        <div style={{ height:'600px' }}></div>
      </article>
    )
  }


  /***
   * PageList click event
   * @param page {String} - move page number
   */
  moveSection = (index) => {
    let scrollPosition = 0

    if (index == 2) {
      const waitingel = ReactDOM.findDOMNode(this.refs.waiting)
      scrollPosition = waitingel.offsetTop - 300

    } else if (index == 3) {
      const returnel = ReactDOM.findDOMNode(this.refs.return)
      scrollPosition = returnel.offsetTop - 300
    }

    $('html, body').animate({scrollTop: scrollPosition}, 400)
  }
}

const MyContentContainer = Container.create(MyContent)
export default MyContentContainer
