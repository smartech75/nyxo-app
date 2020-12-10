import { restorePurchase } from '@actions/subscription/subscription-actions'
import GoBack, { GoBackContainer } from '@components/Buttons/GoBack'
import TextButton from '@components/Buttons/TextButton'
import { IconBold } from '@components/iconRegular'
import {
  Container,
  H1,
  H2,
  P,
  SafeAreaView
} from '@components/Primitives/Primitives'
import { ActiveSubscriptions } from '@components/subscriptions/ActiveSubscriptions'
import TranslatedText from '@components/TranslatedText'
import { getLoadingPurchase } from '@selectors/subscription-selectors/SubscriptionSelectors'
import colors from '@styles/colors'
import React, { FC, memo, useEffect, useState } from 'react'
import { Linking, Platform, RefreshControl, ScrollView } from 'react-native'
import Purchases, { PurchasesEntitlementInfos } from 'react-native-purchases'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import CONFIG from '../../config/Config'

const ManageSubscription: FC = () => {
  const loadingPurchase = useSelector(getLoadingPurchase)
  const dispatch = useDispatch()

  const [info, setEntitlements] = useState<
    PurchasesEntitlementInfos | undefined
  >()

  const handleRestorePurchase = async () => {
    await dispatch(restorePurchase())
  }

  useEffect(() => {
    const fetchData = async () => {
      const { entitlements } = await Purchases.getPurchaserInfo()
      setEntitlements(entitlements)
    }
    fetchData()
  }, [])

  const hasActiveSubscription = info?.active['Nyxo Coaching']?.isActive
  const handleOpenManagement = () => {
    const URL =
      Platform.OS === 'ios' ? CONFIG.MANAGE_IOS : CONFIG.MANAGE_ANDROID
    Linking.openURL(URL)
  }

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loadingPurchase} onRefresh={() => {}} />
        }>
        <GoBackContainer>
          <GoBack />
        </GoBackContainer>

        <Container>
          <H1>Manage Nyxo Subscription</H1>

          <ActiveSubscriptions />

          {!hasActiveSubscription && (
            <>
              <H2>RESTORE_PURCHASE</H2>
              <P>RESTORE_PURCHASE_BODY</P>
              <TextButton center onPress={handleRestorePurchase}>
                RESTORE_PURCHASE
              </TextButton>
            </>
          )}
        </Container>
      </ScrollView>
    </SafeAreaView>
  )
}

export default memo(ManageSubscription)

const ActiveSubscriptionContainer = styled.View`
  margin: 30px 0px;
`

const ModifyButton = styled.TouchableOpacity`
  padding: 8px 16px;
  border-width: 2px;
  border-color: ${colors.darkBlue};
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
`

const ModifyContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`

const ButtonText = styled(TranslatedText)`
  font-family: ${({ theme }) => theme.FONT_BOLD};
  color: ${colors.darkBlue};
  font-size: 15px;
`

const ModifyIcon = styled(IconBold).attrs(() => ({
  fill: colors.darkBlue,
  name: 'wrench'
}))`
  margin-right: 5px;
`
