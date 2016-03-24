/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Link} from 'react-router'
import debug from 'debug'
const log = debug('application:Compose.jsx')

import MetaPanel from '../../components/MetaPanel'
import ContentAddImageZone from '../../components/ContentAddImageZone'
// 이미지 에서만 사용됨
import ContentDetailPopup from '../../components/ContentDetailPopUp'

import intlStores from '../../utils/IntlStore'

/**
 * A page to Compose
 * 컨텐츠를 작성하는 페이지 (video type, image type)
 * author : jungun.park
 */
export default class Compose extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

  }

  componentDidMount() {

  }
  render() {
    let infopanel = 'video'

    const router = this.context.router
    const isimage = router.isActive('/content/compose/image')
    if(isimage) {
      infopanel = 'image'
    }

    return (
        <article id="contents_add" className="add">
          <ul id="tab_menu">
            <li><Link to="/content/compose/video" activeClassName="on">Video Type</Link></li>
            <li><Link to="/content/compose/image" activeClassName="on">Image Type</Link></li>
          </ul>
          <MetaPanel infopanel={{ type:infopanel }}/>
          <ContentAddImageZone />
        </article>
    )
  }
}
//        <ContentDetailPopup />
