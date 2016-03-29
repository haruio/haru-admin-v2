import React from 'react'
import {Container} from 'flux/utils'
import debug from 'debug'
const log = debug('application:SearchBar.jsx')

import intlStores from '../../../utils/IntlStore'
import immutable from 'immutable'
import CategoryStore from '../../../stores/CategoryStore'
import ChannelStore from '../../../stores/ChannelStore'


/**
 * A component to TabMenu
 * author : jungun.park
 */
class SearchBar extends React.Component {
  static defaultProps = {
    searchType:'ALL',
    onSearch : () => {}
  }

  static getStores() {
    return [CategoryStore, ChannelStore]
  }

  static calculateState() {
    return {
      categories: CategoryStore.getCategories(),
      channels: ChannelStore.getChannels()
    }
  }

  get categoriesList() {
    return this.state.categories.map((category) => {
      return <option key={category.get('categorySeq')}  value={category.get('categorySeq')}>{category.get('name')}</option>
    })
  }

  get channelList() {
    return this.state.channels.map((channel) => {
      return <option key={channel.get('channelSeq')} value={channel.get('channelSeq')}>{channel.get('name')}</option>
    })
  }


  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.searchContents()
    }
  }

  searchContents = () => {
    //(pageNo=1, pageSize=30, orderField='', orderMethod='', searchField='', searchText='') {
    let searchChannel = this.refs.searchChannel.value
    if(searchChannel === intlStores.get('cms.CMS_FLD_CHANNEL')) {
      searchChannel = ''
    }
    let searchCategory = this.refs.searchCategory.value
    if(searchCategory === intlStores.get('cms.CMS_FLD_CATEGORY')) {
      searchCategory = ''
    }
    let searchType = this.props.searchType
    if(searchType === 'ALL') {
      searchType = ''
    }

    this.props.onSearch(1, 30, '', '',
      this.refs.searchField.value,
      this.refs.searchText.value,
      searchChannel,
      searchCategory,
      searchType)
  }

  render() {
    return (
      <fieldset id="search_box">
        <p>
          <label>{intlStores.get('common.COMMON_FLD_SEARCH_ITEM')}</label>
        </p>
        <p>
          <select id="searchChannel" ref="searchChannel">
            <option value="">{intlStores.get('cms.CMS_FLD_CHANNEL')}</option>
            {this.channelList}
          </select>
        </p>
        <p>
          <select id="searchCategory" ref="searchCategory">
            <option value="">{intlStores.get('cms.CMS_FLD_CATEGORY')}</option>
            {this.categoriesList}
          </select>
        </p>
        <p>
          <select id="searchField" ref="searchField">
            <option value="TITLE">{intlStores.get('cms.CMS_FLD_TITLE')}</option>
            <option value="AUTHOR">{intlStores.get('cms.CMS_FLD_CREATOR')}</option>
          </select>
        </p>
        <input type="text" placeholder="Search" id="searchText" ref="searchText" onKeyPress={this._handleKeyPress}/>
        <a onClick={this.searchContents} className="btn_search"></a>
      </fieldset>
    )
  }
}
const SearchBarContainer = Container.create(SearchBar)
export default SearchBarContainer
