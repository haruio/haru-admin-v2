import React from 'react'

import debug from 'debug'
const log = debug('application:MyContentHead.jsx')

import cn from 'classnames'
import { CONTENT } from '../../constants/AppConstants'

import intlStores from '../../utils/IntlStore'
import ContentActions from '../../actions/ContentActions'
/**
 * A component to MyContentHead
 * author : jungun.park
 */
export default class MyContentHead extends React.Component {
  constructor(props) {
    super(props)

    this.state = { selectSection: 1 }
  }

  render() {
    const selectSection = this.state.selectSection
    return (
      <div id="contents_head">
        <dl>
          <dt><a onClick={this.MoveSection.bind(this, 1)}
                 className={cn({ 'on' : selectSection == CONTENT.CREATE })}>{intlStores.get('cms.CMS_FLD_CREATING')}</a><b>{this.props.writecnt}</b></dt>
          <dd><a onClick={this.MoveSection.bind(this, 2)}
                 className={cn({ 'on' : selectSection ==  CONTENT.WAITING })}>{intlStores.get('cms.CMS_FLD_WAITING')}</a><b>{this.props.readycnt}</b></dd>
          <dd><a onClick={this.MoveSection.bind(this, 3)}
                 className={cn({ 'on' : selectSection == CONTENT.RETRUN })}>{intlStores.get('cms.CMS_FLD_REJECT')}</a><b>{this.props.rejectcnt}</b></dd>
        </dl>
        <fieldset id="search_box">
          <p>
            <label>{intlStores.get('common.COMMON_FLD_SEARCH_ITEM')}</label>
            <select ref="searchField">
              <option value="TITLE">{intlStores.get('cms.CMS_FLD_TITLE')}</option>
              <option value="AUTHOR">{intlStores.get('cms.CMS_FLD_CREATOR')}</option>
            </select>
          </p>
          <input type="text" placeholder="Search" ref="searchText" onKeyPress={this._handleKeyPress} />
          <a onClick={this.searchContents} className="btn_search"></a>
        </fieldset>
      </div>
    )
  }

  /***
   * 검색창에서 엔터 입력시 검색이 되도록 하는 기능
   * @param e {KeyboardEvent} - 키보드 이벤트
     */
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.searchContents()
    }
  }

  /***
   * search contents 검색을 하는 함수
   */
  searchContents = () => {
    let searchType = this.state.searchType
    if (searchType == 'ALL') {
      searchType = ''
    }
    ContentActions.getMyContents(1, 30, '', '',
      this.refs.searchField.value,
      this.refs.searchText.value,
      '',
      '',
      searchType)
  }

  /***
   * Section을 변경하는 함수
   * @param index {Number} - 스크롤시에 해당 인덱스의 이미지를 변경하게 해줌
     */
  changeSection = (index)=> {
    this.setState({ selectSection: index })
  }

  /***
   * Section을 변경하는 함수
   * @param index {Number} - 해당 인덱스
   */
  MoveSection(index) {
    this.props.moveSection(index)
  }
}
