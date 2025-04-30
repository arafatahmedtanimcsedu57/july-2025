'use client';

import { memo, useState, useEffect } from 'react';
import { CircleMarker, Tooltip, useMap } from 'react-leaflet';

import { DonutChart } from '@/shared/ui/donut-chart';
import { useSelectedCasualtyStore } from '@/features/country-view/store/selected-casualty-store';

import type { Casualty } from '@/types/data';
import { scaleCircleRadius } from '@/lib/scale-circle-radius';

interface CasualtyMarkerProps {
	casualty: Casualty;
}

const CasualtyMarker = memo(({ casualty }: CasualtyMarkerProps) => {
	const {
		lat,
		lng,
		district,
		verified_deaths,
		verified_injuries,
		total_cases,
	} = casualty;
	if (lat === null || lng === null) return null;

	const { selectedCasualty, toggleSelectedCasualty } =
		useSelectedCasualtyStore();

	const markerPosition = [lat, lng] as [number, number];
	const isSelected = selectedCasualty && selectedCasualty.district === district;

	const map = useMap();
	const [zoom, setZoom] = useState(map.getZoom());

	useEffect(() => {
		const handleZoom = () => {
			setZoom(map.getZoom());
		};

		map.on('zoomend', handleZoom);
		return () => {
			map.off('zoomend', handleZoom);
		};
	}, [map]);

	const deathCircleRadius = scaleCircleRadius({
		value: verified_deaths || 0,
		maxValue: 84,
		zoom,
		scale: 'sqrt',
	});
	const casualtyCircleRadius = scaleCircleRadius({
		value: verified_injuries || 0,
		maxValue: 1561,
		zoom,
		scale: 'sqrt',
	});

	const handleMarkerClick = () => toggleSelectedCasualty(casualty);

	const donutChartsConfig = () => {
		return [
			{
				chart: {
					data: [
						{ label: 'Deaths', value: verified_deaths, color: '#9c0612' },
						{
							label: 'Total Casualties',
							value: total_cases,
							color: '#e2e0df',
						},
					],

					size: 40,
					thickness: 3,
					innerText: '',
				},
				legend: {
					label: 'Deaths',
					value: verified_deaths,
				},
			},

			{
				chart: {
					data: [
						{ label: 'Injuries', value: verified_injuries, color: '#ee7f01' },
						{
							label: 'Total Casualties',
							value: total_cases,
							color: '#e2e0df',
						},
					],

					size: 40,
					thickness: 3,
					innerText: '',
				},
				legend: {
					label: 'Injuries',
					value: verified_injuries,
				},
			},
		];
	};

	const rippleEffect = isSelected ? (
		<>
			<CircleMarker
				center={markerPosition}
				radius={casualtyCircleRadius + 5}
				pathOptions={{
					color: '#ee7f01',
					fillColor: 'transparent',
					fillOpacity: 0,
					weight: 1,
					opacity: 0.7,
					dashArray: '5,5',
				}}
				eventHandlers={{ click: handleMarkerClick }}
			/>
			<CircleMarker
				center={markerPosition}
				radius={casualtyCircleRadius + 10}
				pathOptions={{
					color: '#ee7f01',
					fillColor: 'transparent',
					fillOpacity: 0,
					weight: 0.75,
					opacity: 0.5,
					dashArray: '3,7',
				}}
				eventHandlers={{ click: handleMarkerClick }}
			/>
		</>
	) : (
		<></>
	);

	const deathCircleMarker = deathCircleRadius ? (
		<CircleMarker
			key={district}
			center={markerPosition}
			radius={deathCircleRadius}
			pathOptions={{
				color: '#9c0610',
				fillColor: '#9c0610',
				fillOpacity: 1,
				weight: 0,
			}}
			eventHandlers={{ click: handleMarkerClick }}
			className="drop-shadow-[0_0_0.1rem_crimson]"
		>
			{isSelected && (
				<Tooltip permanent={true} direction="top">
					<div className="p-2 flex flex-col gap-4">
						<div>
							<h3 className="font-bold text-lg mb-1">{district}</h3>
						</div>
						<div>
							<h5 className="text-xs w-max">Total Casualties</h5>
							<p className="text-4xl font-semibold w-max">
								{total_cases.toLocaleString()}
							</p>
						</div>

						<div className="flex gap-2">
							{donutChartsConfig().map((donutChart) => (
								<div
									className="flex flex-wrap gap-2 items-center justify-center"
									key={donutChart.legend.label}
								>
									<DonutChart
										data={donutChart.chart.data}
										size={donutChart.chart.size}
										thickness={donutChart.chart.thickness}
										innerText={donutChart.chart.innerText}
									/>

									<div className="text-center">
										<h1 className="text-xs font-semibold">
											{donutChart.legend.value}
										</h1>
										<p className="text-xs">{donutChart.legend.label}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</Tooltip>
			)}
		</CircleMarker>
	) : (
		<></>
	);

	const injuryCircleMarker = casualtyCircleRadius ? (
		<CircleMarker
			key={`${district}-outer`}
			center={markerPosition}
			radius={casualtyCircleRadius}
			pathOptions={{
				color: '#ee7f01',
				fillColor: '#e9a30c',
				fillOpacity: 0.4,
				weight: 0.75,
			}}
			eventHandlers={{ click: handleMarkerClick }}
		>
			{!deathCircleRadius && isSelected && (
				<Tooltip permanent={true} direction="top">
					<div className="p-2 flex flex-col gap-4">
						<div>
							<h3 className="font-bold text-lg mb-1">{district}</h3>
						</div>
						<div>
							<h5 className="text-xs w-max">Total Casualties</h5>
							<p className="text-4xl font-semibold w-max">
								{total_cases.toLocaleString()}
							</p>
						</div>

						<div className="flex gap-2">
							{donutChartsConfig().map((donutChart) => (
								<div
									className="flex flex-wrap gap-2 items-center justify-center"
									key={donutChart.legend.label}
								>
									<DonutChart
										data={donutChart.chart.data}
										size={donutChart.chart.size}
										thickness={donutChart.chart.thickness}
										innerText={donutChart.chart.innerText}
									/>

									<div className="text-center">
										<h1 className="text-xs font-semibold">
											{donutChart.legend.value}
										</h1>
										<p className="text-xs">{donutChart.legend.label}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</Tooltip>
			)}
		</CircleMarker>
	) : (
		<></>
	);

	return (
		<>
			{rippleEffect}
			{injuryCircleMarker}
			{deathCircleMarker}
		</>
	);
});

CasualtyMarker.displayName = 'CasualtyMarker';

export { CasualtyMarker };
