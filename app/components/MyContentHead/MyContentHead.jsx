import React from 'react'

import debug from 'debug'
const log = debug('application:MyContentHead.jsx')

import cn from 'classnames'
import { CONTENT } from '../../constants/AppConstants'

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
    // TODO : 다국어 처리
    return (
      <div id="contents_head">
        <dl>
          <dt><a onClick={this.MoveSection.bind(this, 1)}
                 className={cn({ 'on' : selectSection == CONTENT.CREATE })}>작성중</a><b>4</b></dt>
          <dd><a onClick={this.MoveSection.bind(this, 2)}
                 className={cn({ 'on' : selectSection ==  CONTENT.WAITING })}>승인대기</a><b>69</b></dd>
          <dd><a onClick={this.MoveSection.bind(this, 3)}
                 className={cn({ 'on' : selectSection == CONTENT.RETRUN })}>반려</a><b>1</b></dd>
        </dl>
        <fieldset id="search_box">
          <p>
            <label>검색조건</label>
            <select>
              <option>제목</option>
              <option>작성자</option>
              <option>프로그램</option>
            </select>
          </p>
          <input type="text" placeholder="Search"/><a href="" className="btn_search"></a>
        </fieldset>
      </div>
    )
  }

  changeSection = (index)=> {
    this.setState({ selectSection: index })
  }

  MoveSection(index) {
    this.props.moveSection(index)
  }
}
