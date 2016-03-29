import React from 'react'


import debug from 'debug'
const log = debug('application:VideoMetaPanel.jsx')

import intlStores from '../../../utils/IntlStore'
import ImageUploader from '../../ImageUploader'

/**
 * A component to ImageInfoPanel
 * author : jungun.park
 */

export default class VideoMetaPanel extends React.Component {
  constructor(props) {
    super(props)
    log(props.content.toJS())

    this.state = {
      title : props.content.get('title'),
      category : '',
      keyword : props.content.get('keywords'),
      videourl : props.content.get('videoUrl'),
      source : props.content.get('sourceDescription'),
      description : props.content.get('body')
    }
  }

  componentDidMount() {
    // 컨텐츠 내용 부분을 내리는 로직.
    setTimeout(() => {
      const height = $("#add_info").height()
      $('#contents_add').animate({'padding-top': height + 123}, 0)
    }, 200)
  }

  componentWillReceiveProps(nextProps) {
    let category = ''
    if(nextProps.content.get('categories') != undefined && nextProps.content.get('categories').size !== 0) {
      category = nextProps.content.get('categories')[0].categorySeq
    }
    this.setState({
      title : nextProps.content.get('title'),
      category : category,
      keyword : nextProps.content.get('keywords'),
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
      log(this.h)
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
      log(videoUrl)
    } else if(videoUrl.length > 0
      && (videoUrl.indexOf('/default/') != -1 || videoUrl.indexOf('v/?') != -1)) {
      log(videoUrl)
    } else {
      alert(intlStores.get('cms.CMS_MSG_NEED_VIDEO_URL'))
    }
  }

  handleChange(key, e) {
    log(key, e.target.value)

    let obj = {}
    obj[key] = e.target.value
    this.setState(obj)
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
            <td><input type="text" className="txt t1" ref="title" placeholder={intlStores.get('cms.CMS_TXT_TITLE_LIMIT')} value={this.state.title || ''} onChange={this.handleChange.bind(this, 'title')}/></td>
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
            <th>{intlStores.get('cms.CMS_FLD_LAST_IMG')}</th>
            <ImageUploader id="lastImageUrl" type="VIDEO" value={this.props.content} ref="lastImageUrl" />
          </tr>
          <tr>
            <th>{intlStores.get('cms.CMS_FLD_CATEGORY')}</th>
            <td>
              <select style={{ width:'660px' }} ref="category" value={this.state.category} onChange={this.handleChange.bind(this, 'category')}>
                <option value="">--- category ---</option>
                {this.categoriesList}
              </select>
            </td>
          </tr>
          <tr>
            <th>{intlStores.get('cms.CMS_FLD_CHANNEL')}</th>
            <td>
              <p className="channel_list">
                {this.channelList}
              </p>
            </td>
          </tr>
          <tr>
            <th>{intlStores.get('cms.CMS_FLD_KEYWORD')}</th>
            <td><input type="text" className="txt t1" ref="keyword" placeholder={intlStores.get('cms.CMS_TXT_KEYWORD')} value={this.state.keyword || ''} onChange={this.handleChange.bind(this, 'keyword')}/></td>
          </tr>
          <tr>
            <th>{intlStores.get('cms.CMS_TXT_VIDEO_URL')}</th>
            <td><input type="text" className="txt t1" ref="videourl" placeholder="Input the video URL ex) https://youtu.be/videoid" value={this.state.videourl || ''} onChange={this.handleChange.bind(this, 'videourl')} onBlur={this.onBlurVideoURL}/></td>
          </tr>
          <tr>
            <th>{intlStores.get('cms.CMS_FLD_SOURCE')}</th>
            <td><input type="text" className="txt t1" ref="source" value={this.state.source || ''} onChange={this.handleChange.bind(this, 'source')}/></td>
          </tr>
          <tr>
            <th>{intlStores.get('cms.CMS_FLD_DESC')}</th>
            <td><textarea placeholder={intlStores.get('cms.CMS_MSG_ERROR_DESC')} value={this.state.description || ''} onChange={this.handleChange.bind(this, 'description')}></textarea></td>
          </tr>
          </tbody>
        </table>
        <button id="add_info_btn" onClick={this.toggleInfoBtn}></button>
      </div>
    )
  }
  //                  <textarea id="description" ref="description" value={channel.get('description') || ''} onChange={this.handleChange.bind(this, 'description')}></textarea>


  /***
   * CategoryList render
   * @returns {Array} - category list ReactComponent
   */
  get categoriesList() {
    return this.props.categories.map((category) => {
      return <option key={category.get('categorySeq')} value={category.get('categorySeq')}>{category.get('name')}</option>
    })
  }

  /***
   * channelList render
   * @returns {Array} - channel list ReactComponent
   */
  get channelList() {
    return this.props.channels.map((channel) => {
      return <a onClick={(e) => {$(e.target).toggleClass('on')}} key={channel.get('channelSeq')}>{channel.get('name')}</a>
    })
  }
}
