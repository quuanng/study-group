import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { ThemeContext } from '../context/ThemeContext' // To manage light/dark mode
import HomeScreen from '../screens/HomeScreen'
import ClassesScreen from '../screens/ClassesScreen'
import ChatsScreen from '../screens/ChatsScreen'
import ProfileScreen from '../screens/ProfileScreen'

const Tab = createBottomTabNavigator()

export default function MainNavigator() {
  const { theme } = useContext(ThemeContext)

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = ''
            if (route.name === 'Home') iconName = 'home-outline'
            else if (route.name === 'Classes') iconName = 'book-outline'
            else if (route.name === 'Chats') iconName = 'chatbubbles-outline'
            else if (route.name === 'Profile') iconName = 'person-outline'

            return <Icon name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: theme === 'dark' ? '#fff' : '#000',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Classes" component={ClassesScreen} />
        <Tab.Screen name="Chats" component={ChatsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
