/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Container} from 'flux/utils'

import debug from 'debug'
const log = debug('application:Deleted.jsx')

import TabMenu from '../../components/Layout/TabMenu'
import SearchBar from '../../components/Layout/SearchBar'

import ContentList from '../../components/ContentList'
import PageList from '../../components/PageList'

import intlStores from '../../utils/IntlStore'
import { CONTENT } from '../../constants/AppConstants'

import ContentActions from '../../actions/ContentActions'
import ContentListStore from '../../stores/ContentListStore'
import PaginationStore from '../../stores/PaginationStore'

class Deleted extends React.Component {
  static getStores() {
    return [ContentListStore, PaginationStore]
  }

  static calculateState() {
    return {
      deleted: ContentListStore.getContentList(),
      pagination: PaginationStore.getPagination(),
      searchType : ContentListStore.getSearchType()
    }
  }

  componentWillMount() {
    ContentActions.getDeleteContents()
  }
  movePage = (page) => {
    let searchType = this.state.searchType
    if (searchType == 'ALL') {
      searchType = ''
    }
    ContentActions.getViewedContents(page, 30, '', '',
      '',
      '',
      '',
      '',
      searchType)
  }

  render() {
    return (
      <article id="contents_list">
        <TabMenu onSearch={ContentActions.getDeleteContents} searchType={this.state.searchType} />
        <SearchBar onSearch={ContentActions.getDeleteContents} searchType={this.state.searchType}/>
        <ContentList listTitle={intlStores.get('cms.MENU_TXT_DELETED_CONTENTS')} content={this.state.deleted} type={CONTENT.DELETEED}/>
        <PageList pageObj={this.state.pagination} clickAction={this.movePage} />
      </article>
    )
  }
}

const DeletedContainer = Container.create(Deleted)
export default DeletedContainer
