import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TransitionPresets } from '@react-navigation/stack'
import LessonView from '@screens/coaching/LessonView'
import { PurchaseScreen } from '@screens/onboarding/PurchaseScreen'
import CoachingWeek from '@screens/coaching/WeekView'
import { Onboarding } from '@screens/onboarding/Onboarding'
import Welcome from '@screens/Terveystalo/Welcome'
import { RootStackParamList } from '@typings/navigation/navigation'
import React, { FC } from 'react'
import AuthNavigator from './AuthNavigator'
import ROUTE from './Routes'
import TabNavigator from './TabNavigator'

const RootStack = createNativeStackNavigator<RootStackParamList>()

const Root: FC = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={ROUTE.APP}
        options={{ headerShown: false }}
        component={TabNavigator}
      />
      <RootStack.Screen
        name={ROUTE.AUTH}
        options={{ headerShown: false }}
        component={AuthNavigator}
      />
      <RootStack.Screen
        name={ROUTE.WEEK}
        component={CoachingWeek}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name={ROUTE.LESSON}
        component={LessonView}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name={ROUTE.PURCHASE}
        component={PurchaseScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name={ROUTE.TERVEYSTALO}
        component={Welcome}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name={ROUTE.ONBOARDING}
        component={Onboarding}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalTransition
        }}
      />
    </RootStack.Navigator>
  )
}

export default Root
