/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'

const logo2 = require("image!../assets/img/logo2.png")
import intlStores from '../stores/IntlStore'

export default class NotFound extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="login" className="account_form join_box">
        <div>
          <h1>
            <img src={logo2} alt="logo"/>
            <strong>잘못된 접근</strong>
          </h1>


        </div>
      </div>
    )
  }
}
