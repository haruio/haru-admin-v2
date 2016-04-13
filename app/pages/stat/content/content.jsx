/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Container} from 'flux/utils'
import cn from 'classnames'

import moment from 'moment'

import debug from 'debug'
const log = debug('application:StatsContent.jsx')


import StatsActions from '../../../actions/StatsActions'
import StatContentStore from '../../../stores/StatContentStore'
import ReactHighcharts from 'react-highcharts'

/***
 * StatsContent
 * 날짜 변경 기능 일단 개발 안함
 * author : jungun.park
 */
class StatsContent extends React.Component {
  static getStores() {
    return [StatContentStore]
  }

  static calculateState() {
    return {
      postType: StatContentStore.getPostType(),
      channelType: StatContentStore.getChannelType(),
      categoryType: StatContentStore.getCategoryType(),
      contentDaily: StatContentStore.getContentDaily()
    }
  }

  componentDidMount() {
    this.searchContentStatistic()
    
    StatsActions.getContentDailyTrendData({
      startDate:moment().subtract(8, 'day').format('YYYY-MM-DD'),
      endDate:  moment().subtract(1, 'day').format('YYYY-MM-DD')
    })
  }


  // 전체 추이 차트
  searchContentStatistic() {
    StatsActions.getPostTypeChartData()
    StatsActions.getChannelTypeChartData()
    StatsActions.getCategoryTypeChartData()
  }

  render() {
    const postTypeConfig = this.postTypeChartHandler(this.state.postType.toJS())
    const channelTypeConfig = this.channelTypeChartHandler(this.state.channelType.toJS())
    const categoryTypeConfig = this.categoryTypeChartHandler(this.state.categoryType.toJS())
    const postDailyConfig = this.postDailyChartHandler(this.state.contentDaily.toJS())

    return (
      <article>
        <hgroup>
          <h2>컨텐츠 전체현황</h2>
        </hgroup>
        <div id="contents">
          <div className="stat_panel">
            <div className="stat_item">
              <ReactHighcharts config={postTypeConfig}></ReactHighcharts>
            </div>
            <div className="stat_item">
              <ReactHighcharts config={channelTypeConfig}></ReactHighcharts>
            </div>
            <div className="stat_item">
              <ReactHighcharts config={categoryTypeConfig}></ReactHighcharts>
            </div>
          </div>
          <div className="stat_panel">
            <ReactHighcharts config={postDailyConfig}></ReactHighcharts>
          </div>
          <div className="table_wrap" style={{clear:'left'}}>
            <table className="listTableVColor">
              <colgroup>
                <col width="*"/>
                <col width="15%"/>
                <col width="15%"/>
                <col width="15%"/>
                <col width="15%"/>
                <col width="15%"/>
              </colgroup>
              <thead>
              <tr>
                <th>구분</th>
                <th>View 수</th>
                <th>Post 수</th>
                <th>Comment 수</th>
                <th>Like 수</th>
                <th>공유 수</th>
              </tr>
              </thead>
              <tbody>
              {this.renderContentTableList}
              </tbody>
            </table>
          </div>
        </div>
      </article>
    )
  }


  get renderContentTableList() {
    return this.state.contentDaily.map((contentTableRow, i) => {
      log(contentTableRow.toJS())
      return (
        <tr key={i}>
          <td>{isNaN(contentTableRow.get('stats_dd')) ? (contentTableRow.get('stats_dd') ? contentTableRow.get('stats_dd') : "-" ) : moment(contentTableRow.get('stats_dd'), 'YYYYMMDD').format('YYYY-MM-DD') }</td>
          <td>{this.setComma(contentTableRow.get('VIEWS') || 0)}</td>
          <td>{this.setComma(contentTableRow.get('POSTS') || 0)}</td>
          <td>{this.setComma(contentTableRow.get('COMMENTS') || 0)}</td>
          <td>{this.setComma(contentTableRow.get('LIKES')|| 0)}</td>
          <td>{this.setComma(contentTableRow.get('SHARES') || 0)}</td>
        </tr>
      )
    })
  }

  setComma(number) {
    return String(number).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  }

