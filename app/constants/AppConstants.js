/**
 * Created by pheadra on 7/7/15.
 */
import keyMirror from 'fbjs/lib/keyMirror'


// TODO : 안쓰는 상수 제거 필요
export default keyMirror({
  /**
   * My Content
   */
  GET_CONTENT: null,
  GET_MYCONTENT: null,
  DELETE_CONTENT: null,

  UPDATE_CONTENTMETA: null,
  UPDATE_CONTENT_ADDCATEGORY: null,
  UPDATE_CONTENT_REMOVECATEGORY: null,
  UPLOAD_CONTENT_IMAGE: null,
  CLEAR_CONTENT_IMAGE: null,
  CHANGE_CONTENT_TYPE: null,
  /**
   * Compose COMMON
   */
  CREATE_SUBCONTENT: null,
  UPDATE_SUBCONTENT: null,
  DELETE_SUBCONTENT: null,

  /**
   * Compose Image
   */
  CREATE_IMAGE: null,
  GET_IMAGES: null,
  UPDATE_IMAGE: null,
  DELETE_IMAGE: null,
  CHANGE_IMAGE_LIST: null,
  CLEAR_IMAGE: null,
  GET_POST_OBJ: null,
  CLEAR_POST_OBJ: null,
  UPDATE_IMAGE_POST_OBJ: null,
  GET_IMAGE_POST_OBJ: null,
  GET_IMAGE_COMPOSE_CATEGORIES_CHANNELS: null,
  SUBMIT_IMAGE_SUCCESS: null,
  /**
   * Compose Video
   */
  CHANGE_VIDEO_LIST: null,
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
  CHANGE_SEARCHTYPE: null,
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
  INVALID_SESSION_TOKEN: null,
  /*upload image*/
  UPLOAD_IMAGE: null,
  UPLOAD_MAINFEED_IMAGE: null,
  CLEAR_MAINFEED_IMAGE:null,
  UPLOAD_CATEGORY_IMAGE: null,
  CLEAR_CATEGORY_IMAGE: null,
  UPLOAD_CHANNEL_IMAGE: null,
  CLEAR_CHANNEL_IMAGE: null,
  UPLOAD_BANNER_IMAGE:null,
  CLEAR_BANNER_IMAGE:null,
  DELETE_BANNER_IMAGE: null,

  /**
   * LangSelector - by Keigun
   */
  GET_BANNER_LIST: null,
  GET_BANNER_POST: null,
  GET_BANNER: null,
  CLEAR_BANNER: null,
  GET_POST_DETAIL_BYURL: null,
  SELECT_BANNER_POST_DETAIL: null,
  BANNERLIST_CHANGE_PLATFORM: null,
  BANNERLIST_CHANGE_SEACHDATE: null,
  MAINFEED_CHANGE_SEACHDATE: null,

  BANNER_CHANGE_PLATFORM: null,
  BANNER_CHANGE_TYPE: null,
  BANNER_CHANGE_URL: null,
  BANNER_CHANGE_TIME: null,
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
  CLEAR_RECOMMEND_POST_DETAIL: null,
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
  GET_MAINFEED_CONTENTS: null, // 발행된 컨텐츠 조회??
  RESERVE_MAINFEED: null,
  READ_MAINFEED: null,
  CREATE_MAINFEED: null,
  UPDATE_MAINFEEDITEM: null,
  DELETE_MAINFEEDITEM: null,
  CHANGE_TYPE_MAINFEED: null,
  UPDATE_MAINFEED_DATE: null,
  COMPLETE_REGISTE_MAINFEED: null,
  /**
   * User Management
   */
  GET_USERS: null,
  GET_USER_PROFILE: null,
  GET_USER_STAT_ACT: null,
  GET_USER_STAT_BAN: null,
  GET_USER_STAT_DEL: null,
  GET_BAN_USERS: null,
  /**
   * Comment Management
   */
  GET_COMMENTS: null,
  GET_USER_COMMENT: null,
  DELETE_COMMENTS: null,
  DELETE_USER_COMMENTS: null,
  /***
   * Report Management
   */
  GET_REPORT_POST_LIST: null,
  GET_REPORT_COMMENT_LIST: null,


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

  OPEN_POPUP: null,
  CLOSE_POPUP: null,
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
  MYCONTENT: null,
  PUBLISHED: null,
  RESERVED: null,
  DELETEED: null,
  INSPECTION: null
})


export const IMAGE_VALIDATION = {
  CHANNEL: {
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
  CATEGORY: {
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
  },
  IMAGE: {
    thumbnail: {
      width: 345,
      height: 230,
      size: 30
    },
    shareImage: {
      width: 484,
      height: 252,
      size: 50
    },
    lastImageUrl: {
      width: 640,
      height: 1136,
      size: 100
    },
    content: {
      width: 640,
      height: 1136,
      size: 1500
    }
  },
  VIDEO: {
    thumbnail: {
      width: 345,
      height: 230,
      size: 30
    },
    shareImage: {
      width: 484,
      height: 252,
      size: 50
    },
    lastImageUrl: {
      width: 640,
      height: 1136,
      size: 100
    },
    content: {
      width: 640,
      height: 1136,
      size: 1500
    }
  },
  BANNER: {
    imgSmallUrl: {
      width: 720,
      height: 520,
      size: 200
    },
    imgLargeUrl: {
      width: 960,
      height: 350,
      size: 200
    }
  },
  MAINFEED: {
    thumbnailUrl: {
      width: 345,
      height: 230,
      size: 30
    },
    thumbnailUrlRow: {
      width: 345,
      height: 712,
      size: 60
    },
    thumbnailUrlCol: {
      width: 700,
      height: 230,
      size: 60
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
  CONTENTDETAIL: null,
  POSTTREND: null,
  MAINFEED: null,


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

export const PUBLISH = keyMirror({
  TEMP:null,
  APPROVE:null
})
