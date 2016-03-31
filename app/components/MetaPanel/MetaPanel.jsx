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
  // TODO : 공통적인 요소가 많지만 rendering 리프레시가 필요하여 추구헤 리팩토링을 해야할듯
  // 첫번째는 애니메이션 때문에 분리하게 되었었다.
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
