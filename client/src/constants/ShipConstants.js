export const HORIZONTAL = 'horizontal'
export const VERTICAL = 'vertical'
export const ORIENTATIONS = [HORIZONTAL, VERTICAL]
export const [
  PATROL_BOAT,
  SUBMARINE,
  AIRCRAFT_CARRIER
] = [
  'PATROL_BOAT',
  'SUBMARINE',
  'AIRCRAFT_CARRIER'
]
export const SHIP_TYPES = [
  PATROL_BOAT,
  SUBMARINE,
  AIRCRAFT_CARRIER
]
export const SHIP_SIZES = {
  [PATROL_BOAT]: 2,
  [SUBMARINE]: 3,
  [AIRCRAFT_CARRIER]: 5
}
export const DEFAULT_COORDINATES = {
  [PATROL_BOAT]: [1, 1],
  [SUBMARINE]: [3, 4],
  [AIRCRAFT_CARRIER]: [4, 8]
}
