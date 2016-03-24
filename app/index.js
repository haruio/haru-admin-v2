import './styles.css'

import './assets/vendor/jquery-1.7.2.min.js'
import './assets/vendor/jquery.cycle.all.js'
// using jquery sortable
import './assets/vendor/jquery-ui-1.8.custom.min.js'
// using jquery-ui calendar
//import './assets/vendor/jquery-ui-1.9.2.custom.css'
//import './assets/vendor/jquery-ui-1.9.2.custom.js'

import 'TraceKit'

import debug from 'debug'
const log = debug('application:bootstrap')

// Enable debug messages outside of production
if (process.env.NODE_ENV !== 'production') {
  debug.enable('application:*')
} else {
  debug.enable('-application:*')
}

TraceKit.report.subscribe(function yourLogger(errorReport) {
  //send via ajax to server, or use console.error in development
  //to get you started see: https://gist.github.com/4491219
  log(errorReport)
})

import React from 'react'
import ReactDOM from 'react-dom'
import Router from './router.jsx'

log('mounting react-router')
ReactDOM.render(<Router />, document.getElementById('app'))
