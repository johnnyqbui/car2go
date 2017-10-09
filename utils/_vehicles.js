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

  for (let i = 0; i < markerAmount; i++) {
    let randomLatitude = Math.random() * ((Math.random() <= 0.5 
      ? (baseCoord.latitude - distanceFromBase) 
      : (baseCoord.latitude + distanceFromBase)) - baseCoord.latitude) + baseCoord.latitude;
    let randomLongitude = Math.random() * ((Math.random() <= 0.5 
      ? (baseCoord.longitude - distanceFromBase) 
      : (baseCoord.longitude + distanceFromBase)) - baseCoord.longitude) + baseCoord.longitude
    randomCoords.push({
      coord: {
        latitude: randomLatitude,
        longitude: randomLongitude
      },
      id: i,
      bounty: 'Bounty rate',
      description: 'Car model, mileage, fuel level, etc.',
      address: 'Address of vehicle location'
    })
  }

  // AsyncStorage.setItem(CAR_STORAGE_KEY, JSON.stringify(randomCoords))
  return randomCoords
}

export const getDummyData = (coords) => {
  return setDummyData(coords)
}

  //*****************************************************************************************************//
