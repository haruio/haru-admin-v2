import './styles.css'

import './assets/vendor/jquery-1.7.2.min.js'
import './assets/vendor/jquery.cycle.all.js'
// using jquery sortable
import './assets/vendor/jquery-ui-1.8.custom.min.js'
// using jquery-ui calendar
import './assets/vendor/jquery-ui-1.9.2.custom.css'
import './assets/vendor/jquery-ui-1.9.2.custom.js'

// mandatory
import 'react-s-alert/dist/s-alert-default.css'

// optional - you can choose the effect you want
import 'react-s-alert/dist/s-alert-css-effects/slide.css'
import 'react-s-alert/dist/s-alert-css-effects/scale.css'
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css'
import 'react-s-alert/dist/s-alert-css-effects/flip.css'
import 'react-s-alert/dist/s-alert-css-effects/genie.css'
import 'react-s-alert/dist/s-alert-css-effects/jelly.css'
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css'

import debug from 'debug'
const log = debug('application:bootstrap')

// Enable debug messages outside of production
if (process.env.NODE_ENV !== 'production') {
  debug.enable('application:*')
} else {
  debug.enable('-application:*')
}

import React from 'react'
import ReactDOM from 'react-dom'
import Router from './router.jsx'

log('mounting react-router')
ReactDOM.render(<Router />, document.getElementById('app'))
