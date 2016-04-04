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

  render() {
    return (
      <dl>
        <dt onClick={this.onClickLanguage}>{intlStores.get('common.FULL_NAME')}</dt>
        <dd ref="languageType">
          <a className={cn({'on':this.state.lang == 'ko_KR' })} onClick={this.selectedLanguage.bind(this,'ko_KR')}>Korea</a>
          <a className={cn({'on':this.state.lang == 'en_US' })} onClick={this.selectedLanguage.bind(this,'en_US')}>English</a>
          <a className={cn({'on':this.state.lang == 'in_ID' })} onClick={this.selectedLanguage.bind(this,'in_ID')}>Indonesia</a>
        </dd>
      </dl>
    )
  }

  /**
   * Language dt click event
   * if you click it, appear language list.
   * @param e {MouseEvent} - click mouse event
   */
  onClickLanguage = () => {
    $(this.refs.languageType).slideToggle(200)
  }

  /**
   * Selected Language
   * change language
   * @param language {String} - changed language name (ko_KR, en_US, in_ID)
   */
  selectedLanguage = (language) => {
    $(this.refs.languageType).slideToggle(200)
    this.setState({lang:language})

    localStorage.setItem('ls.i18n', language)
    // TODO : 동적으로 언어변환 필요

  }

}

export default LangSelector
