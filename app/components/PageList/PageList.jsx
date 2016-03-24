import React, {propType} from 'react'


import debug from 'debug'
const log = debug('application:PageList.jsx')

const paging1 = require('image!../../assets/img/paging1.png')
const paging2 = require('image!../../assets/img/paging2.png')

import ImmutablePropTypes from 'react-immutable-proptypes'

/**
 * A component to PageList
 * author : jungun.park
 */
export default class PageList extends React.Component {
  static propTypes = {
    pageObj: ImmutablePropTypes.map,
    clickAction:React.PropTypes.func
  }

  render() {
    const page = this.props.pageObj
    let list = []
    const endpageno = page.get('endPageNo')
    for (let i = page.get('startPageNo'); i <= endpageno; i++) {
      if (i == page.get('pageNo')) {
        list.push(<a key={i} className="on">{i}</a>)
      } else {
        list.push(<a key={i} onClick={this.props.clickAction.bind(null, i)}>{i}</a>)
      }
    }

    return (
      <p className="pagination">
        <a onClick={this.props.clickAction.bind(null, page.get('prevPageNo'))}><img src={paging1} alt="Prev"/></a>
      <span>
      {list}
      </span>
        <a onClick={this.props.clickAction.bind(null, page.get('nextPageNo'))}><img src={paging2} alt="Next"/></a>
      </p>
    )
  }
}
