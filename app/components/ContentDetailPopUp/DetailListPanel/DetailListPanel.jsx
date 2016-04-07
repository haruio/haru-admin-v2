import React from 'react'
import cn from 'classnames'
import debug from 'debug'
const log = debug('application:DetailListPanel.jsx')

const btn_prev = require('image!../../../assets/img/btn_prev.png')
const btn_next = require('image!../../../assets/img/btn_next.png')

/**
 * A component to ContentDetailPopup
 * TODO : 키보드로 이동시 cycle를 넘기는 기능까지는 구현이 안되어 있음
 * author : jungun.park
 */


export default class DetailListPanel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      contentSeq : props.contentSeq
    }
  }
  componentDidMount() {
    // detail list cycle
    $('#detail_list>div').cycle({
      fx: 'scrollHorz',
      timeout: 0,
      speed: '2000',
      after: onAfter,
      prev: '#prev_list',
      next: '#next_list'
    })
    function onAfter(curr, next, opts) {
      let index = opts.currSlide
      $('#prev_list')[index == 0 ? 'hide' : 'show']()
      $('#next_list')[index == opts.slideCount - 1 ? 'hide' : 'show']()
    }

    document.addEventListener('keydown', this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress)
  }

  render() {
    return (
      <div id="detail_list" onKeyPress={this.handleKeyPress}>
        <div>
          {this.renderDetailList}
        </div>
        <input type="image" src={btn_prev} alt="이전" id="prev_list" />
        <input type="image" src={btn_next} alt="다음" id="next_list" />
      </div>
    )
  }

  get renderDetailList() {
    const cnt = this.props.content.get('contents').size

    let detaillist = []
    for (let i = 0; cnt >= i; i += 7) {
      const list = this.props.content.get('contents').splice(i, 7).map((content) => {
        return <li key={content.get('contentSeq')}
                   className={cn({'on': content.get('contentSeq') === this.state.contentSeq})}
                   onClick={this.onClickListItem.bind(this, content.get('contentSeq'))}>
          <p style={{backgroundImage:'url('+content.get('contentUrl')+')'}}></p>
        </li>
      })

      detaillist.push(<ul key={i}>{list}</ul>)
    }
    return detaillist.reverse()
  }

  onClickListItem =(contentSeq) => {
    if(this.props.changeSelectedImage) {
      this.props.changeSelectedImage(contentSeq)
      this.setState({contentSeq : contentSeq})
    }
  }

  handleKeyPress = (e) => {
    const contents = this.props.content.get('contents')
    if (e.code === 'ArrowRight') {
      log( this.state.contentSeq)
      let index = contents.findIndex((item) => {
        return item.get('contentSeq') === this.state.contentSeq
      })

      if(index >= contents.size - 1 ) {
        index = contents.size - 1
      } else {
        index = index + 1
      }

      const nextseq = contents.get(index).get('contentSeq')
      if(this.props.changeSelectedImage) {
        this.props.changeSelectedImage(nextseq)
        this.setState({contentSeq : nextseq})
      }
    } else if (e.code === 'ArrowLeft') {
      let index = contents.findIndex((item) => {
        return item.get('contentSeq') === this.state.contentSeq
      })

      if(index === 0) {
        index = 0
      } else {
        index = index -1
      }

      const nextseq = contents.get(index).get('contentSeq')
      if(this.props.changeSelectedImage) {
        this.props.changeSelectedImage(nextseq)
        this.setState({contentSeq : nextseq})
      }
    } else if (e.code === 'Escape') {
      this.props.popClose()
    }
  }
}
