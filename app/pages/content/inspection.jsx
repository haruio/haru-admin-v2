/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Container} from 'flux/utils'

import debug from 'debug'
const log = debug('application:Inspection.jsx')

import TabMenu from '../../components/Layout/TabMenu'
import SearchBar from '../../components/Layout/SearchBar'

import ContentList from '../../components/ContentList'
import PageList from '../../components/PageList'

import intlStores from '../../utils/IntlStore'
import { CONTENT } from '../../constants/AppConstants'

import ContentActions from '../../actions/ContentActions'
import InspectionsStore from '../../stores/InspectionsStore'
import PaginationStore from '../../stores/PaginationStore'

class Inspection extends React.Component {
  static getStores() {
    return [InspectionsStore, PaginationStore]
  }

  static calculateState() {
    return {
      inspections: InspectionsStore.getInspectionContent(),
      pagination: PaginationStore.getPagination()
    }
  }

  componentWillMount() {
    ContentActions.getInspectionContent()
  }


  movePage() {

  }

  render() {
    return (
      <article id="contents_list" className="publish">
        <TabMenu />
        <SearchBar />
        <ContentList listTitle={intlStores.get('cms.MENU_TXT_CONTENTS_CHECKING')} content={this.state.inspections} type={CONTENT.INSPECTION}/>
        <PageList pageObj={this.state.pagination} clickAction={this.movePage} />
      </article>
    )
  }
}

const ReservedContainer = Container.create(Inspection)
export default ReservedContainer
