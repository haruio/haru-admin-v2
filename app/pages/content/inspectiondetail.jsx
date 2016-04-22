/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Container} from 'flux/utils'
import {Link} from 'react-router'
import debug from 'debug'
import cn from 'classnames'
const log = debug('application:Compose.jsx')

import MetaPanel from '../../components/MetaPanel'
import ContentAddZone from '../../components/ContentAddZone'

import ContentDetailStore from '../../stores/ContentDetailStore'
import CategoryStore from '../../stores/CategoryStore'
import ChannelStore from '../../stores/ChannelStore'

import ContentActions from '../../actions/ContentActions'
import intlStores from '../../utils/IntlStore'
import {PUBLISH} from '../../constants/AppConstants'
import Alert from 'react-s-alert'


/**
 * A page to Compose
 * 컨텐츠를 작성하는 페이지 (video type, image type) 에서 대부분에 소스를 가져옴
 * author : jungun.park
 */
class InspectionDetail extends React.Component {
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

  componentWillReceiveProps(prevProps) {
    if (this.props !==  prevProps.params) {
      ContentActions.changeContentType(this._changeContentType())
    }
  }

  componentDidMount() {
    // param이 있고 postdetail이 없는 경우 서버에 요청함
    if (this.props.params.id !== undefined) {
      ContentActions.getContent(this.props.params.id)
    } else {
      setTimeout(() => {
        ContentActions.clearContent(this._changeContentType())
      })
    }
    this._documentDragEventPrevent()
  }

  _changeContentType = () => {
    let type = 'VDO'
    if(this.context.router.isActive('/content/compose/image')) {
      type = 'IMS'
    }
    return type
  }
  /**
   * drag drop 영역 외에 이미지 끌어다 놓을 경우, 브라우저에 이미지미리보기 되는 이벤트 제거
   */
  _documentDragEventPrevent() {
    const eventPrevent = (e) => {
      e.stopPropagation()
      e.preventDefault()
    }
    $(document).on('dragenter', eventPrevent)
    $(document).on('dragover', eventPrevent)
    $(document).on('drop', eventPrevent)
  }

  render() {
    let type = 'video'
    if(this.context.router.isActive('/content/compose/image')) {
      type = 'image'
    }

    // edit로 들어오면 탭이동이 불가능함 disabled-link css를 통해서 처리
    return (
        <article id="contents_add" className="add">
          <ul id="tab_menu">
            <li><Link to="/content/inspection/video" activeClassName="on" className={cn({'disabled-link' : this.props.params.id !== undefined})}>Video Type</Link></li>
            <li><Link to="/content/inspection/image" activeClassName="on" className={cn({'disabled-link' : this.props.params.id !== undefined})}>Image Type</Link></li>
          </ul>
          <MetaPanel type={type}
                     inspection={true}
                     categories={this.state.categories}
                     channels={this.state.channels}
                     content={this.state.content} />
          <ContentAddZone type={type}
                          inspection={true}
                          content={this.state.content}
                          onSubmit={this.onSubmit}/>
        </article>
    )
  }

  onSubmit = (submitType) => {

  }
}
const InspectionDetailContainer = Container.create(InspectionDetail)
export default InspectionDetailContainer
