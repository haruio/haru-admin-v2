import React from 'react'

import debug from 'debug'
const log = debug('application:ContentDetailPopup.jsx')


/**
 * A component to TabMenu
 * author : jungun.park
 */


export default class TabMenu extends React.Component {

  render() {
    return (
      <ul id="tab_menu">
        <li><a href="" className="on">All</a></li>
        <li><a href="">Image Type</a></li>
        <li><a href="">Video Type</a></li>
      </ul>
    )
  }
}
