import React from 'react'
import ReactTags from 'react-tag-input'
let Tags = ReactTags.WithContext

import debug from 'debug'
const log = debug('application:VideoMetaPanel.jsx')

import intlStores from '../../../utils/IntlStore'
import ImageUploader from '../../ImageUploader'

import ContentActions from '../../../actions/ContentActions'
import '../../../assets/style/reactTag.css'
import Immutable from 'immutable'
let suggestKeyword = ['music']

/**
 * A component to ImageInfoPanel
 * author : jungun.park
 */

/***
 * TODO : videoMetaPanel와 기능은 똑같으나 약간씩 다른점이 있어서 분리 후추에 가능하면 합치는 것도 고려해볼만함,
 * 분리할 당시에는 결정적인 분리한 이유는 animate때문에 분리함
 */
export default class VideoMetaPanel extends React.Component {
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
    // 컨텐츠 내용 부분을 내리는 로직.
    setTimeout(() => {
      const height = $('#add_info').height()
      $('#contents_add').animate({'padding-top': height + 123}, 0)
    }, 200)
  }

  // TODO : 성능에 매우 안좋은 영향을 끼칠것 같음. 추후 개선 필요
  componentWillReceiveProps(nextProps) {
    // tagsinput 에 suggest keyword 만들기
    this.props.channels.forEach((channel) => {
      suggestKeyword.push(channel.get('name'))
    })
    this.props.categories.forEach((category) => {
      suggestKeyword.push(category.get('name'))
    })

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
  }

  /**
   * toggle InfoPanel
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

  /**
   * 비디오 url 입력 시, 비디오 미리보기 변경
   */
  onBlurVideoURL = () => {
    /**
     * todo ..
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

    } else {
      alert(intlStores.get('cms.CMS_MSG_NEED_VIDEO_URL'))
    }
  }

  /***
   * React Uncontrolled Components 에 대한 handler 처리
   * https://facebook.github.io/react/docs/forms.html
   * @param key {String} - 변경하는 키
   * @param e - 이벤트가 발생한 object
     */
  handleChange(key, e) {
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

  onUpdateStore(key, e) {
    ContentActions.updateContentMeta({
      key:key,
      value:e.target.value
    })
  }

  handleDelete = (i) => {
    let keywords = this.state.keywords
    keywords.splice(i, 1)
    this.setState({keywords: keywords})
  }

  handleAddition = (keyword) => {
    let keywords = this.state.keywords
    keywords.push({
      id: keywords.length + 1,
      text: keyword
    })
    this.setState({keywords: keywords})
  }

  handleDrag = (keyword, currPos, newPos) => {
    let keywords = this.state.keywords

    // mutate array
    keywords.splice(currPos, 1)
    keywords.splice(newPos, 0, keyword)

    // re-render
    this.setState({ keywords: keywords })
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
            <ImageUploader id="thumbnail" type="VIDEO" value={this.props.content} ref="thumbnail" />
          </tr>
          <tr>
            <th>{intlStores.get('cms.CMS_FLD_SHARE_IMG')}</th>
            <ImageUploader id="shareImage" type="VIDEO" value={this.props.content} ref="shareImage" />
          </tr>
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
          <tr>
            <th>{intlStores.get('cms.CMS_TXT_VIDEO_URL')}</th>
            <td><input type="text" className="txt t1" ref="videourl"
                       placeholder="Input the video URL ex) https://youtu.be/videoid"
                       value={this.state.videourl || ''}
                       onChange={this.handleChange.bind(this, 'videourl')}
                       onBlur={this.onBlurVideoURL}/></td>
          </tr>
          <tr>
            <th>{intlStores.get('cms.CMS_FLD_SOURCE')}</th>
            <td><input type="text" className="txt t1" ref="source"
                       value={this.state.source || ''}
                       onChange={this.handleChange.bind(this, 'source')}
                       onBlur={this.onUpdateStore.bind(this, 'sourceDescription')}/></td>
          </tr>
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

  selectCategory(categorySeq, e) {
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
}
