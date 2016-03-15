/**
 * Created by pheadra on 7/8/15.
 */
import React from 'react'

import debug from 'debug'
const log = debug('application:app.jsx')

import Header from '../components/Layout/Header'
import LeftMenu from '../components/Layout/LeftMenu'

import AppAction from '../actions/AppActions'
/*
import ga from 'react-google-analytics'
var GAInitiailizer = ga.Initializer
*/

export default class App extends React.Component {
  constructor(props) {
    super(props)

    AppAction.getChannels()
    AppAction.getCategories()
  }

  componentDidMount() {
    //GA initalize
    //var GA_TRACKING_CODE = 'UA-53731828-10'
    //ga('create', GA_TRACKING_CODE, 'auto')
  }

  render() {
    return (
      <section>
        <Header />
        <section id="container">
          <LeftMenu/>
          {this.props.children}
        </section>
      </section>
    )
  }
  //<GAInitiailizer />
}


