/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Link} from 'react-router'
import { Container } from 'flux/utils'

import debug from 'debug'
const log = debug('application:Category.jsx')


import AppActions from '../../../actions/AppActions'

import CategoryStore from '../../../stores/CategoryStore'
import intlStores from '../../../utils/IntlStore'

const ct_edit1 = require('image!../../../assets/img/ct_edit1.png')
const ct_edit2 = require('image!../../../assets/img/ct_edit2.png')


/**
 * A page to Category
 * author : jungun.park
 */
class Category extends React.Component {

  static getStores() {
    return [CategoryStore]
  }

  static calculateState() {
    return {
      category: CategoryStore.getCategories()
    }
  }

  componentDidMount() {
    //TODO : sortable component 제작 필요
    $('#category_list').sortable({})
  }


  /***
   * 카테고리 삭제
   * @param categorySeq {number} - category sequnce number
   */
  deleteCategory(categorySeq) {
    if (categorySeq != '' && window.confirm(intlStores.get('common.COMMON_MSG_DEL'))) {
      AppActions.deleteCategory(categorySeq)
    }
  }

  /***
   * 순서 조정후 채널 순서적용
   */
  saveOrderCategory() {
    let orderList = []
    $('#category_list > li').each(function (idx, el) {
      let categorySeq = $(el).attr('data-id')
      orderList.push({'categoryOrd':idx+1, 'categorySeq':categorySeq})
    }).promise().done(function () {
      let categoryOrder = {'arrangeCategoryList':orderList}
      if (window.confirm(intlStores.get('common.COMMON_MSG_EDIT'))) {
        AppActions.changeCategoryOrder(categoryOrder)
      }
    })
  }

  get getChannelList() {
    return this.state.category.map((item) => {
      return (
        <li key={item.get('categorySeq')} data-id={item.get('categorySeq')} style={{backgroundImage:'url('+item.get('bgImageUrl')+')'}}>
          <div className="service_title">
            <span className="icon_category" style={{ backgroundImage:'url('+item.get('iconImageUrl')+')' }}></span>
            <em>{item.get('name')}</em>
          </div>
          <div className="e_bg">
            <Link to={`/service/mgmt/category/${item.get('categorySeq')}`}><img src={ct_edit1} alt="" title="수정"/></Link>
            <a onClick={this.deleteCategory.bind(this, item.get('categorySeq'))}><img src={ct_edit2} alt="" title="삭제"/></a>
          </div>
        </li>
      )
    })
  }
  render() {

    return (
      <article>
        <hgroup>
          <h2>카테고리 관리</h2>
        </hgroup>
        <div id="service_head">
          <ul>
            <li className="icon_add"><Link to="/service/mgmt/category/new">{intlStores.get('sm.SM_BTN_ADD')}</Link></li>
            <li className="icon_apply"><a onClick={this.saveOrderCategory}>{intlStores.get('common.COMMON_BTN_ARRANGE')}</a></li>
          </ul>
        </div>
        <div id="service_contents">
          <ul className="hover_effect" id="category_list">
            {this.getChannelList}
          </ul>
        </div>
      </article>
    )
  }
}
const CategoryContainer = Container.create(Category)
export default CategoryContainer
