/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import { Link } from 'react-router'
import moment from 'moment'

import debug from 'debug'
const log = debug('application:Post.jsx')

import PageList from '../../../components/PageList'
import intlStores from '../../../stores/IntlStore'


export default class Post extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      contents : [],
      pagination : {
        startPageNo : 0,
        endPageNo : 0,
        pageNo:0,
        totalCount : 0
      }
    }
  }

  componentDidMount() {

  }

  editRecommendPost(recommendSeq) {

  }

  /***
   * Move Page
   * @param page {number} - 이동할 페이지
   */
  movePage(page) {

  }

  searchContents() {

  }

  render() {
    const ContentList = this.state.contents.map((content) => {
      return(
        <tr>
          <td><input type="checkbox" name="postBox" value={content.recommendSeq} /></td>
          <td>{content.recommendSeq}</td>
          <td><img src={content.thumbnailUrl} alt="" className="thumbnail" /></td>
          <td className="al" ><a onClick={this.editRecommendPost.bind(null, content.recommendSeq)} >{content.postTitle}</a></td>
          <td></td>
          <td>{moment(content.recommendStartDt).format('YYYY-MM-DD')}</td>
          <td>{moment(content.recommendEndDt).format('YYYY-MM-DD')}</td>
          <td>{content.recommendPct}%</td>
        </tr>
      )
    })

    return (
      <article>
        <hgroup>
          <h2>{intlStores.get('sm.MENU_TXT_FEATURED_CONTENT')}</h2>
          <fieldset id="search_box">
            <p>
              <label>{intlStores.get('common.COMMON_FLD_SEARCH_ITEM')}</label>
              <select id="searchField">
                <option value="TITLE">{intlStores.get('cms.CMS_FLD_TITLE')}</option>
              </select>
            </p>
            <input type="text" placeholder="Search" id="searchText" /><a onClick={this.searchContents} className="btn_search"></a>
          </fieldset>
        </hgroup>
        <div id="contents">
          <p className="table_info">{intlStores.get('common.COMMON_FLD_TOTAL')+' '+this.state.pagination.totalCount+' '+intlStores.get('common.COMMON_FLD_COUNT')}</p>
          <div className="table_wrap">
            <table className="listTable">
              <colgroup><col width="5%" /><col width="5%" /><col width="10%" /><col width="*" /><col width="10%" /><col width="13%" /><col width="13%" /><col width="10%" /></colgroup>
              <thead>
              <tr>
                <th><input type="checkbox" id="checkAll" onClick={this.toggleCheckBox} /></th>
                <th>No</th>
                <th>{intlStores.get('cms.CMS_FLD_THUMBNAIL')}</th>
                <th>{intlStores.get('cms.CMS_FLD_TITLE')}</th>
                <th></th>
                <th>{intlStores.get('common.COMMON_FLD_START_DATE')}</th>
                <th>{intlStores.get('common.COMMON_FLD_END_DATE')}</th>
                <th>{intlStores.get('sm.SM_FLD_PROBABLE')}</th>
              </tr>
              </thead>
              <tbody>
              {ContentList}
              </tbody>
            </table>
          </div>
          <PageList pageObj={this.state.pagination} clickAction={this.movePage} />
          <p className="btn_r">
            <Link to="/service/mgmt/post/new" className="purple btn_w140">{intlStores.get('common.COMMON_BTN_REGISTER')}</Link>
            <a onClick={this.deleteSelectedItem}>{intlStores.get('common.COMMON_BTN_DELETE')}</a>
          </p>
        </div>

      </article>
    )
  }
}
