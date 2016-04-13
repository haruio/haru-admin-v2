/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Container} from 'flux/utils'
import {Link} from 'react-router'
import cn from 'classnames'
import moment from 'moment'

import debug from 'debug'
const log = debug('application:StatsUser.jsx')

import StatActions from '../../actions/StatsActions'
import StatUserStore from '../../stores/StatUserStore'
import ReactHighcharts from 'react-highcharts'

/***
 * Banner List
 * author : jungun.park
 */
class StatsUser extends React.Component {
  static getStores() {
    return [StatUserStore]
  }

  static calculateState() {
    return {
      genderType: StatUserStore.getGenderType(),
      ageType: StatUserStore.getAgeType(),
      joinType: StatUserStore.getJoinType(),
      userchart: StatUserStore.getUserChart(),
      usertable: StatUserStore.getUserTable()
    }
  }

  componentDidMount() {
    StatActions.getUserChartData({
      startDate:moment().subtract(8, 'day').format('YYYY-MM-DD'),
      endDate:  moment().subtract(1, 'day').format('YYYY-MM-DD')
    })
  }

  render() {
    const genderTypeConfig = this.genderChartHandler(this.state.genderType.toJS())
    const ageTypeConfig = this.ageChartHandler(this.state.ageType.toJS())
    const joinTypeConfig = this.joinChartHandler(this.state.joinType.toJS())
    const userChartConfig = this.userChartHandler(this.state.userchart.toJS())

    return (
      <article>
        <hgroup>
          <h2>회원 전체현황</h2>
        </hgroup>
        <div id="contents">
          <div className="stat_panel">
            <div className="stat_item">
              <ReactHighcharts config={genderTypeConfig}></ReactHighcharts>
            </div>
            <div className="stat_item">
              <ReactHighcharts config={ageTypeConfig}></ReactHighcharts>
            </div>
            <div className="stat_item">
              <ReactHighcharts config={joinTypeConfig}></ReactHighcharts>
            </div>
          </div>
          <div className="stat_panel">
            <ReactHighcharts config={userChartConfig}></ReactHighcharts>
          </div>
          <div className="table_wrap" style={{clear:'left'}}>
            <table className="listTableVColor">
              <colgroup>
                <col width="*" /><col width="7%" />
                <col width="6%" /><col width="6%" />
                <col width="6%" /><col width="7%" />
                <col width="7%" /><col width="7%" />
                <col width="7%" /><col width="7%" />
                <col width="7%" /><col width="7%" />
                <col width="7%" /><col width="7%" />
              </colgroup>
              <thead>
              <tr>
                <th style={{borderRight:'1px solid #beb1c2'}}>구분</th>
                <th style={{borderRight:'1px dashed #beb1c2'}}>가입수</th>
                <th>남</th>
                <th>여</th>
                <th style={{borderRight:'1px dashed #beb1c2'}}>성별 미입력</th>
                <th>Facebook</th>
                <th>Mail</th>
                <th style={{borderRight:'1px dashed #beb1c2'}}>가입 미입력</th>
                <th>10대 이전</th>
                <th>10대</th>
                <th>20대</th>
                <th>30대</th>
                <th>40대 이후</th>
                <th>연령 미입력</th>
              </tr>
              </thead>
              <tbody>
              {this.renderUserTableList}
              </tbody>
            </table>
          </div>
        </div>
      </article>
    )
  }

  get renderUserTableList() {
    return this.state.usertable.map((userTableRow, i) => {
      return (
        <tr key={i}>
          <td style={{borderRight:'1px solid #beb1c2'}}>{isNaN(userTableRow.get('join_dt')) ? (userTableRow.get('join_dt') ? userTableRow.get('join_dt') : "Terms" ) : moment(userTableRow.get('join_dt'), "YYYYmmDD").format('YYYY-mm-DD') }</td>
          <td style={{borderRight:'1px dashed #beb1c2'}}>{this.setComma(userTableRow.get('S') || 0)}</td>
          <td>{this.setComma(userTableRow.get('M') || 0)}</td>
          <td>{this.setComma(userTableRow.get('F') || 0)}</td>
          <td style={{borderRight:'1px dashed #beb1c2'}}>{this.setComma(userTableRow.get('NK') || 0)}</td>
          <td>{this.setComma(userTableRow.get('FB') || 0)}</td>
          <td>{this.setComma(userTableRow.get('EM') || 0)}</td>
          <td style={{borderRight:'1px dashed #beb1c2'}}>{this.setComma(userTableRow.get('NA') || 0)}</td>
          <td>{this.setComma(userTableRow.get('0') || 0)}</td>
          <td>{this.setComma(userTableRow.get('10') || 0)}</td>
          <td>{this.setComma(userTableRow.get('20') || 0)}</td>
          <td>{this.setComma(userTableRow.get('30') || 0)}</td>
          <td>{this.setComma(userTableRow.get('40') || 0)}</td>
          <td>{this.setComma(userTableRow.get('NB') || 0)}</td>
        </tr>
      )
    })
  }

  setComma(number) {
    return String(number).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  }


