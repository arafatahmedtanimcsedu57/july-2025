import type { LatLngExpression } from 'leaflet';

export const BANGLADESH_CENTER: LatLngExpression = [23.8103, 90.4125];

export const MAP_CONTAINER = {
	center: BANGLADESH_CENTER,
	zoom: 7,
	zoomControl: false,
	minZoom: 7,
	dragging: true,
	doubleClickZoom: true,
	scrollWheelZoom: true,
	style: { height: 'calc(100vh - 61px)' },
};
