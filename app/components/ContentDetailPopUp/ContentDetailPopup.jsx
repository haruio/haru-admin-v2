import React from 'react'
import {Container} from 'flux/utils'

import debug from 'debug'
const log = debug('application:ContentDetailPopup.jsx')

const btn_pop_close = require('image!../../assets/img/btn_pop_close.png')

import PopupActions from '../../actions/PopupActions'
import {POPUP} from '../../constants/AppConstants'
import ContentDetailStore from '../../stores/ContentDetailStore'

import DetailInfoPanel from './DetailInfoPanel'
import DetailListPanel from './DetailListPanel'
/**
 * A component to ContentDetailPopup
 * history : 현재 선택된 이미지에 대한 state를 유지하기 위해서 여러 가지 방법을 고려해봤지만
 * Container 에서는 자기 자신에 state를 가질수 없기 때문에 component를 따로 만들었다
 * 하지만, 두 하위 컴포넌트 간에 통신을 위해서 어쩔수 없이 함수로 연결하는 방법을 택했다
 * 코드에 이해가 어려울 수 있음
 * author : jungun.park
 */
class ContentDetailPopup extends React.Component {
  static getStores() {
    return [ContentDetailStore]
  }

  static calculateState() {
    return {
      content: ContentDetailStore.getContent(),
    }
  }

  render() {

    return (
      <div id="contents_detail" onClick={this.clearEvent}>
        <DetailInfoPanel ref="detailinfo" contentSeq={this.props.contentSeq} content={this.state.content} />
        <DetailListPanel contentSeq={this.props.contentSeq}
                         content={this.state.content}
                         changeSelectedImage={this.changeSelectedImage}
                         popClose={this.popClose} />
        <input type="image" src={btn_pop_close} alt="닫기" className="pop_close" onClick={this.popClose} />
      </div>
    )
  }

  changeSelectedImage = (index) => {
    if(this.refs.detailinfo) {
      this.refs.detailinfo.changeSelectedImage(index)
    }
  }
  /***
   * 팝업을 닫는 이벤트
   * @param e {MoveEvent} - click event clear
   */
  popClose = (e) => {
    $('#contents_detail').animate({'margin-top': '-100%'}, 200)
    PopupActions.closePopup(POPUP.CONTENTDETAIL)
  }

  /***
   * 상위 이벤트가 하위에 내려오는 것을 맊는 기능
   * 팝업 밖을 클릭할때 팝업을 닫는 기능이 있는데 팝업을 누를때도 먹을 수 있어서 기능이 내려가지 않도록 stopPropagation함
   * @param e {MoveEvent} - click event clear
   */
  clearEvent(e) {
    e.stopPropagation()
  }
}

const ContentDetailPopupContainer = Container.create(ContentDetailPopup)
export default ContentDetailPopupContainer
