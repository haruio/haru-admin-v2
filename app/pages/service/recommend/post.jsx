/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Link} from 'react-router'
import {Container} from 'flux/utils'
import cn from 'classnames'

import moment from 'moment'

import debug from 'debug'
const log = debug('application:Post.jsx')

import AppActions from '../../../actions/AppActions'
import PageList from '../../../components/PageList'
import intlStores from '../../../utils/IntlStore'
import PostStore from '../../../stores/RecommendPostStore'
import PaginationStore from '../../../stores/PaginationStore'

class RecommendPost extends React.Component {

  static getStores() {
    return [PostStore, PaginationStore]
  }

  static calculateState() {
    return {
      contents: PostStore.getRecommendPosts(),
      pagination: PaginationStore.getPagination()
    }
  }


  componentDidMount() {
    AppActions.getRecommendPostList(1, 10)
  }

  /***
   * Move Page
   * @param page {number} - 이동할 페이지
   */
  movePage(page) {
    AppActions.getRecommendPostList(page, 10)
  }

  toggleCheckBox = () => {
    $("input[name='postBox']").prop('checked', $(this.refs.checkAll).prop('checked'))
  }

  deleteSelectedItem() {
    let checkedList = []
    $("input[name='postBox']:checked").each(function () {
      checkedList.push($(this).val())
    })

    if (checkedList.length > 0 && window.confirm(intlStores.get('common.COMMON_MSG_DEL'))) {
      AppActions.deleteRecommendPostList(checkedList)
      $("input[name='postBox']").prop('checked', false)
    }
  }
  searchContents = () => {
    const searchfield = $('#searchField option:selected').val()
    const searchtext = this.refs.searchText.value
    AppActions.getRecommendPostList(1, 10, '', '', searchfield, searchtext)
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.searchContents()
    }
  }

  get getRecommendPostList() {
    return this.state.contents.map((content) => {
      return (
        <tr key={content.get('recommendSeq')}>
          <td><input type="checkbox" name="postBox" value={content.get('recommendSeq')}/></td>
          <td>{content.get('recommendSeq')}</td>
          <td><img src={content.get('thumbnailUrl')} alt="" className="thumbnail"/></td>
          <td className="al"><Link to={'/service/mgmt/post/' + content.get('recommendSeq')}>{content.get('postTitle')}</Link></td>
          <td></td>
          <td>{moment(content.get('recommendStartDt')).format('YYYY-MM-DD')}</td>
          <td>{moment(content.get('recommendEndD')).format('YYYY-MM-DD')}</td>
          <td>{content.get('recommendPct')}%</td>
        </tr>
      )
    })
  }

  render() {
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
            <input type="text" placeholder="Search" ref="searchText" id="searchText" onKeyPress={this._handleKeyPress} /><a onClick={this.searchContents}
                                                                        className="btn_search"></a>
          </fieldset>
        </hgroup>
        <div id="contents">
          <p
            className="table_info">{intlStores.get('common.COMMON_FLD_TOTAL') + ' ' + this.state.pagination.get('totalCount') + ' ' + intlStores.get('common.COMMON_FLD_COUNT')}</p>
          <div className="table_wrap">
            <table className="listTable">
              <colgroup>
                <col width="5%"/>
                <col width="5%"/>
                <col width="10%"/>
                <col width="*"/>
                <col width="10%"/>
                <col width="13%"/>
                <col width="13%"/>
                <col width="10%"/>
              </colgroup>
              <thead>
              <tr>
                <th><input type="checkbox" ref="checkAll" onClick={this.toggleCheckBox}/></th>
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
              {this.getRecommendPostList}
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

const RecommendPostContainer = Container.create(RecommendPost)
export default RecommendPostContainer
