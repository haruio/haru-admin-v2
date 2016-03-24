import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'


import debug from 'debug'
const log = debug('application:ContentList.jsx')

import ContentListItem from '../ContentListItem'

/**
 * A component to ContentList
 * author : jungun.park
 */

export default class ContentList extends React.Component {
  static defaultProps = {
    listId: 'list'
  }

  static propTypes = {
    listId: React.PropTypes.string,
    listTitle: React.PropTypes.string.isRequired,
    content: ImmutablePropTypes.list
  }

  get EmptyElement() {
    return <div className="empty">
      <p>{this.props.listTitle} 컨텐츠가 없습니다.</p>
    </div>
  }

  get listItem() {
    if(this.props.content.size == 0) {
      return this.EmptyElement
    } else {
      return this.props.content.map((con, i) => {
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
