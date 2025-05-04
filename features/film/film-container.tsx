import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { films_data } from './data';

function FilmContainer() {
	return (
		<section className="px-10 py-16 space-y-12 text-slate-800 container mx-auto">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold text-slate-600">FILMS</h2>
			</div>
			{/* Responsive Grid for Films */}
			<div className="grid grid-cols-1  lg:grid-cols-2 gap-6">
				{films_data.map((film) => {
					const slug = film.headline
						.toLowerCase()
						.replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
						.replace(/(^-|-$)+/g, ''); // Trim leading/trailing hyphens
					// Adjust image path for Next/Image (relative to public dir)
					const imagePath = film.feature_img.startsWith('./')
						? film.feature_img.substring(1) // Remove leading '.'
						: film.feature_img;
					return (
						<div
							key={film.headline}
							className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
						>
							<Link target="_blank" href={`/films/${slug}`}>
								<div>
									{' '}
									{/* Fixed height container */}
									<Image
										src={imagePath}
										alt={film.headline}
										width={0}
										height={0}
										className="transition-transform duration-300 group-hover:scale-105 object-cover h-[400px] w-full"
									/>
								</div>
								<div className="p-4">
									<h3 className="mb-8 text-lg font-semibold text-slate-700 hover:underline">
										{film.headline}
									</h3>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-16">
										<table className="text-xs">
											<tr>
												<td className="font-semibold">Date of incident</td>
												<td className="text-end">
													{film?.case_details?.date_of_incident}
												</td>
											</tr>
											<tr>
												<td className="font-semibold">Location</td>
												<td className="text-end">
													{film?.case_details?.incident_location}
												</td>
											</tr>

											<tr>
												<td className="font-semibold">Location Coordinates</td>
												<td className="text-end">
													{film?.case_details?.location_coordinates}
												</td>
											</tr>
										</table>

										<table className="text-xs w-full">
											<tr>
												<td className="font-semibold">Preliminary Analysis</td>
												<td className="text-end">
													{film?.case_details?.preliminary_analysis}
												</td>
											</tr>
											<tr>
												<td className="font-semibold">Updated on</td>
												<td className="text-end">
													{film?.case_details?.updated_on}
												</td>
											</tr>

											<tr>
												<td className="font-semibold">Release Date</td>
												<td className="text-end"></td>
											</tr>
										</table>
									</div>

									<div className="grid grid-cols-1 gap-16 mt-16">
										<table className="text-xs">
											<tr>
												<td className="font-semibold">Description</td>
												<td className="align-left line-clamp-1 text-end">
													{film?.context[0]}
												</td>
											</tr>
										</table>
									</div>
								</div>
							</Link>
						</div>
					);
				})}
			</div>
		</section>
	);
}

export default FilmContainer;
