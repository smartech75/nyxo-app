import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from '../../screens/profile/profile'

const Stack = createNativeStackNavigator()

const ProfileNavigator: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default ProfileNavigator
