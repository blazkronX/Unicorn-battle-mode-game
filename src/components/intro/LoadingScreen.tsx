import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

// Charlie Unicorn Logo - Add your SVG file path
const CharlieUnicornLogo = () => (
  <motion.div 
    className="w-48 h-48 mx-auto mb-8"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1, ease: "backOut" }}
  >
    <img
      src="assets/images/first_image.svg"
      alt="Charlie Unicorn AI"
      className="w-full h-full object-contain drop-shadow-2xl"
    />
  </motion.div>
)

// Loading Unicorn - Add your SVG file path
const LoadingUnicorn = () => (
  <motion.div 
    className="w-16 h-16 mx-auto mb-6"
    animate={{ 
      rotateY: [0, 360],
      scale: [1, 1.1, 1]
    }}
    transition={{ 
      rotateY: { duration: 2, repeat: Infinity, ease: "linear" },
      scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
    }}
  >
    <img
      src="/assets/images/loading_emoji.svg"
      alt="Loading..."
      className="w-full h-full object-contain filter drop-shadow-lg"
    />
  </motion.div>
)

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Loading...')

  useEffect(() => {
    const loadingSteps = [
      // { progress: 20, text: 'Summoning unicorns...' },
      // { progress: 40, text: 'Preparing battle arena...' },
      // { progress: 60, text: 'Charging rainbow power...' },
      // { progress: 80, text: 'Connecting to the multiverse...' },
      // { progress: 100, text: 'Ready for battle!' }
       { progress: 20, text: 'Loading...' },
      { progress: 40, text: 'Loading...' },
      { progress: 60, text: 'Loading...' },
      { progress: 80, text: 'Loading...' },
      { progress: 100, text: 'Loading...' }
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep]
        setProgress(step.progress)
        setLoadingText(step.text)
        currentStep++
      } else {
        clearInterval(interval)
        setTimeout(onLoadingComplete, 800)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex flex-col items-center justify-center p-6 telegram-safe-area">
      {/* Background particles animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Main logo */}
      <CharlieUnicornLogo />

      {/* Loading section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-center relative z-10"
      >
        <LoadingUnicorn />
        
        <motion.p 
          className="text-white text-lg font-medium mb-6"
          key={loadingText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {loadingText}
        </motion.p>

        {/* Progress bar */}
        <div 
          className="w-80 max-w-[90vw] h-8 bg-white/20 overflow-hidden backdrop-blur-sm border border-white/30 relative"
          style={{
            clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)'
          }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-lg"
            style={{
              background: 'linear-gradient(90deg, #00FFFF, #87CEEB, #9370DB, #FF69B4)'
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-lg"
            animate={{ x: [-100, 320] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={{ width: '100px' }}
          />
        </div>

        {/* Progress percentage */}
        <motion.p 
          className="text-white/80 text-sm mt-2 font-mono"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {progress}%
        </motion.p>
      </motion.div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + (i * 10)}%`,
              top: `${20 + (i * 8)}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + (i * 0.5),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          >
            <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full opacity-60" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}