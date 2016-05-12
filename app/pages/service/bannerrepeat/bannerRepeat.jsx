/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Container} from 'flux/utils'
import {Link} from 'react-router'
import cn from 'classnames'
import moment from 'moment'

import debug from 'debug'
const log = debug('application:BannerChannelList.jsx')
import PageList from '../../../components/PageList'

import AppActions from '../../../actions/AppActions'
import BannerStore from '../../../stores/BannerStore'
import PaginationStore from '../../../stores/PaginationStore'
import intlStores from'../../../utils/IntlStore'


/***
 * Banner List
 * author : jungun.park
 */
class BannerChannelList extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static getStores() {
    return [BannerStore, PaginationStore]
  }

  static calculateState(prevState, props) {
    return {
      banners: BannerStore.getBanners(),
      platform:BannerStore.getBannerSearchPlatform(),
      pagination:PaginationStore.getPagination()
    }
  }

  componentDidMount() {
    this.getBannerList(1, this.state.platform )
  }


  getBannerList(page, platform) {
    AppActions.getBannerChannelList(page, 10, platform)
  }

  movePage(page) {
    AppActions.getBannerChannelList(page, 10)
  }

  render() {
    return (
      <article>
        <hgroup>
          <h2>배너 관리</h2>
        </hgroup>
        <div id="contents">
          {this.renderPlatformTab}
          <div className="table_wrap"  style={{marginTop:'20px'}}>
            <table className="listTable">
              <colgroup>
                <col width="5%"/>
                <col width="11%"/>
                <col width="*"/>
                <col width="13%"/>
                <col width="12%"/>
                <col width="17%"/>
                <col width="17%"/>
              </colgroup>
              <thead>
              <tr>
                <th><input type="checkbox" ref="checkAll" onClick={this.toggleCheckBox}/></th>
                <th>순서</th>
                <th>배너</th>
                <th>타입</th>
                <th>노출 플랫폼</th>
                <th>노출 시작</th>
                <th>노출 종료</th>
              </tr>
              </thead>
              <tbody>
                {this.renderBannerList}
              </tbody>
            </table>
          </div>
          <PageList pageObj={this.state.pagination} clickAction={this.movePage} />
          <p className="btn_r">
            <Link to="/service/mgmt/bannerrepeat/new" className="purple btn_w140">{intlStores.get('common.COMMON_BTN_REGISTER')}</Link>&nbsp;
            <a onClick={this.deleteSelectedItem}>{intlStores.get('common.COMMON_BTN_DELETE')}</a>
          </p>
        </div>
      </article>
    )
  }

  get renderPlatformTab() {
    return (
      <ul id="tab_btns">
        <li><button onClick={this.changePlatform.bind(this, 'ALL')} className={cn({'on': this.state.platform == 'ALL'})}>ALL</button></li>
        <li><button onClick={this.changePlatform.bind(this, 'AND')} className={cn({'on': this.state.platform == 'AND'})}>Android</button></li>
        <li><button onClick={this.changePlatform.bind(this, 'IOS')} className={cn({'on': this.state.platform == 'IOS'})}>IOS</button></li>
        <li><button onClick={this.changePlatform.bind(this, 'PC')}  className={cn({'on': this.state.platform == 'PC'})}>PC Web</button></li>
        <li><button onClick={this.changePlatform.bind(this, 'MW')}  className={cn({'on': this.state.platform == 'MW'})}>Mobile Web</button></li>
      </ul>)
  }

  get renderBannerList() {
    if(this.state.banners.size == 0) {
      return (
        <tr>
          <td colSpan="7">{intlStores.get('sm.SM_MSG_NO_CONTENTS')}</td>
        </tr>)
    }

    return this.state.banners.map((banner) => {
      let bannertype = 'Post'
      switch (banner.get('bannerTypeCd')) {
        case 'LNK':
          bannertype = 'Link'
          break
        case 'INT':
          bannertype = 'Link_internal'
          break
        case 'PST':
          bannertype = 'Post'
          break
        case 'CAT':
          bannertype = 'Category'
          break
        case 'CHN':
          bannertype = 'Channel'
          break
        default :
          bannertype = 'Post'
          break
      }

      let platform = 'ALL'
      switch (banner.get('platformCd')) {
        case 'AND':
          platform = 'Android'
          break
        case 'IOS':
          platform = 'iOS'
          break
        case 'PC':
          platform = 'PC Web'
          break
        case 'MW':
          platform = 'Mobile Web'
          break
        default :
          platform = 'ALL'
          break
      }

      let thumbnail = banner.get('imgSmallUrl')
      if(thumbnail === undefined) {
        thumbnail = banner.get('imgLargeUrl')
      }

      return (
        <tr key={banner.get('bannerSeq')}>
          <td><input type="checkbox" name="postBox" value={banner.get('bannerSeq')}/></td>
          <td className="bn1" onClick={this._moveBannerDetail.bind(this, banner.get('bannerSeq'))}>{banner.get('bannerSeq')}</td>
          <td onClick={this._moveBannerDetail.bind(this, banner.get('bannerSeq'))}><img className="thumbnail" src={thumbnail} alt="thumbnail"/></td>
          <td onClick={this._moveBannerDetail.bind(this, banner.get('bannerSeq'))}>{bannertype}</td>
          <td onClick={this._moveBannerDetail.bind(this, banner.get('bannerSeq'))}>{platform}</td>
          <td onClick={this._moveBannerDetail.bind(this, banner.get('bannerSeq'))}>{moment(banner.get('bannerStartDt')).format('YYYY-MM-DD HH:MM')}</td>
          <td onClick={this._moveBannerDetail.bind(this, banner.get('bannerSeq'))}>{moment(banner.get('bannerEndDt')).format('YYYY-MM-DD HH:MM')}</td>
        </tr>
      )
    })
  }

  // Event
  changePlatform(platform) {
    AppActions.ChangePlatform(platform)
    AppActions.getBannerChannelList(1, 10, platform)
  }

  deleteSelectedItem= () => {
    let checkedList = []
    $("input[name='postBox']:checked").each(function () {
      checkedList.push($(this).val())
    })

    if (checkedList.length > 0 && window.confirm(intlStores.get('common.COMMON_MSG_DEL'))) {
      AppActions.deleteBannerList(checkedList, () => {
        this.getBannerList(1, this.state.platform)
      })
      $("input[name='postBox']").prop('checked', false)
    }
  }

  _moveBannerDetail = (bannerSeq) => {
    this.context.router.push('/service/mgmt/bannerrepeat/' + bannerSeq)
  }

  toggleCheckBox = () => {
    $("input[name='postBox']").prop('checked', $(this.refs.checkAll).prop('checked'))
  }

  onShowCalendar() {
    $('#bannerDate').show().focus().hide()
  }
}

const BannerListContainer = Container.create(BannerChannelList, {withProps:true})
export default BannerListContainer
