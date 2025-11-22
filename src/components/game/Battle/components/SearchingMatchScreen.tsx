import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTelegram } from '../../../../hooks/useTelegram'

interface SearchingMatchScreenProps {
  onMatchFound: () => void
  onCancel?: () => void
}

export const SearchingMatchScreen: React.FC<SearchingMatchScreenProps> = ({ onMatchFound, onCancel }) => {
  const { hapticFeedback } = useTelegram()
  const [searchTime, setSearchTime] = useState(0)
  const [loopCount, setLoopCount] = useState(0)

  useEffect(() => {
  let timer: NodeJS.Timeout

  const startTimers = () => {
    timer = setInterval(() => {
      setSearchTime(prev => {
        const newTime = prev + 1
        console.log('Search time:', newTime) // Debug log
        
        // Check if we've reached 12 seconds (4 loops)
        if (newTime >= 12) {
          console.log('12 seconds reached, triggering match found') // Debug log
          clearInterval(timer)
          hapticFeedback('impact', 'medium')
          onMatchFound()
        }
        
        return newTime
      })
    }, 1000)
  }

  startTimers()

  return () => {
    if (timer) clearInterval(timer)
  }
}, [onMatchFound, hapticFeedback])

// Update loop count based on search time
useEffect(() => {
  const currentLoop = Math.floor(searchTime / 3) + 1
  setLoopCount(Math.min(currentLoop, 4))
}, [searchTime])

  const handleCancel = () => {
    hapticFeedback('impact', 'light')
    if (onCancel) {
      onCancel()
    } else {
      console.log('Match search cancelled')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black relative overflow-hidden telegram-safe-area"
    >
      {/* Enhanced Starry Background */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() > 0.7 ? '3px' : '1px',
              height: Math.random() > 0.7 ? '3px' : '1px',
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Cross-shaped stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: '12px',
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              rotate: [0, 45, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      {/* Floating Cards - Centered on screen */}
      <div className="absolute z-20" style={{ top: '12.5%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div className="relative">
          {/* Left Card */}
          <motion.div
            className="absolute -left-24 -top-12"
            initial={{ x: -50, y: 20, rotate: -15 }}
            animate={{ 
              x: [-50, -30, -50],
              y: [20, -10, 20],
              rotate: [-15, -10, -15],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              src="/assets/images/card1.svg" 
              alt="Card 1" 
              className="w-32 h-96 drop-shadow-2xl"
            />
          </motion.div>

          {/* Right Card */}
          <motion.div
            className="absolute -right-24 -top-12"
            initial={{ x: 50, y: 20, rotate: 15 }}
            animate={{ 
              x: [50, 30, 50],
              y: [20, -10, 20],
              rotate: [15, 10, 15],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            <img 
              src="/assets/images/card2.svg" 
              alt="Card 2" 
              className="w-32 h-96 drop-shadow-2xl"
            />
          </motion.div>

          {/* Floating Orb between cards */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-purple-400 to-cyan-400 rounded-full"
            style={{ bottom: '-280px' }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
              boxShadow: [
                "0 0 20px rgba(147, 51, 234, 0.5)",
                "0 0 40px rgba(6, 182, 212, 0.7)",
                "0 0 20px rgba(147, 51, 234, 0.5)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>

      {/* Bottom Content */}
      <div className="absolute left-0 right-0 flex flex-col items-center px-6 pb-8 relative z-10" style={{ bottom: '-480px' }}>
        
        {/* Searching Text */}
        <motion.h1
          className="text-white text-2xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          SEARCHING FOR MATCH
        </motion.h1>

        {/* Progress Line with Unicorn Icon */}
        <div className="relative w-80 mb-6">
          {/* Progress Line Background */}
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
              animate={{ width: ["0%", "100%", "0%"] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          {/* Moving Unicorn Icon */}
          <motion.div
            className="absolute -top-3 w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center"
            animate={{ left: ["0%", "calc(100% - 32px)", "0%"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              src="/assets/images/unicorn-head-icon.svg" 
              alt="Unicorn" 
              className="w-5 h-5"
            />
          </motion.div>
        </div>

        {/* Search Timer Display */}
        <motion.div
          className="text-white/60 text-sm mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Searching... {searchTime}s (Loop {loopCount}/4)
        </motion.div>

        {/* Funny Quote */}
        <motion.p
          className="text-white/80 text-center text-base italic max-w-sm mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          A Burned, Tired Unicorn can stilled retreat, but a uUnicorn with broken horn acnnot
        </motion.p>

        {/* Cancel Button */}
        <motion.button
          onClick={handleCancel}
          className="relative px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold text-lg overflow-hidden"
          style={{
            clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          {/* Inner border */}
          <div 
            className="absolute inset-1 border border-white/40"
            style={{
              clipPath: 'polygon(6px 0%, 100% 0%, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0% 100%, 0% 6px)'
            }}
          />
          
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: [-100, 200] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          
          <span className="relative z-10">CANCEL</span>
        </motion.button>

        {/* Bottom Gradient Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />
      </div>
    </motion.div>
  )
}