/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Container} from 'flux/utils'
import {Link} from 'react-router'
import cn from 'classnames'
import moment from 'moment'

import debug from 'debug'
const log = debug('application:StatsUser.jsx')



/***
 * Banner List
 * author : jungun.park
 */
export default class StatsUser extends React.Component {


  render() {
    return (
      <article>
        <hgroup>
          <h2>회원 전체현황</h2>
        </hgroup>
        <div id="contents">
          StatsUser
        </div>
      </article>
    )
  }


}
