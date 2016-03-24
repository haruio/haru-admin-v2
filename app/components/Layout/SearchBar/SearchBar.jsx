import React from 'react'

import debug from 'debug'
const log = debug('application:ContentDetailPopup.jsx')

import intlStores from '../../../utils/IntlStore'
/**
 * A component to TabMenu
 * author : jungun.park
 */


export default class SearchBar extends React.Component {
  searchContents() {

  }

  render() {
    return (
      <fieldset id="search_box">
        <p>
          <label>{intlStores.get('common.COMMON_FLD_SEARCH_ITEM')}</label>
          <select id="searchType">
            <option value="">{intlStores.get('cms.CMS_FLD_CONTENT_TYPE')}</option>
            <option value="VDO">{intlStores.get('cms.MENU_TXT_CONTENT_TYPE_VIDEO')}</option>
            <option value="IMS">{intlStores.get('cms.MENU_TXT_CONTENT_TYPE_IMAGE')}</option>
          </select>
        </p>
        <p>
          <select id="searchChannel">
            <option value="">{intlStores.get('cms.CMS_FLD_CHANNEL')}</option>

          </select>
        </p>
        <p>
          <select id="searchCategory">
            <option value="">{intlStores.get('cms.CMS_FLD_CATEGORY')}</option>
          </select>
        </p>
        <p>
          <select id="searchField">
            <option value="TITLE">{intlStores.get('cms.CMS_FLD_TITLE')}</option>
            <option value="AUTHOR">{intlStores.get('cms.CMS_FLD_CREATOR')}</option>
          </select>
        </p>
        <input type="text" placeholder="Search" id="searchText" /><a onClick={this.searchContents} className="btn_search"></a>
      </fieldset>
    )
  }
}
