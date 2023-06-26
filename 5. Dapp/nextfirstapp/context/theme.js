"use client"
import { createContext, useContext, useState } from "react"

const ThemeContext = createContext({})

export const ThemeContextProvider = ({ children }) => {
    const [color, setColor] = useState('blue')

    return (
        <ThemeContext.Provider value={{ color, setColor }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => useContext(ThemeContext)