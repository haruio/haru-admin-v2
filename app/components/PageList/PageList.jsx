import React from 'react'


import debug from 'debug'
const log = debug('application:PageList.jsx')

const paging1 = require('image!../../assets/img/paging1.png')
const paging2 = require('image!../../assets/img/paging2.png')


/**
 * A component to PageList
 * author : jungun.park
 */
export default class PageList extends React.Component {
  static defaultProps = {
    pageObj : {
      startPageNo: 0,
      endPageNo: 0,
      pageNo:0,
      prevPageNo:0,
      nextPageNo:0
    },
    clickAction : () => {}
  }

  static propTypes = {
    pageObj: React.PropTypes.object.isRequired
  }

  render() {
    let page = this.props.pageObj

    let list = []
    for (let i = page.startPageNo; i <= page.endPageNo; i++) {
      if (i == page.pageNo) {
        list.push(<a key={i} className="on">{i}</a>)
      } else {
        list.push(<a key={i} onClick={this.props.clickAction.bind(null, i)}>{i}</a>)
      }
    }

    return (
      <p className="pagination">
        <a onClick={this.props.clickAction.bind(null, page.prevPageNo)}><img src={paging1} alt="Prev"/></a>
      <span>
      {list}
      </span>
        <a onClick={this.props.clickAction.bind(null, page.nextPageNo)}><img src={paging2} alt="Next"/></a>
      </p>
    )
  }
}
