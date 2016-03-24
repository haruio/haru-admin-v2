/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Container} from 'flux/utils'
import cn from 'classnames'

import debug from 'debug'
const log = debug('application:RecommendKeyword.jsx')

import AppActions from '../../../actions/AppActions.js'
import KeywordStore from '../../../stores/RecommendKeywordStore'

import intlStores from '../../../utils/IntlStore'

/**
 * 추천 검색어 관리
 * service > mgmt > keyword
 */
class RecommendKeyword extends React.Component {

  static getStores() {
    return [KeywordStore]
  }

  static calculateState() {
    return {
      keywordlist: KeywordStore.getKeywordList()
    }
  }

  componentWillMount() {
    AppActions.getRecommendKeyword()
  }

  componentDidMount() {
    $('#keyword_list').sortable({ placeholder: 'placeholder' })
  }

  addKeyword = (style) => {
    let keyword = this.refs.keyword.value
    if (keyword != '' && window.confirm(intlStores.get('common.COMMON_MSG_REG'))) {
      AppActions.createRecommendKeyword(keyword, style)
    }
    this.refs.keyword.value = ''
  }

  deleteKeyword(id) {
    if (id != '' && window.confirm(intlStores.get('common.COMMON_MSG_DEL'))) {
      AppActions.deleteRecommendKeyword(id)
    }
  }

  arrangeKeyword = () => {
    let idLists = []
    $('#keyword_list > li').filter(function(index, el) {
      // data-id 가 없으면 안됨
      return $(el).attr('data-id') != undefined
    }).each(function(idx, el) {
      idLists.push($(el).attr('data-id'))
    })

    if (idLists != undefined && idLists.length != 0 && window.confirm(intlStores.get('common.COMMON_MSG_EDIT'))) {
      AppActions.changeRecommendKeywordList(idLists)
    }
  }

  get keywordlist() {
    return this.state.keywordlist.map((item)=> {
      const isBold = item.get('keywordViewCd') === 'B'
      return (
        <li key={item.get('keywordSeq')} data-id={item.get('keywordSeq')} className={cn({red : isBold})}><a className={cn({'btn_del_em' : isBold, 'btn_del' : !isBold})} onClick={this.deleteKeyword.bind(null, item.get('keywordSeq'))}></a>{item.get('keyword')}</li>
      )
    })
  }
  render() {
    return (
      <article>
        <hgroup>
          <h2>추천 검색어 관리</h2>
        </hgroup>
        <div id="service_head">
          <ul>
            <li className="icon_apply"><a onClick={this.arrangeKeyword}>순서적용</a></li>
          </ul>
        </div>
        <div id="recommend_word">
          <ul id="keyword_list">
            {this.keywordlist}
          </ul>
          <div className="btn_r">
            <input type="text" ref="keyword" placeholder={intlStores.get('sm.SM_MSG_NEED_KEYWORD')}/>
            <a onClick={this.addKeyword.bind(null, 'N')} className="btn_add">{intlStores.get('sm.SM_BTN_ADD')}</a>
            <a onClick={this.addKeyword.bind(null, 'B')} className="btn_add_red">{intlStores.get('sm.SM_BTN_ADD_HIGHLIGHT')}</a>
          </div>
        </div>
      </article>
    )
  }
}

const RecommendKeywordContainer = Container.create(RecommendKeyword)
export default RecommendKeywordContainer
