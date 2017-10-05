// Utilities for backfilling the car data

import { AsyncStorage } from 'react-native'
import { timeToString } from './helpers'

export const CAR_STORAGE_KEY = ':car'

function getRandomNumber (max) {
  return Math.floor(Math.random() * max) + 0
}

function setDummyData () {

  let dummyData = {}
  const timestamp = Date.now()

  for (let i = -183; i < 0; i++) {
    const time = timestamp + i * 24 * 60 * 60 * 1000
    const strTime = timeToString(time)
    dummyData[strTime] = getRandomNumber(3) % 2 === 0
      ? {
          run: getRandomNumber(run.max),
          bike: getRandomNumber(bike.max),
          swim: getRandomNumber(swim.max),
          sleep: getRandomNumber(sleep.max),
          eat: getRandomNumber(eat.max),
        }
      : null
  }

  AsyncStorage.setItem(CAR_STORAGE_KEY, JSON.stringify(dummyData))

  return dummyData
}

export function formatVehicleResults (results) {
  setDummyData()
}