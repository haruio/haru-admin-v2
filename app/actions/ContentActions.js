/**
 * Created by jungenpark on 3/19/16.
 */

import debug from 'debug'
const log = debug('application:ContentActions.jsx')
import {IMAGE_VALIDATION} from '../constants/AppConstants'


import AppDispatcher from '../dispatcher/AppDispatcher.js'
import AppConstants from '../constants/AppConstants.js'

import request from 'superagent'

import utility from '../utils/util.js'

import {URL, middleware_accesstoken, currentuser} from './AuthActions.js'

import Alert from 'react-s-alert'

const ContentActions = {
  /**
   * My Content 관련 메소드
   */
  getMyContents(pageNo = 1, pageSize = 30, orderField = '', orderMethod = '', searchField = '', searchText = '', channel = '', categories = '', type = '') {
    request.get(URL + '/contents/pending/my')
      .use(middleware_accesstoken)
      .query({searchField: searchField, searchText: searchText})
      .query({channel: channel, categories: categories})
      .query({type: type})
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_MYCONTENT,
          contents: res.body.data,
          totalCnt: res.body.totalCnt
        })
      })
  },

  /**
   * content 삭제 메소드
   */
  deleteContent(contentId) {
    request.del(URL + '/contents/pending/' + contentId)
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        this.getContents()
      })
  },
  /***
   * ContentID에 해당하는 pending Content를 가져옴
   * @param contentId {String} - content id
     */
  getContent(contentId) {
    request.get(URL + '/contents/pending/' + contentId)
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_POST_OBJ,
          content: res.body
        })
      })
  },
  /***
   * Content 작성 초기화
   * @param contentType {String} - VDO, IMS default VDO
     */
  clearContent(contentType = 'VDO') {
    AppDispatcher.handleViewAction({
      type: AppConstants.CLEAR_POST_OBJ,
      contentType:contentType
    })
  },
  /***
   * 컨텐츠 작성시 텝을 이동하면 ContentType을 변경하는 기능
   * @param contentType
   */
  changeContentType(contentType) {
    AppDispatcher.handleViewAction({
      type: AppConstants.CHANGE_CONTENT_TYPE,
      contentType : contentType
    })
  },
  /***
   * change searchtype
   * @param searchType {String} - SearchType (ALL, VDO, IMS)
   */
  changeSearchType(searchType) {
    AppDispatcher.handleViewAction({
      type: AppConstants.CHANGE_SEARCHTYPE,
      searchType: searchType
    })
  },
  /***
   * content meta 작성 관련 함수들
   */
  updateContentMeta(meta) {
    AppDispatcher.handleViewAction({
      type: AppConstants.UPDATE_CONTENTMETA,
      meta: meta
    })
  },
  updateContentAddCategory(cate) {
    AppDispatcher.handleViewAction({
      type: AppConstants.UPDATE_CONTENT_ADDCATEGORY,
      categorySeq: cate.categorySeq,
      category: cate.category
    })
  },
  updateContentRemoveCategory(cate) {
    AppDispatcher.handleViewAction({
      type: AppConstants.UPDATE_CONTENT_REMOVECATEGORY,
      categorySeq: cate.categorySeq,
      category: cate.category
    })
  },
  /***
   * subcontent 작성 관련 함수들
   */
  addSubContent(subcontent) {
    AppDispatcher.handleViewAction({
      type: AppConstants.CREATE_SUBCONTENT,
      subcontent: subcontent
    })
  },
  updateSubContent(subcontent) {
    AppDispatcher.handleViewAction({
      type: AppConstants.UPDATE_SUBCONTENT,
      subcontent: subcontent
    })
  },
  uploadImageupdateSubContent(file, contentSeq, body) {

    request.post(URL + '/resources')
      .set('x-auth-token', currentuser.accesstoken)
      .attach('file', file, file.name)
      .query({
        width: IMAGE_VALIDATION['VIDEO']['content'].width,
        height: IMAGE_VALIDATION['VIDEO']['content'].height,
        size: IMAGE_VALIDATION['VIDEO']['content'].size
      })
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.UPDATE_SUBCONTENT,
          subcontent: {
            contentSeq: contentSeq,
            type: 'IMG',
            contentUrl: res.body.resourceUrl,
            body: body,
            contentResourceSeq: res.body.contentResourceSeq
          }
        })
      })
  },
  deleteSubContent(contentSeq) {
    AppDispatcher.handleViewAction({
      type: AppConstants.DELETE_SUBCONTENT,
      contentSeq: contentSeq
    })
  },

  uploadImagesUpdateSubContent(file) {
    request.post(URL + '/resources')
      .set('x-auth-token', currentuser.accesstoken)
      .attach('file', file, file.name)
      .query({
        width: IMAGE_VALIDATION['IMAGE']['content'].width,
        height: IMAGE_VALIDATION['IMAGE']['content'].height,
        size: IMAGE_VALIDATION['IMAGE']['content'].size
      })
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.CREATE_SUBCONTENT,
          subcontent: {
            contentSeq: Date.now(),
            sourceUrl: '',
            sourceDescription: '',
            contentResourceSeq: res.body.resourceSeq,
            contentUrl: res.body.resourceUrl,
            contentHeight: res.body.resourceHeight,
            contentWidth: res.body.resourceWidth,
            contentSize: res.body.resourceSize,
            originNm: res.body.originNm,
            body: res.body.body || '',
            type: 'IMG'
          }
        })
      })
  },
  /***
   * 컨텐츠 임시저장
   * @param submitData {Object} - 컨텐츠 임시저장용 데이터
     */
  saveTemporaryContent(submitData) {
    request.post(URL + '/contents/pending')
      .use(middleware_accesstoken)
      .send(submitData)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        /* 임시 저장후 메인으로 가야하는것인가? */
        Alert.info('임시 저장이 완료되었습니다', {
          position: 'top-right',
          effect: 'slide',
          timeout: 3000
        })
      })
  },
  /***
   * 컨텐츠 승인요청
   * @param submitData {Object} - 컨텐츠 임시저장용 데이터
   */
  appoveContent(submitData) {
    request.post(URL + '/contents/pending/request')
      .use(middleware_accesstoken)
      .send(submitData)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        /* 임시 저장후 메인으로 가야하는것인가? */
        Alert.info('승인 요청이 완료되었습니다', {
          position: 'top-right',
          effect: 'slide',
          timeout: 3000
        })
      })
  },
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////          Content List 관련 메소드              //////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /*
   배너, 추천 컨텐츠에서 발행된 컨텐츠 검색시에 활용함
   */

  getPublishContents(pageNo = 1, pageSize = 8, orderField = '', orderMethod = '', searchField = '', searchText = '', channel = '', categories = '', type = '') {
    request.get(utility.getUrl() + '/contents/published')
      .use(middleware_accesstoken)
      .query({pageNum: pageNo, pageSize: pageSize})
      .query({orderField: orderField, orderMethod: orderMethod})
      .query({searchField: searchField, searchText: searchText})
      .query({channel: channel, categories: categories})
      .query({type: type})
      .end(function (err, res) {

        if (utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_PUBLISH_CONTENT,
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

  /**
   * 발행된 Content List
   */
  getViewedContents(pageNo = 1, pageSize = 30, orderField = '', orderMethod = '', searchField = '', searchText = '', channel = '', categories = '', type = '') {
    request.get(URL + '/contents/viewed')
      .use(middleware_accesstoken)
      .query({pageNum: pageNo, pageSize: pageSize})
      .query({orderField: orderField, orderMethod: orderMethod})
      .query({searchField: searchField, searchText: searchText})
      .query({channel: channel, categories: categories})
      .query({type: type})
      .end(function (err, res) {

        if (utility.errorHandler(err, res)) {
          return
        }
        AppDispatcher.handleViewAction({
          type: AppConstants.GET_VIEWED_CONTENT,
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

  /**
   * 발행된 Content List 삭제
   */
  deletePublishContents(contentId) {
    request.del(URL + '/contents/pending/' + contentId)
      .use(middleware_accesstoken)
      .end(function (err, res) {

        if (utility.errorHandler(err, res)) {
          return
        }

        request.get(URL + '/contents/viewed')
          .use(middleware_accesstoken)
          .query({pageNum: 1, pageSize: 30})
          .query({orderField: '', orderMethod: ''})
          .query({searchField: '', searchText: ''})
          .end(function (err, res) {

            if (utility.errorHandler(err, res)) {
              return
            }

            AppDispatcher.handleViewAction({
              type: AppConstants.GET_VIEWED_CONTENT,
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

      })
  },

  /**
   * 예약된 Content List
   */
  getReservedContents(pageNo = 1,
                      pageSize = 30,
                      orderField = '',
                      orderMethod = '',
                      searchField = '',
                      searchText = '',
                      channel = '',
                      categories = '',
                      type = '') {
    request.get(`${URL}/contents/reserved`)
      .use(middleware_accesstoken)
      .query({pageNum: pageNo, pageSize: pageSize})
      .query({orderField: orderField, orderMethod: orderMethod})
      .query({searchField: searchField, searchText: searchText})
      .query({channel: channel, categories: categories})
      .query({type: type})
      .end(function (err, res) {

        if (utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_RESERVED_CONTENT,
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

  /**
   * 예약된 Content List 삭제
   */
  deleteReservedContents(contentId) {
    request.del(`${URL}/contents/pending/${contentId}`)
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        this.getReservedContents(1, 30, '', '', '', '', '', '', '')
      })
  },

  /**
   * 삭제된 Content List
   */
  getDeleteContents(pageNo = 1,
                    pageSize = 30,
                    orderField = '',
                    orderMethod = '',
                    searchField = '',
                    searchText = '',
                    channel = '',
                    categories = '',
                    type = '') {

    request.get(`${URL}/contents/deleted?pageNum=${pageNo}&pageSize=${pageSize}`)
      .use(middleware_accesstoken)
      .query({pageNum: pageNo, pageSize: pageSize})
      .query({orderField: orderField, orderMethod: orderMethod})
      .query({searchField: searchField, searchText: searchText})
      .query({channel: channel, categories: categories})
      .query({type: type})
      .end(function (err, res) {

        if (utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_DELETE_CONTENT,
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

  /**
   * Content 검수 List
   */
  getInspectionContent(pageNo = 1,
                       pageSize = 30,
                       orderField = '',
                       orderMethod = '',
                       searchField = '',
                       searchText = '',
                       channel = '',
                       categories = '',
                       type = '') {
    request.get(`${URL}/contents/pending/requested?pageNum=${pageNo}&pageSize=${pageSize}`)
      .use(middleware_accesstoken)
      .query({pageNum: pageNo, pageSize: pageSize})
      .query({orderField: orderField, orderMethod: orderMethod})
      .query({searchField: searchField, searchText: searchText})
      .query({channel: channel, categories: categories})
      .query({type: type})
      .end(function (err, res) {

        if (utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_INSPECTION_CONTENT,
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

  /**
   * Content 검수 List 삭제
   */
  deleteInspectionContents(contentId) {
    request.del(URL + '/contents/pending/' + contentId)
      .use(middleware_accesstoken)
      .query({pageNum: 1, pageSize: 30})
      .query({orderField: '', orderMethod: ''})
      .query({searchField: '', searchText: ''})
      .end(function (err, res) {

        if (utility.errorHandler(err, res)) {
          return
        }

        request.get(utility.getUrl() + '/contents/pending/requested')
          .use(middleware_accesstoken)
          .end(function (err, res) {

            if (utility.errorHandler(err, res)) {
              return
            }

            AppDispatcher.handleViewAction({
              type: AppConstants.GET_INSPECTION_CONTENT,
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
      })
  },

  /**
   * 승인 요청 취소
   */
  requestCancelRequest(postSeq) {
    request.post(`${URL}/contents/pending/${postSeq}/cancelrequest`)
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        request.get(URL + '/contents/pending/my')
          .use(middleware_accesstoken)
          .end(function (err, res) {

            if (utility.errorHandler(err, res)) {
              return
            }

            // TODO : pagination 부분 채크 다른데와 다르다?
            AppDispatcher.handleViewAction({
              type: AppConstants.GET_CONTENT,
              contents: res.body.data,
              pageCnt: res.body.pageCnt,
              pageNum: res.body.pageNum,
              pageSize: res.body.pageSize,
              totalCnt: res.body.totalCnt
            })
          })

      })
  },

  /**
   * post history 얻기
   */
  getContentHistory(postSeq) {
    request.get(`${URL}/contents/pending/${postSeq}/history`)
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_HISTORY_CONTENT,
          contents: res.body.data
        })
      })
  },

  /**
   * post 반려 리스트 얻기
   */
  getContentReject(postSeq) {
    request.get(`${URL}/contents/pending/${postSeq}/history/rejected`)
      .use(middleware_accesstoken)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        AppDispatcher.handleViewAction({
          type: AppConstants.GET_REJECT_HISTORY_CONTENT,
          contents: res.body.data
        })
      })
  },

  /**
   * post 반려
   */
  requestContentReject(requestData, requestUrl, source) {
    request.post(requestUrl)
      .use(middleware_accesstoken)
      .send(requestData)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        if (source == 'inspection') {
          this.getInspectionContent(1, 30, '', '', '', '')
        }
      })
  },

  /**
   * post 검수 요청
   */
  requestContentInspection(requestData, requestUrl, source) {
    request.post(requestUrl)
      .use(middleware_accesstoken)
      .send(requestData)
      .end(function (err, res) {
        if (utility.errorHandler(err, res)) {
          return
        }

        if (source == 'inspection') {
          this.getInspectionContent(1, 30, '', '', '', '')
        }
      })
  }
}

export default ContentActions