  userChartHandler(chartData) {

    const startDate = moment().subtract(8, 'day').format('YYYYMMDD')
    const endDate = moment().subtract(1, 'day').format('YYYYMMDD')
    let searchTerm = moment(endDate).diff(moment(startDate), 'days')

    var userChartDataLength = chartData.length || 0;

    var xAxisList = [];
    var maleChartData = [];
    var femaleChartData = [];
    var nkChartData = [];
    var totalChartData = [];

    var startDateNum = Number(moment(startDate).format("YYYYMMDD")) || 0;

    var userCharDataIdx = 0;

    //전체 Array를 만든다.
    for(var j=0; j <= searchTerm; j++) {

      let maleCnt = 0;
      let femaleCnt = 0;
      let nkCnt = 0;
      let sumCnt = 0;

      if(userCharDataIdx < userChartDataLength
        && Number(chartData[userCharDataIdx].join_dt) == moment(startDate).add(j, "day").format("YYYYMMDD")) {

        maleCnt = chartData[userCharDataIdx].M || 0;
        femaleCnt = chartData[userCharDataIdx].F || 0;
        nkCnt = chartData[userCharDataIdx].NK || 0;
        sumCnt = chartData[userCharDataIdx].S || 0;

        userCharDataIdx++
      }

      xAxisList.push(moment(startDate).add(j, "day").format("YYYY-MM-DD"))
      maleChartData.push(maleCnt)
      femaleChartData.push(femaleCnt)
      nkChartData.push(nkCnt)
      totalChartData.push(sumCnt)

    }

    const periodConfig = {
      chart: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        height:350
      },
      credits: {
        enabled:false
      },
      title: {
        text: '일자별 회원현황'
      },
      xAxis: {
        categories: xAxisList
      },
      yAxis: {
        title: {
          text: 'Person Count'
        }
      },
      labels: {

      },
      series: [
        {
          type: 'column',
          name: 'Man',
          color: '#3b5998',
          data: maleChartData
        }, {
          type: 'column',
          name: 'Woman',
          color: '#ff0f0f',
          data: femaleChartData
        }, {
          type: 'column',
          name: 'NK',
          color: '#615977',
          data: nkChartData
        }, {
          type: 'spline',
          name: 'Total',
          color: 'orange',
          marker: {
            lineWidth: 2,
            fillColor: 'orange'
          },
          data: totalChartData
        }
      ]
    }

    return periodConfig
  }

  genderChartHandler(chartData) {
    var genderTypeConfig = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        type: 'pie',
        height:350
      },
      credits: {
        enabled:false
      },
      title: {
        text: 'Gender Type',
        align: 'center',
        verticalAlign: 'middle'
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
            distance: -40,
            style: {
              fontWeight: 'bold',
              color: 'white',
              textShadow: '0px 1px 2px black'
            }
          }
        }
      },
      series: [{
        name: "Total Ratio",
        innerSize: '50%',
        colorByPoint: true,
        data: [{
          name: "Man",
          color: '#3b5998',
          y: chartData.M || 0
        }, {
          name: "Woman",
          color: '#ff0f0f',
          y: chartData.F || 0
        }, {
          name: "None",
          color: 'orange',
          y: chartData.NK || 0
        }]
      }]
    }

    return genderTypeConfig
  }
  ageChartHandler(chartData) {

    var ageTypeConfig = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        type: 'pie',
        height:350
      },
      credits: {
        enabled:false
      },
      title: {
        text: 'Age Type',
        align: 'center',
        verticalAlign: 'middle'
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
            distance: -50,
            style: {
              fontWeight: 'bold',
              color: 'white',
              textShadow: '0px 1px 2px black'
            }
          }
        }
      },
      series: [{
        name: "Total Ratio",
        innerSize: '40%',
        colorByPoint: true,
        data: [{
          name: "입력안함",
          color: '#091D42',
          y: chartData["NK"] || 0
        },{
          name: "10대이전",
          color: '#191A12',
          y: chartData["0"] || 0
        },{
          name: "10대",
          color: '#396AF2',
          y: chartData["10"] || 0
        }, {
          name: "20대",
          color: '#F11942',
          y: chartData["20"] || 0
        },{
          name: "30대",
          color: '#9AF4CB',
          y: chartData["30"] || 0
        }, {
          name: "40대",
          color: '#ECEDF2',
          y: chartData["40"] || 0
        }]
      }]
    };

    return ageTypeConfig
  }

  joinChartHandler(chartData) {
    var joinTypeConfig = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        type: 'pie',
        height:350
      },
      credits: {
        enabled:false
      },
      title: {
        text: 'Join Type',
        align: 'center',
        verticalAlign: 'middle'
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
            distance: -50,
            style: {
              fontWeight: 'bold',
              color: 'white',
              textShadow: '0px 1px 2px black'
            }
          }
        }
      },
      series: [{
        name: "Total Ratio",
        innerSize: '40%',
        colorByPoint: true,
        data: [{
          name: "Email",
          color: '#A8CB17',
          y: chartData["EM"] || 0
        }, {
          name: "Facebook",
          color: '#17649A',
          y: chartData["FB"] || 0
        }, {
          name: "NONE",
          color: '#209872',
          y: chartData["NK"] || 0
        }]
      }]
    }

    return joinTypeConfig
  }
}

const StatsUserContainer = Container.create(StatsUser)
export default StatsUserContainer
