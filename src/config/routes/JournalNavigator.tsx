import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NotificationCenter from '@screens/main/NotificationCenter'
import Habits from '@screens/Shared/HabitView'
import Sleep from '@screens/sleep/SleepView'
import { JournalStackParamList } from '@typings/navigation/navigation'
import React, { FC } from 'react'
import ROUTE from './Routes'

const Stack = createNativeStackNavigator<JournalStackParamList>()

const JournalNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ gestureEnabled: true }}>
      <Stack.Screen
        name={ROUTE.SLEEP}
        component={Sleep}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ROUTE.HABITS}
        component={Habits}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTE.NOTIFICATION_CENTER}
        component={NotificationCenter}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default JournalNavigator
