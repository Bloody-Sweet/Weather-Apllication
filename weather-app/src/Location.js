import { useEffect, useState } from "react";
import axios from "axios";

function Location({ setLatitude, setLongitude }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // Update latitude and longitude when inputValue changes
  useEffect(() => {
    const getCityCoordinates = async () => {
      if (!inputValue) return;

      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search`,
          {
            params: {
              q: inputValue,
              format: "json",
              addressdetails: 1,
              limit: 1,
            },
          }
        );

        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          console.log("Geocoded Location:", lat, lon);
          setLatitude(parseFloat(lat)); // Update latitude in parent
          setLongitude(parseFloat(lon)); // Update longitude in parent
        } else {
          console.error("No results found for the given city name.");
        }
      } catch (error) {
        console.error("Geocoding Error:", error);
      }
    };

    getCityCoordinates();
  }, [inputValue, setLatitude, setLongitude]);

  return (
    <input
      type="text"
      placeholder="Enter the city name"
      className="Location-input"
      style={{ width: "500px", height: "25px" }}
      value={inputValue}
      onChange={handleChange}
    />
  );
}

export default Location;
