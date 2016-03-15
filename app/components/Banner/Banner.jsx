import React from 'react'

import { Container } from 'flux/utils'
import ReduceStoreExample from '../../stores/ReduceStoreExample'

import debug from 'debug'
const log = debug('application:ContentDetailPopup.jsx')


/**
 * A component to Banner
 * @notice sample component
 * author : jungun.park
 */

class Banner extends React.Component {

  static getStores() {
    return [ReduceStoreExample]
  }

  static calculateState() {
    return {
      userInfo: ReduceStoreExample.getState()
    }
  }

  onclick = ()=> {
    console.log('teste')
    alert('test')
  }

  render() {
    log(this.state.userInfo.get('test'))

    return (
      <div onClick={this.onclick}>banner</div>
    )
  }
}

const BannerContainer = Container.create(Banner)
export default BannerContainer
