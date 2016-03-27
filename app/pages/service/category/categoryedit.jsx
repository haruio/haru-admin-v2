/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Link} from 'react-router'
import { Container } from 'flux/utils'

import debug from 'debug'
const log = debug('application:CategoryEdit.jsx')

import ImageUploader from '../../../components/ImageUploader'
import intlStores from '../../../utils/IntlStore'

import AppActions from '../../../actions/AppActions'
import CategoryDetailStore from '../../../stores/CategoryDetailStore'

/**
 * A page to CategoryEdit
 * author : jungun.park
 */
class CategoryEdit extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static getStores() {
    return [CategoryDetailStore]
  }

  static calculateState() {
    return {
      category: CategoryDetailStore.getCategory()
    }
  }

  componentWillMount() {
    this.isAddCategory = this.context.router.isActive('/service/mgmt/category/new')
    if(!this.isAddCategory) {
      AppActions.getCategoryDetail(this.props.params.id)
    } else {
      setTimeout(() => {
        AppActions.clearCategoryDetail()
      })
    }
  }


  /***
   * input tag를 입력할때 마다 호출되는 onChange Handler
   *
   * @param key - input tag key
   * @param e {KeyboardEvent} - input keyboard event
     */
  handleChange = (key, e) => {
    this.setState({category: this.state.category.set(key, e.target.value)})
  }

  /***
   * 공개 / 비공개 라디오 버튼이 변경될때 마다 변경됨
   * @param value {string} - Y, N 공개/비공개 여부
     */
  handleCheckChange = (value) => {
    this.setState({category: this.state.category.set('categoryViewCd', value)})
  }
  /***
   * 추가 및 수정 버튼
   * @param event {MouseEvent} - mouse click event
   */
  handleSubmitChannel = () => {
    const name = this.refs.name.value
    const shortNm = this.refs.shortNm.value
    const urlNm = this.refs.urlNm.value
    const iconImageUrl = this.refs.iconImageUrl.getImagePath()
    const bgImageUrl = this.refs.bgImageUrl.getImagePath()
    const description = this.refs.description.value
    const categoryViewCd = this.state.category.get('categoryViewCd')
    // TODO : validate

    // 리퀘스트 데이터 만들기
    let requestData = {}
    requestData.name = name
    requestData.shortNm = shortNm
    requestData.urlNm = urlNm
    requestData.iconImageUrl = iconImageUrl
    requestData.bgImageUrl = bgImageUrl
    requestData.categoryViewCd = categoryViewCd
    requestData.description = description
    requestData.delYn = 'N'

    // 리퀘스트 요청
    if (this.isAddCategory) {
      if(window.confirm(intlStores.get('common.COMMON_MSG_REG'))) {
        AppActions.addCategories(requestData)
      }
    } else {
      if (window.confirm(intlStores.get('common.COMMON_MSG_EDIT'))) {
        requestData.categorySeq = this.props.params.id
        AppActions.putCategories(requestData)
      }
    }
    this.context.router.push('/service/mgmt/category')
  }

  render() {
    const category = this.state.category
    return (
      <article>
        <hgroup>
          <h2>{intlStores.get('sm.MENU_TXT_CATEGORY')}</h2>
        </hgroup>
        <div id="contents">
          <div id="service_add">
            <table className="writeTable">
              <colgroup>
                <col width="154px"/>
                <col width="*"/>
              </colgroup>
              <tbody>
              <tr>
                <th>{intlStores.get('sm.SM_FLD_CATEGORY_NAME')}</th>
                <td>
                  <input type="text" className="txt t1" id="name" ref="name" value={category.get('name') ? category.get('name') : ''} onChange={this.handleChange.bind(this, 'name')}/>
                </td>
              </tr>
              <tr>
                <th>{intlStores.get('sm.SM_FLD_SHORT_NAME')}</th>
                <td>
                  <input type="text" className="txt t1" id="shortNm" ref="shortNm" value={category.get('shortNm') ? category.get('shortNm') : ''} onChange={this.handleChange.bind(this, 'shortNm')}/>
                </td>
              </tr>
              <tr>
                <th>{intlStores.get('sm.SM_FLD_CATEGORY_URL')}</th>
                <td>
                  <p className="input_txt">
                    <label htmlFor="text">http://dingo.tv/category/</label>
                    <input type="text" className="txt t5" id="urlNm" ref="urlNm" value={category.get('urlNm') ? category.get('urlNm') : ''} onChange={this.handleChange.bind(this, 'urlNm')} />
                  </p>
                </td>
              </tr>
              <tr>
                <th>{intlStores.get('sm.SM_FLD_ICON')}</th>
                <ImageUploader id="iconImageUrl" type="CATEGORY" value={category} ref="iconImageUrl" />
              </tr>
              <tr>
                <th>{intlStores.get('sm.SM_FLD_BG_IMG')}</th>
                <ImageUploader id="bgImageUrl" type="CATEGORY" value={category} ref="bgImageUrl" />
              </tr>
              <tr>
                <th>{intlStores.get('common.COMMON_FLD_PUBLIC')}/{intlStores.get('common.COMMON_FLD_PRIVATE')}</th>
                <td>
                  <p className="input_margin">
                    <input type="radio" name="publish" checked={category.get('categoryViewCd') == 'Y'} onChange={this.handleCheckChange.bind(this, 'Y')}/> <label htmlFor="publish1">{intlStores.get('common.COMMON_FLD_PUBLIC')}</label>
                    <input type="radio" name="publish" checked={category.get('categoryViewCd') == 'N' } onChange={this.handleCheckChange.bind(this, 'N')}/> <label htmlFor="publish2">{intlStores.get('common.COMMON_FLD_PRIVATE')}</label>
                  </p>
                </td>
              </tr>
              <tr>
                <th>{intlStores.get('sm.SM_FLD_CHANNEL_DESC')}</th>
                <td>
                  <textarea id="description" ref="description" value={category.get('description') ? category.get('description') : ''} onChange={this.handleChange.bind(this, 'description')}></textarea>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <p className="btn_r btnbox_w960">
            <a onClick={this.handleSubmitChannel} className="purple">{intlStores.get('common.COMMON_BTN_REGISTER')}</a>
            <Link to="/service/mgmt/category" className="gray">{intlStores.get('common.COMMON_BTN_CANCEL')}</Link>
          </p>
        </div>
      </article>
    )
  }
}
const CategoryEditContainer = Container.create(CategoryEdit)
export default CategoryEditContainer
