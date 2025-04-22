export function scaleCircleRadius({
	value,
	maxValue,
	zoom,
	minRadius = 4,
	maxRadius = 30,
	scale = 'sqrt', // options: sqrt, log, linear
}: {
	value: number;
	maxValue: number;
	zoom: number;
	minRadius?: number;
	maxRadius?: number;
	scale?: 'sqrt' | 'log' | 'linear';
}): number {
	if (!value || maxValue === 0) return minRadius;

	let normalized: number;

	switch (scale) {
		case 'sqrt':
			normalized = Math.sqrt(value / maxValue);
			break;
		case 'log':
			normalized = Math.log(value + 1) / Math.log(maxValue + 1);
			break;
		case 'linear':
		default:
			normalized = value / maxValue;
	}

	const zoomFactor = zoom * 1.2;

	const radius = normalized * zoomFactor * 5;
	return Math.min(Math.max(radius, minRadius), maxRadius);
}
