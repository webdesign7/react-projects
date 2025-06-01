import Places from './Places.jsx';
import {useEffect, useState} from "react";
import ErrorPage from "./Error.jsx";
import {sortPlacesByDistance} from "../loc.js";
import {fetchAvailablePlacesRequest} from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {

  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPlaces() {
      setIsLoading(true);

      try {
        const places = await fetchAvailablePlacesRequest();

        navigator.geolocation.getCurrentPosition((position) => {

          const sortedPlaces = sortPlacesByDistance(places, {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });

          setAvailablePlaces(sortedPlaces);
          setIsLoading(false);
        })

      } catch (error) {
        setError({
          message: error.message || 'Failed to load places. Please try again later.'
        });
        setIsLoading(false);
      }
    }

    loadPlaces();

  },[]);

    if (error) {
        return (
            <ErrorPage title={'An error occurred'} message={error.message} />
        );
    }

  return (
    <Places
      title="Available Places"
      isLoading={isLoading}
      places={availablePlaces}
      loadingText="Loading available places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
