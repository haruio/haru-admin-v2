/**
 * Created by pheadra on 7/7/15.
 */
import keyMirror from 'fbjs/lib/keyMirror'

export default keyMirror({
  /**
   * My Content
   */
  GET_CONTENT: null,
  GET_MYCONTENT: null,
  DELETE_CONTENT: null,

  /**
   * Compose Image
   */
  CREATE_IMAGE: null,
  CREATE_IMAGES: null,
  GET_IMAGES: null,
  UPDATE_IMAGE: null,
  DELETE_IMAGE: null,
  CHANGE_IMAGE_LIST: null,
  CLEAR_IMAGE: null,
  UPDATE_IMAGE_POST_OBJ: null,
  GET_IMAGE_POST_OBJ: null,
  GET_IMAGE_COMPOSE_CATEGORIES_CHANNELS: null,
  SUBMIT_IMAGE_SUCCESS: null,

  /**
   * Compose Video
   */
  CREATE_VIDEO: null,
  CHANGE_VIDEO_LIST: null,
  UPDATE_VIDEO: null,
  DELETE_VIDEO: null,
  CLEAR_VIDEO: null,
  UPDATE_VIDEO_POST_OBJ: null,
  GET_VIDEO_POST_OBJ: null,
  GET_VIDEO_COMPOSE_CATEGORIES_CHANNELS: null,
  SUBMIT_VIDEO_SUCCESS: null,


  GET_POST_FORM_OBJ: null,

  /**
   * Content List 관련
   */
  GET_PUBLISH_CONTENT: null,
  GET_VIEWED_CONTENT: null,
  GET_RESERVED_CONTENT: null,
  GET_DELETE_CONTENT: null,
  GET_INSPECTION_CONTENT: null,

  /**
   * History 관련
   */
  GET_HISTORY_CONTENT: null,
  GET_REJECT_HISTORY_CONTENT: null,

  /**
   * User 관련
   */
  USER_LOGIN: null,
  USER_LOGOUT: null,
  USER_LOGINFAIL: null,
  INVALID_SESSION_TOKEN:null,

  UPLOAD_IMAGE: null,
  UPLOAD_CATEGORY_IMAGE: null,
  UPLOAD_CHANNEL_IMAGE: null,


  DELETE_BANNER_IMAGE: null,

  /**
   * LangSelector - by Keigun
   */
  GET_BANNER_LIST: null,
  GET_BANNER_POST: null,
  GET_BANNER: null,
  GET_POST_DETAIL_BYURL: null,

  /**
   * Post
   */
  GET_POST_DETAIL: null,
  /**
   * Recommend  - by Keigun
   */
  GET_RECOMMEND_POST_LIST: null,
  GET_RECOMMEND_POST_DETAIL: null,
  GET_RECOMMEND_POST: null,
  GET_RECOMMEND_KEYWORD: null,
  MOVE_RECOMMEND_KEYWORD_LIST: null,

  /**
   * Channel Management - by billy
   */
  GET_CHANNELS: null,
  GET_CHANNEL_DETAIL: null,
  DELETE_CHANNEL_IMAGE: null,
  CLEAR_CHANNEL_DETAIL: null,
  /**
   * Category Management - by billy
   */
  GET_CATEGORIES: null,
  GET_CATEGORY_DETAIL: null,
  DELETE_CATEGORY_IMAGE: null,
  CLEAR_CATEGORY_DETAIL: null,
  /**
   * MainFeed Management
   */
  GET_MAINFEED: null,
  CREATE_MAINFEED: null,
  READ_MAINFEED: null,
  UPDATE_MAINFEED: null,
  DELETE_MAINFEED: null,
  GET_MAINFEED_CONTENTS: null,


  /**
   * User Management
   */
  GET_USERS: null,
  GET_USER_PROFILE: null,
  GET_USER_STAT_ACT: null,
  GET_USER_STAT_BAN: null,
  GET_USER_STAT_DEL: null,
  GET_BAN_USERS : null,
  /**
   * Comment Management
   */
  GET_COMMENTS: null,
  GET_USER_COMMENT: null,
  DELETE_COMMENTS: null,
  DELETE_USER_COMMENTS: null,

  /**
   * CHART
   */
  GET_USER_CHART_DATA: null,
  GET_GENDER_CHART_DATA: null,
  GET_AGE_CHART_DATA: null,
  GET_JOIN_CHART_DATA: null,
  GET_USER_TABLE_DATA: null,

  GET_CONTENT_CHART_DATA: null,
  GET_CONTENT_POSTTYPE_CHART_DATA: null,
  GET_CONTENT_CHANNELTYPE_CHART_DATA: null,
  GET_CONTENT_CATEGORYTYPE_CHART_DATA: null,
  GET_CONTENT_DAILY_TREND_DATA: null,
  GET_POST_DAILY_TREND_DATA: null,

  /**
   * Push Management
   */
  GET_PUSH_LIST: null,
  SEND_PUSH: null,
  PUSH_MGMT_UPLOAD_IMAGE: null,
  PUSH_GET_CHANNELS: null,
  PUSH_GET_CATEGORIES: null,
  PUSH_POST_CONTENTS: null,
  PUSH_DETAIL: null,

  OPEN_POPUP : null,
  CLOSE_POPUP : null,
  CLOSE_ALL_POPUP: null
})

export const URL = 'http://admin.dingo.tv/kerberos'
export const CONTENT = keyMirror({
  CREATE: null,
  WAITING: null,
  RETRUN: null,
  /**
   * page name
   */
  MYCONTENT:null,
  PUBLISHED:null,
  RESERVED:null,
  DELETEED: null,
  INSPECTION: null
})


export const IMAGE_VALIDATION = {
  CHANNEL : {
    iconImageUrl: {
      width: 180,
      height: 180,
      size: 30
    },
    bgImageUrl: {
      width: 720,
      height: 460,
      size: 100
    },
    lastImageUrl: {
      width: 640,
      height: 1136,
      size: 100
    }
  },
  CATEGORY : {
    iconImageUrl: {
      width: 40,
      height: 40,
      size: 30
    },
    bgImageUrl: {
      width: 720,
      height: 350,
      size: 100
    }
  }
}

export const POPUP = keyMirror({
  ALERT: null,
  CONFIRM: null,
  MEMBER: null,
  REJECT: null,
  PUBLISH: null,
  HISTORY: null,
  PUBLISHEDCONTENT: null,
  MAINFEED:null,


  DATE_SELECTOR: null,
  UPLOAD_DCP: null,
  CONTENT_FORM: null,
  CONTENT_HISTORY: null,
  SHARE_POST: null,
  EDIT_POST: null,
  DAILY_SCHEDULE: null,
  PLATFORM_SELECTOR: null,
  REGISTER_CHANNEL: null,
  CHANNEL_USER: null
}, '-', 'Popup')
