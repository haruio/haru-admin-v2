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

  constructor(props) {
    super(props)

    this.publish = 'Y'
  }

  componentWillMount() {
    if(this.props.params.id !== undefined) {
      AppActions.getChannelDetail(this.props.params.id)
    } else {
      AppActions.clearChannelDetail()
    }
  }

  render() {
    log(this.state.channel.toJS())
    const channel = this.state.channel

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
                <td><input type="text" className="txt t1" id="name" ref="name" value={this.state.channel.get('')}/></td>
              </tr>
              <tr>
                <th>{intlStores.get('sm.SM_FLD_SHORT_NAME')}</th>
                <td>
                  <input type="text" className="txt t1" id="shortNm" ref="shortNm"/>
                </td>
              </tr>
              <tr>
                <th>{intlStores.get('sm.SM_FLD_CHANNEL_URL')}</th>
                <td>
                  <p className="input_txt">
                    <label htmlFor="text">http://dingo.tv/channel/</label>
                    <input type="text" className="txt t5" id="urlNm" ref="nulNm"/>
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
                    <input type="radio" id="publish1" name="publish" onChange={ () => { this.publish = 'Y'}} defaultChecked/> <label htmlFor="publish1">{intlStores.get('common.COMMON_FLD_PUBLIC')}</label>
                    <input type="radio" id="publish2" name="publish" onChange={() => { this.publish = 'Y'}}/> <label htmlFor="publish2">{intlStores.get('common.COMMON_FLD_PRIVATE')}</label>
                  </p>
                </td>
              </tr>
              <tr>
                <th>{intlStores.get('sm.SM_FLD_CHANNEL_DESC')}</th>
                <td>
                  <textarea id="description" ref="description"></textarea>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <p className="btn_r btnbox_w960">
            <a onClick={this.uploadChannel} className="purple">{intlStores.get('common.COMMON_BTN_REGISTER')}</a>
            <Link to="/service/mgmt/channel" className="gray">{intlStores.get('common.COMMON_BTN_CANCEL')}</Link>
          </p>
        </div>
      </article>
    )
  }
}
const ChannelEditContainer = Container.create(ChannelEdit)
export default ChannelEditContainer
