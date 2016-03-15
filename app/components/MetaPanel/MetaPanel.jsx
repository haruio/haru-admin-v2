import React from 'react'


import debug from 'debug'
const log = debug('application:MetaPanel.jsx')

import ImageInfoPanel from './ImageMetaPanel'
import VideoInfoPanel from './VideoMetaPanel'

/**
 * A component to MetaPanel
 * 컨텍츠 작성시 메타 정보를 입력하는 패널
 * author : jungun.park
 */

export default class MetaPanel extends React.Component {
  get InfoPanelComponent() {
    switch (this.props.infopanel.type) {
      case 'image' :
        return ImageInfoPanel
      case 'video' :
        return VideoInfoPanel
    }
  }

  render() {
    return React.createElement(this.InfoPanelComponent, this.props)
  }
}
