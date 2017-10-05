export const RECEIVE_CARS = 'RECEIVE_CARS'

export function receiveCars (cars) {
  return {
    type: RECEIVE_CARS,
    cars,
  }
}