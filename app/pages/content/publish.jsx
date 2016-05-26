/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Container} from 'flux/utils'

import debug from 'debug'
const log = debug('application:Publish.jsx')

import TabMenu from '../../components/Layout/TabMenu'
import SearchBar from '../../components/Layout/SearchBar'

import ContentList from '../../components/ContentList'
import PageList from '../../components/PageList'

import intlStores from '../../utils/IntlStore'
import { CONTENT } from '../../constants/AppConstants'

import ContentActions from '../../actions/ContentActions'
import ContentListStore from '../../stores/ContentListStore'
import PaginationStore from '../../stores/PaginationStore'
import SearchOptStore from '../../stores/SearchOptionStore'

class Publish extends React.Component {
  static getStores() {
    return [ContentListStore, PaginationStore, SearchOptStore]
  }

  static calculateState() {
    return {
      publish: ContentListStore.getContentList(),
      pagination: PaginationStore.getPagination(),
      searchType : ContentListStore.getSearchType(),
      searchOpt : SearchOptStore.getSearchOption()
    }
  }

  componentWillMount() {
    ContentActions.getViewedContents()
  }

  render() {
    return (
      <article id="contents_list">
        <TabMenu onSearch={ContentActions.getViewedContents} searchType={this.state.searchType} />
        <SearchBar onSearch={ContentActions.getViewedContents} searchType={this.state.searchType}/>
        <ContentList listTitle={intlStores.get('cms.MENU_TXT_SUBMITTED_CONTENTS')}  content={this.state.publish} type={CONTENT.PUBLISHED}/>
        <PageList pageObj={this.state.pagination} clickAction={this.movePage} />
      </article>
    )
  }

  /***
   * PageList click event
   * @param page {String} - move page number
   */
  movePage = (page) => {
    const orderField= this.state.searchOpt.get('orderField')
    const orderMethod= this.state.searchOpt.get('orderMethod')
    const searchField=  this.state.searchOpt.get('searchField')
    const searchText= this.state.searchOpt.get('searchText')
    const channel =  this.state.searchOpt.get('channel')
    const categories =  this.state.searchOpt.get('categories')

    let searchType = this.state.searchType
    if (searchType == 'ALL') {
      searchType = ''
    }
    ContentActions.getViewedContents(page, 30, orderField, orderMethod, searchField, searchText, channel, categories, searchType)
  }

}

const PublishContainer = Container.create(Publish)
export default PublishContainer
