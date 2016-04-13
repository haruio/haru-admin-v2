/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'
import {Container} from '../../../../node_modules/flux/utils'
import {Link} from 'react-router'
import cn from 'classnames'
import moment from 'moment'

import debug from 'debug'
const log = debug('application:StatsContent.jsx')



/***
 * Banner List
 * author : jungun.park
 */
export default class StatsContent extends React.Component {


  render() {
    return (
      <article>
        <hgroup>
          <h2>컨텐츠 전체현황</h2>
        </hgroup>
        <div id="contents">
          StatsContent
        </div>
      </article>
    )
  }


}
