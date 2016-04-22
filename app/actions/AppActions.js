/**
 * Created by jungenpark on 2/14/16.
 */

import debug from 'debug'
const log = debug('application:AppActions.jsx')

import AppDispatcher from '../dispatcher/AppDispatcher.js'
import AppConstants from '../constants/AppConstants.js'

import request from 'superagent'

import utility from '../utils/util.js'

import { currentuser, URL, middleware_accesstoken } from './AuthActions.js'

import moment from 'moment'
import Alert from 'react-s-alert'

/***
 * middleware_accesstoken
 * superagent middleware : access token 이 있으면 header에 추가
 * @param request {object}
 * @returns {*}
 */


const AppActions = {
  /***
   * Image Upload
   */
  uploadImage(filePath, type, target, width, height, size) {
    request.post(URL + '/resources')
      .set('x-auth-token', currentuser.accesstoken)
      .attach('file', filePath, filePath.name)
      .query({width: width, height: height, size: size})
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        if (type === 'CATEGORY') {
          AppDispatcher.handleViewAction({
            type: AppConstants.UPLOAD_CATEGORY_IMAGE,
            image: res.body,
            target: target
          })
        } else if (type === 'CHANNEL') {
          AppDispatcher.handleViewAction({
            type: AppConstants.UPLOAD_CHANNEL_IMAGE,
            image: res.body,
            target: target
          })
        } else if (type === 'IMAGE' || type === 'VIDEO') {
          AppDispatcher.handleViewAction({
            type: AppConstants.UPLOAD_CONTENT_IMAGE,
            image: res.body,
            target: target
          })
        } else if (type === 'BANNER') {
          AppDispatcher.handleViewAction({
            type: AppConstants.UPLOAD_BANNER_IMAGE,
            image: res.body,
            target: target
          })
        }
      })
  },
  uploadMainFeedThumbnailImage(filePath, type, target, width, height, size, selectedindex) {
    request.post(URL + '/resources')
      .set('x-auth-token', currentuser.accesstoken)
      .attach('file', filePath, filePath.name)
      .query({width: width, height: height, size: size})
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.UPLOAD_MAINFEED_IMAGE,
          image: res.body,
          target: target,
          selectedindex: selectedindex
        })
      })
  },
  clearMainFeedThumbnailImage(selectedindex, url) {
    AppDispatcher.handleViewAction({
      type: AppConstants.CLEAR_MAINFEED_IMAGE,
      selectedindex: selectedindex,
      url:url
    })
  },
  clearImage(type, target) {
    if (type === 'CATEGORY') {
      AppDispatcher.handleViewAction({
        type: AppConstants.CLEAR_CATEGORY_IMAGE,
        target: target
      })
    } else if (type === 'CHANNEL') {
      AppDispatcher.handleViewAction({
        type: AppConstants.CLEAR_CHANNEL_IMAGE,
        target: target
      })
    } else if (type === 'IMAGE' || type === 'VIDEO') {
      AppDispatcher.handleViewAction({
        type: AppConstants.CLEAR_CONTENT_IMAGE,
        target: target
      })
    } else if (type === 'BANNER') {
      AppDispatcher.handleViewAction({
        type: AppConstants.CLEAR_BANNER_IMAGE,
        target : target
      })
    }
  },
  /***
   * Mainfeed API
   * @param dateObj
   */
    //전체 불러오기
  listMainFeedTemplate(dateObj) {
    request.get(URL + '/sm/feed/template')
      .use(middleware_accesstoken)
      .query({
        startDate: dateObj.publishDate || moment().utc().toISOString(),
        endDate: dateObj.publishEndDate || moment().utc().add('1','day').subtract('1', 'second').toISOString()})
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }
        AppDispatcher.handleViewAction({
          type: AppConstants.GET_MAINFEED,
          contents: res.body.data
        })
      })
  },
  //한개 불러오기
  readMainFeedTemplate(groupId) {
    request.get(URL + '/sm/feed/template/' + groupId)
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }
        AppDispatcher.handleViewAction({
          type: AppConstants.READ_MAINFEED,
          contents: res.body
        })
      })
  },
  changeMainFeedSearchDate(searchDate) {
    AppDispatcher.handleViewAction({
      type: AppConstants.MAINFEED_CHANGE_SEACHDATE,
      searchDate: searchDate
    })
  },
  //새로 만들기
  createMainFeedTemplate(typeid) {
    AppDispatcher.handleViewAction({
      type: AppConstants.CREATE_MAINFEED,
      typeid: typeid
    })
  },
  //타입 변경하기 (새로만들때만 가능함)
  changeMainFeedTemplate(typeindex) {
    AppDispatcher.handleViewAction({
      type: AppConstants.CHANGE_TYPE_MAINFEED,
      typeindex: typeindex
    })
  },
  updateMainFeedTemplate(index, feeditem) {
    AppDispatcher.handleViewAction({
      type: AppConstants.UPDATE_MAINFEEDITEM,
      index: index,
      feeditem : feeditem
    })
  },
  updateMainFeedDate(value) {
    AppDispatcher.handleViewAction({
      type: AppConstants.UPDATE_MAINFEED_DATE,
      value: value
    })
  },
  deleteMainFeedTemplate(index) {
    AppDispatcher.handleViewAction({
      type: AppConstants.DELETE_MAINFEEDITEM,
      index: index
    })
  },
  reserveMainFeed(dataObj) {
    request.post(URL + '/sm/feed/template')
      .use(middleware_accesstoken)
      .send(dataObj)
      .end(function (err, res) {
        // TODO : refactoring 필요!
        if (utility.errorHandler(err, res)) {
          return
        }

        /* known error */
        if('ERROR' === res.body.type) {
          let message = ''
          switch(res.body.message) {
            case 'INVALID_POST_SEQ':
              message = '템플릿 정보가 올바르지 않습니다.'
              break
            default:
              message = '메인피드를 등록하지 못했습니다.'
              break
          }

          Alert.success(message, {
            position: 'top-right',
            effect: 'slide',
            timeout: 3000
          })
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.COMPLETE_REGISTE_MAINFEED
        })

      })
  },
  updateMainFeed(dataObj, groupId) {
    request.put(`${URL}/sm/feed/template/${groupId}`)
      .use(middleware_accesstoken)
      .send(dataObj)
      .end(function (err, res) {
        // TODO : refactoring 필요!
        if (utility.errorHandler(err, res)) {
          return
        }

        /* known error */
        if('ERROR' === res.body.type) {
          let message = ''
          switch(res.body.message) {
            case 'INVALID_POST_SEQ':
              message = '템플릿 정보가 올바르지 않습니다.'
              break
            default:
              message = '메인피드를 등록하지 못했습니다.'
              break
          }

          Alert.success(message, {
            position: 'top-right',
            effect: 'slide',
            timeout: 3000
          })
          return
        }

        Alert.success('메인피드를 수정했습니다.', {
          position: 'top-right',
          effect: 'slide',
          timeout: 3000
        })

        AppDispatcher.handleViewAction({
          type: AppConstants.COMPLETE_REGISTE_MAINFEED
        })
      })
  },
  deleteMainFeed(groupId, searchDate) {
    request.del(URL + '/sm/feed/template/' + groupId)
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        if('ERROR' === res.body.type) {
          Alert.error('메인피드를 삭제하지 못했습니다.', {
            position: 'top-right',
            effect: 'slide',
            timeout: 3000
          })
          return
        }

        Alert.success('해당 메인피드를 삭제하였습니다.', {
          position: 'top-right',
          effect: 'slide',
          timeout: 3000
        })

        const publishStartDate = moment(searchDate+' 00:00:00').format('YYYY-MM-DD HH:mm:ss')
        const publishEndDate = moment(searchDate +' 23:59:59').format('YYYY-MM-DD HH:mm:ss')
        AppActions.listMainFeedTemplate({publishDate:moment(publishStartDate).utc().toISOString(), publishEndDate:moment(publishEndDate).utc().toISOString()})
      })
  },
  deleteMainFeedItem(groupId) {
    request.del(URL + '/sm/feed/template/' + groupId)
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        if('ERROR' === res.body.type) {
          Alert.error('메인피드를 삭제하지 못했습니다.', {
            position: 'top-right',
            effect: 'slide',
            timeout: 3000
          })
          return
        }

        Alert.success('해당 메인피드를 삭제하였습니다.', {
          position: 'top-right',
          effect: 'slide',
          timeout: 3000
        })

        AppDispatcher.handleViewAction({
          type: AppConstants.COMPLETE_REGISTE_MAINFEED
        })
      })
  },
  /**
   * Banner by Keigun
   */
  getBannerList(pageNo, pageSize, startDate, endDate, platform) {
    request.get(URL + '/sm/banners')
      .use(middleware_accesstoken)
      .query({ pageNum: pageNo, pageSize: pageSize })
      .query({ startDate: startDate, endDate: endDate })
      .query({ platform: platform})
      .end(function (err, res) {
        if(utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_BANNER_LIST,
          contents : res.body.data,
          pagination: {
            pageSize: res.body.pageSize,
            firstPageNo: res.body.firstPageNo,
            startPageNo: res.body.startPageNo,
            prevPageNo: res.body.prevPageNo,
            pageNo: res.body.pageNo,
            nextPageNo: res.body.nextPageNo,
            endPageNo: res.body.endPageNo,
            finalPageNo: res.body.finalPageNo,
            totalCount: res.body.totalCount
          }
        })
      })
  },
  getBannerChannelList(pageNo, pageSize, platform) {
    let requestbanner = request.get(URL + '/sm/banners/repeated')
      .use(middleware_accesstoken)
      .query({ pageNum: pageNo, pageSize: pageSize })

    if (platform !== 'ALL') {
      requestbanner = requestbanner.query({platform: platform})
    }

    requestbanner.end(function (err, res) {
      if(utility.errorHandler(err, res)) {
        return
      }

      AppDispatcher.handleViewAction({
        type: AppConstants.GET_BANNER_LIST,
        contents : res.body.data,
        pagination: {
          pageSize: res.body.pageSize,
          firstPageNo: res.body.firstPageNo,
          startPageNo: res.body.startPageNo,
          prevPageNo: res.body.prevPageNo,
          pageNo: res.body.pageNo,
          nextPageNo: res.body.nextPageNo,
          endPageNo: res.body.endPageNo,
          finalPageNo: res.body.finalPageNo,
          totalCount: res.body.totalCount
        }
      })
    })
  },
  getBannerOtherList(pageNo, pageSize, startDate, endDate, platform) {
    let requestbanner = request.get(URL + '/sm/banners/fixed')
      .use(middleware_accesstoken)
      .query({pageNum: pageNo, pageSize: pageSize})
      .query({startDate: startDate, endDate: endDate})

    if (platform !== 'ALL') {
      requestbanner = requestbanner.query({platform: platform})
    }

    requestbanner.end(function (err, res) {
      if (utility.errorHandler(err, res)) {
        return
      }

      AppDispatcher.handleViewAction({
        type: AppConstants.GET_BANNER_LIST,
        contents: res.body.data,
        pagination: {
          pageSize: res.body.pageSize,
          firstPageNo: res.body.firstPageNo,
          startPageNo: res.body.startPageNo,
          prevPageNo: res.body.prevPageNo,
          pageNo: res.body.pageNo,
          nextPageNo: res.body.nextPageNo,
          endPageNo: res.body.endPageNo,
          finalPageNo: res.body.finalPageNo,
          totalCount: res.body.totalCount
        }
      })
    })
  },
  getBanner(seq) {
    request.get(`${URL}/sm/banners/${seq}`)
      .use(middleware_accesstoken)
      .end(function (err, res) {

        if(utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_BANNER,
          content : res.body
        })

        /*url 안에 post 이면 해당 포스트데이터를 로딩한다. 채널 카테고리는 이미 가지고 있기 때문인가부다*/
        if(res.body && res.body.bannerUrl
          && (res.body.bannerUrl.indexOf('post') >= 0)) {
          AppActions.getPostByUrl(res.body.bannerUrl.split(/post\//)[1])
        }
      })
  },
  clearBanner() {
    AppDispatcher.handleViewAction({
      type: AppConstants.CLEAR_BANNER
    })
  },
  getPostByUrl(url) {
    request.get(`${URL}/cm/contents/url/${url}`)
      .use(middleware_accesstoken)
      .end(function (err, res) {

        if(utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_POST_DETAIL_BYURL,
          post : res.body
        })
      })
  },
  getBannerPost(post) {
    AppDispatcher.handleViewAction({
      type: AppConstants.SELECT_BANNER_POST_DETAIL,
      post: post
    })
  },
  ChangePlatform(platform) {
    AppDispatcher.handleViewAction({
      type: AppConstants.BANNERLIST_CHANGE_PLATFORM,
      platform: platform
    })
  },
  ChangeSearchDate(searchDate) {
    AppDispatcher.handleViewAction({
      type: AppConstants.BANNERLIST_CHANGE_SEACHDATE,
      searchDate: searchDate
    })
  },
  createBanner(data, callback) {
    request.post(URL + '/sm/banners')
      .use(middleware_accesstoken)
      .send(data)
      .end(function (err, res) {
        if(utility.errorHandler(err, res)) {
          return
        }

        Alert.success('배너가 등록되었습니다.', {
          position: 'top-right',
          effect: 'slide',
          timeout: 3000
        })
        callback()
      })
  },
  modifyBanner(seq, data, callback) {
    request.put(`${URL}/sm/banners/${seq}`)
      .use(middleware_accesstoken)
      .send(data)
      .end(function (err, res) {
        if(utility.errorHandler(err, res)) {
          return
        }

        Alert.success('배너가 수정되었습니다.', {
          position: 'top-right',
          effect: 'slide',
          timeout: 3000
        })
        callback()
      })
  },
  deleteBanner(seq, data) {
    request.del(`${URL}/sm/banners/${seq}`)
      .use(middleware_accesstoken)
      .send(data)
      .end(function (err, res) {

        if(utility.errorHandler(err, res)) {
          return
        }
      })
  },
  deleteBannerList(idLists, callback) {
    request.post(URL + '/sm/banners/delete')
      .use(middleware_accesstoken)
      .send({orderList: idLists})
      .end(function (err, res) {
        if(utility.errorHandler(err, res)) {
          return
        }

        if(callback) {
          callback()
        }
      })
  },
  updateBannerPlatform(platform) {
    AppDispatcher.handleViewAction({
      type: AppConstants.BANNER_CHANGE_PLATFORM,
      platform: platform
    })
  },
  updateBannerType(typeCd) {
    AppDispatcher.handleViewAction({
      type: AppConstants.BANNER_CHANGE_TYPE,
      typeCd: typeCd
    })
  },
  updateBannerURL(url) {
    AppDispatcher.handleViewAction({
      type: AppConstants.BANNER_CHANGE_URL,
      url: url
    })
  },
  updateBannerDate(datetype, value) {
    AppDispatcher.handleViewAction({
      type: AppConstants.BANNER_CHANGE_TIME,
      datetype:datetype,
      value: value
    })
  },
  /**
   * Recommend Keyword - Keigun, edit jungun.park (20160318)
   */
  getRecommendKeyword() {
    request.get(URL + '/sm/recommends/keyword')
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }
        AppDispatcher.handleViewAction({
          type: AppConstants.GET_RECOMMEND_KEYWORD,
          contents: res.body
        })
      })
  },
  moveRecommendKeywordList(idLists) {
    AppDispatcher.handleViewAction({
      type: AppConstants.MOVE_RECOMMEND_KEYWORD_LIST,
      idLists: idLists
    })
  },
  changeRecommendKeywordList(idLists) {
    request.post(URL + '/sm/recommends/keyword/arrange')
      .use(middleware_accesstoken)
      .send({orderList: idLists})
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        AppActions.getRecommendKeyword()
      })
  },
  createRecommendKeyword(word, style) {
    request.post(URL + '/sm/recommends/keyword')
      .use(middleware_accesstoken)
      .send({keyword: word, keywordViewCd: style})
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }
        AppActions.getRecommendKeyword()
      })
  },
  deleteRecommendKeyword(seq) {
    request.del(URL + `/sm/recommends/keyword/${seq}`)
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }
        AppActions.getRecommendKeyword()
      })
  },
  /**
   * Recommend Post - Keigun, edit jungun.park (20160319)
   */
  getRecommendPostList(pageNo=1, pageSize=20, orderField='', orderMethod='', searchField='', searchText='', type='') {
    log('test')
    request.get(URL + '/sm/recommends/post')
      .use(middleware_accesstoken)
      .query({ pageNo: pageNo, pageSize: pageSize })
      .query({ orderField: orderField, orderMethod: orderMethod })
      .query({ searchField: searchField, searchText: searchText })
      .query({ type: type })
      .end(function (err, res) {
        if(utility.errorHandler(err, res)) {
          return
        }

        const pagination = {
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

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_RECOMMEND_POST_LIST,
          contents : res.body.data,
          pagination: pagination
        })
      })
  },

  getPost(postSeq) {
    request.get(`${URL}/cm/contents/${postSeq}`)
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if(utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_POST_DETAIL,
          post : res.body
        })
      })
  },

  getPostDetail(post) {
    AppDispatcher.handleViewAction({
      type: AppConstants.GET_RECOMMEND_POST_DETAIL,
      post : post
    })
  },
  clearPostDetail() {
    log('clearPostDetail')
    AppDispatcher.handleViewAction({
      type: AppConstants.CLEAR_RECOMMEND_POST_DETAIL
    })
  },
  getRecommendPost(seq) {
    // 추천컨텐츠에서 PostSeq를 얻어온다???
    request.get(URL + '/sm/recommends/post/'+ seq)
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if(utility.errorHandler(err, res)) {
          return
        }

        let recommendpost = res.body
        request.get(`${URL}/cm/contents/${recommendpost.postSeq}`)
          .use(middleware_accesstoken)
          .end(function (err2, res2) {
            if(utility.errorHandler(err2, res2)) {
              return
            }

            let post = res2.body
            AppDispatcher.handleViewAction({
              type: AppConstants.GET_RECOMMEND_POST,
              recommendpost : recommendpost,
              post : post
            })
          })
      })
  },
  // TODO : 수정 혹은 삭제를 하면 첫페이지로 이동하는 문제가 있음
  createRecommendPost(data, callback) {
    request.post(URL + '/sm/recommends/post')
      .use(middleware_accesstoken)
      .send(data)
      .end(function (err, res) {
        if(utility.errorHandler(err, res)) {
          return
        }

        if(callback) {
          callback()
        }
      })
  },

  modifyRecommendPost(seq, data, callback) {
    request.put(URL + '/sm/recommends/post/' + seq)
      .use(middleware_accesstoken)
      .send(data)
      .end(function (err, res) {
        if(utility.errorHandler(err, res)) {
          return
        }

        //AppActions.getRecommendPostList()
        if(callback) {
          callback()
        }
      })
  },
  deleteRecommendPostList(idLists) {
    request.post(URL + '/sm/recommends/post/delete')
      .use(middleware_accesstoken)
      .send({orderList: idLists})
      .end(function (err, res) {
        if(utility.errorHandler(err, res)) {
          return
        }

        AppActions.getRecommendPostList()
      })
  },
  updateRecommendMeta(key, data) {
    AppDispatcher.handleViewAction({
      type: AppConstants.UPDATE_RECOMMEND_META,
      key : key,
      data : data
    })
  },
  updateRecommendDate(key, startDate, endDate) {
    AppDispatcher.handleViewAction({
      type: AppConstants.UPDATE_RECOMMEND_DATE,
      key : key,
      startDate : startDate,
      endDate: endDate
    })
  },
  /***
   * Channel API
   */
  getChannels() {
    request.get(URL + '/sm/channels/')
      .use(middleware_accesstoken)
      .end(function (err, res) {
        // TODO 에러처리를 Generic 하게 처리하자
        if (res.body.errorCode === 'ADMIN.INVALID_SESSION_TOKEN' || res.body.errorCode === 'ADMIN.MISSING_SESSION_TOKEN') {
          AppDispatcher.handleViewAction({
            type: AppConstants.INVALID_SESSION_TOKEN,
            contents: res.body
          })
          return
        }

        if (utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_CHANNELS,
          contents: res.body
        })
      })
  },
  getChannelDetail(channelNo) {
    request.get(URL + `/sm/channels/${channelNo}`)
      .use(middleware_accesstoken)
      .end(function (err, res) {

        if (utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_CHANNEL_DETAIL,
          contents: res.body
        })
      })
  },
  clearChannelDetail() {
    AppDispatcher.handleViewAction({
      type: AppConstants.CLEAR_CHANNEL_DETAIL
    })
  },
  addChannel(channelObject, callback) {
    request.post(URL + '/sm/channels')
      .use(middleware_accesstoken)
      .send(channelObject)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        if(callback) {
          callback()
        }
      })
  },
  putChannel(channelObject, seq, callback) {
    request.put(`${URL}/sm/channels/${seq}`)
      .use(middleware_accesstoken)
      .send(channelObject)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        if(callback) {
          callback()
        }
      })
  },
  deleteChannel(channelSeq) {
    let reqData = {'channelSeq': channelSeq}
    request.del(`${URL}/sm/channels/${channelSeq}`)
      .use(middleware_accesstoken)
      .send(reqData)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }
        AppActions.getChannels()
      })
  },
  changeChannelOrder(channelOrder) {
    request.post(URL + '/sm/channels/arrange')
      .use(middleware_accesstoken)
      .send(channelOrder)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }
      })
  },
  deleteChannelImage(target) {
    AppDispatcher.handleViewAction({
      type: AppConstants.DELETE_CHANNEL_IMAGE,
      target: target
    })
  },
  updateChannelMeta(key, data) {
    AppDispatcher.handleViewAction({
      type: AppConstants.UPDATE_CHANNEL_META,
      key: key,
      data: data
    })
  },
  /***
   * Category API
   */
  getCategories() {
    request.get(URL + '/sm/categories')
      .use(middleware_accesstoken)
      .end(function (err, res) {
        // TODO 에러처리를 Generic 하게 처리하자
        if (utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_CATEGORIES,
          contents: res.body
        })
      })
  },
  getCategoryDetail(categoryNo) {
    request.get(URL + '/sm/categories/' + categoryNo)
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }
        AppDispatcher.handleViewAction({
          type: AppConstants.GET_CATEGORY_DETAIL,
          contents: res.body
        })
      })
  },
  clearCategoryDetail() {
    AppDispatcher.handleViewAction({
      type: AppConstants.CLEAR_CATEGORY_DETAIL
    })
  },
  addCategories(categoryObject, callback) {
    request.post(URL + '/sm/categories')
      .use(middleware_accesstoken)
      .send(categoryObject)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        if(callback) {
          callback()
        }
      })
  },
  putCategories(categoryObject, categorySeq, callback) {
    request.put(`${URL}/sm/categories/${categorySeq}`)
      .use(middleware_accesstoken)
      .send(categoryObject)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        if(callback) {
          callback()
        }
      })
  },
  deleteCategory(categorySeq) {
    let reqData = {'categorySeq': categorySeq}
    request.del(`${URL}/sm/categories/${categorySeq}`)
      .use(middleware_accesstoken)
      .send(reqData)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        AppActions.getCategories()
      })

  },
  changeCategoryOrder(categoryOrder) {
    request.post(URL + '/sm/categories/arrange')
      .use(middleware_accesstoken)
      .send(categoryOrder)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }
      })
  },
  deleteCategoryImage(target) {
    AppDispatcher.handleViewAction({
      type: AppConstants.DELETE_CATEGORY_IMAGE,
      target: target
    })
  },
  updateCategoryMeta(key, data) {
    AppDispatcher.handleViewAction({
      type: AppConstants.UPDATE_CATEGORY_META,
      key: key,
      data: data
    })
  },
  /***
   * Member API
   */
  getUserList(searchObj) {
    request.get(URL + '/sm/users')
      .use(middleware_accesstoken)
      .query({
        searchField: searchObj.searchField,
        searchText: searchObj.searchText,
        searchUserStat: searchObj.searchUserStat
      })
      .query({pageNum: searchObj.pageNo || 1, pageSize: searchObj.pageSize || 10})
      .end(function (err, res) {
        AppDispatcher.handleViewAction({
          type: AppConstants.GET_USERS,
          contents: res.body.data,
          pagination: {
            pageSize: res.body.pageSize,
            firstPageNo: res.body.firstPageNo,
            startPageNo: res.body.startPageNo,
            prevPageNo: res.body.prevPageNo,
            pageNo: res.body.pageNo,
            nextPageNo: res.body.nextPageNo,
            endPageNo: res.body.endPageNo,
            finalPageNo: res.body.finalPageNo,
            totalCount: res.body.totalCount
          }
        })
      })
  },
  readUserProfile(userId) {
    request.get(URL + '/sm/users/' + userId || -1)
      .use(middleware_accesstoken)
      .end(function (err, res) {
        AppDispatcher.handleViewAction({
          type: AppConstants.GET_USER_PROFILE,
          contents: res.body
        })
      })
  },
  banUserList(searchObj) {
    request.get(URL + '/sm/users/ban')
      .use(middleware_accesstoken)
      .query({
        searchField: searchObj.searchField,
        searchText: searchObj.searchText
      })
      .end(function (err, res) {

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_BAN_USERS,
          contents: res.body.data,
          pagination: {
            pageSize: res.body.pageSize,
            firstPageNo: res.body.firstPageNo,
            startPageNo: res.body.startPageNo,
            prevPageNo: res.body.prevPageNo,
            pageNo: res.body.pageNo,
            nextPageNo: res.body.nextPageNo,
            endPageNo: res.body.endPageNo,
            finalPageNo: res.body.finalPageNo,
            totalCount: res.body.totalCount
          }
        })
      })
  },
  banUser(userList) {
    request.post(URL + '/sm/users/ban/' + userList.userId)
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (err != null) {
          alert('서버 오류로 처리하지 못 했습니다.')
          return
        } else {
          //서버에 리턴 값이 없어서 주석 처리
          if ('ERROR' != res.body.type) {
            AppDispatcher.handleViewAction({
              type: AppConstants.GET_USER_STAT_BAN,
              contents: res.body,
              userId: userList.userId
            })
          } else {
            alert('처리하지 못 했습니다.')
            return
          }
        }
      })
  },
  unbanUser(userList) {
    request.del(URL + '/sm/users/ban/' + userList.userId)
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (err != null) {
          alert('서버 오류로 처리하지 못 했습니다.')
          return
        } else {
          //서버에 리턴 값이 없어서 주석 처리
          if ('ERROR' != res.body.type) {
            //alert('사용자를 Unban 처리했습니다.')

            AppDispatcher.handleViewAction({
              type: AppConstants.GET_USER_STAT_ACT,
              contents: res.body,
              userId: userList.userId
            })
          } else {
            alert('처리하지 못 했습니다.')
            return
          }
        }
      })
  },
  deleteUser(userList) {
    request.del(URL + '/sm/users/' + userList.userId)
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (err != null) {
          alert('서버 오류로 처리하지 못 했습니다.')
          return
        } else {

          //서버에 리턴 값이 없어서 주석 처리
          if ('ERROR' != res.body.type) {
            alert('사용자를 강제탈퇴 처리했습니다.')

            AppDispatcher.handleViewAction({
              type: AppConstants.GET_USER_STAT_DEL,
              contents: res.body
            })
          } else {
            alert('처리하지 못 했습니다.')
            return
          }
        }
      })
  },

  /***
   * Comments API
   */
  getCommentList(userObj) {
    request.get(URL + '/sm/comments')
      .use(middleware_accesstoken)
      .query({searchField: userObj.searchField||''})
      .query({searchText: userObj.searchText||''})
      .query({pageNum: userObj.pageNo||1, pageSize: userObj.pageSize||10 })
      .end(function (err, res) {
        AppDispatcher.handleViewAction({
          type: AppConstants.GET_COMMENTS,
          contents: res.body.data,
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
  getUserCommentList(userObj) {
    request.get(URL + '/sm/comments')
      .use(middleware_accesstoken)
      .query({searchField: 'UID'})
      .query({searchText: userObj.userId||''})
      .query({pageNum: userObj.pageNo||1, pageSize: userObj.pageSize||5 })
      .end(function (err, res) {
        log(res.body)
        AppDispatcher.handleViewAction({
          type: AppConstants.GET_USER_COMMENT,
          contents: res.body.data,
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
  deleteComment(commentSeq) {
    request.del(URL + '/sm/comments/' + commentSeq)
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }  else {
          //TODO : body.type check 부분은 errorHandler에서.
          log(res)
          AppDispatcher.handleViewAction({
            type: AppConstants.DELETE_COMMENTS,
            commentSeq : commentSeq
          })
        }
      })
  },
  blindComment(commentSeq) {
    request.post(`${URL}/sm/comments/${commentSeq}/blind`)
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }  else {
          //TODO : body.type check 부분은 errorHandler에서.
          log(res)
          AppDispatcher.handleViewAction({
            type: AppConstants.BLIND_COMMENTS,
            commentSeq : commentSeq
          })
        }
      })
  },
  deleteUserComment(commentObj) {
    request.del(URL + '/sm/comments/' + commentObj.commentSeq)
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        } else {

          if('ERROR' != res.body.type && commentObj.isLast) {
            alert('삭제 했습니다.')
          }
          AppDispatcher.handleViewAction({
            type: AppConstants.DELETE_USER_COMMENTS,
          })
        }
      })
  },

  /***
   * Report API
   */
  getReportPostList(userObj) {
    request.get(URL + '/sm/report/contents')
      .use(middleware_accesstoken)
      .query({searchField: userObj.searchField||''})
      .query({searchText: userObj.searchText||''})
      .query({pageNum: userObj.pageNo||1, pageSize: userObj.pageSize||10 })
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }
        AppDispatcher.handleViewAction({
          type: AppConstants.GET_REPORT_POST_LIST,
          data: res.body.data,
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
  getReportCommentList(userObj) {
    request.get(URL + '/sm/report/comments')
      .use(middleware_accesstoken)
      .query({searchField: userObj.searchField||''})
      .query({searchText: userObj.searchText||''})
      .query({pageNum: userObj.pageNo||1, pageSize: userObj.pageSize||10 })
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }
        AppDispatcher.handleViewAction({
          type: AppConstants.GET_REPORT_COMMENT_LIST,
          data: res.body.data,
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
  blindReportComment(reportSeq) {
    request.post(`${URL}/sm/report/comments/${reportSeq}/blind`)
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }
        AppDispatcher.handleViewAction({
          type: AppConstants.BLIND_REPORT_COMMENT,
          reportSeq : reportSeq
        })
      })
  },
  deleteReportComment(reportSeq) {
    request.del(`${URL}/sm/report/comments/${reportSeq}`)
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }
        AppDispatcher.handleViewAction({
          type: AppConstants.DELETE_REPORT_COMMENT,
          reportSeq : reportSeq
        })
      })
  },
  /***
   * Push API
   */
  getPushList(userObj) {
    request.get(URL + '/sm/push')
      .use(middleware_accesstoken)
      .query({searchField: userObj.searchField||''})
      .query({searchText: userObj.searchText||''})
      .query({pageNum: userObj.pageNo||1, pageSize: userObj.pageSize||10 })
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }
        AppDispatcher.handleViewAction({
          type: AppConstants.GET_PUSH_LIST,
          pushList: res.body.data,
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
  }
}

export default AppActions
