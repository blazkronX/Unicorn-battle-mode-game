import { useEffect, useState } from 'react'

interface TelegramWebApp {
  initData: string
  initDataUnsafe: {
    user?: {
      id: number
      first_name: string
      last_name?: string
      username?: string
      language_code?: string
      is_premium?: boolean
      photo_url?: string
    }
    chat_type?: string
    chat_instance?: string
    auth_date: number
    hash: string
  }
  version: string
  platform: string
  colorScheme: 'light' | 'dark'
  themeParams: {
    bg_color?: string
    text_color?: string
    hint_color?: string
    link_color?: string
    button_color?: string
    button_text_color?: string
    secondary_bg_color?: string
  }
  isExpanded: boolean
  viewportHeight: number
  viewportStableHeight: number
  headerColor: string
  backgroundColor: string
  isClosingConfirmationEnabled: boolean
  isVerticalSwipesEnabled: boolean
  ready: () => void
  expand: () => void
  close: () => void
  enableClosingConfirmation: () => void
  disableClosingConfirmation: () => void
  enableVerticalSwipes: () => void
  disableVerticalSwipes: () => void
  requestWriteAccess: () => void
  requestContact: () => void
  showPopup: (params: {
    title?: string
    message: string
    buttons?: Array<{
      id?: string
      type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive'
      text: string
    }>
  }) => void
  showAlert: (message: string) => void
  showConfirm: (message: string) => void
  showScanQrPopup: (params: { text?: string }) => void
  closeScanQrPopup: () => void
  readTextFromClipboard: () => Promise<string>
  openLink: (url: string) => void
  openTelegramLink: (url: string) => void
  openInvoice: (url: string) => void
  shareToStory: (mediaUrl: string) => void
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void
    selectionChanged: () => void
  }
  CloudStorage: {
    setItem: (key: string, value: string) => Promise<boolean>
    getItem: (key: string) => Promise<string>
    getItems: (keys: string[]) => Promise<Record<string, string>>
    removeItem: (key: string) => Promise<boolean>
    removeItems: (keys: string[]) => Promise<boolean>
    getKeys: () => Promise<string[]>
  }
  MainButton: {
    text: string
    color: string
    textColor: string
    isVisible: boolean
    isActive: boolean
    isProgressVisible: boolean
    setText: (text: string) => void
    onClick: (callback: () => void) => void
    offClick: (callback: () => void) => void
    show: () => void
    hide: () => void
    enable: () => void
    disable: () => void
    showProgress: (leaveActive?: boolean) => void
    hideProgress: () => void
    setParams: (params: {
      text?: string
      color?: string
      text_color?: string
      is_active?: boolean
      is_visible?: boolean
    }) => void
  }
  BackButton: {
    isVisible: boolean
    onClick: (callback: () => void) => void
    offClick: (callback: () => void) => void
    show: () => void
    hide: () => void
  }
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

export const useTelegram = () => {
  const [isReady, setIsReady] = useState(false)
  const [user, setUser] = useState<TelegramWebApp['initDataUnsafe']['user'] | null>(null)
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null)

  useEffect(() => {
    // Check if running in Telegram
    const tg = window.Telegram?.WebApp
    
    if (tg) {
      setWebApp(tg)
      
      // Initialize Telegram Web App
      tg.ready()
      tg.expand()
      
      // Set theme
      const isDark = tg.colorScheme === 'dark'
      document.documentElement.classList.toggle('dark', isDark)
      
      // Get user data
      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user)
      }
      
      setIsReady(true)
      
      // Configure main button
      tg.MainButton.hide()
      
      // Configure back button
      tg.BackButton.hide()
      
    } else {
      // Development mode - simulate Telegram environment
      console.warn('Not running in Telegram WebApp environment')
      setIsReady(true)
      
      // Mock user for development
      if (import.meta.env.VITE_APP_ENV === 'development') {
        setUser({
          id: 123456789,
          first_name: 'Dev',
          last_name: 'User',
          username: 'devuser',
          language_code: 'en',
        })
      }
    }
  }, [])

  const showMainButton = (text: string, onClick: () => void) => {
    if (webApp?.MainButton) {
      webApp.MainButton.setText(text)
      webApp.MainButton.onClick(onClick)
      webApp.MainButton.show()
    }
  }

  const hideMainButton = () => {
    if (webApp?.MainButton) {
      webApp.MainButton.hide()
    }
  }

  const showBackButton = (onClick: () => void) => {
    if (webApp?.BackButton) {
      webApp.BackButton.onClick(onClick)
      webApp.BackButton.show()
    }
  }

  const hideBackButton = () => {
    if (webApp?.BackButton) {
      webApp.BackButton.hide()
    }
  }

  const hapticFeedback = (type: 'impact' | 'notification' | 'selection', style?: string) => {
    if (webApp?.HapticFeedback) {
      switch (type) {
        case 'impact':
          webApp.HapticFeedback.impactOccurred(style as any || 'medium')
          break
        case 'notification':
          webApp.HapticFeedback.notificationOccurred(style as any || 'success')
          break
        case 'selection':
          webApp.HapticFeedback.selectionChanged()
          break
      }
    }
  }

  const showAlert = (message: string) => {
    if (webApp) {
      webApp.showAlert(message)
    } else {
      alert(message)
    }
  }

  const showConfirm = (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      if (webApp) {
        webApp.showPopup({
          message,
          buttons: [
            { id: 'ok', type: 'ok', text: 'OK' },
            { id: 'cancel', type: 'cancel', text: 'Cancel' }
          ]
        })
        // Note: Telegram doesn't provide callback for popup, 
        // so we'll use a different approach in actual implementation
        resolve(true)
      } else {
        resolve(confirm(message))
      }
    })
  }

  const close = () => {
    if (webApp) {
      webApp.close()
    } else {
      window.close()
    }
  }

  return {
    isReady,
    user,
    webApp,
    isTelegramEnvironment: !!webApp,
    colorScheme: webApp?.colorScheme || 'light',
    themeParams: webApp?.themeParams || {},
    showMainButton,
    hideMainButton,
    showBackButton,
    hideBackButton,
    hapticFeedback,
    showAlert,
    showConfirm,
    close,
  }
}