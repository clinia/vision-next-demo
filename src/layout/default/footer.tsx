import * as React from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'

interface Props extends WithTranslation {}
class Footer extends React.PureComponent<Props> {
  render() {
    return <>Footer</>
  }
}

export default withTranslation('common')(Footer)
