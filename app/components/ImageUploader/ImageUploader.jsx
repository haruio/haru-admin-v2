import React from 'react'

import debug from 'debug'
const log = debug('application:ImageUploader.jsx')

import AppActions from '../../actions/AppActions'
import {IMAGE_VALIDATION} from '../../constants/AppConstants'
/**
 * A component to ImageUploader
 * author : jungun.park
 */

export default class ImageUploader extends React.Component {

  constructor(props) {
    super(props)

  }

  getImagePath = () => {
    return this.props.value.get(this.props.id)
  }
  /***
   *
   * @param e {ChangeEventPlugin} - onChange event
     */
  onChange = (e) => {
    AppActions.uploadImage(e.target.files[0], this.props.type, this.props.id,
      IMAGE_VALIDATION[this.props.type][this.props.id].width,
      IMAGE_VALIDATION[this.props.type][this.props.id].height,
      IMAGE_VALIDATION[this.props.type][this.props.id].size)
  }

  render() {
    const value = this.props.value.get(this.props.id) ? this.props.value.get(this.props.id) : ''

    return (
      <td>
        <input type="text" className="txt t6" id={'input-' + this.props.id} value={value} readOnly/>
        <span className="btn_file">Choose file<input type="file" id={'file-input-' + this.props.id} onChange={this.onChange}/></span>
        <a id={'btn-preview-' + this.props.id} className="btn_preview"></a>
        <a id={'btn-del-' + this.props.id} className="btn_del"></a>
      </td>
    )
  }
}
/*
 <a id="btn-preview-iconImageUrl" className={utility.emptyObjectCheck(this.state.iconImageUrl)
 ? "btn_preview has" : "btn_preview"} >
 {utility.emptyObjectCheck(this.state.iconImageUrl) ? <img alt="" src={this.state.iconImageUrl} /> : ""}</a>
 <a id="btn-del-iconImageUrl" className={utility.emptyObjectCheck(this.state.iconImageUrl) ? "btn_del" : "btn_del hide"} onClick={this.deleteImage.bind(this, "iconImageUrl")}></a>

 */
