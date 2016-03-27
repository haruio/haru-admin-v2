import React from 'react'


import debug from 'debug'
const log = debug('application:MetaPanel.jsx')

import ImageMetaPanel from './ImageMetaPanel'
import VideoMetaPanel from './VideoMetaPanel'

/**
 * A component to MetaPanel
 * 컨텍츠 작성시 메타 정보를 입력하는 패널
 * author : jungun.park
 */

export default class MetaPanel extends React.Component {
  get InfoPanelComponent() {
    switch (this.props.type) {
      case 'image' :
        return ImageMetaPanel
      case 'video' :
        return VideoMetaPanel
    }
  }

  render() {
    return React.createElement(this.InfoPanelComponent, this.props)
  }
}
