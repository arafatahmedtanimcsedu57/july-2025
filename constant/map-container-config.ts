import type { LatLngExpression } from 'leaflet';

export const BANGLADESH_CENTER: LatLngExpression = [23.8103, 90.4125];

export const MAP_ZOOM = {
	DEFAULT: 7,
	MAX: 7,
	MIN: 7,
};
export const MAP_CONTAINER = {
	center: BANGLADESH_CENTER,
	zoom: MAP_ZOOM.DEFAULT,
	zoomControl: false,
	minZoom: MAP_ZOOM.MIN,
	dragging: true,
	doubleClickZoom: true,
	scrollWheelZoom: true,
	style: { height: 'calc(100vh - 61px)' },
};
