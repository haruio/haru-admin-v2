import React from 'react'
import {Container} from 'flux/utils'
import assign from 'object-assign'

import PopupActions from '../../actions/PopupActions'
import PopupStore from '../../stores/PopupStore'

import debug from 'debug'
const log = debug('application:Popup.jsx')

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Popup extends React.Component {
  static getStores() {
    return [PopupStore]
  }

  static calculateState() {
    return {
      popups: PopupStore.getState()
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress)
  }

  handleKeyPress = (e) => {
    if(e.code == 'Escape') {
      this.closePopup()
    }
  }

  closePopup(e) {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    PopupActions.closeALLPopup()
  }

  render() {
    // Children 중 PopupStore에 키가 들어온 팝업만 보여준다
    let children
    if (!this.props.children) {
      // No child
      children = []
    } else {
      // One child or many children
      children = Array.isArray(this.props.children) ? this.props.children : new Array(this.props.children)
    }
    const childPopups = children.map((Element) => {
      let popupKey = Element.key
      let popupProps = this.state.popups.get(popupKey)
      if (popupProps) {
        let PopupElement = Element.type
        let props = assign({}, Element.props, popupProps)

        return <PopupElement key={popupKey} close={PopupActions.closePopup.bind(null, popupKey)} {...props}/>
      }
    })

    return (
      <ReactCSSTransitionGroup transitionName="popup"
                               transitionLeaveTimeout={500}
                               transitionEnterTimeout={500}
                               component="div"
                               onClick={this.closePopup}>
        {childPopups}
      </ReactCSSTransitionGroup>
    )
  }
}

const Popupinstance = Container.create(Popup)
export default Popupinstance
