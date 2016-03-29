/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Container} from 'flux/utils'
import {Link} from 'react-router'
import debug from 'debug'
const log = debug('application:Compose.jsx')

import MetaPanel from '../../components/MetaPanel'
import ContentAddZone from '../../components/ContentAddZone'
// 이미지 에서만 사용됨
//import ContentDetailPopup from '../../components/ContentDetailPopUp'

import ContentDetailStore from '../../stores/ContentDetailStore'
import CategoryStore from '../../stores/CategoryStore'
import ChannelStore from '../../stores/ChannelStore'

import ContentActions from '../../actions/ContentActions'

/**
 * A page to Compose
 * 컨텐츠를 작성하는 페이지 (video type, image type)
 * author : jungun.park
 */
class Compose extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  static getStores() {
    return [ContentDetailStore, CategoryStore, ChannelStore]
  }

  static calculateState() {
    return {
      content: ContentDetailStore.getContent(),
      categories: CategoryStore.getCategories(),
      channels: ChannelStore.getChannels()
    }
  }

  componentDidMount() {

    // param이 있고 postdetail이 없는 경우 서버에 요청함
    if (this.props.params.id !== undefined) {
      ContentActions.getContent(this.props.params.id)
    } else {
      setTimeout(() => {
        ContentActions.clearContent()
      })
    }
  }

  render() {
    const router = this.context.router
    const isimage = router.isActive('/content/compose/image')

    let type = 'video'
    if(isimage) {
      type = 'image'
    }
    return (
        <article id="contents_add" className="add">
          <ul id="tab_menu">
            <li><Link to="/content/compose/video" activeClassName="on">Video Type</Link></li>
            <li><Link to="/content/compose/image" activeClassName="on">Image Type</Link></li>
          </ul>
          <MetaPanel type={type}
                     categories={this.state.categories}
                     channels={this.state.channels}
                     content={this.state.content} />
          <ContentAddZone type={type}
                          content={this.state.content} />
        </article>
    )
  }
}
//        <ContentDetailPopup />
const ComposeContainer = Container.create(Compose)
export default ComposeContainer
