import React from 'react'
import cn from 'classnames'

import debug from 'debug'
const log = debug('application:ImageUploader.jsx')

import AppActions from '../../actions/AppActions'
import {IMAGE_VALIDATION} from '../../constants/AppConstants'

import ImmutablePropTypes from 'react-immutable-proptypes'
/**
 * A component to ImageUploader
 * author : jungun.park
 */

export default class ImageUploader extends React.Component {
  static defaultProps = {
    uploadImage: (e, props) => {
      AppActions.uploadImage(e.target.files[0], props.type, props.id,
        IMAGE_VALIDATION[props.type][props.id].width,
        IMAGE_VALIDATION[props.type][props.id].height,
        IMAGE_VALIDATION[props.type][props.id].size)
    }
  }

  static propTypes = {
    id: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    value : ImmutablePropTypes.map,
    uploadImage: React.PropTypes.func
  }


  render() {
    const value = this.props.value.get(this.props.id) ? this.props.value.get(this.props.id) : ''

    const placeholder = 'Width*Height : ' + IMAGE_VALIDATION[this.props.type][this.props.id].width + '*'
      +  IMAGE_VALIDATION[this.props.type][this.props.id].height
      + ',  File Size : ' + IMAGE_VALIDATION[this.props.type][this.props.id].size + 'KB'
    return (
      <td>
        <input type="text" className="txt t6" id={'input-' + this.props.id} value={value} readOnly placeholder={placeholder}/>
        <span className="btn_file">Choose file<input type="file" id={'file-input-' + this.props.id} onChange={this.onChange}/></span>
        {this.previewImage}
        <a id={'btn-del-' + this.props.id} className={cn('btn_del', {'hide': value == ''})} onClick={this.onClearClick}></a>
      </td>
    )
  }

  get previewImage() {
    const value = this.props.value.get(this.props.id) ? this.props.value.get(this.props.id) : ''
    if (value == '') {
      return null
    } else {
      return <a id={'btn-preview-' + this.props.id} className="btn_preview has" ><img alt="" src={value} /></a>
    }
  }

  getImagePath = () => {
    return this.props.value.get(this.props.id)
  }

  /***
   * 파일 업로드, store로 업로드 경로 전달
   * @param e {ChangeEventPlugin} - onChange event
   */
  onChange = (e) => {
    this.props.uploadImage(e, this.props)
  }

  onClearClick = () => {
    AppActions.clearImage(this.props.type, this.props.id)
  }
}
