import * as React from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'

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
      <>
        Header
        <button onClick={() => this.changeLanguage(oppositeLanguage)} style={{ marginLeft: 5 }}>
          {oppositeLanguage}
        </button>
      </>
    )
  }
}

export default withTranslation('common')(Header)
