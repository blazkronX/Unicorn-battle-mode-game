import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTelegram } from '../../hooks/useTelegram'

interface BattleSelectionScreenProps {
  onBattleStart: () => void // Add this prop
}

export const BattleSelectionScreen: React.FC<BattleSelectionScreenProps> = ({ onBattleStart }) => {
  const { hapticFeedback } = useTelegram()
  const [selectedMode, setSelectedMode] = useState(1) // 0: Tournament, 1: Multiplayer, 2: Training
  
  const battleModes = [
    {
      id: 0,
      title: "CHARLIE UNICORN",
      subtitle: "TOURNAMENT",
      image: "/assets/images/tournament-card.svg",
      stars: 3,
      bgColor: "bg-purple-500",
      borderColor: "border-purple-400"
    },
    {
      id: 1,
      title: "MULTIPLAYER",
      subtitle: "",
      image: "/assets/images/multiplayer-card.svg",
      stars: 0,
      bgColor: "bg-orange-400",
      borderColor: "border-orange-300",
      isCenter: true
    },
    {
      id: 2,
      title: "TRAINING TRIALS",
      subtitle: "",
      image: "/assets/images/training-card.svg",
      stars: 0,
      bgColor: "bg-red-400",
      borderColor: "border-red-300"
    }
  ]

  const bottomItems = [
    { title: "SETTINGS", image: "/assets/images/settings_icon.svg" },
    { title: "INBOX", image: "/assets/images/inbox.svg" },
    { title: "CARD", image: "/assets/images/card_icon.svg" },
    { title: "DECKS", image: "/assets/images/decks.svg" },
    { title: "PROFILE", image: "/assets/images/profile_icon.svg", badge: "4" },
    { title: "MARKETPLACE", image: "/assets/images/marketplace.svg" },
  ]

  const handleBattleClick = () => {
    hapticFeedback('impact', 'medium')
    onBattleStart() // Call the prop function to navigate to searching screen
  }

  const handleModeSelect = (modeId: number) => {
    hapticFeedback('selection')
    setSelectedMode(modeId)
  }

  const handleBottomItemClick = (item: string) => {
    hapticFeedback('impact', 'light')
    console.log('Clicked:', item)
  }

  const handlePrevMode = () => {
    hapticFeedback('impact', 'light')
    setSelectedMode((prev) => (prev > 0 ? prev - 1 : 2))
  }

  const handleNextMode = () => {
    hapticFeedback('impact', 'light')
    setSelectedMode((prev) => (prev < 2 ? prev + 1 : 0))
  }

  const getCurrentModeOrder = () => {
    return [
      battleModes[(selectedMode + 2) % 3], // Left
      battleModes[selectedMode],            // Center
      battleModes[(selectedMode + 1) % 3]   // Right
    ]
  }

  const orderedModes = getCurrentModeOrder()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black relative overflow-hidden telegram-safe-area"
    >
      {/* Starry background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Top Stats */}
      <div className="flex justify-between items-center p-6 relative z-10">
        {/* Funny Mode */}
        <div className="flex flex-col items-center">
            {/* Combined icon and score container */}
            <div className="relative flex items-center">
                {/* Hexagonal icon */}
                <div 
                className="w-12 h-12 bg-transparent flex items-center justify-center relative z-10"
                style={{
                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                }}
                >
                <img src="/assets/images/funny-mode-icon.svg" alt="Funny Mode" className="w-16 h-16" />
                </div>
                
                {/* Attached rectangular score container */}
                <div className="bg-[#282A47] rounded-r px-3 py-1 -ml-2 pl-18">
                <div className="text-white font-bold text-sm">3200</div>
                </div>
            </div>
            
            {/* Mode label below */}
            <div className="text-white/60 text-xs mt-1">FUNNY MODE</div>
            </div>

        {/* Hardcore Mode */}
       <div className="flex flex-col items-center">
            {/* Combined icon and score container */}
            <div className="relative flex items-center">
                {/* Hexagonal icon */}
                <div 
                className="w-12 h-12 bg-transparent  flex items-center justify-center relative z-10"
                style={{
                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                }}
                >
                <img src="/assets/images/hardcore-mode-icon.svg" alt="Hardcore Mode" className="w-16 h-16" />
                </div>
                
                {/* Attached rectangular score container */}
                <div className="bg-[#282A47] rounded-r px-3 py-1 -ml-2 pl-18 ">
                <div className="text-white font-bold text-sm">0</div>
                </div>
            </div>
            
            {/* Mode label below */}
            <div className="text-white/60 text-xs mt-1">HARDCORE MODE</div>
            </div>
      </div>

      {/* Main Battle Cards */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 py-8">
        
         <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 1 }}>
            <img 
            src="/assets/images/backgroundV.svg" 
            alt="Background" 
            className="w-full max-w-xl h-auto object-contain opacity-30"
            />
        </div>
        <div className="relative w-full max-w-lg">
          {/* Battle Mode Cards */}
          <div className="flex justify-center items-center relative space-x-4 mb-8">
            {orderedModes.map((mode, index) => (
              <motion.div
                key={`${mode.id}-${index}`}
                className={`relative cursor-pointer ${
                  index === 1 ? 'w-56 h-72 z-20' : 'w-40 h-56 z-10'
                }`}
                style={{
                  marginTop: index === 1 ? 0 : '32px',
                }}
                whileHover={{ scale: index === 1 ? 1.02 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleModeSelect(mode.id)}
                animate={{
                  scale: index === 1 ? 1 : 0.85,
                  opacity: index === 1 ? 1 : 0.7,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Card Image */}
                <div className="relative w-full h-full">
                  <img
                    src={mode.image}
                    alt={mode.title}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                  
                  {/* Selection highlight for center card */}
                  {index === 1 && (
                    <div className="absolute inset-0 bg-cyan-400/20 rounded-lg blur-lg" />
                  )}
                </div>

                {/* Stars */}
                {mode.stars > 0 && index === 1 && (
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {[...Array(mode.stars)].map((_, i) => (
                      <div key={i} className="w-4 h-4 text-yellow-400 drop-shadow-lg">⭐</div>
                    ))}
                  </div>
                )}

                {/* NFT Badge for center card */}
                {index === 1 && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full drop-shadow-lg">
                    NFT
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows - Positioned relative to the cards container */}
            <div className="relative">
            {/* Left Arrow */}
            <motion.button
                className="absolute bottom-4 left-12 w-8 h-8 flex items-center justify-center text-white"
                style={{ zIndex: 25 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrevMode}
            >
                <img src="/assets/images/back_icon.svg" alt="Previous" className="w-8 h-8" />
            </motion.button>

            {/* Right Arrow */}
            <motion.button
                className="absolute bottom-4 right-12 w-8 h-8 flex items-center justify-center text-white"
                style={{ zIndex: 25 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNextMode}
            >
                <img src="/assets/images/front_icon.svg" alt="Next" className="w-8 h-8" />
            </motion.button>
            </div>
        </div>
      </div>

        {/* Battle Now Button */}
        <div className="px-6 mb-8 relative z-10">
            <motion.button
                onClick={handleBattleClick} // This now calls onBattleStart prop
                className="w-full max-w-46 mx-auto block py-4 bg-gradient-to-r from-purple-400 to-cyan-300 text-white font-bold text-xl relative overflow-hidden"
                style={{
                clipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {/* Internal dashed outline */}
                <div 
                className="absolute inset-2 border border-dashed border-white/40"
                style={{
                    clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)'
                }}
                />
                
                {/* Button shine effect */}
                <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: [-100, 400] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                
                <span className="relative z-10">Battle Now!</span>
            </motion.button>
            </div>

      {/* Bottom Navigation - Hexagonal Layout */}
            <motion.div 
            className="relative p-6 h-48"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            >
            {/* Settings - Top Left */}
            <motion.div
                className="absolute top-0 left-8 flex flex-col items-center cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBottomItemClick("SETTINGS")}
            >
                <img src="/assets/images/settings_icon.svg" alt="Settings" className="w-16 h-16" />
            </motion.div>

            {/* Decks - Top Right */}
            <motion.div
                className="absolute top-0 right-8 flex flex-col items-center cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                whileHover={{ scale: 1.05, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBottomItemClick("DECKS")}
            >
                <img src="/assets/images/decks.svg" alt="Decks" className="w-16 h-16" />
            </motion.div>

            {/* Inbox - Middle Left (between settings and profile) */}
            <motion.div
                className="absolute top-12 left-20 flex flex-col items-center cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBottomItemClick("INBOX")}
            >
                <img src="/assets/images/inbox.svg" alt="Inbox" className="w-16 h-16" />
            </motion.div>

            {/* Card - Middle Right (between marketplace and decks) */}
            <motion.div
                className="absolute top-12 right-18 flex flex-col items-center cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.3 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBottomItemClick("CARD")}
            >
                <img src="/assets/images/card_icon.svg" alt="Card" className="w-16 h-16" />
            </motion.div>

            {/* Profile - Bottom Left with Badge */}
            <motion.div
                className="absolute -bottom-2 left-2 flex flex-col items-center cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                whileHover={{ scale: 1.05, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBottomItemClick("PROFILE")}
            >
                <div className="relative">
                <img src="/assets/images/profile_icon.svg" alt="Profile" className="w-28 h-28" />
                </div>
            </motion.div>

            {/* Center Bottom Icon */}
            <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
            >
                <motion.div 
                className="w-12 h-12 bg-gray-600 flex items-center justify-center rounded"
                animate={{ 
                    boxShadow: [
                    "0 0 0 rgba(75, 85, 99, 0)",
                    "0 0 20px rgba(75, 85, 99, 0.5)",
                    "0 0 0 rgba(75, 85, 99, 0)"
                    ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                >
               <img src="/assets/images/leave_icon.svg" alt="Marketplace" className="w-24 h-24" />
                </motion.div>
            </motion.div>

            {/* Marketplace - Bottom Right */}
            <motion.div
                className="absolute -bottom-4 right-4 flex flex-col items-center cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.6 }}
                whileHover={{ scale: 1.05, rotate: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBottomItemClick("MARKETPLACE")}
            >
                <img src="/assets/images/marketplace.svg" alt="Marketplace" className="w-24 h-24" />
            </motion.div>
            </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}