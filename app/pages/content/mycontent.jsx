/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import debug from 'debug'
const log = debug('application:mycontent.jsx')

import TabMenu from '../../components/Layout/TabMenu'
import MyContentHead from '../../components/MyContentHead'
import ContentList from '../../components/ContentList'
import intlStores from '../../stores/IntlStore'

import { CONTENT } from '../../constants/AppConstants'

export default class MyContent extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollListener)
    this.scrollListener();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener)
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

  moveSection=(index) =>{
    let scrollPosition = 0

    if(index == 2) {
      const waitingel = ReactDOM.findDOMNode(this.refs.waiting)
      scrollPosition = waitingel.offsetTop - 300

    } else if (index == 3) {
      const returnel = ReactDOM.findDOMNode(this.refs.return)
      scrollPosition = returnel.offsetTop - 300
    }

    $('html, body').animate({ scrollTop: scrollPosition }, 400)
  }

  render() {
    return (
      <article id="my_contents" ref="mycontent">
        <TabMenu  />
        <MyContentHead ref="mycontenthead" moveSection={this.moveSection} />
        <ContentList ref="create"  listId="create"  listTitle={intlStores.get('cms.CMS_FLD_CREATING')} type={CONTENT.CREATE}/>
        <ContentList ref="waiting" listId="waiting" listTitle={intlStores.get('cms.CMS_FLD_WAITING')}  type={CONTENT.WAITING}/>
        <ContentList ref="return"  listId="return"  listTitle={intlStores.get('cms.CMS_FLD_REJECT')}   type={CONTENT.RETRUN}/>
        {/* TODO: 밑에 공백이 필요해서 더 좋은 방법을 찾아보자 */}
        <div style={{ height:'600px' }}></div>
      </article>
    )
  }
}
