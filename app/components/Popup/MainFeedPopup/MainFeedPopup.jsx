/**
 * Created by jungenpark on 3/22/16.
 */
import React from 'react'
import {Container} from 'flux/utils'
import cn from 'classnames'
import moment from 'moment'

import PageList from '../../PageList'
import PopupPaginationStore from '../../../stores/PopupPaginationStore'
import PublishedListStore from '../../../stores/PublishedListStore'
import ContentActions from '../../../actions/ContentActions'
import MainfeedDetailStore from '../../../stores/MainfeedDetailStore'

import debug from 'debug'
const log = debug('application:MainFeedPopup.jsx')

import ImageUploader from '../../ImageUploader'

import AppActions from '../../../actions/AppActions'
import {IMAGE_VALIDATION} from '../../../constants/AppConstants'
import Alert from 'react-s-alert'

class MainFeedPopup extends React.Component {

  static getStores() {
    return [PublishedListStore, PopupPaginationStore, MainfeedDetailStore]
  }

  static calculateState(prevState, props) {
    return {
      publish: PublishedListStore.getContentList(),
      pagination: PopupPaginationStore.getPagination(),
      selectedMainfeed : MainfeedDetailStore.getMainfeedbyIndex(props.feedIdx),
      selected: prevState ? prevState.selected : MainfeedDetailStore.getMainfeedbyIndex(props.feedIdx).get('postSeq')
    }
  }

  componentWillMount() {
    ContentActions.getPublishContents()
  }

  render() {
    log(this.props)
    return (
      <div className="pop_wrap">
        <div className="pop pop2" id="main_feed_add" onClick={this.clearEvent}>
          <h2>{this.props.title || '메인피드(컨텐츠) 등록'}<span><a onClick={this.props.close} className="btn_close"></a></span></h2>
          <fieldset id="search_box">
            <input type="text" placeholder="검색어를 입력해주세요." ref="searchtxt"  onKeyPress={this._handleKeyPress}/><a onClick={this.searchContents} className="btn_search"></a>
          </fieldset>
          <div className="table_wrap">
            <table className="listTable">
              <colgroup><col width="16%" />
                <col width="*" /><col width="6%" /><col width="6%" />
                <col width="16%" /><col width="12%" /></colgroup>
              <thead>
              <tr>
                <th>썸네일</th>
                <th colSpan="3">제목</th>
                <th>발행일시</th>
                <th>선택</th>
              </tr>
              </thead>
              <tbody>
              {this.renderPublishedList}
              </tbody>
            </table>
          </div>
          <PageList pageObj={this.state.pagination} clickAction={this.movePage} />
          {this.renderRegisterThumbnail}
          <p className="btn_c">
            <a onClick={this.registerMainFeed} className="purple">확인</a>
            <a onClick={this.onHandleCanceled} className="gray">취소</a>
          </p>
        </div>
      </div>
    )
  }

  get renderPublishedList() {
    return this.state.publish.map((item, i) => {
      const selected = cn({'on' : this.state.selected === item.get('postSeq')})

      return (<tr key={i} onClick={this.selectItem.bind(this, item.get('postSeq'))} style={{cursor:'pointer'}} className={selected}>
        <td><img src={item.get('thumbnailUrl')} alt="thumbnail" /></td>
        <td className="al">{item.get('postTitle')}</td>
        <td>{item.get('isMain') ? <span className="ico_main">Main</span> : null}</td>
        <td>{item.get('isReserved') ? <span className="ico_reserve">예약</span> : null}</td>
        <td>{moment(item.get('publishStartDt')).format('YYYY-MM-DD')}<br/>{moment(item.get('publishStartDt')).format('hh:mm')}</td>
        <td><a className="btn_select">선택</a></td>
      </tr>)
    })
  }

  get renderRegisterThumbnail() {
    return (<table className="writeTable">
      <colgroup><col width="90px" /><col width="*" /></colgroup>
      <tbody>
        <tr>
          <th>썸네일 등록</th>
          <ImageUploader id="thumbnailUrl"
                         type="MAINFEED"
                         ref="thumbnailUrl"
                         value={this.state.selectedMainfeed}
                         feedStyleCd={this.props.feedStyleCd}
                         uploadImage={this.uploadImage}
                         onClearImage={this.onClearImage}/>
        </tr>
      </tbody>
    </table>)
  }

  /***
   * ImageUploader 에서 이미지 업로드 오버라이드 구현체
   * @param e {*} - 이벤트 오브젝트
   * @param props {Object} - 해당 props값
     */
  uploadImage = (e, props) => {
    // 기전 이미지를 기존에 보낸 props값으로 받아냄.
    this.prethumbnail = props.value.get('thumbnailUrl')

    let imageid = props.id
    /* main feed 전용 */
    if (this.props.feedStyleCd === 'V') {
      imageid = 'thumbnailUrlCol'
    } else if (this.props.feedStyleCd === 'H') {
      imageid = 'thumbnailUrlRow'
    }

    AppActions.uploadMainFeedThumbnailImage(e.target.files[0], props.type,'thumbnailUrl',
      IMAGE_VALIDATION[props.type][imageid].width,
      IMAGE_VALIDATION[props.type][imageid].height,
      IMAGE_VALIDATION[props.type][imageid].size,
      this.props.feedIdx)
  }

  /***
   * 이미지 삭제
   * @param props {Object} - 삭제할경우 prethumbnail로 변경??? 버그 아닌 버그일듯. ㅋㅋㅋ
     */
  onClearImage = (props) => {
    AppActions.clearMainFeedThumbnailImage(this.props.feedIdx, this.prethumbnail)
  }

  /***
   * 엔터을 입력하면 컨텐츠 검색되도록 이벤트 처리
   * @param e
   * @private
     */
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.searchContents()
    }
  }

  /***
   * search contents 검색을 하는 함수
   *
   */
  searchContents = () => {
    let searchtxt = this.refs.searchtxt.value
    ContentActions.getPublishContents(1, 8, '', '', 'TITLE', searchtxt, '', '', '')
  }

  /***
   * Move Page
   * @param page {number} - 이동할 페이지
   */
  movePage(page) {
    ContentActions.getPublishContents(page)
  }

  /***
   * 메인피드 팝업에서 선택된 요소 변경하는 함수 
   * @param id {number} - 선택된 요소의 인덱스
     */
  selectItem = (id) => {
    this.setState({selected: id})
  }

  /***
   * 상위 이벤트가 하위에 내려오는 것을 맊는 기능
   * 팝업 밖을 클릭할때 팝업을 닫는 기능이 있는데 팝업을 누를때도 먹을 수 있어서 기능이 내려가지 않도록 stopPropagation함
   * @param e {MoveEvent} - click event clear
   */
  clearEvent(e) {
    e.stopPropagation()
  }

  /***
   * 메인피드 등록
   */
  registerMainFeed = () => {
    const selectedItem = PublishedListStore.getContentListById(this.state.selected)
    AppActions.updateMainFeedTemplate(this.props.feedIdx, selectedItem)
    this.props.close()
  }

  /***
   * 메인피드 등록 취소
   */
  onHandleCanceled = () => {
    AppActions.clearMainFeedThumbnailImage(this.props.feedIdx, this.prethumbnail || '')
    this.props.close()
  }
}

const MainFeedPopupContainer = Container.create(MainFeedPopup, {withProps: true})
export default MainFeedPopupContainer
