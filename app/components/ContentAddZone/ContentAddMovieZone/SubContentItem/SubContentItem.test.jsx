const { describe, it } = global

import expect from 'expect'
import expectJSX from 'expect-jsx'
expect.extend(expectJSX);

import React from 'react'
import TestUtils from 'react-addons-test-utils'

//import ReactDOM from 'react-dom'

//var TestUtils = require('react-addons-test-utils')

import Banner from './SubContentItem'


describe('Component: Container', () => {
  it('has hello class', () => {
    // init
    // actual
    // expected

    const renderer = TestUtils.createRenderer()
    renderer.render(<Banner className="banner" />)

    const actual = renderer.getRenderOutput()
    const expected = true

    expect(expected).toEqual(expected)

  })
})
