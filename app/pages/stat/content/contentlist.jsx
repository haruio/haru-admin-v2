/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Container} from 'flux/utils'
import moment from 'moment'

import debug from 'debug'
const log = debug('application:StatsContentList.jsx')

import PageList from '../../../components/PageList'
import StatsActions from '../../../actions/StatsActions'
import PopupActions from '../../../actions/PopupActions'
import {POPUP} from '../../../constants/AppConstants'

import StatContentListStore from '../../../stores/StatContentListStore'
import PaginationStore from '../../../stores/PaginationStore'

import intlStores from '../../../utils/IntlStore'
import utility from '../../../utils/util'

const chartIcon = require('image!../../../assets/img/ChartsCombo.png')
/***
 * StatsContentList
 * author : jungun.park
 */
class StatsContentList extends React.Component {
  static getStores() {
    return [StatContentListStore, PaginationStore]
  }

  static calculateState() {
    return {
      stats: StatContentListStore.getStatsContentList(),
      searchObj: StatContentListStore.getSearchObj(),
      pagination: PaginationStore.getPagination(),
    }
  }

  componentDidMount() {
    StatsActions.getContentChartData({pageNo: 1, orderField: 'DATE', orderMethod: 'DESC'})
  }

  movePage = (pageNo) => {
    StatsActions.getContentChartData({
      pageNo: pageNo,
      orderField: this.state.searchObj.get('orderField'),
      orderMethod: this.state.searchObj.get('orderMethod')
    })
  }

  render() {
    return (
      <article>
        <hgroup>
          <h2>컨텐츠 전체현황</h2>
        </hgroup>
        <div id="contents">
          <p
            className="table_info">{intlStores.get('common.COMMON_FLD_TOTAL') + ' ' + this.state.pagination.get('totalCount') + ' ' + intlStores.get('common.COMMON_FLD_COUNT')}</p>
          <div className="table_wrap">
            <table className="listTableVColor">
              <colgroup>
                <col width="*%"/>
                <col width="10%"/>
                <col width="10%"/>
                <col width="8%"/>
                <col width="8%"/>
                <col width="8%"/>
                <col width="8%"/>
                <col width="8%"/>
                <col width="8%"/>
              </colgroup>
              <thead>
              <tr>
                <th><a onClick={this.onClickHeader.bind(null, 'TITLE')}   className="order_both">제목</a></th>
                <th><a onClick={this.onClickHeader.bind(null, 'DATE')}    className="order_both">발행일</a></th>
                <th><a onClick={this.onClickHeader.bind(null, 'CHANNEL')} className="order_both">채널</a></th>
                <th><a onClick={this.onClickHeader.bind(null, 'LIKE')}    className="order_both">좋아요</a></th>
                <th><a onClick={this.onClickHeader.bind(null, 'COMMENT')} className="order_both">댓글</a></th>
                <th><a onClick={this.onClickHeader.bind(null, 'VIEW')}    className="order_both">뷰</a></th>
                <th><a onClick={this.onClickHeader.bind(null, 'SHARE')}   className="order_both">공유</a></th>
                <th><a onClick={this.onClickHeader.bind(null, 'SCORE')}   className="order_both">점수</a></th>
                <th>Trend</th>
              </tr>
              </thead>
              <tbody>
              {this.renderContentStatList}
              </tbody>
            </table>
          </div>
          <PageList pageObj={this.state.pagination} clickAction={this.movePage}/>
          <p className="btn_r">
            <a onClick={this.downloadExcel} className="purple btn_w140">엑셀 다운로드</a>
          </p>
        </div>
      </article>
    )
  }


  /***
   * 표에 해더 부분을 눌렀을때 정렬을 다시 하는 로직. 서버에서 정렬해서 내려주는 방식을 사용함
   * jquery를 걷어내기 기찮아서 일단 이렇게 만듬
   * @param orderField {String} - 누른 해당 필드 이름
   * @param event {MouseEvent} - 마우스 클릭 이벤트
   */
  onClickHeader = (orderField, event) => {
    let orderMethod = 'DESC'
    const _className = event ? $(event.target).attr('class') : ''
    if (_className == 'order_desc') {
      orderMethod = 'ASC'
      // order_both 지우는 로직
      $(event.target).parent().parent().contents().find('a').removeClass()
      // 정렬 화살표
      $(event.target).attr('class', 'order_asc')
    } else {
      orderMethod = 'DESC'
      // order_both 지우는 로직
      $(event.target).parent().parent().contents().find('a').removeClass()
      // 정렬 화살표
      $(event.target).attr('class', 'order_desc')
    }

    //조회
    StatsActions.getContentChartData({
      pageNo: this.state.searchObj.get('pageNo'),
      orderField: orderField,
      orderMethod: orderMethod
    })
  }

  downloadExcel() {
    StatsActions.getPostTypeContentExcel()
  }


  get renderContentStatList() {
    if (this.state.stats.size === 0) {
      return null
    }

    return this.state.stats.map((dataRow, i) => {
      return (
        <tr key={i}>
          <td><a onClick={this.openPost.bind(null, dataRow.get('shortUrl'))}>{dataRow.get('postTitle')}</a></td>
          <td>{moment(dataRow.get('publishStartDt')).format('YYYY-MM-DD')}</td>
          <td>{dataRow.getIn(['channel', 'name'], '')}</td>
          <td>{dataRow.get('likeCnt')}</td>
          <td>{dataRow.get('commentCnt')}</td>
          <td>{dataRow.get('viewCnt')}</td>
          <td>{dataRow.get('shareCnt')}</td>
          <td>{dataRow.get('score')}</td>
          <td><a onClick={this.onPopupPostTrend.bind(null, dataRow.get('postSeq'))}><img src={chartIcon} alt="Trend Chart"/></a></td>
        </tr>
      )
    })
  }

  openPost(shortUrl) {
    window.open(utility.getServiceUrl() + shortUrl, '_blank')
  }

  onPopupPostTrend(postSeq) {
    PopupActions.openPopup(POPUP.POSTTREND, {postSeq:postSeq})
  }
}

const StatsContentListContainer = Container.create(StatsContentList)
export default StatsContentListContainer
