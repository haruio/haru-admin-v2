/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Link} from 'react-router'
import { Container } from 'flux/utils'
import cn from 'classnames'

import debug from 'debug'
const log = debug('application:Channel.jsx')

import AppActions from '../../../actions/AppActions'
import ChannelStore from '../../../stores/ChannelStore'
import intlStores from'../../../utils/IntlStore'

const ct_edit1 = require('image!../../../assets/img/ct_edit1.png')
const ct_edit2 = require('image!../../../assets/img/ct_edit2.png')

class Channel extends React.Component {
  static getStores() {
    return [ChannelStore]
  }

  static calculateState() {
    return {
      channel: ChannelStore.getChannels()
    }
  }

  componentDidMount() {
    $('#channel_list').sortable({})
  }

  /***
   * 채널 삭제
   * @param channelSeq {number} - channel sequnce number
     */
  deleteChannel(channelSeq) {
    if (channelSeq != '' && window.confirm(intlStores.get('common.COMMON_MSG_DEL'))) {
      AppActions.deleteChannel(channelSeq)
    }
  }

  /***
   * 순서 조정후 채널 순서적용
   */
  saveOrderChannel() {
    let orderList = []
    $('#channel_list > li').each(function (idx, el) {
      let channelSeq = $(el).attr('data-id')
      orderList.push({'channelOrd':idx+1, 'channelSeq':channelSeq})
    }).promise().done(function () {
      let channelOrder = {'arrangeChannelList':orderList}
      if (window.confirm(intlStores.get('common.COMMON_MSG_EDIT'))) {
        AppActions.changeChannelOrder(channelOrder)
      }
    })
  }

  get getChannelList() {
    return this.state.channel.map((item) => {
      const iconlock = cn('ico_lock', {ico_unlock : item.get('channelViewCd') == 'Y'})
      return (
        <li key={item.get('channelSeq')} data-id={item.get('channelSeq')} className={iconlock} style={{backgroundImage:'url('+item.get('bgImageUrl')+')'}}>
          <div className="service_title2">
            <span className="icon_channel" style={{backgroundImage:'url('+item.get('iconImageUrl')+')'}}></span>
            <em>{item.get('name')}</em>
          </div>
          <div className="e_bg">
            <Link to={`/service/mgmt/channel/${item.get('channelSeq')}`}><img src={ct_edit1} alt="" title="수정"/></Link>
            <a onClick={this.deleteChannel.bind(this, item.get('channelSeq'))}><img src={ct_edit2} alt="" title="삭제"/></a>
          </div>
        </li>
      )
    })
  }

  render() {
    return (
      <article>
        <hgroup>
          <h2>채널 관리</h2>
        </hgroup>
        <div id="service_head">
          <ul>
            <li className="icon_add"><Link to="/service/mgmt/channel/new">{intlStores.get('sm.SM_BTN_ADD')}</Link></li>
            <li className="icon_apply"><a onClick={this.saveOrderChannel}>{intlStores.get('common.COMMON_BTN_ARRANGE')}</a></li>
          </ul>
        </div>
        <div id="service_contents">
          <ul className="hover_effect" id="channel_list">
            {this.getChannelList}
          </ul>
        </div>
      </article>
    )
  }
}

const ChannelContainer = Container.create(Channel)
export default ChannelContainer
