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
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
									<div className="relative w-full h-48">
										{' '}
										{/* Fixed height container */}
										<Image
											src={imagePath}
											alt={investigation.headline}
											layout="fill"
											objectFit="cover"
											className="transition-transform duration-300 group-hover:scale-105"
										/>
									</div>
									<div className="p-4">
										<h3 className="text-lg font-semibold text-slate-700 hover:underline">
											{investigation.headline}
										</h3>
									</div>
								</Link>
							</div>
						);
					})}
				</div>
			</section>
			<section className="px-10 py-16 space-y-12 text-slate-800 container mx-auto">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold text-slate-600">FILMS</h2>
				</div>
				{/* Responsive Grid for Films */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
									<div className="relative w-full h-48">
										{' '}
										{/* Fixed height container */}
										<Image
											src={imagePath}
											alt={film.headline}
											layout="fill"
											objectFit="cover"
											className="transition-transform duration-300 group-hover:scale-105"
										/>
									</div>
									<div className="p-4">
										<h3 className="text-lg font-semibold text-slate-700 hover:underline">
											{film.headline}
										</h3>
									</div>
								</Link>
							</div>
						);
					})}
				</div>
			</section>
			<section className="px-10 py-16 space-y-12 text-slate-800 container mx-auto">
				<div className="container mx-auto">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-bold text-slate-600">Reports</h2>
					</div>

					<div className="flex gap-4 flex-wrap">
						<Link
							href="https://techglobalinstitute.com/wp-content/uploads/2025/01/Bloodshed_In_Bangladesh_V6.pdf"
							target="_blank"
							className="inline-flex gap-2 items-center my-4 text-primary"
						>
							<div className="px-6 py-8 bg-foreground rounded-2xl shadow-lg border border-slate-200 max-w-[250px] flex flex-col gap-4">
								<div className="inline-flex gap-3 items-center">
									<div className="border rounded-full bg-background min-h-10 min-w-10 flex items-center justify-center">
										<File width={16} />
									</div>

									<strong className="text-xs">BLOODSHED IN BANGLADESH</strong>

									<div className="ms-4">
										<Link2Icon />
									</div>
								</div>

								<p className="text-xs text-slate-700">
									This report focuses in depth on just one day of the
									anti-government protests – 19th July 2024 – and paints a
									harrowing picture of families, feet literally soaked in blood,
									forced to search overflowing hospital morgues for their
									children shot by police. We were on the ground collecting
									evidence in Bangladesh days after the government fell and
									interviewed scores of families and eyewitnesses.
								</p>
							</div>
						</Link>
					</div>
				</div>
			</section>
			;
		</>
	);
}

export default InvestigationContainer;
