import React from 'react'
import cn from 'classnames'
import debug from 'debug'
const log = debug('application:TabMenu.jsx')

import ContentActions from '../../../actions/ContentActions'
/**
 * A component to TabMenu
 * author : jungun.park
 */


export default class TabMenu extends React.Component {
  static defaultProps = {
    searchType: 'ALL',
    onSearch: () => {}
  }

  changeSearchType(searchType) {
    if(searchType == 'ALL') {
      this.props.onSearch(1, 30)
    } else {
      this.props.onSearch(1, 30, '', '', '', '', '', '', searchType)
    }

    ContentActions.changeSearchType(searchType)
  }

  render() {
    return (
      <ul id="tab_menu">
        <li><a onClick={this.changeSearchType.bind(this, 'ALL')} className={cn({'on': this.props.searchType=='ALL'})}>All</a></li>
        <li><a onClick={this.changeSearchType.bind(this, 'VDO')} className={cn({'on': this.props.searchType=='VDO'})}>Video Type</a></li>
        <li><a onClick={this.changeSearchType.bind(this, 'IMS')} className={cn({'on': this.props.searchType=='IMS'})}>Image Type</a></li>
      </ul>
    )
  }
}
