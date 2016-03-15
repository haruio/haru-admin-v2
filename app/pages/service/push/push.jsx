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

import intlStores from '../../../stores/IntlStore'


export default class Push extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pushes : [],
      pagination: {
        startPageNo : 0,
        endPageNo : 0,
        pageNo:0,
        totalCount : 0
      }
    }
  }

  componentDidMount() {

  }

  setComma(number) {
    return String(number).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
  }

  onPopupPushDetail(pushId) {
    /*
    if(pushId != null) {
      this.refs.pushPopup.readPushDetail(pushId)
      $('#detail_info').toggleClass('hide');
    }*/
  }

  movePage(pageNo) {
    //this.getPushList({pushId:"", pageNo:pageNo})
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
            <td><a onClick={this.onPopupPushDetail.bind(null, { pushId:push.pushId })}>{push.message.title}</a></td>
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
          <fieldset id="search_box">
            <p>
              <label>{intlStores.get('common.COMMON_FLD_SEARCH_ITEM')}</label>
              <select id="searchField" ref="searchField">
                <option value="PUSHTYPE">{intlStores.get('sm.SM_FLD_PUSH_TYPE')}</option>
                <option value="TITLE">{intlStores.get('sm.SM_FLD_TITLE')}</option>
              </select>
            </p>
            <input type="text" id="searchText" ref="searchText" placeholder="Search" /><a onClick={this.searchUserList} className="btn_search"></a>
          </fieldset>
        </hgroup>

        <div id="contents">
          <p className="table_info">{intlStores.get('common.COMMON_FLD_TOTAL')} {this.setComma(this.state.pagination.totalCount || 0)} {intlStores.get('common.COMMON_FLD_COUNT')}</p>
          <div className="table_wrap">
            <table className="listTable">
              <colgroup>
                <col width="6%" />
                <col width="10%" />
                <col width="20%" />
                <col width="13%" />
                <col width="13%" />
                <col width="13%" />
                <col width="*" />
                <col width="13%" />
              </colgroup>
              <thead>
              <tr>
                <th>순번</th>
                <th>{intlStores.get('sm.SM_FLD_PUSH_TYPE')}</th>
                <th>{intlStores.get('sm.SM_FLD_TITLE')}</th>
                <th>{intlStores.get('sm.SM_FLD_PUSH_COUNT')}</th>
                <th>{intlStores.get('sm.SM_FLD_PUSH_REACH')}</th>
                <th>{intlStores.get('sm.SM_FLD_PUSH_INFLOW')}</th>
                <th>{intlStores.get('sm.SM_FLD_PUSH_CANCEL')}</th>
                <th>{intlStores.get('sm.SM_FLD_DATE')}</th>
              </tr>
              </thead>
              <tbody>
              {pushList}
              </tbody>
            </table>
          </div>
          <PageList pageObj={this.state.pagination} clickAction={this.movePage} />
          <p className="btn_r">
            <Link to="/service/push/new" className="purple">발송 등록하기</Link>
          </p>
          {/*<PushPopup ref="pushPopup" pushId={this.state.pushId} />*/}
        </div>
      </article>
    )
  }
}
