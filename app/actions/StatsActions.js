import debug from 'debug'
const log = debug('application:AuthActions.jsx')

import AppDispatcher from '../dispatcher/AppDispatcher.js'
import AppConstants from '../constants/AppConstants.js'
import request from 'superagent'
import utility from '../utils/util.js'

import moment from 'moment'
import { currentuser, URL, middleware_accesstoken } from './AuthActions.js'

const StatsActions = {
  getUserChartData(searchObj) {
    request.get(utility.getUrl() + '/tm/user/graph')
      .use(middleware_accesstoken)
      .query({startDate: moment(searchObj.startDate).format("YYYY-MM-DD"), endDate: moment(searchObj.endDate).add(1, 'day').format("YYYY-MM-DD")})
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_USER_CHART_DATA,
          userChartData: res.body
        })
      })

    request.get(utility.getUrl() + '/tm/user/genderType')
      .use(middleware_accesstoken)
      .query({startDate: moment(searchObj.startDate).format("YYYY-MM-DD"), endDate: moment(searchObj.endDate).add(1, 'day').format("YYYY-MM-DD")})
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_GENDER_CHART_DATA,
          genderTypeData:res.body
        })
      })

    request.get(utility.getUrl() + '/tm/user/ageType')
      .use(middleware_accesstoken)
      .query({startDate: moment(searchObj.startDate).format("YYYY-MM-DD"), endDate: moment(searchObj.endDate).add(1, 'day').format("YYYY-MM-DD")})
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_AGE_CHART_DATA,
          ageTypeData:res.body
        })
      })

    request.get(utility.getUrl() + '/tm/user/joinType')
      .use(middleware_accesstoken)
      .query({startDate: moment(searchObj.startDate).format("YYYY-MM-DD"), endDate: moment(searchObj.endDate).add(1, 'day').format("YYYY-MM-DD")})
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }
        AppDispatcher.handleViewAction({
          type: AppConstants.GET_JOIN_CHART_DATA,
          joinTypeData:res.body
        })
      })

    request.get(utility.getUrl() + '/tm/user/table')
      .use(middleware_accesstoken)
      .query({startDate: moment(searchObj.startDate).format("YYYY-MM-DD"), endDate: moment(searchObj.endDate).add(1, 'day').format("YYYY-MM-DD")})
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_USER_TABLE_DATA,
          userTableData:res.body
        })
      })
  },

  getPostTypeChartData() {
    request.get(URL + '/tm/content/postType')
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_CONTENT_POSTTYPE_CHART_DATA,
          postTypeCharData: res.body
        })
      })
  },
  getChannelTypeChartData() {
    request.get(URL + '/tm/content/channelType')
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_CONTENT_CHANNELTYPE_CHART_DATA,
          channelTypeCharData: res.body
        })
      })
  },
  getCategoryTypeChartData() {
    request.get(URL + '/tm/content/categoryType')
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_CONTENT_CATEGORYTYPE_CHART_DATA,
          categoryTypeCharData: res.body
        })
      })
  },
  getContentDailyTrendData(searchObj) {
    request.get(utility.getUrl('kerberos-stats') + '/daily/trend/table')
      .use(middleware_accesstoken)
      .query({startDate: moment(searchObj.startDate).format("YYYY-MM-DD"), endDate: moment(searchObj.endDate).format("YYYY-MM-DD")})
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_CONTENT_DAILY_TREND_DATA,
          contentTableData: res.body
        })
      })

  },
  getPostDailyTrendData(postSeq) {
    request.get(utility.getUrl('kerberos-stats') + '/daily/trend/' + postSeq)
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_POST_DAILY_TREND_DATA,
          postTrendData: res.body
        })
      })
  },
  /***
   *
   * @param searchObj
     */
  getContentChartData(searchObj) {
    log(searchObj)
    request.get(URL + '/tm/content')
      .use(middleware_accesstoken)
      .query({pageNo: searchObj.pageNo||1, pageSize: searchObj.pageSize||10 })
      .query({orderField: searchObj.orderField||'DATE', orderMethod: searchObj.orderMethod||'DESC'})
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_CONTENT_CHART_DATA,
          contentChartData: res.body.data,
          searchObj : searchObj,
          pagination: {
            pageSize : res.body.pageSize,
            firstPageNo : res.body.firstPageNo,
            startPageNo : res.body.startPageNo,
            prevPageNo : res.body.prevPageNo,
            pageNo : res.body.pageNo,
            nextPageNo : res.body.nextPageNo,
            endPageNo : res.body.endPageNo,
            finalPageNo : res.body.finalPageNo,
            totalCount : res.body.totalCount
          }
        })
      })
  },
  getPostTypeContentExcel() {
    window.open(utility.getUrl('excel') + '/v1/statistics/content', '_blank')
  },
  getUserTableExcel(searchObj) {
    window.open(utility.getUrl('excel') + '/v1/statistics/user?begin='+moment(searchObj.startDate).format("YYYY-MM-DD")+"&end="+moment(searchObj.endDate).add(1, 'day').format("YYYY-MM-DD"), "_blank")
  }
}

export default StatsActions
