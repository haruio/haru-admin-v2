import React from 'react'

import debug from 'debug'
const log = debug('application:ContentAddMovieZone.jsx')

import intlStores from '../../../../utils/IntlStore'

const btn_close = require('image!../../../../assets/img/btn_close.png')

import ContentActions from '../../../../actions/ContentActions'

/**
 * A component to SubContentItem
 * Video의 subcontent item을 표현함
 * 두가지 타입이 있음 image + text, only text
 * author : jungun.park
 */
export default class SubContentItem extends React.Component {
  render() {
    const content = this.props.content

    if (content.get('type') === 'IMG') {
      return (
        <li key={content.get('contentSeq')}>
          <p ref="targetimg" className="img"
             onDragEnter={this.imgEnter}
             onDragLeave={this.imgLeave}
             onDragOver={this.imgOver}
             onDrop={this.imgDrop}>
            {this.renderSubcontentImg}
          </p>
          <p className="text">
              <textarea placeholder={intlStores.get('cms.CMS_MSG_ERROR_DESC')}
                        ref="body"
                        defaultValue={content.get('body')}
                        onBlur={this.onSubContentUpdate.bind(this, content.get('contentSeq'))}></textarea>
          </p>
          <input type="image" src={btn_close} alt="닫기" onClick={this.clickRemoveBtn.bind(this, content.get('contentSeq'))}/>
        </li>)
    } else {
      return (
        <li key={content.get('contentSeq')}>
          <p className="text">
            <textarea placeholder={intlStores.get('cms.CMS_MSG_ERROR_DESC')}
                      defaultValue={content.get('body')}
                      onBlur={this.onSubContentTextUpdate.bind(this, content.get('contentSeq'))}></textarea>
          </p>
          <input type="image" src={btn_close} alt="닫기" onClick={this.clickRemoveBtn.bind(this, content.get('contentSeq'))}/>
        </li>)
    }
  }

  get renderSubcontentImg() {
    let content = this.props.content

    if (content.get('contentUrl') === '') {
      return <b className="info">{intlStores.get('cms.CMS_TXT_DRAG_IMAGE')}</b>
    } else {
      return <img src={content.get('contentUrl')} alt="image"/>
    }
  }

  /***
   * 비디오 타입의 포스트에서 서브 컨텐츠 중 텍스트만 있는 서브 컨텐츠를 수정하는 함수
   * 검수 상태에서는 활용할 수 없음
   * @param contentSeq {String} - 변경하는 content의 contentSeq
   * @param e {SyntheticEvent} -  onBlur Event object. 변경된 값을 가져오기 위해서
     */
  onSubContentTextUpdate(contentSeq, e) {
    if(this.props.inspection) {
      return
    }

    ContentActions.updateSubContent({
      contentSeq: contentSeq,
      type: 'TXT',
      body: e.target.value,
      contentResourceSeq: ''
    })
  }

  /***
   * 비디오 타입의 포스트에서 서브 컨텐츠 중 이미지+텍스트가 있는 서브 컨텐츠를 수정하는 함수
   * 검수 상태에서는 활용할 수 없음
   * @param contentSeq {String} - 변경하는 content의 contentSeq
   * @param e {SyntheticEvent} -  onBlur Event object. 변경된 값을 가져오기 위해서
   */
  onSubContentUpdate(contentSeq, e) {
    if(this.props.inspection) {
      return
    }

    ContentActions.updateSubContent({
      contentSeq: contentSeq,
      type: 'IMG',
      contentUrl: this.props.content.get('contentUrl'),
      body: e.target.value,
      contentResourceSeq: ''
    })
  }

  /***
   * 해당 서브 컨텐츠 삭제하는 함수
   * @param contentSeq {String} - 삭제할 컨텐츠의 ContentSeq
     */
  clickRemoveBtn(contentSeq) {
    ContentActions.deleteSubContent(contentSeq)
  }

  /**
   * 이미지 드래그 후 타겟 영역에 마우스가 들어왔을 때, 해당 타겟 영역의 라인스타일을 도트로 바꿈
   */
  imgEnter = (e) => {
    e.stopPropagation()
    e.preventDefault()
    this.refs.targetimg.style.border = '2px solid #d2d2d4'
  }

  /**
   * 타겟 영역에 마우스 오버 이벤트 제거
   */
  imgOver = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  /**
   * 타겟 영역에서 마우스 leave 시
   */
  imgLeave = (e) => {
    e.preventDefault()
    this.refs.targetimg.style.border = 'none'
  }

  /**
   * 이미지 드래그 후 타겟 영역에 아이템을 드랍.
   * 해당 타겟 영역의 라인 스타일을 이전으로 되돌림.
   * 파일 업로드 요청
   */
  imgDrop = (e) => {
    // 검수 상태에서 이미지 교체를 못하도록 막는다
    if(this.props.inspection) {
      return
    }
    e.preventDefault()

    // style에서 border를 지움
    this.refs.targetimg.style.border = 'none'
    let file = e.nativeEvent.dataTransfer.files[0]
    this._sendFileToServer(file)
  }

  /**
   * 서버로 이미지 전송
   */
  _sendFileToServer(file) {
    const contentSeq = this.props.content.get('contentSeq')
    ContentActions.uploadImageupdateSubContent(file, contentSeq, this.refs.body.value)
  }
}
