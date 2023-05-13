import React, { useState, useEffect, createContext } from 'react'
import storage from '../store/storage'
import { useStoreActions } from '../hooks/storeHooks'

interface AuthContextProps {
  hasToken: boolean
  setHasToken: (token: boolean) => void
  login: (token: string) => Promise<void>
  logout: () => Promise<void>
}

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextProps>({
  hasToken: false,
  setHasToken: (token: boolean) => {},
  login: (token: string) => Promise.resolve(),
  logout: () => Promise.resolve(),
})

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [hasToken, setHasToken] = useState<boolean>(false)

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await storage.getSecureItem('token')
        setHasToken(!!token)
      } catch (error) {
        console.error('Error fetching token:', error)
      }
    }

    checkToken()
  }, [])

  const login = async (token: string) => {
    // Save the token to local storage or any other preferred storage method
    await storage.setSecureItem('token', token)
    setHasToken(true)
  }

  const logout = async () => {
    // Remove the token from local storage
    await useStoreActions((actions) => actions.resetStore)
    await storage.removeSecureItem('token')
    setHasToken(false)
  }

  return (
    <AuthContext.Provider
      value={{ hasToken, setHasToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
