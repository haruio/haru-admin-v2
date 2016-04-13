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

        Alert.success('메인피드를 등록했습니다.', {
          position: 'top-right',
          effect: 'slide',
          timeout: 3000
        })

        /*  AppDispatcher.handleViewAction({
            type: AppConstants.RESERVE_MAINFEED,
            publishDate: publishDate
          })*/

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

        if(res.body && res.body.bannerUrl && (res.body.bannerUrl.indexOf('post') >= 0)) {
          AppActions.getPostByUrl(res.body.bannerUrl.split(/post\//)[1])
        }
      })
  },
  clearBanner() {
    AppDispatcher.handleViewAction({
      type: AppConstants.CLEAR_BANNER
    })
  },
  deleteBannerImage(target) {
    AppDispatcher.handleViewAction({
      type: AppConstants.DELETE_BANNER_IMAGE,
      target : target
    })
  },

  getPostByUrl(url) {
    request.get(`${URL}/contents/url/${url}`)
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

  createBanner(data) {
    request.post(URL + '/sm/banners')
      .use(middleware_accesstoken)
      .send(data)
      .end(function (err, res) {
        if(utility.errorHandler(err, res)) {
          return
        }
      })
  },

  modifyBanner(seq, data) {
    request.put(`${URL}/sm/banners/${seq}`)
      .use(middleware_accesstoken)
      .send(data)
      .end(function (err, res) {

        if(utility.errorHandler(err, res)) {
          return
        }
      })
  },
  deleteBannerList(idLists, startDate, endDate, platform) {
    request.post(URL + '/sm/banners/delete')
      .use(middleware_accesstoken)
      .send({orderList: idLists})
      .end(function (err, res) {

        if(utility.errorHandler(err, res)) {
          return
        }

        AppActions.getBannerList(1, 10, startDate, endDate, platform)
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
      type: AppConstants.CHANGE_PLATFORM,
      platform: platform
    })
  },
  ChangeSearchDate(searchDate) {
    AppDispatcher.handleViewAction({
      type: AppConstants.CHANGE_SEACHDATE,
      searchDate: searchDate
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
    request.get(URL + '/contents/' + postSeq)
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

        let content = res.body
        request.get(URL + '/contents/' + content.postSeq)
          .use(middleware_accesstoken)
          .end(function (err2, res2) {
            if(utility.errorHandler(err2, res2)) {
              return
            }

            let post = res2.body
            AppDispatcher.handleViewAction({
              type: AppConstants.GET_RECOMMEND_POST,
              content : content,
              post : post
            })
          })
      })
  },
  // TODO : 수정 혹은 삭제를 하면 첫페이지로 이동하는 문제가 있음
  createRecommendPost(data) {
    request.post(URL + '/sm/recommends/post')
      .use(middleware_accesstoken)
      .send(data)
      .end(function (err, res) {
        if(utility.errorHandler(err, res)) {
          return
        }

        AppActions.getRecommendPostList()
      })
  },

  modifyRecommendPost(seq, data) {
    request.put(URL + '/sm/recommends/post/' + seq)
      .use(middleware_accesstoken)
      .send(data)
      .end(function (err, res) {
        if(utility.errorHandler(err, res)) {
          return
        }

        AppActions.getRecommendPostList()
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
  addChannel(channelObject) {
    request.post(URL + '/sm/channels')
      .use(middleware_accesstoken)
      .send(channelObject)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }
        AppActions.getChannels()
      })
  },
  putChannel(channelObject) {
    request.put(URL + '/sm/channels')
      .use(middleware_accesstoken)
      .send(channelObject)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }
        AppActions.getChannels()
      })
  },
  deleteChannel(channelSeq) {
    let reqData = {'channelSeq': channelSeq}
    request.del(URL + '/sm/channels')
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
  /***
   * Category API
   */
  getCategories() {
    request.get(URL + '/sm/categories/')
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
  addCategories(categoryObject) {
    request.post(URL + '/sm/categories')
      .use(middleware_accesstoken)
      .send(categoryObject)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }
        AppActions.getCategories()
      })
  },
  putCategories(categoryObject) {
    request.put(URL + '/sm/categories')
      .use(middleware_accesstoken)
      .send(categoryObject)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }
        AppActions.getCategories()
      })
  },
  deleteCategory(categorySeq) {
    let reqData = {'categorySeq': categorySeq}
    request.del(URL + '/sm/categories')
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
            alert('사용자를 Ban 처리했습니다.')

            AppDispatcher.handleViewAction({
              type: AppConstants.GET_USER_STAT_BAN,
              contents: res.body
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
            alert('사용자를 Unban 처리했습니다.')

            AppDispatcher.handleViewAction({
              type: AppConstants.GET_USER_STAT_ACT,
              contents: res.body
            })
          } else {
            alert('처리하지 못 했습니다.')
            return
          }
        }
      })
  },
  deleteUser(userList) {
    request.del(utility.getUrl() + '/sm/users/' + userList.userId)
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
    request.get(utility.getUrl() + '/sm/comments')
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
  deleteComment(commentObj) {
    request.del(URL + '/sm/comments/' + commentObj.commentSeq)
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }  else {
          //TODO : body.type check 부분은 errorHandler에서.
          if('ERROR' != res.body.type && commentObj.isLast) {
            alert('삭제 했습니다.')
          }
          AppDispatcher.handleViewAction({
            type: AppConstants.DELETE_COMMENTS,
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
   * Push API
   */
  getPushList(userObj) {
    request.get(URL + '/sm/push')
      .use(middleware_accesstoken)
      .query({searchField: userObj.searchField||''})
      .query({searchText: userObj.searchText||''})
      .query({pageNum: userObj.pageNo||1, pageSize: userObj.pageSize||10 })
      .end(function (err, res) {

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
  }
}

export default AppActions
