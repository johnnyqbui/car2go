const setFakeDestination = (coords) => {
  const {latitude, longitude} = coords;
  const distanceFromBase = .2;
  const baseCoord = {
    latitude, 
    longitude
  };

	let randomLatitude = Math.random() * ((Math.random() <= 0.5 
	  ? (baseCoord.latitude - distanceFromBase) 
	  : (baseCoord.latitude + distanceFromBase)) - baseCoord.latitude) + baseCoord.latitude;
	let randomLongitude = Math.random() * ((Math.random() <= 0.5 
	  ? (baseCoord.longitude - distanceFromBase) 
	  : (baseCoord.longitude + distanceFromBase)) - baseCoord.longitude) + baseCoord.longitude
	const randomCoords = {
	    latitude: randomLatitude,
	    longitude: randomLongitude
	}

  // AsyncStorage.setItem(CAR_STORAGE_KEY, JSON.stringify(randomCoords))
  return randomCoords
}

export const getFakeDestination = (coords) => {
  return setFakeDestination(coords)
}