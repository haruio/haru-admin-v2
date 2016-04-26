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
            <li><Link to="/content/compose/video" activeClassName="on" className={cn({'disabled-link' : this.props.params.id !== undefined})}>Video Type</Link></li>
            <li><Link to="/content/compose/image" activeClassName="on" className={cn({'disabled-link' : this.props.params.id !== undefined})}>Image Type</Link></li>
          </ul>
          <MetaPanel type={type}
                     inspection={false}
                     categories={this.state.categories}
                     channels={this.state.channels}
                     content={this.state.content} />
          <ContentAddZone type={type}
                          inspection={false}
                          content={this.state.content}
                          onSubmit={this.onSubmit}/>
        </article>
    )
  }

  onSubmit = (submitType) => {
    // validation
    log(this.state.content.toJS())
    if(this.state.content.get('title') === '') {
      Alert.info('타이틀을 입력해주세요', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
      return
    }

    if(this.state.content.get('thumbnail') === '') {
      Alert.info('섬네일 등록해주십시오', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
      return
    }

    if(this.state.content.get('shareImage') === '') {
      Alert.info('공유화면 이미지를 등록해주십시오', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
      return
    }

    if(this.state.content.get('channelSeq') === null) {
      Alert.info('채널을 선택해주세요', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
      return
    }
    if(this.state.content.get('categoriesSeq').size === 0) {
      Alert.info('카테고리를 선택해주세요', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
      return
    }

    if(this.state.content.get('categoriesSeq').size >= 4) {
      Alert.info('최대 4개까지 카테고리 선택이 가능합니다.', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
      return
    }


    if(submitType == PUBLISH.TEMP) {
      ContentActions.saveTemporaryContent(this.state.content.toJS())
    } else if(submitType == PUBLISH.APPROVE) {
      //승인요청
      // "/contents/pending/request";
      if (window.confirm(intlStores.get('cms.CMS_MSG_NEED_APPROVE'))) {
        ContentActions.appoveContent(this.state.content.toJS(), () => {
          this.context.router.push('/content/mycontent')
        })
      }
    }
  }
}
const ComposeContainer = Container.create(Compose)
export default ComposeContainer
