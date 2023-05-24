import * as Location from 'expo-location';
import * as taskManager from 'expo-task-manager';

const UPDATE_DRIVER_LOCATION_WHILE_ON_TRIP = 'update-driver-location-while-on-trip';

taskManager.defineTask(UPDATE_DRIVER_LOCATION_WHILE_ON_TRIP, async ({ data, error }) => {
  if (error) {
    console.log('Background fetch error:', error);
    return;
  }

  if (data) {
    const { locations } = data;
    console.log('locations', locations);
    if (locations && locations.length > 0) {
      // Process the received locations
      const latestLocation = locations[locations.length - 1];
      const { latitude, longitude } = latestLocation.coords;
      console.log('Received location:', latitude, longitude);
    }
  }
});

export const registerUpdateDriverLocationTask = async () => {
  await Location.startLocationUpdatesAsync(UPDATE_DRIVER_LOCATION_WHILE_ON_TRIP, {
    accuracy: Location.Accuracy.BestForNavigation,
    timeInterval: 10000, // 1 minute interval
    distanceInterval: 0, // Only trigger on location change
    deferredUpdatesInterval: 60000, // Minimum time interval between updates
    deferredUpdatesDistance: 0, // Minimum distance between updates
    pausesUpdatesAutomatically: false, // Continue tracking even if app is in background
    activityType: Location.LocationActivityType.AutomotiveNavigation,
    showsBackgroundLocationIndicator: true,
  });

  console.log(`${UPDATE_DRIVER_LOCATION_WHILE_ON_TRIP} task registered`);
};
