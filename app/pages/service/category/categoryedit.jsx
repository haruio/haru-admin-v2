/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'

import debug from 'debug'
const log = debug('application:mycontent.jsx')

import LeftMenu from '../../../components/Layout/LeftMenu'

import intlStores from '../../../stores/IntlStore'
const ct_edit1 = require("image!../../../assets/img/ct_edit1.png")
const ct_edit2 = require("image!../../../assets/img/ct_edit2.png")

const icon_c01 = require("image!../../../assets/img/icon_c01.png")
const icon_c02 = require("image!../../../assets/img/icon_c02.png")

export default class Category extends React.Component {
  constructor(props) {
    super(props)

  }

  changeField(field) {

  }

  render() {
    return (
      <article>
        <hgroup>
          <h2>{intlStores.get("sm.MENU_TXT_CATEGORY")}</h2>
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
                <th>{intlStores.get("sm.SM_FLD_CATEGORY_NAME")}</th>
                <td>
                  <input type="text" className="txt t1" id="name" onChange={this.changeField.bind(this, "name")}/>
                </td>
              </tr>
              <tr>
                <th>{intlStores.get("sm.SM_FLD_SHORT_NAME")}</th>
                <td>
                  <input type="text" className="txt t1" id="shortNm" onChange={this.changeField.bind(this, "shortNm")}/>
                </td>
              </tr>
              <tr>
                <th>{intlStores.get("sm.SM_FLD_CATEGORY_URL")}</th>
                <td>
                  <p className="input_txt">
                    <label htmlFor="text">http://dingo.tv/category/</label>
                    <input type="text" className="txt t5" id="urlNm" onChange={this.changeField.bind(this, "urlNm")}/>
                  </p>
                </td>
              </tr>
              <tr>
                <th>{intlStores.get("sm.SM_FLD_ICON")}</th>
                <td>
                  <input type="text" className="txt t6" id="input-iconImageUrl" readOnly/><span className="btn_file">Choose file<input
                  type="file" id="file-input-iconImageUrl"/></span>
                  <a id="btn-preview-iconImageUrl" className="btn_preview"></a>
                  <a id="btn-del-iconImageUrl" className="btn_del"></a>
                </td>
              </tr>
              <tr>
                <th>{intlStores.get("sm.SM_FLD_BG_IMG")}</th>
                <td>
                  <input type="text" className="txt t6" id="input-bgImageUrl" readOnly/><span className="btn_file">Choose file<input
                  type="file" id="file-input-bgImageUrl"/></span>
                  <a id="btn-preview-bgImageUrl" className="btn_preview"></a>
                  <a id="btn-del-bgImageUrl" className="btn_del"></a>
                </td>
              </tr>
              <tr>
                <th>{intlStores.get("sm.SM_FLD_LAST_IMG")}</th>
                <td>
                  <input type="text" className="txt t6" id="input-lastImageUrl" readOnly/><span className="btn_file">Choose file<input
                  type="file" id="file-input-lastImageUrl"/></span>
                  <a id="btn-preview-bgImageUrl" className="btn_preview"></a>
                  <a id="btn-del-bgImageUrl" className="btn_del"></a>
                </td>
              </tr>
              <tr>
                <th>{intlStores.get("common.COMMON_FLD_PUBLIC")}/{intlStores.get("common.COMMON_FLD_PRIVATE")}</th>
                <td>
                  <p className="input_margin">
                    <input type="radio" id="publish1" name="publish" value="Y"/> <label
                    htmlFor="publish1">{intlStores.get("common.COMMON_FLD_PUBLIC")}</label>
                    <input type="radio" id="publish2" name="publish" value="N"/> <label
                    htmlFor="publish2">{intlStores.get("common.COMMON_FLD_PRIVATE")}</label>
                  </p>
                </td>
              </tr>
              <tr>
                <th>{intlStores.get("sm.SM_FLD_CHANNEL_DESC")}</th>
                <td>
                  <textarea id="description"></textarea>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <p className="btn_r btnbox_w960">
            <a onClick={this.uploadChannel} className="purple">{intlStores.get("common.COMMON_BTN_REGISTER")}</a>
            <a onClick={this.cancelUpload} className="gray">{intlStores.get("common.COMMON_BTN_CANCEL")}</a>
          </p>
        </div>
      </article>
    )
  }
}
