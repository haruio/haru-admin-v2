/**
 * Created by jungenpark on 3/22/16.
 */
import React from 'react'
import {Container} from 'flux/utils'
import moment from 'moment'

import debug from 'debug'
const log = debug('application:PostTrendPopup.jsx')

import StatsActions from '../../../actions/StatsActions'
import PostTrendPopupStore from '../../../stores/PostTrendPopupStore'

import ReactHighcharts from 'react-highcharts'
/***
 * Author : jungun.park
 */
class PostTrendPopup extends React.Component {
  static getStores() {
    return [PostTrendPopupStore]
  }

  static calculateState() {
    return {
      trends: PostTrendPopupStore.getPostTrendData()
    }
  }

  componentDidMount() {
    log(this.props)
    StatsActions.getPostDailyTrendData(this.props.postSeq)
  }

  render() {
    const periodConfig = this.postDailyChartHandler(this.state.trends.toJS())
    return (
      <div className="pop_wrap">
        <div className="pop pop2" id="post_trend" onClick={this.clearEvent}>
          <h2>Post Daily Trend</h2>
          <div id="postDailyTrend" >
            <div className="tab_ct profile">
              <ReactHighcharts config={periodConfig}></ReactHighcharts>
            </div>
            <p className="btn_c">
              <a onClick={this.props.close}>닫기</a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  clearEvent(e) {
    e.stopPropagation()
  }

  /***
   * post daily chart 데이터로 만들어주는 함수
   * TODO : 나중에 chart util 함수로 뽑는것도 괜찮을듯
   * @param chartData {object} - raw chart data
   * @returns {*} - post daily chart data
   */
  postDailyChartHandler(chartData) {
    let userChartDataLength = chartData.length || 0

    let xAxisList = []
    let commentData = []
    let likeData = []
    let shareData = []
    let dailyViewData = []

    let charDataIdx = 0

    //전체 Array를 만든다.
    for(let j=0; j < userChartDataLength; j++) {
      let commentCnt = 0
      let likeCnt = 0
      let shareCnt = 0
      let viewCnt = 0


      commentCnt = chartData[charDataIdx].COMMENTS || 0
      likeCnt = chartData[charDataIdx].LIKES || 0
      shareCnt = chartData[charDataIdx].SHARES || 0
      viewCnt = chartData[charDataIdx].VIEWS || 0

      xAxisList.push(moment(chartData[charDataIdx].stats_dd, 'YYYYMMDD').format('YYYY-MM-DD'))
      commentData.push(commentCnt)
      likeData.push(likeCnt)
      shareData.push(shareCnt)
      dailyViewData.push(viewCnt)

      charDataIdx++
    }

    const periodConfig = {
      chart: {
        zoomType: 'x',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        height:500
      },
      credits: {
        enabled:false
      },
      title: {
        text: '일자별 Post Trend'
      },
      xAxis: {
        categories: xAxisList
      },
      yAxis: [{
        title: {
          text: 'View Count'
        }
      },
        {
          title: {
            text: 'Comment / Like / Share Count'
          },
          opposite: true
        }],
      labels: {

      },
      series: [
        {
          type: 'column',
          name: 'Comment',
          color: '#293C1C',
          yAxis: 1,
          data: commentData
        }, {
          type: 'column',
          name: 'Like',
          color: '#287662',
          yAxis: 1,
          data: likeData
        }, {
          type: 'column',
          name: 'Share',
          color: '#53AEC5',
          yAxis: 1,
          data: shareData
        }, {
          type: 'spline',
          name: 'View',
          color: 'orange',
          marker: {
            lineWidth: 2,
            fillColor: 'orange'
          },
          data: dailyViewData
        }
      ]
    }

    return periodConfig
  }
}

const PostTrendPopupContainer = Container.create(PostTrendPopup)
export default PostTrendPopupContainer
