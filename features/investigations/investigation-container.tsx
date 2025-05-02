import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { File, Link2Icon } from 'lucide-react';

import { investigations_data, films_data } from './data';

function InvestigationContainer() {
	return (
		<>
			<section className="px-10 py-16 space-y-12 text-slate-800 container mx-auto">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold text-slate-600">CASE ANALYSIS</h2>
				</div>
				{/* Responsive Grid for Case Analysis */}
				<div className="grid grid-cols-1  lg:grid-cols-2 gap-6">
					{investigations_data.map((investigation) => {
						const slug = investigation.headline
							.toLowerCase()
							.replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
							.replace(/(^-|-$)+/g, ''); // Trim leading/trailing hyphens
						// Adjust image path for Next/Image (relative to public dir)
						const imagePath = investigation.feature_img.startsWith('./')
							? investigation.feature_img.substring(1) // Remove leading '.'
							: investigation.feature_img;
						return (
							<div
								key={investigation.headline}
								className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
							>
								<Link target="_blank" href={`/investigations/${slug}`}>
									<div>
										<Image
											src={imagePath}
											alt={investigation.headline}
											width={0}
											height={0}
											className="transition-transform duration-300 group-hover:scale-105 object-cover h-[400px] w-full"
										/>
										<div className="p-4">
											<h3 className="mb-8 text-lg font-semibold text-slate-700 hover:underline">
												{investigation.headline}
											</h3>

											<div className="grid grid-cols-1 md:grid-cols-2 gap-16">
												<table className="text-xs">
													<tr>
														<td className="font-semibold">Date of incident</td>
														<td className="text-end">
															{investigation?.case_details?.date_of_incident}
														</td>
													</tr>
													<tr>
														<td className="font-semibold">Location</td>
														<td className="text-end">
															{investigation?.case_details?.incident_location}
														</td>
													</tr>

													<tr>
														<td className="font-semibold">
															Location Coordinates
														</td>
														<td className="text-end">
															{
																investigation?.case_details
																	?.location_coordinates
															}
														</td>
													</tr>
												</table>

												<table className="text-xs w-full">
													<tr>
														<td className="font-semibold">
															Preliminary Analysis
														</td>
														<td className="text-end">
															{
																investigation?.case_details
																	?.preliminary_analysis
															}
														</td>
													</tr>
													<tr>
														<td className="font-semibold">Updated on</td>
														<td className="text-end">
															{investigation?.case_details?.updated_on}
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
															{investigation?.context[0]}
														</td>
													</tr>
												</table>
											</div>
										</div>
									</div>
								</Link>
							</div>
						);
					})}
				</div>
			</section>
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
													<td className="font-semibold">
														Location Coordinates
													</td>
													<td className="text-end">
														{film?.case_details?.location_coordinates}
													</td>
												</tr>
											</table>

											<table className="text-xs w-full">
												<tr>
													<td className="font-semibold">
														Preliminary Analysis
													</td>
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
			<section className="px-10 py-16 space-y-12 text-slate-800">
				<div className="container mx-auto">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-bold text-slate-600">Reports</h2>
					</div>

					{/* Responsive Grid for Reports */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Report Item Start */}
						<div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
							<Link
								href="https://techglobalinstitute.com/wp-content/uploads/2025/01/Bloodshed_In_Bangladesh_V6.pdf"
								target="_blank"
								className="block group" // Use block for link to fill the div, add group for hover effect
							>
								{/* Add Image component here */}
								<Image
									src="/report_1.png" // Path relative to public directory
									alt="Bloodshed in Bangladesh Report Cover"
									width={0} // Use 0 for responsive width based on container
									height={0} // Use 0 for responsive height based on container
									className="transition-transform duration-300 group-hover:scale-105 object-cover h-[400px] w-full" // Consistent styling
								/>
								<div className="p-4">
									{' '}
									{/* Consistent padding */}
									<div className="flex items-center gap-3 mb-4">
										{' '}
										{/* Use flex for layout, added margin-bottom */}
										<div className="border rounded-full bg-background h-10 w-10 flex items-center justify-center flex-shrink-0">
											{' '}
											{/* Fixed size icon container */}
											<File width={16} />
										</div>
										<strong className="text-sm font-semibold text-slate-700">
											{' '}
											{/* Adjusted text size/weight */}
											BLOODSHED IN BANGLADESH
										</strong>
										<div className="ml-auto">
											{' '}
											{/* Push icon to the right */}
											<Link2Icon className="text-slate-500" />{' '}
											{/* Added styling */}
										</div>
									</div>
									<p className="text-xs text-slate-600 line-clamp-5">
										{' '}
										{/* Adjusted text color and added line clamp */}
										This report focuses in depth on just one day of the
										anti-government protests – 19th July 2024 – and paints a
										harrowing picture of families, feet literally soaked in
										blood, forced to search overflowing hospital morgues for
										their children shot by police. We were on the ground
										collecting evidence in Bangladesh days after the government
										fell and interviewed scores of families and eyewitnesses.
									</p>
								</div>
							</Link>
						</div>
						{/* Report Item End */}
						{/* Add more report items here if needed */}
					</div>
				</div>
			</section>
		</>
	);
}

export default InvestigationContainer;
