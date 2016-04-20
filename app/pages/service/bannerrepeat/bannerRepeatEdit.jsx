/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Container} from 'flux/utils'
import {Link} from 'react-router'
import Alert from 'react-s-alert'
import moment from 'moment'

import debug from 'debug'
const log = debug('application:BannerEdit.jsx')

import ImageUploader from '../../../components/ImageUploader'

import AppActions from '../../../actions/AppActions'
import BannerRepeatDetailStore from '../../../stores/BannerRepeatDetailStore'
import CategoryStore from '../../../stores/CategoryStore'
import ChannelStore from '../../../stores/ChannelStore'

import intlStores from '../../../utils/IntlStore'

/***
 *
 */
class BannerRepeatEdit extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static getStores() {
    return [BannerRepeatDetailStore, CategoryStore, ChannelStore]
  }

  static calculateState() {
    return {
      banner: BannerRepeatDetailStore.getBanner(),
      categories: CategoryStore.getCategories(),
      channels: ChannelStore.getChannels()
    }
  }

  componentWillMount() {
    // param이 있고 postdetail이 없는 경우 서버에 요청함
    if (this.props.params.id !== undefined) {
      AppActions.getBanner(this.props.params.id)
    } else {
      setTimeout(() => {
        AppActions.clearBanner()
      })
    }
  }

  componentDidMount() {
    $('#start-datepicker').datepicker({
      dateFormat: 'yy-mm-dd',
      onClose: (dateText) => {
        const datesplit = dateText.split('-')
        log(datesplit)
        const date = this.state.banner.get('bannerStartDt')
        let changeddate = moment(date).set('year', datesplit[0]).set('month', datesplit[1] - 1).set('date', datesplit[2])
        AppActions.updateBannerDate('bannerStartDt', changeddate.valueOf())
      }
    })
    .datepicker('setDate', moment(this.state.banner.get('bannerStartDt')).format('YYYY-MM-DD'))

    $('#end-datepicker').datepicker({
      dateFormat: 'yy-mm-dd',
      onClose: (dateText) => {
        const datesplit = dateText.split('-')
        const date = this.state.banner.get('bannerEndDt')
        let changeddate = moment(date).set('year', datesplit[0]).set('month', datesplit[1] - 1).set('date', datesplit[2])
        AppActions.updateBannerDate('bannerEndDt', changeddate.valueOf())
      }
    })
    .datepicker('setDate', moment(this.state.banner.get('bannerEndDt')).format('YYYY-MM-DD'))
  }

  render() {
    const banner = this.state.banner
    log(banner.toJS())
    return (
      <article>
        <hgroup>
          <h2>{intlStores.get('sm.SM_FLD_BANNER_REG')}</h2>
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
                <th>{intlStores.get('sm.SM_FLD_EXP_PLATFORM')}</th>
                <td>
                  <p className="input_margin">
                    <input type="radio" id="publish5" name="publish"
                           checked={banner.get('platformCd') == 'ALL'}
                           onChange={this.handlePlatformChange.bind(this, 'ALL')}/>
                    <label htmlFor="publish5">All</label>
                    <input type="radio" id="publish1" name="publish"
                           checked={banner.get('platformCd') == 'AND'}
                           onChange={this.handlePlatformChange.bind(this, 'AND')}/>
                    <label htmlFor="publish1">Android</label>
                    <input type="radio" id="publish2" name="publish"
                           checked={banner.get('platformCd') == 'IOS'}
                           onChange={this.handlePlatformChange.bind(this, 'IOS')}/>
                    <label htmlFor="publish2">iOS</label>
                    <input type="radio" id="publish3" name="publish"
                           checked={banner.get('platformCd') == 'PC'}
                           onChange={this.handlePlatformChange.bind(this, 'PC')}/>
                    <label htmlFor="publish3">PC</label>
                    <input type="radio" id="publish4" name="publish"
                           checked={banner.get('platformCd') == 'MW'}
                           onChange={this.handlePlatformChange.bind(this, 'MW')}/>
                    <label htmlFor="publish4">Mobile</label>
                  </p>
                </td>
              </tr>
              {this.renderMobileThumbnail}
              {this.renderPCThumbnail}
              {this.renderChannel}
              </tbody>
            </table>
          </div>
          {this.renderButton}
        </div>
      </article>
    )
  }


  get renderMobileThumbnail() {
    const banner = this.state.banner
    const platform = banner.get('platformCd')
    if(platform === 'PC') {
      return null
    }
    return (
      <tr>
        <th>Mobile Image</th>
        <ImageUploader id="imgSmallUrl" type="BANNER" value={banner} ref="imgSmallUrl"/>
      </tr>
    )
  }
  get renderPCThumbnail() {
    const banner = this.state.banner
    const platform = banner.get('platformCd')

    if(!(platform === 'ALL' || platform === 'PC')) {
      return null
    }

    return (
      <tr>
        <th>PC Image</th>
        <ImageUploader id="imgLargeUrl" type="BANNER" value={banner} ref="imgLargeUrl"/>
      </tr>
    )
  }


  handlePlatformChange = (value) => {
    AppActions.updateBannerPlatform(value)
  }

  get renderChannel() {
    let ChannelList = []

    const bannerUrl = this.state.banner.get('bannerUrl')
    let defaultCategory = bannerUrl.indexOf('channel') >= 0 ? bannerUrl.split(/channel\//)[1] : ''

    this.state.channels.map((channel, i) => {
      ChannelList.push(<option key={i} value={channel.get('urlNm')}>{channel.get('name') + ' ' + ((channel.get('channelViewCd') == 'N') ? '(' + intlStores.get('common.COMMON_FLD_PRIVATE') + ')' : '')}</option>)
    })
    return (
      <tr>
        <th>{intlStores.get('sm.SM_FLD_NEED_CHANNEL')}</th>
        <td>
          <select id="categoryList" style={{width:'360px'}} value={defaultCategory} onChange={this.onChangeChannel}>
            <option>--- channel ---</option>
            {ChannelList}
          </select>
        </td>
      </tr>
    )
  }

  onChangeChannel(e) {
    AppActions.updateBannerURL('dingo://channel/' + e.target.value)
  }

  get renderButton() {
    let buttonName = '등록하기'
    let deleteButton = null
    if (this.props.params.id !== undefined) {
      buttonName = '수정하기'
      deleteButton = <a onClick={this.handleDelete} className="blue">삭제하기</a>
    }

    return (
      <p className="btn_r btnbox_w960">
        <a onClick={this.handleSubmit} className="purple btn_w140">{buttonName}</a>&nbsp;
        {deleteButton}&nbsp;
        <Link to="/service/mgmt/bannerchannel" className="gray">취소하기</Link>
      </p>
    )
  }

  handleSubmit = () => {
    // PC Banner validation
    if(this.state.banner.get('platformCd') === 'ALL'
      || this.state.banner.get('platformCd') === 'PC') {
      if(this.refs.imgLargeUrl !== undefined && this.refs.imgLargeUrl.getImagePath() === '') {
        Alert.error('PC Image을 올려주세요', {
          position: 'top-right',
          effect: 'slide',
          timeout: 3000
        })
        return
      }
    }

    // Mobile Banner validation
    if(this.refs.imgSmallUrl !== undefined && this.refs.imgSmallUrl.getImagePath() === '') {
      Alert.error('Mobile Image을 올려주세요', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
      return
    }

    if(this.state.banner.get('bannerUrl') === '') {
      Alert.error('채널을 선택해 주세요', {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
      })
      return
    }
    // Submit
    if(this.state.banner.get('bannerSeq') === null) {
      if (confirm('배너 등록을 하겠습니까?')) {
        AppActions.createBanner(this.state.banner.toJS(), () => {
          this.context.router.push('/service/mgmt/bannerrepeat')
        })
      }
    } else {
      if (confirm('해당 배너 수정을 하겠습니까?')) {
        AppActions.modifyBanner(this.state.banner.get('bannerSeq'), this.state.banner.toJS(), () => {
          this.context.router.push('/service/mgmt/bannerrepeat')
        })
      }
    }
  }

}
const BannerRepeatEditContainer = Container.create(BannerRepeatEdit)
export default BannerRepeatEditContainer
