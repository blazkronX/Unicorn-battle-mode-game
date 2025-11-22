// Core Game Types
export interface User {
  id: string
  telegramId?: string
  walletAddress?: string
  username: string
  avatar?: string
  charliePoints: number
  level: number
  experience: number
  createdAt: string
  updatedAt: string
}

export interface Card {
  id: string
  tokenId: string
  name: string
  description: string
  image: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  power: number
  attributes: CardAttribute[]
  owner: string
  metadata: CardMetadata
  isLocked?: boolean // For active battles
}

export interface CardAttribute {
  trait_type: string
  value: string | number
  boost_power?: number
  display_type?: string
}

export interface CardMetadata {
  external_url?: string
  animation_url?: string
  background_color?: string
  attributes: CardAttribute[]
}

// Battle System Types
export interface Battle {
  id: string
  battleType: BattleType
  gameMode: GameMode
  status: BattleStatus
  players: BattlePlayer[]
  rounds: BattleRound[]
  winner?: string
  moonPotContribution: number
  createdAt: string
  startedAt?: string
  endedAt?: string
  settings: BattleSettings
}

export interface BattlePlayer {
  userId: string
  username: string
  walletAddress: string
  selectedCards: Card[]
  boosters: Booster[]
  isReady: boolean
  charliePointsWagered: number
}

export interface BattleRound {
  roundNumber: number
  player1Card: Card
  player2Card: Card
  winner: string
  animationType: AnimationType
  boostersUsed: Booster[]
  result: BattleResult
}

export interface BattleResult {
  winner: string
  loser: string
  winningCard: Card
  losingCard: Card
  damage: number
  animationTrigger: string
}

export interface BattleSettings {
  cardCount: 1 | 3 | 5 | 10 | 20 | 50
  gameMode: GameMode
  allowBoosters: boolean
  isRiskMode: boolean
  timeLimit?: number
}

export type BattleType = 'pvp' | 'pve' | 'tournament' | 'risk'
export type GameMode = 'funny' | 'hardcore'
export type BattleStatus = 'waiting' | 'in_progress' | 'completed' | 'cancelled'

// Animation Types
export interface AnimationType {
  id: string
  name: string
  mode: GameMode
  category: 'funny' | 'brutal'
  duration: number
  assets: AnimationAsset[]
}

export interface AnimationAsset {
  type: 'lottie' | 'video' | 'sprite'
  url: string
  preload: boolean
}

// Booster System
export interface Booster {
  id: string
  name: string
  description: string
  powerMultiplier: number
  price: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  icon: string
  effects: BoosterEffect[]
  isActive?: boolean
}

export interface BoosterEffect {
  type: 'power_boost' | 'critical_chance' | 'defense_boost'
  value: number
  duration?: number
}

// Tournament System
export interface Tournament {
  id: string
  name: string
  description: string
  type: TournamentType
  format: TournamentFormat
  status: TournamentStatus
  maxParticipants: number
  currentParticipants: number
  entryFee: number
  prizePool: number
  startDate: string
  endDate: string
  rules: TournamentRules
  participants: TournamentParticipant[]
  brackets?: TournamentBracket[]
  leaderboard?: LeaderboardEntry[]
}

export interface TournamentParticipant {
  userId: string
  username: string
  walletAddress: string
  joinedAt: string
  deck: Card[]
  eliminated?: boolean
  rank?: number
}

export interface TournamentBracket {
  round: number
  matches: TournamentMatch[]
}

export interface TournamentMatch {
  id: string
  player1: string
  player2: string
  winner?: string
  scheduledAt: string
  completedAt?: string
  battleId?: string
}

export interface LeaderboardEntry {
  rank: number
  userId: string
  username: string
  points: number
  wins: number
  losses: number
  winRate: number
}

export interface TournamentRules {
  maxCards: number
  gameMode: GameMode
  allowBoosters: boolean
  eliminationRounds: number
}

export type TournamentType = 'bracket' | 'league' | 'leaderboard' | 'buy_in' | 'special_event' | 'guild'
export type TournamentFormat = 'single_elimination' | 'double_elimination' | 'round_robin' | 'swiss'
export type TournamentStatus = 'upcoming' | 'registration_open' | 'in_progress' | 'completed' | 'cancelled'

// Marketplace Types
export interface MarketplaceListing {
  id: string
  type: 'card' | 'booster' | 'bundle'
  item: Card | Booster | MarketplaceBundle
  seller: User
  price: number
  currency: 'charlie_points' | 'eth' | 'matic'
  status: 'active' | 'sold' | 'cancelled' | 'expired'
  createdAt: string
  expiresAt?: string
}

