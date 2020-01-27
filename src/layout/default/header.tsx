import * as React from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'
import Link from 'next/link'

interface Props extends WithTranslation {}
class Header extends React.PureComponent<Props> {
  // Handle language transition
  changeLanguage = lng => {
    const { i18n } = this.props
    i18n.changeLanguage(lng)
  }

  render() {
    const { i18n } = this.props
    const oppositeLanguage = i18n.language == 'en' ? 'fr' : 'en'
    return (
      <div className="uk-padding-small uk-grid header default-header uk-margin-right uk-margin-left">
        <div className="uk-width-1-2 uk-padding-remove">
          <Link href={`/${i18n.language}`}>
            <a>
              <img
                src="logo/logo.svg"
                className="uk-align-left default-header__logo uk-margin-remove"
              />
            </a>
          </Link>
        </div>
        <div className="uk-width-1-2">
          <div
            onClick={() => this.changeLanguage(oppositeLanguage)}
            className="uk-align-right default-header__language-change"
          >
            {oppositeLanguage}
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation('common')(Header)
