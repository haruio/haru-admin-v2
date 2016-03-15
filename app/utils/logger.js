import ga from 'react-google-analytics'
import storage from './storage.js'

import debug from 'debug'
const log = debug('application:logger')

const dayInMs = 24 * 60 * 60 * 1000

const dimensions = {
  signed: 'dimension1',
  cohort: 'dimension2',
  gender: 'dimension3',
  age: 'dimension4'
}

let Logger = (function () {
  let logQueue = []

  function init() {
    let cohort = getCohortString()
    ga('set', dimensions.cohort, cohort)
  }

  function getCohortString() {
    let cohort = storage.getItem('cohort')
    if (cohort) {
      return cohort
    }
    let d = new Date()
    let oneJan = new Date(d.getFullYear(), 0, 1)
    let weekNumber = Math.ceil((((d - oneJan) / dayInMs) + oneJan.getDay() + 1) / 7)
    cohort = `Y:${d.getFullYear()};Q:${Math.floor(d.getMonth() / 4) + 1};M:${d.getMonth() + 1};W:${weekNumber};Date:${d.getDate()};Day:${d.getDay()};H:${d.getHours()};`
    storage.setItem('cohort', cohort)
    return cohort
  }

  // Log User actions
  function log(event) {
    if (event.ga == true) {
      //ga('send', 'event', eventCategory, eventAction, eventLabel, eventValue_int)
    }
    logQueue.push(event)
  }

  // Log Screen move event
  function move(prev, next, query) {

    logQueue.push(prev + ' -> ' + next, query)
  }

  function gaScreen(type, subtype, id) {
    log(type, subtype, id)
    // ga('send', 'pageview', 'S_POST_VIDEO_' + id)
  }


  function _sendLog() {
    // send log from queue to server
    _emptyQueue()
  }

  function _emptyQueue() {
    logQueue = []
  }

  // 5분마다 로그 전송
  setInterval(function () {
    _sendLog()
  }, 300 * 1000)

  // 화면 종료 시 로그 전송
  document.body.addEventListener('beforeunload', function () {
    _sendLog()
  })

  return {
    init: init,
    log: log,
    move: move,
    gaScreen: gaScreen
  }
})()

export default Logger
