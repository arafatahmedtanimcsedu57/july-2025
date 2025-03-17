import L from "leaflet";

// Centralize icon definitions for better maintainability
export const MapIcons = {
  death: L.icon({
    iconUrl: "marker-icon-red.png",
    shadowUrl: "marker-shadow.png",
    iconSize: [12, 20], // Further reduced size
    iconAnchor: [6, 20], // Adjusted anchor point
    popupAnchor: [0, -20], // Adjusted popup position
    shadowSize: [20, 20], // Reduced shadow size
    shadowAnchor: [6, 20], // Adjusted shadow anchor
  }),

  injury: L.icon({
    iconUrl: "marker-icon-orange.png",
    shadowUrl: "marker-shadow.png",
    iconSize: [12, 20], // Further reduced size
    iconAnchor: [6, 20], // Adjusted anchor point
    popupAnchor: [0, -20], // Adjusted popup position
    shadowSize: [20, 20], // Reduced shadow size
    shadowAnchor: [6, 20], // Adjusted shadow anchor
  }),

  multipleCasualties: L.icon({
    iconUrl: "marker-icon-violet.png",
    // iconUrl: "marker.gif",
    shadowUrl: "marker-shadow.png",
    iconSize: [12, 20], // Further reduced size
    iconAnchor: [6, 20], // Adjusted anchor point
    popupAnchor: [0, -20], // Adjusted popup position
    shadowSize: [20, 20], // Reduced shadow size
    shadowAnchor: [6, 20], // Adjusted shadow anchor
  }),
};
