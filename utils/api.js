import { AsyncStorage } from 'react-native'
import { formatVehicleResults, CAR_STORAGE_KEY } from './_calendar'

export function fetchCars () {
  return AsyncStorage.getItem(CAR_STORAGE_KEY)
    .then(formatVehicleResults)
}

export function submitEntry ({ entry, key }) {
  return AsyncStorage.mergeItem(CAR_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}

export function removeEntry (key) {
  return AsyncStorage.getItem(CAR_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(CAR_STORAGE_KEY, JSON.stringify(data))
    })
}