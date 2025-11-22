import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import { motion, AnimatePresence } from 'framer-motion'

// Configuration
import { wagmiConfig } from './config/wagmi'

// Hooks
import { useTelegram } from './hooks/useTelegram'

// Components
import { LoadingScreen } from './components/intro/LoadingScreen'
import { OnboardingScreen } from './components/intro/OnboardingScreen'
import { BattleSelectionScreen } from './components/intro/BattleSelectionScreen'
import { SearchingMatchScreen } from './components/game/Battle/components/SearchingMatchScreen'
import { VSBattleScreen } from './components/game/Battle/components/VSBattleScreen'

// Styles
import '@rainbow-me/rainbowkit/styles.css'
import './index.css'

// Create QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
})

type AppState = 'loading' | 'onboarding' | 'battle' | 'game' | 'searching' | 'vs-battle'

// Main Game Component Placeholder (keeping for future use)
const GameApp = () => {
  const { user } = useTelegram()
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-unicorn-blue via-unicorn-lavender to-unicorn-pink telegram-safe-area"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-unicorn mb-4">
            Welcome to Charlie Unicorn Battle Mode!
          </h1>
          <p className="text-white/80 text-lg mb-8">
            Hello {user?.first_name || 'Player'}! Ready to battle?
          </p>
          
          {/* Placeholder for game interface */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Battle Mode Card */}
            <div className="card-base card-hover p-6">
              <h3 className="text-xl font-bold text-unicorn-purple mb-3">
                Quick Battle
              </h3>
              <p className="text-gray-600 mb-4">
                Jump into a fast PvP battle
              </p>
              <button className="btn-primary w-full">
                Start Battle
              </button>
            </div>
            
            {/* My Cards */}
            <div className="card-base card-hover p-6">
              <h3 className="text-xl font-bold text-unicorn-purple mb-3">
                My Cards
              </h3>
              <p className="text-gray-600 mb-4">
                Manage your PNFT collection
              </p>
              <button className="btn-secondary w-full">
                View Collection
              </button>
            </div>
            
            {/* Tournaments */}
            <div className="card-base card-hover p-6">
              <h3 className="text-xl font-bold text-unicorn-purple mb-3">
                Tournaments
              </h3>
              <p className="text-gray-600 mb-4">
                Compete for big prizes
              </p>
              <button className="btn-secondary w-full">
                Join Tournament
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Inner App Component (wrapped with providers)
const InnerApp = () => {
  const [appState, setAppState] = useState<AppState>('loading')
  const { isReady, colorScheme, user } = useTelegram()

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('charlie-unicorn-onboarding-complete')
    
    if (hasCompletedOnboarding === 'true') {
      setAppState('battle')
    }
  }, [])

  // Navigation handlers
  const handleLoadingComplete = () => {
    setAppState('onboarding')
  }

  const handleOnboardingComplete = () => {
    localStorage.setItem('charlie-unicorn-onboarding-complete', 'true')
    setAppState('battle')
  }

  const handleBattleStart = () => {
    setAppState('searching')
  }

  const handleMatchFound = () => {
     console.log('handleMatchFound called, switching to vs-battle')
    setAppState('vs-battle')
  }

  const handleBattleBegin = () => {
    setAppState('game')
  }

  const handleBackToBattle = () => {
    setAppState('battle')
  }

  // Wait for Telegram to be ready
  if (!isReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4" />
          <p>Initializing Telegram Web App...</p>
        </div>
      </div>
    )
  }

  return (
    <RainbowKitProvider
      theme={colorScheme === 'dark' ? darkTheme() : lightTheme()}
      showRecentTransactions={true}
    >
      <AnimatePresence mode="wait">
        {appState === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingScreen onLoadingComplete={handleLoadingComplete} />
          </motion.div>
        )}

        {appState === 'onboarding' && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <OnboardingScreen onComplete={handleOnboardingComplete} />
          </motion.div>
        )}

        {appState === 'battle' && (
          <motion.div
            key="battle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BattleSelectionScreen onBattleStart={handleBattleStart} />
          </motion.div>
        )}

        {appState === 'searching' && (
          <motion.div
            key="searching"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SearchingMatchScreen 
              onMatchFound={handleMatchFound}
              onCancel={handleBackToBattle}
            />
          </motion.div>
        )}

        {appState === 'vs-battle' && (
          <motion.div
            key="vs-battle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <VSBattleScreen onBattleStart={handleBattleBegin} />
          </motion.div>
        )}

        {appState === 'game' && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <GameApp />
          </motion.div>
        )}
      </AnimatePresence>
    </RainbowKitProvider>
  )
}

// Main App Component
function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <InnerApp />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App