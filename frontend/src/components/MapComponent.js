import React, { useState } from "react";
import PropTypes from "prop-types";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Ensure custom marker icons render correctly in Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapComponent = ({ center, zoom, markers, radius }) => {
  const [position, setPosition] = useState(center);

  // Component to handle map events like clicks
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  return (
    <MapContainer center={position} zoom={zoom} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEvents />

      {/* Display markers passed from the parent component */}
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>{marker.label}</Popup>
        </Marker>
      ))}

      {/* Display a circle representing the delivery radius */}
      {radius && <Circle center={position} radius={radius} color="blue" fillOpacity={0.2} />}

      {/* Show the user's location */}
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    </MapContainer>
  );
};

MapComponent.propTypes = {
  center: PropTypes.array.isRequired, // Array with [lat, lng] for center
  zoom: PropTypes.number,             // Zoom level for the map
  markers: PropTypes.array,          // Array of marker objects
  radius: PropTypes.number,          // Radius in meters for the delivery area
};

MapComponent.defaultProps = {
  zoom: 13,                         // Default zoom level
  markers: [],                       // Default no markers
  radius: null,                      // Default no radius
};

export default MapComponent;
