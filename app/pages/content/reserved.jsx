/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Container} from 'flux/utils'

import debug from 'debug'
const log = debug('application:Reserved.jsx')

import TabMenu from '../../components/Layout/TabMenu'
import SearchBar from '../../components/Layout/SearchBar'
import ContentList from '../../components/ContentList'
import PageList from '../../components/PageList'

import intlStores from '../../utils/IntlStore'
import { CONTENT } from '../../constants/AppConstants'

import ContentActions from '../../actions/ContentActions'
import ContentListStore from '../../stores/ContentListStore'
import PaginationStore from '../../stores/PaginationStore'

class Reserved extends React.Component {
  static getStores() {
    return [ContentListStore, PaginationStore]
  }

  static calculateState() {
    return {
      reserved: ContentListStore.getContentList(),
      pagination: PaginationStore.getPagination()
    }
  }


  componentWillMount() {
    ContentActions.getReservedContents()
  }

  movePage() {

  }

  render() {
    return (
      <article id="contents_list">
        <TabMenu />
        <SearchBar />
        <ContentList listTitle={intlStores.get('cms.MENU_TXT_SCHEDULED_CONTENTS')} content={this.state.reserved} type={CONTENT.RESERVED}/>
        <PageList pageObj={this.state.pagination} clickAction={this.movePage} />
      </article>
    )
  }
}

const ReservedContainer = Container.create(Reserved)
export default ReservedContainer
