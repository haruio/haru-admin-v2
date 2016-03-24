/**
 * Created by jungenpark on 3/18/16.
 */
const { describe, it } = global

import expect from 'expect'


import AppConstants from '../constants/AppConstants'
import UserStore from './UserStore'
import AppDispatcher from '../dispatcher/AppDispatcher'

import debug from 'debug'
const log = debug('application:UserStore.jsx')

describe('Store: UserStore', () => {
  it('should initalize', () => {
    // init
    const token = localStorage.getItem('ls.AccessToken')
    const user = JSON.parse(localStorage.getItem('ls.UserModel'))

    //return Immutable.Map({error: {code: 0, msg: ''}, user: user, token: token})
    const actualUser = UserStore.getUser()
    const actualToken = UserStore.getAccessToken()

    // expected
    expect(actualUser).toEqual(user)
    expect(actualToken).toEqual(token)
  })

  it('should send Login', () => {
    // init
    const actions = {
      type: AppConstants.USER_LOGIN,
      user:{},
      accessToken:'test'
    }

    // actual
    AppDispatcher.handleViewAction(actions)
    const actual = UserStore.getUser()

    expect(actual).toEqual(actions.user)
  })
})
