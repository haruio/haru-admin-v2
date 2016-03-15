import React from 'react'


import debug from 'debug'
const log = debug('application:PageList.jsx')

import ContentListItem from '../ContentListItem'
/**
 * A component to ContentList
 * author : jungun.park
 */

export default class ContentList extends React.Component {
  static defaultProps = {
    listId: 'list'
  };

  static propTypes = {
    listId: React.PropTypes.string,
    listTitle: React.PropTypes.string.isRequired
  };

  state = {
    content : [{}, {}]
  }

  componentDidMount() {
    //공통리스트 Hover 이벤트
    $('.list>li').hover(function () {
      $(this).find('div p').stop().fadeIn(300).stop().animate({ opacity:1 }, 100)
    }, function () {
      $(this).find('div p').stop().fadeOut(300)
    })
  }

  get EmptyElement() {
    return <div className="empty">
      <p>{this.props.listTitle} 컨텐츠가 없습니다.</p>
    </div>
  }

  get listItem() {
    if(this.state.content.length == 0) {
      return this.EmptyElement
    } else {
      return this.state.content.map((con, i) => {
        return (
          <ContentListItem key={i} content={con} type={this.props.type}/>
        )
      })
    }
  }

  render() {
    return (
      <div id={this.props.listId}>
        <h2>{this.props.listTitle + ' Contents'}</h2>
        <ul className="list">
          {this.listItem}
        </ul>
      </div>
    )
  }
}
