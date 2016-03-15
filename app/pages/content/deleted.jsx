/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'

import debug from 'debug'
const log = debug('application:Inspection.jsx')

import TabMenu from '../../components/Layout/TabMenu'
import SearchBar from '../../components/Layout/SearchBar'

import ContentList from '../../components/ContentList'
import PageList from '../../components/PageList'

import intlStores from '../../stores/IntlStore'
import { CONTENT } from '../../constants/AppConstants'

export default class Deleted extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pagination : {
        startPageNo: 0,
        endPageNo: 0,
        pageNo:0,
        prevPageNo:0,
        nextPageNo:0
      }
    }
  }

  movePage() {

  }

  render() {
    return (
      <article id="contents_list">
        <TabMenu />
        <SearchBar />
        <ContentList listTitle={intlStores.get('cms.MENU_TXT_DELETED_CONTENTS')} type={CONTENT.DELETEED}/>
        <PageList pageObj={this.state.pagination} clickAction={this.movePage} />
      </article>
    )
  }
}
