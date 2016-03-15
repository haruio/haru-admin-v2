/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'

import debug from 'debug'
const log = debug('application:mycontent.jsx')

import intlStores from '../../../stores/IntlStore'

export default class RecommendKeyword extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    $('#keyword_list').sortable({ placeholder: 'placeholder' })
  }

  render() {
    return (
      <article>
        <hgroup>
          <h2>추천 검색어 관리</h2>
        </hgroup>
        <div id="service_head">
          <ul>
            <li className="icon_apply"><a href="#">순서적용</a></li>
          </ul>
        </div>
        <div id="recommend_word">
          <ul id="keyword_list">
            <li><a className="btn_del"></a>추천검색어짱짱짱!</li>
            <li className="red"><a className="btn_del_em"></a>강조검색어</li>
            <li><a className="btn_del"></a>추천</li>
            <li><a className="btn_del"></a>추천검색어</li>
            <li><a className="btn_del"></a>추천검색어</li>
            <li><a className="btn_del"></a>추천검색어짱짱짱!</li>
            <li className="red"><a className="btn_del_em"></a>강조</li>
            <li><a className="btn_del"></a>추천</li>
            <li><a className="btn_del"></a>추천검색어</li>
            <li><a className="btn_del"></a>추천검색어</li>
            <li><a className="btn_del"></a>추천검색어짱짱짱!</li>
            <li className="red"><a className="btn_del_em"></a>강조검색어</li>
            <li><a className="btn_del"></a>추천</li>
            <li><a className="btn_del"></a>추천검색어</li>
            <li><a className="btn_del"></a>추천검색어</li>
            <li><a className="btn_del"></a>추천검색어짱짱짱!</li>
            <li className="red"><a className="btn_del_em"></a>강조</li>
            <li><a className="btn_del"></a>추천</li>
            <li><a className="btn_del"></a>추천검색어</li>
            <li><a className="btn_del"></a>추천검색어</li>
          </ul>
          <div className="btn_r">
            <input type="text" placeholder={intlStores.get("sm.SM_MSG_NEED_KEYWORD")}/>
            <a href="" className="btn_add">{intlStores.get("sm.SM_BTN_ADD")}</a>
            <a href="" className="btn_add_red">{intlStores.get("sm.SM_BTN_ADD_HIGHLIGHT")}</a>
          </div>
        </div>
      </article>
    )
  }
}
