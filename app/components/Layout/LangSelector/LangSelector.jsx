import React from 'react'

import debug from 'debug'
const log = debug('application:LangSelector.jsx')

import intlStores from '../../../utils/IntlStore.js'

import cn from 'classnames'

/**
 * A component to LangSelector
 * author : jungun.park
 */

class LangSelector extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      lang : this.props.lang
    }
  }

  onClickLanguage = (e) => {
    $(this.refs.languageType).slideToggle(200)
  }

  selectLanguage = (language, e) => {
    $(this.refs.languageType).slideToggle(200)
    this.setState({lang:language})

    localStorage.setItem("ls.i18n", language)
    // TODO : 동적으로 언어변환 필요

  }

  render() {
    return (
      <dl>
        <dt onClick={this.onClickLanguage}>{intlStores.get("common.FULL_NAME")}</dt>
        <dd ref="languageType">
          <a className={cn({"on":this.state.lang == 'ko_KR' })} onClick={this.selectLanguage.bind(this,'ko_KR')}>Korea</a>
          <a className={cn({"on":this.state.lang == 'en_US' })} onClick={this.selectLanguage.bind(this,'en_US')}>English</a>
          <a className={cn({"on":this.state.lang == 'in_ID' })} onClick={this.selectLanguage.bind(this,'in_ID')}>Indonesia</a>
        </dd>
      </dl>
    )
  }
}

export default LangSelector
