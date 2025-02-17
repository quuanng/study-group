import 'react-native-gesture-handler'
import React from 'react'
import { ThemeProvider } from './context/ThemeContext' // ThemeContext we created
import MainNavigator from './navigation/MainNavigator' // Navigation setup

export default function App() {
  return (
    <ThemeProvider>
      <MainNavigator />
    </ThemeProvider>
  )
}