export interface MarketplaceBundle {
  id: string
  name: string
  description: string
  items: (Card | Booster)[]
  discount: number
}

export interface TradeOffer {
  id: string
  from: User
  to: User
  offeredItems: (Card | Booster)[]
  requestedItems: (Card | Booster)[]
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled'
  message?: string
  createdAt: string
  expiresAt: string
}

// Character Customization
export interface CharacterCustomization {
  userId: string
  attributes: CharacterAttribute[]
  totalCost: number
  isComplete: boolean
  appearance: CharacterAppearance
}

export interface CharacterAttribute {
  id: string
  name: string
  description: string
  cost: number
  category: 'appearance' | 'battle' | 'special'
  effect: AttributeEffect
  isPurchased: boolean
}

export interface AttributeEffect {
  type: 'visual' | 'battle_boost' | 'tournament_access'
  value: any
  description: string
}

export interface CharacterAppearance {
  horn: string
  mane: string
  body: string
  tail: string
  wings?: string
  accessories: string[]
  colors: {
    primary: string
    secondary: string
    accent: string
  }
}

// Moon Pot System
export interface MoonPot {
  totalPool: number
  currentRound: number
  contributors: MoonPotContribution[]
  lastDistribution: string
  nextDistribution: string
  distributionRules: MoonPotRules
}

export interface MoonPotContribution {
  userId: string
  amount: number
  timestamp: string
  battleId?: string
}

export interface MoonPotRules {
  distributionPercentage: number
  minimumPool: number
  maxWinners: number
  eligibilityCriteria: string[]
}

// Socket Events
export interface SocketEvents {
  // Battle Events
  'battle:join': { battleId: string; userId: string }
  'battle:leave': { battleId: string; userId: string }
  'battle:ready': { battleId: string; userId: string }
  'battle:card_selected': { battleId: string; userId: string; cardId: string }
  'battle:booster_used': { battleId: string; userId: string; boosterId: string }
  'battle:round_result': { battleId: string; result: BattleResult }
  'battle:ended': { battleId: string; winner: string; result: Battle }
  
  // Tournament Events
  'tournament:joined': { tournamentId: string; userId: string }
  'tournament:started': { tournamentId: string }
  'tournament:ended': { tournamentId: string; winner: string }
  'tournament:bracket_updated': { tournamentId: string; bracket: TournamentBracket[] }
  
  // Marketplace Events
  'marketplace:listing_created': { listing: MarketplaceListing }
  'marketplace:listing_sold': { listingId: string; buyer: string }
  'marketplace:trade_offer': { offer: TradeOffer }
  
  // General Events
  'user:connected': { userId: string }
  'user:disconnected': { userId: string }
  'notification': { type: string; message: string; data?: any }
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Wallet Integration Types
export interface WalletState {
  isConnected: boolean
  address?: string
  balance?: string
  chainId?: number
  isConnecting: boolean
  error?: string
}

export interface NFTBalance {
  tokenId: string
  contract: string
  metadata: CardMetadata
  lastUpdated: string
}

// Game Statistics
export interface UserStats {
  totalBattles: number
  wins: number
  losses: number
  winRate: number
  longestWinStreak: number
  currentWinStreak: number
  totalCharliePointsEarned: number
  totalCharliePointsSpent: number
  cardsOwned: number
  tournamentsWon: number
  rankingPosition: number
  favoriteGameMode: GameMode
  lastActive: string
}

export interface GlobalStats {
  totalPlayers: number
  totalBattles: number
  totalCardsInCirculation: number
  totalCardsBurned: number
  currentMoonPot: number
  activeTournaments: number
  topPlayers: LeaderboardEntry[]
}

// Error Types
export interface GameError {
  code: string
  message: string
  details?: any
  timestamp: string
}

// Configuration Types
export interface GameConfig {
  maxCardsPerDeck: number
  maxBoostersPerBattle: number
  battleTimeout: number
  tournamentRegistrationTime: number
  moonPotDistributionPercentage: number
  cardRarityWeights: Record<string, number>
  minimumBetAmount: number
  maximumBetAmount: number
}

// Theme and UI Types
export interface Theme {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textSecondary: string
  error: string
  warning: string
  success: string
  info: string
}

export interface UIState {
  isLoading: boolean
  error?: GameError
  notifications: Notification[]
  modals: {
    isWalletConnectOpen: boolean
    isBattleResultOpen: boolean
    isCardDetailsOpen: boolean
    isSettingsOpen: boolean
  }
  theme: 'light' | 'dark'
}