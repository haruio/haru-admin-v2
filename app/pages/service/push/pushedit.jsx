/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import { Link } from 'react-router'

import cn from 'classnames'
import moment from 'moment'

import debug from 'debug'
const log = debug('application:mycontent.jsx')

import PageList from '../../../components/PageList'

import intlStores from '../../../utils/IntlStore'


export default class PushEdit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pushes : [],
      pagination: {
        startPageNo : 0,
        endPageNo : 0,
        pageNo:0,
        totalCount : 0
      },
      channels:[],
      categories:[],
      pushType: 'LNK',
      sendType: 'RSRV'
    }
  }

  componentDidMount() {

  }

  uploadImage(target) {
    let imageFile = $('#file-input-' + target)[0].files[0]
    //PushActions.uploadImage(imageFile, target)
  }

  deleteImage(target) {
    target != 'smallImage' ? this.state.bigImage = '' : this.state.smallImage = ''
    $('#input-'+target).val('')
    this.setState({ smallImage:this.state.smallImage, bigImage:this.state.bigImage })
  }

  render() {
    let pushList = null
    if(this.state.pushes != null && this.state.pushes.length != 0) {

      pushList = this.state.pushes.map((push, i) => {
        // 왜 클래스 네임을 썻을까???
        let pushStatus = cn({
          'sm.SM_FLD_PUSH_STAT_PUING': push.pushStatus == 'PUING',
          'sm.SM_FLD_PUSH_STAT_PUED': push.pushStatus == 'PUED',
          'sm.SM_FLD_PUSH_STAT_CAED': push.pushStatus == 'CAED',
          'sm.SM_FLD_PUSH_STAT_APR': push.pushStatus == 'APR'
        })

        return (
          <tr key={i}>
            <td>{this.state.pagination.totalCount - i}</td>
            <td>{push.message.type}</td>
            <td><a onClick={this.onPopupPushDetail.bind(null, {pushId:push.pushId})}>{push.message.title}</a></td>
            <td>{push.stats.published || 0}</td>
            <td>{push.stats.reveived || 0}</td>
            <td>{push.stats.opened || 0}</td>
            <td>{intlStores.get(pushStatus)}</td>
            <td>{moment(push.createDt).format('YYYY-MM-DD')}</td>
          </tr>
        )
      })
    }else {
      pushList = (<tr>
        <td colSpan="8">{intlStores.get('sm.SM_MSG_NO_CONTENTS')}</td>
      </tr>)
    }

    return (
      <article>
        <hgroup>
          <h2>Push 관리</h2>
        </hgroup>
        <div id="contents">
          <table className="writeTable">
            <colgroup>
              <col width="154px"/>
              <col width="*"/>
            </colgroup>
            <tbody>
            <tr>
              <th>{intlStores.get('cms.CMS_FLD_TITLE')}</th>
              <td><input type="text" id="input-title" className="txt t1"  /></td>
            </tr>
            <tr>
              <th>{intlStores.get('cms.CMS_FLD_CONTENTS')}</th>
              <td>
                <textarea id="input-push-body"></textarea>
              </td>
            </tr>
            <tr>
              <th>Small Image</th>
              <td>
                <input type="text" className="txt t2" id="input-smallImage" readOnly/><span className="btn_file">{intlStores.get('cms.CMS_BTN_FIND')}
                <input type="file" id="file-input-smallImage" onChange={this.uploadImage.bind(this, 'smallImage')}/></span>
                <a id="btn-del-smallImage" className={this.state.smallImage != '' ? 'btn_del' : 'btn_del hide'} onClick={this.deleteImage.bind(this, 'smallImage')}></a>
              </td>
            </tr>
            <tr>
              <th>Big Image</th>
              <td>
                <input type="text" className="txt t2" id="input-bigImage" readOnly/><span className="btn_file">{intlStores.get('cms.CMS_BTN_FIND')}
                <input type="file" id="file-input-bigImage" onChange={this.uploadImage.bind(this, 'bigImage')}/></span>
                <a id="btn-del-bigImage" className={this.state.bigImage != '' ? 'btn_del' : 'btn_del hide'} onClick={this.deleteImage.bind(this, 'bigImage')}></a>
              </td>
            </tr>
            <tr>
              <th>Push Type</th>
              <td>
                <p className="input_margin">
                  <input type="radio" id="pushType1" name="pushType" value="LNK" onChange={this.onChangePushType} defaultChecked={this.state.pushType == "LNK"} /> <label htmlFor="pushType1">Link</label>
                  <input type="radio" id="pushType2" name="pushType" value="PST" onChange={this.onChangePushType} defaultChecked={this.state.pushType == "PST"} /> <label htmlFor="pushType2">Post</label>
                  <input type="radio" id="pushType3" name="pushType" value="CHN" onChange={this.onChangePushType} defaultChecked={this.state.pushType == "CHN"} /> <label htmlFor="pushType3">Channel</label>
                  <input type="radio" id="pushType4" name="pushType" value="CAT" onChange={this.onChangePushType} defaultChecked={this.state.pushType == "CAT"} /> <label htmlFor="pushType4">Category</label>
                </p>
              </td>
            </tr>
            <tr className={this.state.pushType == 'LNK' ? '' : 'hide'}>
              <th>{intlStores.get('sm.SM_FLD_LINK_URL')}</th>
              <td><input type="text" className="txt t1" id="linkedUrl" /></td>
            </tr>
            <tr className={this.state.pushType == 'PST' ? '' : 'hide'}>
              <th>{intlStores.get('sm.SM_FLD_LINK_CONTENT')}</th>
              <td>
                <ul className="push_post">
                  <li>
                    <a onClick={this.onPushPostPopup}>
                      <span className="add">Contents (1×1)</span>
                    </a>
                  </li>
                </ul>
                {/*<PushPostPopup onSetPost={this.onSetPost}/>*/}
              </td>
            </tr>
            <tr className={this.state.pushType == 'CHN' ? '' : 'hide'}>
              <th>{intlStores.get('sm.SM_FLD_LINK_CHANNEL')}</th>
              <td>
                <select id="linkedChannel">
                  <option value="">미선택</option>
                  {this.state.channels.map((channel, i) =>
                    <option key={i} value={channel.urlNm}>{channel.name}</option>
                  )}
                </select>
              </td>
            </tr>
            <tr className={this.state.pushType == 'CAT' ? '' : 'hide'}>
              <th>{intlStores.get('sm.SM_FLD_LINK_CATEGORY')}</th>
              <td>
                <select id="linkedCategory">
                  {this.state.categories.map((category, i) =>
                    <option key={i} value={category.urlNm}>{category.name}</option>
                  )}
                </select>
              </td>
            </tr>
            </tbody>
          </table>
          <table className="writeTable">
            <colgroup>
              <col width="154px"/>
              <col width="350px"/>
              <col width="154px"/>
              <col width="*"/>
            </colgroup>
            <tbody>
            <tr>
              <th>{intlStores.get('sm.SM_FLD_MEMBER_TYPE')}</th>
              <td>
                <select id="userType" >
                  <option value="">전체</option>
                  <option value="MEMBER">회원</option>
                  <option value="GUEST">비회원</option>
                </select>
              </td>
              <th>{intlStores.get('sm.SM_FLD_CHANNEL_TYPE')}</th>
              <td>
                <select id="channelType">
                  <option value="">미선택</option>
                  {this.state.channels.map((channel, i) =>
                    <option key={i} value={channel.channelSeq}>{channel.name}</option>
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <th>{intlStores.get('sm.SM_FLD_TARGET_PLATFORM')}</th>
              <td>
                <select id="platformType" >
                  <option value="">전체</option>
                  <option value="AND">Android</option>
                  <option value="IOS">iOS</option>
                </select>
              </td>
              <th>{intlStores.get('sm.SM_FLD_GENDER_TYPE')}</th>
              <td>
                <select id="genderType" >
                  <option value="">전체</option>
                  <option value="M">남성</option>
                  <option value="F">여성</option>
                  <option value="NK">응답안함</option>
                </select>
              </td>
            </tr>
            </tbody>
          </table>
          <table className="writeTable">
            <colgroup>
              <col width="154px"/>
              <col width="350px"/>
              <col width="154px"/>
              <col width="*"/>
            </colgroup>
            <tbody>
            <tr>
              <th>{intlStores.get('sm.SM_FLD_SEND_TYPE')}</th>
              <td>
                <p className="input_margin">
                  <input type="radio" id="sendType1" name="sendType" value="DRCT" onChange={this.onChangeSendType} defaultChecked={this.state.sendType == "DRCT"} /><label htmlFor="sendType1">즉시발송</label>
                  <input type="radio" id="sendType2" name="sendType" value="RSRV" onChange={this.onChangeSendType} defaultChecked={this.state.sendType == "RSRV"} /><label htmlFor="sendType1">예약발송</label>
                </p>
              </td>
              <th><span className = {this.state.sendType != 'RSRV' ? 'hide': ''}>{intlStores.get('sm.SM_FLD_SEND_DATE')}</span></th>
              <td>
                <p className = {this.state.sendType != 'RSRV' ? 'hide': ''}>
                  <input type="text" id="pushDate" className="txt" ref="pushDate" defaultValue={moment().format('YYYY-MM-DD')} disabled = {this.state.sendType != "RSRV" ? true: false} /><a onClick={this.onShowCalendar} className="btn_calendar"></a>
                  <select className="ml10" defaultValue={moment().format('HH')} disabled={this.state.sendType != 'RSRV' ? true: false}>
                    {Array(24).fill(1).map((el, i) =>
                      <option key={i} value={moment({ minute:i }).format('mm')}>{moment({hour:i}).format('HH')}</option>
                    )}
                  </select>
                  <select className="ml10" defaultValue={moment().format('mm')} disabled={this.state.sendType != 'RSRV' ? true: false}>
                    {Array(60).fill(1).map((el, i) =>
                      <option key={i} value={moment({ minute:i }).format('mm')}>{moment({minute:i}).format('mm')}</option>
                    )}
                  </select>
                </p>
              </td>
            </tr>
            </tbody>
          </table>
          <p className="btn_r">
            <a onClick={this.sendPush} className="purple">{intlStores.get('sm.SM_FLD_DO_SAVE')}</a>
            <a onClick={this.goPushList} className="gray">{intlStores.get('sm.SM_FLD_DO_CANCEL')}</a>
          </p>
        </div>
      </article>
    )
  }
}


/*
 {this.state.template.thumbnailUrl != "" ?
 <div>
 <em style={{backgroundImage: "url('+this.state.template.thumbnailUrl+')"}}>
 <span className={this.state.template.postTypeCd != "VDO" ? "cnt": ""}>
 {this.state.template.postTypeCd != "VDO" ? this.state.template.imageCnt : this.state.template.strDuration}
 </span>
 </em>
 <p>{this.state.template.postTitle}</p>
 </div>
 :
 <span className="add">Contents (1×1)</span>
 }
 */
