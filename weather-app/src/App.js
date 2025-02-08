import './App.css';
import React, { useEffect, useState } from "react";
import Location from './Location';
import Card from 'react-bootstrap/Card';

function App() {
  const [lat, setLat] = useState(null); // Latitude
  const [long, setLong] = useState(null); // Longitude
  const [data, setData] = useState(null); // Weather data
  const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState(true); // Track whether current location is being used
  // Fetch weather data when lat and long are set
  useEffect(() => {
    const fetchData = async () => {
      if (!lat || !long) {
        console.error("Latitude or Longitude is missing");
        return;
      }

      const apiUrl = `${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
      console.log("Fetching weather data from:", apiUrl); // Debug API URL

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          console.error(`API Error: ${response.status} ${response.statusText}`);
          return;
        }

        const weatherData = await response.json();
        console.log(weatherData); // Debug the API response
        setData(weatherData);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    if (lat && long) {
      fetchData(); // Call fetch only when lat and long are available
    }
  }, [lat, long]); // Runs whenever lat or long changes

  // Fetch the current location when the app loads
  useEffect(() => {
    const fetchCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Using current location...");
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
          setIsUsingCurrentLocation(true); // Set to true since current location is used
        },
        (error) => {
          console.error("Geolocation Error:", error);
          alert("Unable to fetch your current location.");
        }
      );
    };

    fetchCurrentLocation();
  }, []);

  return (
    <div className="App">
      {/* Pass setLat, setLong, and setIsUsingCurrentLocation to the Location component */}
      <Location
        setLatitude={setLat}
        setLongitude={setLong}
        setIsUsingCurrentLocation={setIsUsingCurrentLocation}
      />
      {/* Card displaying the weather data */}
      {data && (
        <Card style={{ width: '40rem', margin: '20px auto', textAlign: 'center' }}>
          <Card.Img
            src={`https://openweathermap.org/img/wn/${data.weather?.[0]?.icon}@2x.png`}
            alt="Weather Icon"
            style={{ height: '100px', objectFit: 'cover', marginRight: '20px' }}
          />
          <Card.Body>
            <Card.Title className="text-bold">{data.name}</Card.Title>
            <Card.Text>Temperature: {data.main?.temp}°C</Card.Text>
            <Card.Text>Weather: {data.weather?.[0]?.description}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default App;
