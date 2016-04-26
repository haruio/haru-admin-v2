import React from 'react'


import debug from 'debug'
const log = debug('application:MetaPanel.jsx')

import intlStores from '../../utils/IntlStore'
import ImageUploader from '../ImageUploader'

import ReactTags from 'react-tag-input'
let Tags = ReactTags.WithContext


import ContentActions from '../../actions/ContentActions'
import '../../assets/style/reactTag.css'
import Immutable from 'immutable'
let suggestKeyword = []


/**
 * A component to MetaPanel
 * 컨텍츠 작성시 메타 정보를 입력하는 패널
 *
 * history
 * 처음에는 비디오와 이미지를 분리했다가 공유되는 메소드가 많아서 다시 합치게 됨
 *
 * this.props.type == video or image 로 타입을 구분함
 * author : jungun.park
 */

export default class MetaPanel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title : '',
      selectCategories : Immutable.List([]),
      channel: '',
      keywords : [],
      videourl : '',
      source : '',
      description : ''
    }
  }

  componentDidMount() {
    this.refs.title.focus()
    this._adjustPanelHeight(true)
  }

  /**
   * 패널의 높이를 조절하는 함수
   * @param ismount {boolean} - 마운트 여부. 마운트가 안되었다면 timeout을 줌. 아직 textarea의 높이를 구하는데 시간이 걸려서...
   * @private
     */
  _adjustPanelHeight(ismount = false) {
    let timeout = 0
    if(ismount) {
      timeout = 200
    }
    // 높이 조절
    setTimeout(() => {
      const height = $('#add_info').height()
      $('#contents_add').animate({'padding-top': height + 123}, 0)
    }, timeout)
  }

  // TODO : 성능에 매우 안좋은 영향을 끼칠것 같음. 추후 개선 필요
  componentWillReceiveProps(nextProps) {
    this._makeSuggestKeywordList(nextProps)

    // 선택된 카테고리가 있으면 리턴
    let selectCategories = Immutable.List([])
    if(nextProps.content.get('categories') != undefined
      && nextProps.content.get('categories').size !== 0) {
      selectCategories = nextProps.content.get('categories')
    }

    let keywords = ''
    if(nextProps.content.get('keywords') != undefined) {
      keywords = nextProps.content.get('keywords').reduce(function (reduction, value, key) {
        reduction.push({id : key, text:value})
        return reduction
      }, [])
    }

    this.setState({
      title : nextProps.content.get('title'),
      selectCategories : selectCategories,
      keywords : keywords,
      channel: nextProps.content.get('channelSeq') || '',
      videourl : nextProps.content.get('videoUrl'),
      source : nextProps.content.get('sourceDescription'),
      description : nextProps.content.get('body')
    })

    this._adjustPanelHeight(false)
  }

  /***
   * react-tag-input에 추천어를 입력하는 함수
   * @param nextProps {Object} - 기존에 props을 가져와서 거기에서 channels, categories 정보를 추가
   * @private
     */
  _makeSuggestKeywordList = (nextProps) => {
    // tagsinput 에 suggest keyword 만들기. channels, categories를 통해서 만든다
    suggestKeyword = []
    nextProps.channels.forEach((channel) => {
      suggestKeyword.push(channel.get('name'))
    })

    nextProps.categories.forEach((category) => {
      suggestKeyword.push(category.get('name'))
    })
  }

  render() {
    return (
      <div id="add_info" ref="add_info">
        <table className="writeTable">
          <colgroup>
            <col width="154px"/>
            <col width="*"/>
          </colgroup>
          <tbody>
          <tr>
            <th>{intlStores.get('cms.CMS_FLD_TITLE')}</th>
            <td>
              <input type="text" className="txt t1" ref="title"
                     placeholder={intlStores.get('cms.CMS_TXT_TITLE_LIMIT')}
                     value={this.state.title || ''}
                     onChange={this.handleChange.bind(this, 'title')}
                     onBlur={this.onUpdateStore.bind(this, 'title')}/>
            </td>
          </tr>
          <tr>
            <th>{intlStores.get('cms.CMS_FLD_THUMBNAIL')}</th>
            <ImageUploader id="thumbnail" type="VIDEO" value={this.props.content} inspection={this.props.inspection} ref="thumbnail" />
          </tr>
          <tr>
            <th>{intlStores.get('cms.CMS_FLD_SHARE_IMG')}</th>
            <ImageUploader id="shareImage" type="VIDEO" value={this.props.content} inspection={this.props.inspection} ref="shareImage" />
          </tr>
          {this.renderLastImage}
          <tr>
            <th>{intlStores.get('cms.CMS_FLD_CATEGORY')}</th>
            <td>
              <p className="channel_list">
                {this.categoriesList}
              </p>
            </td>
          </tr>
          <tr>
            <th>{intlStores.get('cms.CMS_FLD_CHANNEL')}</th>
            <td>
              <select style={{ width:'660px' }} ref="channel"
                      value={this.state.channel}
                      onChange={this.handleChange.bind(this, 'channelSeq')}>
                <option value="">--- channel ---</option>
                {this.channelList}
              </select>
            </td>
          </tr>
          <tr>
            <th>{intlStores.get('cms.CMS_FLD_KEYWORD')}</th>
            <td>
              <Tags tags={this.state.keywords}
                    suggestions={suggestKeyword}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    minQueryLength={2}
              />
            </td>
          </tr>
          {this.renderVideo}
          {this.renderSource}
          <tr>
            <th>{intlStores.get('cms.CMS_FLD_DESC')}</th>
            <td><textarea placeholder={intlStores.get('cms.CMS_MSG_ERROR_DESC')}
                          value={this.state.description || ''}
                          onChange={this.handleChange.bind(this, 'description')}
                          onBlur={this.onUpdateStore.bind(this, 'body')}></textarea></td>
          </tr>
          </tbody>
        </table>
        <button id="add_info_btn" onClick={this.toggleInfoBtn}></button>
      </div>
    )
  }

  /***
   * render LastImage imageuploader
   * @returns {Object} - lastimage imageuploader
   */
  get renderLastImage() {
    if(this.props.type === 'image') {
      return (<tr>
        <th>{intlStores.get('cms.CMS_FLD_LAST_IMG')}</th>
        <ImageUploader id="lastImageUrl" type="IMAGE" value={this.props.content} inspection={this.props.inspection} ref="lastImageUrl" />
      </tr>)
    }
  }

  /***
   * render video
   * @returns {Object} - video input
   */
  get renderVideo() {
    if(this.props.type === 'video') {
      return (<tr>
        <th>{intlStores.get('cms.CMS_TXT_VIDEO_URL')}</th>
        <td><input type="text" className="txt t1" ref="videourl"
                   placeholder="Input the video URL ex) https://youtu.be/videoid"
                   value={this.state.videourl || ''}
                   onChange={this.handleChange.bind(this, 'videourl')}
                   onBlur={this.onBlurVideoURL}/></td>
      </tr>)
    }
  }

  /***
   * render Source (출처)
   * @returns {Object} - Source input
   */
  get renderSource() {
    if(this.props.type === 'video') {
      return (
        <tr>
          <th>{intlStores.get('cms.CMS_FLD_SOURCE')}</th>
          <td><input type="text" className="txt t1" ref="source"
                     placeholder="Input the source of the content"

                     value={this.state.source || ''}
                     onChange={this.handleChange.bind(this, 'source')}
                     onBlur={this.onUpdateStore.bind(this, 'sourceDescription')}/></td>
        </tr>)
    }
  }

  /***
   * CategoryList render
   * @returns {Array} - category list ReactComponent
   */
  get categoriesList() {
    return this.props.categories.map((category) => {
      let isselected = ''
      // 선택된 카테고리인가??
      const index = this.state.selectCategories.findIndex((select) => { return select.get('categorySeq') === category.get('categorySeq')})
      if(index === -1) {
        isselected = ''
      } else {
        isselected = 'on'
      }

      const seq = category.get('categorySeq')
      return <a key={seq} className={isselected}
                onClick={this.selectCategory.bind(this, seq)} >{category.get('name')}</a>
    })
  }

  /***
   * channelList render
   * @returns {Array} - channel list ReactComponent
   */
  get channelList() {
    return this.props.channels.map((channel) => {
      return <option key={channel.get('channelSeq')} value={channel.get('channelSeq')}>{channel.get('name')}</option>
    })
  }


  /**
   * toggle button click event - InfoPanel
   * @param {object} e - click event object
   */
  toggleInfoBtn = (e) => {
    if ($(e.target).hasClass('close')) {
      $(e.target).removeClass('close')
        .parent().animate({'height': this.h}, 200) // 패널 높이 조절
        .find('table').fadeIn(200); // 표 숨기기
      // 컨텐츠 내용 부분을 내리는 로직
      $('#contents_add').animate({'padding-top': this.h + 120}, 200)
    } else {
      this.h = $('#add_info').height()
      $(e.target).addClass('close')
        .parent().animate({'height': '30px'}, 200) // 패널 높이 조절
        .find('table').fadeOut(200) // 표 숨기기
      // 컨텐츠 내용 부분을 올리는 로직
      $('#contents_add').animate({'padding-top': '153px'}, 200)
    }
  }

  // TODO : state를 활용하지 말고 바로 store를 활용하도록 수정이 필요함
  /***
   * React Uncontrolled Components 에 대한 handler 처리
   * https://facebook.github.io/react/docs/forms.html
   * @param key {String} - 변경하는 키
   * @param e - 이벤트가 발생한 object
   */
  handleChange(key, e) {
    if(this.props.inspection) {
      return
    }
    // channelSeq의 경우 바로 Select인 것을 감안하여 store 로 바로 변경
    // 다른 키의 경우 onBlur에서 변경
    if(key === 'channelSeq') {
      ContentActions.updateContentMeta({
        key:key,
        value:e.target.value
      })
    } else {
      let obj = {}
      obj[key] = e.target.value

      this.setState(obj)
    }
  }

  /***
   * controlled input 에서 state를 통해서 관리하였기 때문에 수정된 내용을 onblur일때 store에 반영함
   * 나름 처음 작성할때는 action -> dispatch -> store로 가는 걸 줄이려고 했을듯..
   * 하지만 나중에 알게된거지만 그냥 store로 돌리는게 더 좋은거 같다. 일단 코드가 간결하다.
   * @param key
   * @param e
     */
  onUpdateStore(key, e) {
    if(this.props.inspection) {
      return
    }

    ContentActions.updateContentMeta({
      key:key,
      value:e.target.value
    })
  }

  /**
   * 키워드 관련 이벤트
   */
  handleDelete = (i) => {
    let keywords = this.state.keywords
    keywords.splice(i, 1)
    const keywordlist = keywords.map((keyword) => {
      return keyword.text
    })
    ContentActions.updateContentMeta({
      key:'keywords',
      value:keywordlist.join(',')
    })
  }

  /***
   * 키워드 추가
   * @param keyword {string} - 추가할 키워드
     */
  handleAddition = (keyword) => {
    let keywords = this.state.keywords
    keywords.push({
      id: keywords.length + 1,
      text: keyword
    })

    const keywordlist = keywords.map((keyword) => {
      return keyword.text
    })

    ContentActions.updateContentMeta({
      key:'keywords',
      value:keywordlist.join(',')
    })
  }

  /***
   * 키워드 순서 변경
   * @param keyword {string} - 선택된 텍스트
   * @param currPos {number} - 현재 위치
   * @param newPos {number}  - 변경될 위치
     */
  handleDrag = (keyword, currPos, newPos) => {
    let keywords = this.state.keywords

    // mutate array
    keywords.splice(currPos, 1)
    keywords.splice(newPos, 0, keyword)

    const keywordlist = keywords.map((keyword) => {
      return keyword.text
    })

    ContentActions.updateContentMeta({
      key:'keywords',
      value:keywordlist.join(',')
    })
  }

  /**
   * 비디오에서만 활용함
   * 비디오 url 입력 시, 비디오 미리보기 변경
   */
  onBlurVideoURL = () => {
    /**
     * 비디오 영상에 대한 정확한 정보를 전달 받지 못하여서 임시방편으로 youtube / 위캔디오에 대한 처리를 문자열 스트링으로 함.
     * youtube 및 위캔디오 컨텐츠 발행자의 입력 url style이 어떤 것이 있는지 short url은 무엇인지 전달받지 못함.
     */
    const videoUrl = this.refs.videourl.value

    if (videoUrl.length > 0
      && (videoUrl.indexOf('youtube') != -1 ||  videoUrl.indexOf('youtu.be') != -1)) {
      ContentActions.updateContentMeta({
        key:'videoUrl',
        value:videoUrl
      })
    } else if(videoUrl.length > 0
      && (videoUrl.indexOf('/default/') != -1 || videoUrl.indexOf('v/?') != -1)) {
      ContentActions.updateContentMeta({
        key:'videoUrl',
        value:videoUrl
      })
    } else if(videoUrl.length == 0) {
      // TODO 아무것도 없을땐 팝업 띄우지 말자. 불편하다

    } else {
      alert(intlStores.get('cms.CMS_MSG_NEED_VIDEO_URL'))
    }
  }

  /***
   * 카테고리를 선택하는 것을 제어하는 함수
   * @param categorySeq {number} - 선택된 category Seq
   * @param e {MouseEvent} - click event object
     */
  selectCategory(categorySeq, e) {
    if(this.props.inspection) {
      return
    }

    const category = this.props.categories.find((select) => { return select.get('categorySeq') === categorySeq})

    if(e.target.classList.contains('on')) {
      e.target.classList.remove('on')
      ContentActions.updateContentRemoveCategory({
        categorySeq: categorySeq,
        category:category
      })
    } else {
      e.target.classList.add('on')
      ContentActions.updateContentAddCategory({
        categorySeq: categorySeq,
        category:category
      })
    }
  }
}
