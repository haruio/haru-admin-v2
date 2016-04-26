import React from 'react'

import debug from 'debug'
const log = debug('application:ContentAddZone.jsx')

import ContentAddImageZone from './ContentAddImageZone'
import ContentAddMovieZone from './ContentAddMovieZone'
/**
 * A component to ContentAddImageZone
 * author : jungun.park
 */
export default class ContentAddZone extends React.Component {
  render() {
    return React.createElement(this.InfoPanelComponent, this.props)
  }

  get InfoPanelComponent() {
    switch (this.props.type) {
      case 'image' :
        return ContentAddImageZone
      case 'video' :
        return ContentAddMovieZone
    }
  }
}
