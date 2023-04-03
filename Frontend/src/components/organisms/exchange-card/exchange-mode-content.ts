import { ExchangeMode } from './exchange-card.props'
import diamond from '../../../../public/images/favicon/android-chrome-192x192.png'
import handReceiving from '../../../../public/images/hand-icon.png'

const buyTitle = 'Start selling your jewerly now'
const buyDescription = 'You need coins to start selling your jewerly'

const sellTitle = 'Dont you want to sell now?'
const sellDescription = 'No problem, just sell your coins and get back your USDT'

const exchangeModeContent = (exchangeMode: ExchangeMode) => {
  return exchangeMode === 'buy'
    ? { title: buyTitle, description: buyDescription, image: diamond }
    : { title: sellTitle, description: sellDescription, image: handReceiving }
}

export default exchangeModeContent
