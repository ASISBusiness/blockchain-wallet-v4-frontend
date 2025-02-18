import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Button, Text } from 'blockchain-info-components'

import {
  BoxContainer,
  CardItem,
  CardItemTitle,
  CardList,
  CardListHeader,
  CardWrapper,
  ColumnWrapper,
  DashboardWrapper,
  Iframe,
  Last4Wrapper
} from './CardDashboard.model'
import CardStatus from './CardStatus'
import FundsBox from './FundsBox'
import ManageCardBox from './ManageCardBox'
import TransactionsBox from './TransactionsBox'

const CardDashboard = ({
  alertActions,
  cardToken,
  cards,
  debitCardActions,
  domains,
  last4,
  lockHandler,
  modalActions,
  profileData
}) => {
  const fullName = `${profileData.firstName} ${profileData.lastName}`

  return (
    <DashboardWrapper>
      <ColumnWrapper>
        <BoxContainer width='662px'>
          <CardWrapper>
            <Iframe
              id='marqeta-card-iframe'
              src={`${domains.walletHelper}/wallet-helper/marqeta-card/#/${cardToken}/${last4}/${fullName}`}
            />
            <CardList>
              <CardListHeader>
                <FormattedMessage
                  id='scenes.debit_card.dashboard.cards_header'
                  defaultMessage='My Cards'
                />
              </CardListHeader>
              <CardItem>
                <div>
                  <CardItemTitle>
                    <FormattedMessage
                      id='scenes.debit_card.dashboard.cards_title'
                      defaultMessage='Virtual Card'
                    />
                  </CardItemTitle>
                  <Last4Wrapper>***{last4}</Last4Wrapper>
                </div>
                <CardStatus status={cards[0].status} />
              </CardItem>
              <Button nature='empty' data-e2e='addNewCard' fullwidth disabled>
                <Text color='grey400'>
                  +{' '}
                  <FormattedMessage
                    id='scenes.debit_card.dashboard.new_card'
                    defaultMessage='Add New Card'
                  />
                </Text>
              </Button>
            </CardList>
          </CardWrapper>
        </BoxContainer>
        <TransactionsBox />
      </ColumnWrapper>
      <ColumnWrapper>
        <FundsBox />
        <ManageCardBox
          alertActions={alertActions}
          modalActions={modalActions}
          debitCardActions={debitCardActions}
          cards={cards}
          lockHandler={lockHandler}
        />
      </ColumnWrapper>
    </DashboardWrapper>
  )
}

export default CardDashboard
