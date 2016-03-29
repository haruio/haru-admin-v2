import React from 'react'
import YouTube from 'react-youtube'
import debug from 'debug'
const log = debug('application:VideoPreview.jsx')

import intlStores from '../../utils/IntlStore'
/**
 * A component to Banner
 * @notice sample component
 * author : jungun.park
 */

export default class VideoPreview extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      opts: {
        height: '405',
        width: '720',
        playerVars: {
          autoplay: 0,
          frameborder: 0,
          showinfo: 0,
          allowfullscreen: 1,
          playsinline: 1
        }
      },
      video: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.get_video_id(nextProps.content.get('videoUrl') || '')
  }

  /***
   * get Youtube Video Id
   * @param input {String} - URL
   * @returns {*} - VideoID
   */
  get_video_id =(input)=> {
    const videoid = input.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/)
    // Youtube 가 아니라면 null을 리턴
    if(videoid == null || videoid.length == 0) {
      this.setState({type:'video', video: input})
    } else {
      this.setState({type:'youtube', video: videoid[1]})
    }
  }

  get renderVideo() {
    if(this.state.video == '') {
      return (
        <dl className="info">
          <dt>{intlStores.get('cms.CMS_TXT_VIDEO_PREVIEW')}</dt>
          <dd>{intlStores.get('cms.CMS_TXT_INPUT_SOURCE')}</dd>
        </dl>)

    } else {
      if(this.state.type == 'youtube') {
        return (
          <YouTube
            videoId={this.state.video}
            id="player"
            opts={this.state.opts}
          />)
      } else {
        return (
          <iframe id="video-iframe" width="486" height="254" src={this.state.video} frameBorder="0" scrolling="no" allowFullScreen></iframe>
        )
      }
    }
  }

  render() {
    return (
      <div className="moive">
        {this.renderVideo}
      </div>
    )
  }
}
