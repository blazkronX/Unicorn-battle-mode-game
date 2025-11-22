import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTelegram } from '../../hooks/useTelegram'

interface OnboardingScreenProps {
  onComplete: () => void
}

interface OnboardingSlide {
  id: number
  title: string
  description: string
  image: string
  imageAlt: string
  multipleImages?: string[]
}

const onboardingSlides: OnboardingSlide[] = [
  {
    id: 1,
    title: "Enter the Unicorn Warzone",
    description: "Collect wild PNFT cards, use insane boosters, and battle real players in hilarious or hardcore duels. This isn't your average card game, it's a magical war with attitude.",
    image: "/assets/images/loading_emoji.svg",
    imageAlt: "Unicorn Warzone"
  },
  {
    id: 2,
    title: "Play Your Cards Right",
    description: "Unlock over 5,000 unique unicorns. Power up with boosters that multiply your attack x100. Win battles. Keep everything you take.",
    image: "card1.svg",
    imageAlt: "PNFT Cards Collection",
    multipleImages: [
      "card2.svg",
      "card1.svg", 
      "card3.svg"
    ]
  },
  {
    id: 3,
    title: "Rise Through the Rankings",
    description: "Win tournaments, crush leaderboards, and collect epic rewards. Join the herd or go solo, every battle gets you closer to unicorn glory.",
    image: "nft.svg",
    imageAlt: "Rankings and Tournaments"
  }
]

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { hapticFeedback } = useTelegram()

  const nextSlide = () => {
    hapticFeedback('impact', 'light')
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onComplete()
    }
  }

  const prevSlide = () => {
    hapticFeedback('impact', 'light')
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const goToSlide = (index: number) => {
    hapticFeedback('selection')
    setCurrentSlide(index)
  }

  const skipOnboarding = () => {
    hapticFeedback('impact', 'medium')
    onComplete()
  }

  const currentSlideData = onboardingSlides[currentSlide]
  const isLastSlide = currentSlide === onboardingSlides.length - 1

  return (
    <div className="min-h-screen bg-black flex flex-col telegram-safe-area relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/assets/images/unicorn-pattern.svg')] bg-repeat opacity-20" />
      </div>

      {/* Skip button */}
      <div className="absolute top-6 right-6 z-20">
        <motion.button
          onClick={skipOnboarding}
          className="text-white/60 hover:text-white text-sm font-medium px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Skip
        </motion.button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-center max-w-md w-full"
          >
            {/* Hero Image(s) */}
            <motion.div
              className="w-80 h-80 mx-auto mb-8 relative"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "backOut" }}
            >
              {currentSlideData.multipleImages ? (
  // Multiple images for cards slide - full width layout
  <div className="flex justify-between items-center w-full h-full relative">
    {currentSlideData.multipleImages.map((imgSrc, index) => (
      <motion.div
        key={index}
        className={`relative ${
          index === 1 
            ? 'w-40 h-80 z-10' // Center card - larger
            : 'w-24 h-32 z-5'   // Side cards - smaller
        }`}
        style={{
          // Position cards: left edge, center, right edge
          ...(index === 0 && { marginLeft: '-50px' }),
          ...(index === 2 && { marginRight: '-50px' }),
        }}
        animate={{ 
          scale: index === 1 ? [1.1, 1.15, 1.1] : [1, 1.05, 1],
          y: [0, -10, 0]
        }}
        transition={{ 
          duration: 3 + (index * 0.5), 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: index * 0.4
        }}
      >
        <img
          src={imgSrc}
          alt={`Card ${index + 1}`}
          className="w-full h-full object-contain drop-shadow-xl"
        />
        
        {/* Card glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-unicorn-pink/20 to-unicorn-purple/20 rounded-lg blur-lg -z-10" />
      </motion.div>
    ))}
  </div>
) : (
  // Single image for other slides
  <motion.img
    src={currentSlideData.image}
    alt={currentSlideData.imageAlt}
    className="w-full h-full object-contain drop-shadow-2xl"
    animate={{ 
      scale: [1, 1.05, 1],
    }}
    transition={{ 
      duration: 4 + (currentSlide * 0.5), 
      repeat: Infinity, 
      ease: "easeInOut",
      delay: currentSlide * 0.3
    }}
  />
)}
              
              {/* Main glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-unicorn-pink/20 to-unicorn-purple/20 rounded-full blur-2xl -z-10" />
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-3xl font-bold text-white mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {currentSlideData.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-white/80 text-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {currentSlideData.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="px-6 pb-8">
        {/* Progress dots */}
        <div className="flex justify-center items-center mb-8 space-x-3">
          {onboardingSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-gradient-to-r from-cyan-400 via-purple-500 to-green-400'
                  : 'w-2 bg-white/30'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-col items-center space-y-4">
          {/* Next button - Full width at center */}
          <motion.button
            onClick={nextSlide}
            className="relative w-full max-w-sm py-4 text-white font-bold shadow-lg overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Gradient border with rounded corners */}
            <div 
              className="absolute hadow-[inset_0_0_0_2px_theme(colors.blue.500)] inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-green-400 p-[2px] rounded-xl"
            >
              <div 
                className="w-full h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl"
              />
            </div>
            
            {/* Button shine effect */}
            <motion.div
              className="absolute  inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl"
              animate={{ x: [-100, 400] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            <span className="relative z-10 text-lg">
              {isLastSlide ? 'Enter Battle' : 'Next'}
            </span>
          </motion.button>

          {/* Back button - smaller, only show if not first slide */}
          {currentSlide > 0 && (
            <motion.button
              onClick={prevSlide}
              className="px-6 py-2 text-white/60 hover:text-white text-sm font-medium rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              Back
            </motion.button>
          )}
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-br from-unicorn-pink to-unicorn-purple rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-unicorn-pink/10 to-transparent rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-unicorn-purple/10 to-transparent rounded-tl-full" />
    </div>
  )
}