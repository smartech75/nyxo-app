import { restorePurchase } from '@actions/subscription/subscription-actions'
import GoBack, { GoBackContainer } from '@components/Buttons/GoBack'
import TextButton from '@components/Buttons/TextButton'
import {
  Container,
  H1,
  H2,
  P,
  SafeAreaView
} from '@components/Primitives/Primitives'
import { ActiveSubscriptions } from '@components/subscriptions/ActiveSubscriptions'
import { getLoadingPurchase } from '@selectors/subscription-selectors/SubscriptionSelectors'
import React, { FC, memo, useEffect, useState } from 'react'
import { Linking, Platform, RefreshControl, ScrollView } from 'react-native'
import Purchases, { PurchasesEntitlementInfos } from 'react-native-purchases'
import { useDispatch, useSelector } from 'react-redux'
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
