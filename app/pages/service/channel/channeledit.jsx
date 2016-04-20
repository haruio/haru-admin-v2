/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Link} from 'react-router'
import { Container } from 'flux/utils'

import debug from 'debug'
const log = debug('application:ChannelEdit.jsx')

import ImageUploader from '../../../components/ImageUploader'
import intlStores from '../../../utils/IntlStore'

import AppActions from '../../../actions/AppActions'
import ChannelDetailStore from '../../../stores/ChannelDetailStore'

class ChannelEdit extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static getStores() {
    return [ChannelDetailStore]
  }

  static calculateState() {
    return {
      channel: ChannelDetailStore.getChannel()
    }
  }

  componentWillMount() {
    if(this.props.params.id !== undefined) {
      AppActions.getChannelDetail(this.props.params.id)
    } else {
      setTimeout(() => {
        AppActions.clearChannelDetail()
      })
    }
  }

  render() {
    const channel = this.state.channel
    log(channel.toJS())
    return (
      <article>
        <hgroup>
          <h2>{intlStores.get('sm.MENU_TXT_CHANNEL')}</h2>
        </hgroup>
        <div id="contents">
          <div id="service_add">
            <table className="writeTable">
              <colgroup>
                <col width="154px"/>
                <col width="*"/>
              </colgroup>
              <tbody>
              <tr>
                <th>{intlStores.get('sm.SM_FLD_CHANNEL_NAME')}</th>
                <td><input type="text" className="txt t1" id="name" ref="name" value={channel.get('name')|| ''} onChange={this.handleChange.bind(this, 'name')} /></td>
              </tr>
              <tr>
                <th>{intlStores.get('sm.SM_FLD_SHORT_NAME')}</th>
                <td><input type="text" className="txt t1" id="shortNm" ref="shortNm" value={channel.get('shortNm') || ''} onChange={this.handleChange.bind(this, 'shortNm')}/></td>
              </tr>
              <tr>
                <th>{intlStores.get('sm.SM_FLD_CHANNEL_URL')}</th>
                <td>
                  <p className="input_txt">
                    <label htmlFor="text">http://dingo.tv/channel/</label>
                    <input type="text" className="txt t5" id="urlNm" ref="urlNm" value={channel.get('urlNm') || ''} onChange={this.handleChange.bind(this, 'urlNm')}/>
                  </p>
                </td>
              </tr>
              <tr>
                <th>{intlStores.get('sm.SM_FLD_ICON')}</th>
                <ImageUploader id="iconImageUrl" type="CHANNEL" value={channel} ref="iconImageUrl"/>
              </tr>
              <tr>
                <th>{intlStores.get('sm.SM_FLD_BG_IMG')}</th>
                <ImageUploader id="bgImageUrl" type="CHANNEL" value={channel}  ref="bgImageUrl" />
              </tr>
              <tr>
                <th>{intlStores.get('sm.SM_FLD_LAST_IMG')}</th>
                <ImageUploader id="lastImageUrl" type="CHANNEL" value={channel} ref="lastImageUrl" />
              </tr>
              <tr>
                <th>{intlStores.get('common.COMMON_FLD_PUBLIC')}/{intlStores.get('common.COMMON_FLD_PRIVATE')}</th>
                <td>
                  <p className="input_margin">
                    <input type="radio" id="publish1" name="publish" checked={channel.get('channelViewCd') == 'Y'} onChange={this.handleCheckChange.bind(this, 'Y')}/> <label htmlFor="publish1">{intlStores.get('common.COMMON_FLD_PUBLIC')}</label>
                    <input type="radio" id="publish2" name="publish" checked={channel.get('channelViewCd') == 'N'} onChange={this.handleCheckChange.bind(this, 'N')}/> <label htmlFor="publish2">{intlStores.get('common.COMMON_FLD_PRIVATE')}</label>
                  </p>
                </td>
              </tr>
              <tr>
                <th>{intlStores.get('sm.SM_FLD_CHANNEL_DESC')}</th>
                <td>
                  <textarea id="description" ref="description" value={channel.get('description') || ''} onChange={this.handleChange.bind(this, 'description')}></textarea>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          {this.renderButton}
        </div>
      </article>
    )
  }

  get renderButton() {
    if(this.props.params.id !== undefined) {
      return (<p className="btn_r btnbox_w960">
        <a onClick={this.handleSubmitChannel} className="purple">{intlStores.get('common.COMMON_BTN_EDIT')}</a>
        <Link to="/service/mgmt/channel" className="gray">{intlStores.get('common.COMMON_BTN_CANCEL')}</Link>
      </p>)
    } else {
      return (<p className="btn_r btnbox_w960">
        <a onClick={this.handleSubmitChannel} className="purple">{intlStores.get('common.COMMON_BTN_REGISTER')}</a>
        <Link to="/service/mgmt/channel" className="gray">{intlStores.get('common.COMMON_BTN_CANCEL')}</Link>
      </p>)
    }
  }
  /***
   * input tag를 입력할때 마다 호출되는 onChange Handler
   *
   * @param key - input tag key
   * @param e {KeyboardEvent} - input keyboard event
   */
  handleChange = (key, e) => {
    //this.setState({channel: this.state.channel.set(key, e.target.value)})
    AppActions.updateChannelMeta(key, e.target.value)
  }

  /***
   * 공개 / 비공개 라디오 버튼이 변경될때 마다 변경됨
   * @param value {string} - Y, N 공개/비공개 여부
   */
  handleCheckChange = (value) => {
    //this.setState({channel: this.state.channel.set('channelViewCd', value)})
    AppActions.updateChannelMeta('channelViewCd', value)
  }

  handleSubmitChannel = () => {
    // TODO validation
    // 리퀘스트 요청
    if(this.props.params.id === undefined) {
      if(window.confirm(intlStores.get('common.COMMON_MSG_REG'))) {
        AppActions.addChannel(this.state.channel.toJS(), () => {
          this.context.router.push('/service/mgmt/channel')
        })
      }
    } else {
      if (window.confirm(intlStores.get('common.COMMON_MSG_EDIT'))) {
        AppActions.putChannel(this.state.channel.toJS(), this.props.params.id, () => {
          this.context.router.push('/service/mgmt/channel')
        })
      }
    }
  }
}
const ChannelEditContainer = Container.create(ChannelEdit)
export default ChannelEditContainer
