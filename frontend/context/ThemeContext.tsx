import React, { createContext, useState, ReactNode } from 'react'

// Define the structure of the context
interface ThemeContextProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

// Create the context with default values
export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light', // Default theme
  toggleTheme: () => {}, // Default toggle function
})

// ThemeProvider component to wrap the app
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light') // State to manage theme

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
