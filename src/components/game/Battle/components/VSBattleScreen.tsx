import { useState, useEffect } from 'react'

interface VSBattleScreenProps {
  onBattleStart?: () => void
}

export const VSBattleScreen: React.FC<VSBattleScreenProps> = ({ onBattleStart }) => {
  const [showClash, setShowClash] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)

  useEffect(() => {
    // Start clash animation after 2 seconds
    const clashTimer = setTimeout(() => {
      setShowClash(true)
    }, 2000)

    // Start countdown after clash
    const countdownTimer = setTimeout(() => {
      setCountdown(3)
    }, 3500)

    return () => {
      clearTimeout(clashTimer)
      clearTimeout(countdownTimer)
    }
  }, [])

  // Handle countdown sequence
  useEffect(() => {
    if (countdown === null) return

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      // Countdown finished, start battle
      const battleTimer = setTimeout(() => {
        onBattleStart?.()
      }, 500)
      return () => clearTimeout(battleTimer)
    }
  }, [countdown, onBattleStart])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* VIC Section - Top Half */}
      <div className="h-1/2 relative">
        {/* Bubble Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-400 via-blue-500 to-purple-600">
          {/* Animated Bubble Pattern */}
          <div className="absolute inset-0">
            {[...Array(100)].map((_, i) => (
              <div
                key={`vic-bubble-${i}`}
                className="absolute rounded-full bg-gradient-to-br from-cyan-300/40 to-purple-300/40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${8 + Math.random() * 16}px`,
                  height: `${8 + Math.random() * 16}px`,
                  animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* VIC Character */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div 
              className={`w-64 h-80 mx-auto mb-4 relative transition-transform duration-500 ${
                showClash ? 'animate-bounce' : ''
              }`}
            >
              {/* Character Display */}
              <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-3xl border-4 border-white/30 shadow-2xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">💪</div>
                    <div className="text-6xl">🦄</div>
                    <div className="text-white font-bold text-xl mt-2 drop-shadow-lg">VIC</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* VIC Label */}
        <div className="absolute top-4 left-0 right-0">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 mx-auto w-fit px-6 py-2 rounded-full shadow-lg transform -skew-x-12">
            <span className="text-white font-bold text-xl transform skew-x-12 block">VIC</span>
          </div>
        </div>
      </div>

      {/* WIZZY Section - Bottom Half */}
      <div className="h-1/2 relative">
        {/* Red Background with Pattern */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-600 via-red-500 to-orange-500">
          {/* Animated Dot Pattern */}
          <div className="absolute inset-0">
            {[...Array(80)].map((_, i) => (
              <div
                key={`wizzy-dot-${i}`}
                className="absolute rounded-full bg-gradient-to-br from-yellow-300/30 to-red-300/30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${6 + Math.random() * 12}px`,
                  height: `${6 + Math.random() * 12}px`,
                  animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* WIZZY Character - Upside Down */}
        <div className="absolute inset-0 flex items-center justify-center transform rotate-180">
          <div className="text-center">
            <div 
              className={`w-64 h-80 mx-auto mb-4 relative transition-transform duration-500 ${
                showClash ? 'animate-bounce' : ''
              }`}
            >
              {/* Character Display */}
              <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-3xl border-4 border-white/30 shadow-2xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-2">🎧</div>
                    <div className="text-8xl mb-4">🦄</div>
                    <div className="text-6xl">🤘</div>
                    <div className="text-white font-bold text-xl mt-2 drop-shadow-lg">WIZZY</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WIZZY Label */}
        <div className="absolute bottom-4 left-0 right-0 transform rotate-180">
          <div className="bg-gradient-to-r from-blue-500 to-green-400 mx-auto w-fit px-6 py-2 rounded-full shadow-lg transform skew-x-12">
            <span className="text-white font-bold text-xl transform -skew-x-12 block">WIZZY</span>
          </div>
        </div>
      </div>

      {/* Diagonal VS Divider */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, 
              transparent 48%, 
              #000000 48%, 
              #ff4444 49%, 
              #ff6644 50%, 
              #4444ff 50%, 
              #6644ff 51%, 
              #000000 52%, 
              transparent 52%
            )`
          }}
        />
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45">
          <div className="bg-black px-8 py-3 rounded-full border-4 border-white shadow-2xl transform rotate-45">
            <span className="text-cyan-400 font-bold text-4xl tracking-wider">VS</span>
          </div>
        </div>
      </div>

      {/* Lightning Effects - Only show during clash */}
      {showClash && (
        <div className="absolute inset-0 pointer-events-none z-30">
          <div className="absolute top-1/3 left-1/3 text-6xl animate-pulse text-yellow-300 transform -rotate-45">⚡</div>
          <div className="absolute bottom-1/3 right-1/3 text-6xl animate-pulse text-yellow-400 transform -rotate-45">⚡</div>
          <div className="absolute top-1/2 left-1/4 text-4xl animate-bounce text-yellow-300">⚡</div>
          <div className="absolute top-1/2 right-1/4 text-4xl animate-bounce text-yellow-400">⚡</div>
        </div>
      )}

      {/* Countdown Display */}
      {countdown !== null && (
        <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
          <div 
            key={countdown}
            className="text-white font-bold text-9xl drop-shadow-2xl"
            style={{
              textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.6)',
              animation: 'countdownPulse 1s ease-out'
            }}
          >
            {countdown === 0 ? 'GO!' : countdown}
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes countdownPulse {
          0% { 
            transform: scale(0.5); 
            opacity: 0;
          }
          50% { 
            transform: scale(1.2); 
            opacity: 1;
          }
          100% { 
            transform: scale(1); 
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

// Simple usage - just pass onBattleStart callback
const VSBattleDemo = () => {
  const handleBattleStart = () => {
    console.log('Battle started!')
    // Add your battle start logic here
  }

  return (
    <VSBattleScreen onBattleStart={handleBattleStart} />
  )
}
