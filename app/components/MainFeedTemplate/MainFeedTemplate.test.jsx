const { describe, it } = global

import expect from 'expect'
import expectJSX from 'expect-jsx'
expect.extend(expectJSX);

import React from 'react'
import TestUtils from 'react-addons-test-utils'

//import ReactDOM from 'react-dom'

//var TestUtils = require('react-addons-test-utils')

import ContentListItem from './MainFeedTemplate'


describe('Component: ContentListItem', () => {
  it('inital ContentListItem', () => {
    // init
    // actual
    // expected

    const renderer = TestUtils.createRenderer()
    renderer.render(<ContentListItem className="" />)

    const actual = renderer.getRenderOutput()
    const expected = true

    expect(expected).toEqual(expected)

  })
})
