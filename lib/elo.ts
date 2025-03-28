/**
 * ELO Rating System Implementation for Pickleball
 *
 * This implementation follows standard ELO rating calculations with
 * adjustments specific to pickleball singles and doubles play.
 */

// Default K-factor (determines how much ratings change after each match)
const DEFAULT_K_FACTOR = 32

// Default starting rating for new players
export const DEFAULT_RATING = 1500

interface Player {
  id: string
  singlesRating: number
  doublesRating: number
}

interface MatchResult {
  winner: Player | [Player, Player] // Single player or team of two
  loser: Player | [Player, Player] // Single player or team of two
  winnerScore: number
  loserScore: number
  isDoubles: boolean
}

/**
 * Calculate expected outcome probability based on ratings
 */
function getExpectedOutcome(ratingA: number, ratingB: number): number {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400))
}

/**
 * Calculate new ELO rating
 */
function calculateNewRating(
  currentRating: number,
  expectedOutcome: number,
  actualOutcome: number,
  kFactor: number = DEFAULT_K_FACTOR,
): number {
  return Math.round(currentRating + kFactor * (actualOutcome - expectedOutcome))
}

/**
 * Calculate score-based K-factor adjustment
 * Bigger score differences result in larger rating changes
 */
function getScoreAdjustedKFactor(winnerScore: number, loserScore: number, kFactor: number = DEFAULT_K_FACTOR): number {
  // Calculate score difference percentage
  const totalPoints = winnerScore + loserScore
  const scoreDifference = winnerScore - loserScore
  const scoreDifferencePercentage = scoreDifference / totalPoints

  // Adjust K-factor based on score difference (1.0 to 1.5 multiplier)
  const kMultiplier = 1 + scoreDifferencePercentage * 0.5

  return kFactor * kMultiplier
}

/**
 * Update ratings for singles match
 */
export function updateSinglesRatings(
  winner: Player,
  loser: Player,
  winnerScore: number,
  loserScore: number,
): [Player, Player] {
  // Get expected outcomes
  const winnerExpected = getExpectedOutcome(winner.singlesRating, loser.singlesRating)
  const loserExpected = getExpectedOutcome(loser.singlesRating, winner.singlesRating)

  // Adjust K-factor based on score difference
  const adjustedK = getScoreAdjustedKFactor(winnerScore, loserScore)

  // Calculate new ratings
  const newWinnerRating = calculateNewRating(winner.singlesRating, winnerExpected, 1, adjustedK)
  const newLoserRating = calculateNewRating(loser.singlesRating, loserExpected, 0, adjustedK)

  // Update player objects
  const updatedWinner = { ...winner, singlesRating: newWinnerRating }
  const updatedLoser = { ...loser, singlesRating: newLoserRating }

  return [updatedWinner, updatedLoser]
}

/**
 * Update ratings for doubles match
 */
export function updateDoublesRatings(
  winners: [Player, Player],
  losers: [Player, Player],
  winnerScore: number,
  loserScore: number,
): [[Player, Player], [Player, Player]] {
  // Calculate average team ratings
  const winnersAvgRating = (winners[0].doublesRating + winners[1].doublesRating) / 2
  const losersAvgRating = (losers[0].doublesRating + losers[1].doublesRating) / 2

  // Get expected outcomes
  const winnersExpected = getExpectedOutcome(winnersAvgRating, losersAvgRating)
  const losersExpected = getExpectedOutcome(losersAvgRating, winnersAvgRating)

  // Adjust K-factor based on score difference
  const adjustedK = getScoreAdjustedKFactor(winnerScore, loserScore)

  // Calculate new ratings for each player
  const newWinner1Rating = calculateNewRating(winners[0].doublesRating, winnersExpected, 1, adjustedK)
  const newWinner2Rating = calculateNewRating(winners[1].doublesRating, winnersExpected, 1, adjustedK)
  const newLoser1Rating = calculateNewRating(losers[0].doublesRating, losersExpected, 0, adjustedK)
  const newLoser2Rating = calculateNewRating(losers[1].doublesRating, losersExpected, 0, adjustedK)

  // Update player objects
  const updatedWinners: [Player, Player] = [
    { ...winners[0], doublesRating: newWinner1Rating },
    { ...winners[1], doublesRating: newWinner2Rating },
  ]

  const updatedLosers: [Player, Player] = [
    { ...losers[0], doublesRating: newLoser1Rating },
    { ...losers[1], doublesRating: newLoser2Rating },
  ]

  return [updatedWinners, updatedLosers]
}
