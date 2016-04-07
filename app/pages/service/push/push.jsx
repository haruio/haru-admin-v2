/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import { Link } from 'react-router'
import {Container} from 'flux/utils'
import cn from 'classnames'
import moment from 'moment'

import debug from 'debug'
const log = debug('application:Push.jsx')

import AppActions from '../../../actions/AppActions'
import PageList from '../../../components/PageList'
import PushStore from '../../../stores/PushStore'
import PaginationStore from '../../../stores/PaginationStore'
import intlStores from '../../../utils/IntlStore'


class Push extends React.Component {
  static getStores() {
    return [PushStore, PaginationStore]
  }

  static calculateState() {
    return {
      pushes: PushStore.getPushes(),
      pagination: PaginationStore.getPagination()
    }
  }

  componentWillMount() {
    this._getPushList({pageNo:1})
  }

  _getPushList = (searchObj) => {
    this.state.searchObj = (searchObj != null) ? $.extend(this.state.searchObj, searchObj) : {searchStartDate:'', searchEndDate:'', searchField:'', searchText:''}
    AppActions.getPushList(this.state.searchObj)
  }


  render() {
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
          <p className="table_info">{intlStores.get('common.COMMON_FLD_TOTAL')} {this.setComma(this.state.pagination.get('totalCount'))} {intlStores.get('common.COMMON_FLD_COUNT')}</p>
          <div className="table_wrap">
            <table className="listTable">
              <colgroup>
                <col width="6%" />
                <col width="10%" />
                <col width="*" />
                <col width="8%" />
                <col width="8%" />
                <col width="8%" />
                <col width="8%" />
                <col width="12%" />
                <col width="12%" />
              </colgroup>
              <thead>
              <tr>
                <th>순번</th>
                <th>{intlStores.get('sm.SM_FLD_PUSH_TYPE')}</th>
                <th>{intlStores.get('sm.SM_FLD_TITLE')}</th>
                <th>{intlStores.get('sm.SM_FLD_PUSH_COUNT')}</th>
                <th>{intlStores.get('sm.SM_FLD_PUSH_SUCCESS')}</th>
                <th>{intlStores.get('sm.SM_FLD_PUSH_REACH')}</th>
                <th>{intlStores.get('sm.SM_FLD_PUSH_INFLOW')}</th>
                <th>{intlStores.get('sm.SM_FLD_PUSH_CANCEL')}</th>
                <th>{intlStores.get('sm.SM_FLD_DATE')}</th>
              </tr>
              </thead>
              <tbody>
                {this.renderPushList}
              </tbody>
            </table>
          </div>
          <PageList pageObj={this.state.pagination} clickAction={this.movePage} />
          <p className="btn_r">
            <Link to="/service/push/new" className="purple">발송 등록하기</Link>
          </p>
        </div>
      </article>
    )
  }

  get renderPushList() {
    if(this.state.pushes.size === 0) {
      return <tr><td colSpan="9">{intlStores.get('sm.SM_MSG_NO_CONTENTS')}</td></tr>
    }

    return this.state.pushes.map((push, i) => {
      let pushStatus
      switch(push.get('pushStatus')) {
        case 'PUING' :
          pushStatus = 'sm.SM_FLD_PUSH_STAT_PUING'
          break
        case 'PUED' :
          pushStatus = 'sm.SM_FLD_PUSH_STAT_PUED'
          break
        case 'CAED' :
          pushStatus = 'sm.SM_FLD_PUSH_STAT_CAED'
          break
        case 'RVED' :
          pushStatus = 'SM_FLD_PUSH_STAT_RVED'
          break
        case 'APR' :
          pushStatus = 'sm.SM_FLD_PUSH_STAT_APR'
          break
      }
      return (
        <tr key={i}>
          <td>{this.state.pagination.get('totalCount') - (( 10 * (this.state.pagination.get('pageNo') -1)) + i) }</td>
          <td>{push.getIn(['message', 'type'], '')}</td>
          <td><a onClick={this.onPopupPushDetail.bind(null, { pushId:push.get('pushId') })}>{push.getIn(['message', 'title'], '')}</a></td>
          <td>{push.getIn(['stats', 'requested'], 0)}</td>
          <td>{push.getIn(['stats', 'published'], 0)}</td>
          <td>{push.getIn(['stats', 'received'], 0)}</td>
          <td>{push.getIn(['stats', 'opened'], 0)}</td>
          <td>{intlStores.get(pushStatus)}</td>
          <td>{moment(push.get('createDt')).format('YYYY-MM-DD HH:mm:ss')}</td>
        </tr>
      )
    })
  }

  setComma(number) {
    return String(number).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
  }

  movePage(pageNo) {
    this._getPushList({pageNo:pageNo})
  }

  onPopupPushDetail(pushId) {
    /*
     if(pushId != null) {
     this.refs.pushPopup.readPushDetail(pushId)
     $('#detail_info').toggleClass('hide');
     }*/
  }
}
const PushContainer = Container.create(Push)
export default PushContainer
