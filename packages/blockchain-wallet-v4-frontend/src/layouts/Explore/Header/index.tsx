import React from 'react'
import { FormattedMessage } from 'react-intl'
import { LinkContainer } from 'react-router-bootstrap'
import { NavLink } from 'react-router-dom'
import { colors, Icon } from '@blockchain-com/constellation'
import { IconArrowLeft, IconUser } from '@blockchain-com/icons'
import { Field, reduxForm } from 'redux-form'
import styled from 'styled-components'

import { Button, Image, Text } from 'blockchain-info-components'
import { TextBox } from 'components/Form'
import { Logo, NavContainer, NavLeft, NavRight } from 'components/NavbarV2/Navbar'

import { Props as OwnProps } from '..'

export const FIXED_HEADER_HEIGHT = 56

const FixedNav = styled(NavContainer)`
  position: fixed;
  z-index: 3;
  background-color: ${colors.white900};
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const NavCenter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
`
const NavLinkButton = styled(NavLink)`
  padding: 8px 10px;
  border-radius: 8px;
  text-decoration: none;
  margin-right: 12px;
  background-color: transparent;
  &.active {
    background-color: ${(props) => props.theme.blue000};
    * {
      color: ${(props) => props.theme.blue600};
    }
  }
`

const ExploreHeader: React.FC<Props> = ({ ethAddress, isAuthenticated, routerActions }) => {
  return (
    <div style={{ paddingBottom: `${FIXED_HEADER_HEIGHT}px` }}>
      <FixedNav>
        <NavLeft>
          <Logo>
            <NavLink to='/home' data-e2e='homeLink'>
              <Image width='25px' name='blockchain-icon' />
            </NavLink>
          </Logo>
          <Button
            small
            data-e2e='back'
            nature='empty-blue'
            onClick={() => routerActions.goBack()}
            style={{ marginLeft: '24px' }}
          >
            <Icon label='arrow-left' size='sm' color='grey300'>
              <IconArrowLeft style={{ marginRight: '4px' }} />
            </Icon>
            <FormattedMessage id='buttons.signup' defaultMessage='Back' />
          </Button>
        </NavLeft>
        <NavCenter>
          <NavLinkButton to='/nfts' activeClassName='active'>
            <Text size='14px' weight={600}>
              <FormattedMessage id='copy.explore' defaultMessage='Explore' />
            </Text>
          </NavLinkButton>
          <Field component={TextBox} placeholder='Collections or items' />
        </NavCenter>
        <NavRight>
          {isAuthenticated ? (
            <Icon label='user' color='grey300'>
              <IconUser
                cursor='pointer'
                onClick={() => routerActions.push(`/nfts/address/${ethAddress}`)}
                style={{ marginLeft: '4px' }}
              />
            </Icon>
          ) : (
            <>
              <LinkContainer style={{ marginRight: '8px' }} to='/login' data-e2e='loginLink'>
                <Button small data-e2e='signup' nature='empty-blue'>
                  <FormattedMessage id='scenes.login.login' defaultMessage='Login' />
                </Button>
              </LinkContainer>
              <LinkContainer to='/signup' data-e2e='signupLink'>
                <Button small data-e2e='signup' nature='primary'>
                  <FormattedMessage id='buttons.signup' defaultMessage='Sign Up' />
                </Button>
              </LinkContainer>
            </>
          )}
        </NavRight>
      </FixedNav>
    </div>
  )
}

type Props = OwnProps

export default reduxForm<{}, Props>({ form: 'nftSearch' })(ExploreHeader)
