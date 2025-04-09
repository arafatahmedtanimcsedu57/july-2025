import type { LatLngExpression } from "leaflet";

export const BANGLADESH_CENTER: LatLngExpression = [23.79235, 88.291225];

export const MAP_ZOOM = {
  DEFAULT: 7.5,
  MAX: 10,
  MIN: 7.5,
};
export const MAP_CONTAINER = {
  center: BANGLADESH_CENTER,
  zoom: MAP_ZOOM.DEFAULT,
  zoomControl: false,
  minZoom: MAP_ZOOM.MIN,
  dragging: true,
  doubleClickZoom: true,
  scrollWheelZoom: true,
  style: { height: "calc(100vh-1px)" },
};