  postTypeChartHandler(chartData) {
    const postTypeChartStatList = chartData.map((dataRow, i) => {
      dataRow['y'] = dataRow['count']
      delete dataRow['count']
      dataRow['color'] = '#' + Math.floor(Math.random() * 16777215).toString(16)
      return dataRow
    })

    const postTypeChartConfig = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        type: 'pie',
        height: 350
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Post Type',
        align: 'center'
      },
      tooltip: {
        pointFormat: '<b>{point.y:.1f}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          showInLegend: true,
          dataLabels: {
            enabled: true,
            format: '{point.name}<br/>({point.percentage:.1f}%)',
            distance: -60,
            style: {
              fontWeight: 'bold',
              color: 'white',
              textShadow: '0px 1px 2px black'
            }
          }
        }
      },
      series: [{
        name: 'Total Ratio',
        //innerSize: '40%',
        colorByPoint: true,
        data: postTypeChartStatList
      }]
    }

    return postTypeChartConfig
  }

  channelTypeChartHandler(chartData) {
    const channelTypeChartStatList = chartData.map((dataRow, i) => {
      dataRow['y'] = dataRow['count']
      delete dataRow['count']
      dataRow['color'] = '#' + Math.floor(Math.random() * 16777215).toString(16)
      return dataRow
    })

    const channelTypeConfig = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        type: 'pie',
        height: 350
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Channel Type',
        align: 'center'
      },
      tooltip: {
        pointFormat: '<b>{point.y:.1f}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          showInLegend: true,
          dataLabels: {
            enabled: true,
            format: '{point.name}<br/>({point.percentage:.1f}%)',
            style: {
              fontWeight: 'bold',
              color: 'white',
              textShadow: '0px 1px 2px black'
            }
          }
        }
      },
      series: [{
        name: 'Total Ratio',
        colorByPoint: true,
        data: channelTypeChartStatList
      }]
    }

    return channelTypeConfig
  }

  categoryTypeChartHandler(chartData) {
    const categoryTypeChartStatList = chartData.map((dataRow, i) => {
      dataRow['y'] = dataRow['count']
      delete dataRow['count']
      dataRow['color'] = '#' + Math.floor(Math.random() * 16777215).toString(16)
      return dataRow
    })

    const categoryTypeConfig = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        type: 'pie',
        height: 350
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Category Type',
        align: 'center'
        //verticalAlign: 'top'
      },
      tooltip: {
        pointFormat: '<b>{point.y:.1f}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          showInLegend: true,
          dataLabels: {
            enabled: true,
            format: '{point.name}<br/>({point.percentage:.1f}%)',
            style: {
              fontWeight: 'bold',
              color: 'white',
              textShadow: '0px 1px 2px black'
            }
          }
        }
      },
      series: [{
        name: 'Total Ratio',
        colorByPoint: true,
        data: categoryTypeChartStatList
      }]
    }
    return categoryTypeConfig
  }

  postDailyChartHandler(chartData) {

    const startDate = moment().subtract(8, 'day').format('YYYYMMDD')
    const endDate = moment().subtract(1, 'day').format('YYYYMMDD')
    let searchTerm = moment(endDate).diff(moment(startDate), 'days')

    let userChartDataLength = chartData.length || 0

    let xAxisList = [];
    let commentData = [];
    let likeData = [];
    let shareData = [];
    let dailyViewData = [];

    let startDateNum = Number(moment(startDate).format('YYYYMMDD')) || 0

    let charDataIdx = 0

    //전체 Array를 만든다.
    for(let j=0; j <= searchTerm; j++) {

      let commentCnt = 0
      let likeCnt = 0
      let shareCnt = 0
      let viewCnt = 0

      if(charDataIdx < userChartDataLength
        && Number(chartData[charDataIdx].stats_dd) == moment(startDate).add(j, 'day').format('YYYYMMDD')) {

        commentCnt = chartData[charDataIdx].COMMENTS || 0
        likeCnt = chartData[charDataIdx].LIKES || 0
        shareCnt = chartData[charDataIdx].SHARES || 0
        viewCnt = chartData[charDataIdx].VIEWS || 0

        charDataIdx++
      }

      xAxisList.push(moment(startDate).add(j, 'day').format('YYYY-MM-DD'))
      commentData.push(commentCnt)
      likeData.push(likeCnt)
      shareData.push(shareCnt)
      dailyViewData.push(viewCnt)

    }

    const periodConfig = {
      chart: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        height:360
      },
      credits: {
        enabled:false
      },
      title: {
        text: '일자별 Contents현황'
      },
      xAxis: {
        categories: xAxisList
      },
      yAxis: {
        title: {
          text: 'View Count'
        }
      },
      labels: {

      },
      series: [
        {
          type: 'column',
          name: 'Comment',
          color: '#293C1C',
          data: commentData
        }, {
          type: 'column',
          name: 'Like',
          color: '#287662',
          data: likeData
        }, {
          type: 'column',
          name: 'Share',
          color: '#53AEC5',
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

const StatsContentContainer = Container.create(StatsContent)
export default StatsContentContainer
