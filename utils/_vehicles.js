// Utilities for backfilling the car data
import { AsyncStorage } from 'react-native'

export const CAR_STORAGE_KEY = ':car'

//******************* DUMMY VEHICLE DATA RELATIVE TO CURRENT LOCATION, DELETE AFTER GETTING ACTUAL VEHICLE DATA ********************//

const setDummyData = (coords) => {
  const {latitude, longitude} = coords;
  const randomCoords = [];
  const distanceFromBase = .2;
  const markerAmount = 40;
  const baseCoord = {
    latitude, 
    longitude
  };

  const getRandomCoords = () => {
    let randomLatitude = Math.random() * ((Math.random() <= 0.5 
      ? (baseCoord.latitude - distanceFromBase) 
      : (baseCoord.latitude + distanceFromBase)) - baseCoord.latitude) + baseCoord.latitude;
    let randomLongitude = Math.random() * ((Math.random() <= 0.5 
      ? (baseCoord.longitude - distanceFromBase) 
      : (baseCoord.longitude + distanceFromBase)) - baseCoord.longitude) + baseCoord.longitude
    return {
      latitude: randomLatitude,
      longitude: randomLongitude
    }
  }

  // TEST CAR AT CURRENT LOCATION OTHERWISE REMOVE THIS
  randomCoords.push({
    coord: baseCoord,
    id: 0,
    bounty: `$20.54`,
    description: 'Car model, mileage, fuel level, etc.',
    address: 'reverse geolocate from coords?',
    destination: getRandomCoords()
  })

  for (let i = 1; i < markerAmount; i++) {
    randomCoords.push({
      coord: getRandomCoords(),
      id: i,
      bounty: `$${(getRandomCoords().latitude/2+4).toFixed(2)}`,
      description: 'Car model, mileage, fuel level, etc.',
      address: 'reverse geolocate?',
      destination: getRandomCoords()
    })
  }

  // AsyncStorage.setItem(CAR_STORAGE_KEY, JSON.stringify(randomCoords))
  return randomCoords
}

export const getDummyData = (coords) => {
  return setDummyData(coords)
}

  //*****************************************************************************************************//
