import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { films_data } from '@/features/investigations/data'; // Adjust path if necessary

// Helper function to generate slug (must match the one used in the list component)
const generateSlug = (headline: string): string => {
	return headline
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
		.replace(/(^-|-$)+/g, ''); // Trim leading/trailing hyphens
};

// Define the expected structure of film data based on the JSON
interface Film {
	headline: string;
	feature_img?: string;
	case_details: {
		date_of_incident: string;
		incident_location: string;
		location_coordinates: string;
		preliminary_analysis: string;
		updated_on: string;
		release_date?: string; // Optional release date
	};
	context: string[];
	method: { [key: string]: string[] | string };
	types_of_analysis_conduct: {
		frame_by_frame_analysis: string;
		geolocation_verification: string;
		crowd_estimation?: string; // Optional
		audio_analysis: string;
		slow_motion_review?: string; // Optional
		law_enforcement_unit_identification?: string; // Optional
		personnel_identification?: string; // Optional (from investigation type)
	};
	open_source_research: {
		label: string;
		para: string;
		link?: string;
	}[];
	timeline_of_the_incident: {
		intro?: string;
		analysis: {
			label: string;
			para: string;
			imgs?: string[];
		}[][];
	};
}

interface PageProps {
	params: {
		slug: string;
	};
}

const FilmPage: React.FC<PageProps> = ({ params }) => {
	const { slug } = params;

	const film = films_data.find((f) => generateSlug(f.headline) === slug) as
		| Film
		| undefined; // Type assertion

	if (!film) {
		notFound();
	}

	// Function to adjust image paths relative to public directory
	const getImagePath = (relativePath: string | undefined) => {
		if (!relativePath) return '';
		// Assuming paths like './folder/image.png' should become '/folder/image.png'
		return relativePath.startsWith('./')
			? relativePath.substring(1)
			: relativePath;
	};

	return (
		<div className="container mx-auto px-4 md:px-10 py-12 text-slate-800">
			<article className="space-y-10">
				{/* Headline */}
				<h1 className="text-3xl md:text-4xl font-bold text-slate-700 border-b pb-4">
					{film.headline}
				</h1>

				{/* Feature Image */}
				{film.feature_img && (
					<div className="my-6">
						<Image
							src={getImagePath(film.feature_img)}
							alt={`${film.headline} featured image`}
							width={1200}
							height={675}
							className="w-full h-auto rounded shadow-lg object-cover"
							priority
						/>
					</div>
				)}

				{/* Optional: Add Video Embed Here if applicable */}
				{/* Example:
                <div className="aspect-video my-6">
                    <iframe
                        className="w-full h-full rounded shadow-lg"
                        src="YOUR_VIDEO_EMBED_URL" // Replace with actual video URL/embed code
                        title={film.headline}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                */}

				{/* Case Details */}
				<section className="space-y-4 p-4 bg-slate-50 rounded shadow">
					<h2 className="text-2xl font-semibold text-slate-600 border-b pb-2">
						Details
					</h2>
					<ul className="list-disc list-inside space-y-1 text-slate-700">
						{film.case_details.release_date && (
							<li>
								<strong>Release Date:</strong> {film.case_details.release_date}
							</li>
						)}
						<li>
							<strong>Date of Incident:</strong>{' '}
							{film.case_details.date_of_incident}
						</li>
						<li>
							<strong>Location:</strong> {film.case_details.incident_location}
						</li>
						<li>
							<strong>Coordinates:</strong>{' '}
							{film.case_details.location_coordinates}
						</li>
						<li>
							<strong>Preliminary Analysis:</strong>{' '}
							{film.case_details.preliminary_analysis}
						</li>
						<li>
							<strong>Updated On:</strong> {film.case_details.updated_on}
						</li>
					</ul>
				</section>

				{/* Context */}
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold text-slate-600 border-b pb-2">
						Context
					</h2>
					{film.context.map((para, index) => (
						<p key={index} className="text-slate-700 leading-relaxed">
							{para}
						</p>
					))}
				</section>

				{/* Method */}
				<section className="space-y-4 p-4 bg-slate-50 rounded shadow">
					<h2 className="text-2xl font-semibold text-slate-600 border-b pb-2">
						Method
					</h2>
					<div className="space-y-3 text-slate-700">
						{Object.entries(film.method).map(([key, value]) => (
							<div key={key}>
								{key.trim() && (
									<strong className="capitalize block mb-1">
										{key.replace(/_/g, ' ')}
									</strong>
								)}
								{Array.isArray(value) ? (
									<ul className="list-disc list-inside ml-4 space-y-1">
										{value.map((item, index) => (
											<li key={index}>{item}</li>
										))}
									</ul>
								) : (
									<p>{value}</p>
								)}
							</div>
						))}
					</div>
				</section>

				{/* Types of Analysis Conducted */}
				<section className="space-y-4">
					<h2 className="text-2xl font-semibold text-slate-600 border-b pb-2">
						Types of Analysis Conducted
					</h2>
					<ul className="list-disc list-inside space-y-2 text-slate-700">
						{Object.entries(film.types_of_analysis_conduct)
							.filter(([key, value]) => value) // Only show analysis types that have content
							.map(([key, value]) => (
								<li key={key}>
									<strong className="capitalize">
										{key.replace(/_/g, ' ')}:
									</strong>{' '}
									{value}
								</li>
							))}
					</ul>
				</section>

				{/* Open Source Research */}
				<section className="space-y-4 p-4 bg-slate-50 rounded shadow">
					<h2 className="text-2xl font-semibold text-slate-600 border-b pb-2">
						Open-Source Research
					</h2>
					<ul className="list-disc list-inside space-y-2 text-slate-700">
						{film.open_source_research.map((source, index) => (
							<li key={index}>
								<strong>{source.label}:</strong> {source.para}{' '}
								{source.link && (
									<a
										href={source.link}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-600 hover:underline"
									>
										[Link]
									</a>
								)}
							</li>
						))}
					</ul>
				</section>

				{/* Timeline */}
				<section className="space-y-6">
					<h2 className="text-2xl font-semibold text-slate-600 border-b pb-2">
						Timeline of Events
					</h2>
					{film.timeline_of_the_incident.intro && (
						<p className="text-slate-600 italic">
							{film.timeline_of_the_incident.intro}
						</p>
					)}
					{film.timeline_of_the_incident.analysis.map(
						(eventGroup, groupIndex) => (
							<div
								key={groupIndex}
								className="relative border-l-2 border-slate-300 pl-6 ml-2 space-y-6"
							>
								<div className="absolute left-0 top-0 -ml-[5px] mt-1 w-2.5 h-2.5 bg-slate-400 rounded-full"></div>
								{eventGroup.map((event, eventIndex) => (
									<div key={eventIndex} className="space-y-2">
										<p className="text-md font-semibold text-slate-700">
											{event.label}
										</p>
										<p className="text-base text-slate-600">{event.para}</p>

										{/* Render Images */}
										{event.imgs && event.imgs.length > 0 && (
											<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
												{event.imgs
													.filter((imgUrl) => imgUrl)
													.map((imgUrl, idx) => (
														<Image
															key={idx}
															src={getImagePath(imgUrl)}
															alt={`Timeline image ${groupIndex}-${eventIndex}-${
																idx + 1
															}`}
															width={400}
															height={225}
															className="w-full h-auto rounded shadow-md object-cover"
														/>
													))}
											</div>
										)}
									</div>
								))}
							</div>
						),
					)}
				</section>
			</article>
		</div>
	);
};

export default FilmPage;

// Optional: Generate static paths
// export async function generateStaticParams() {
//   return films_data.map((film) => ({
//     slug: generateSlug(film.headline),
//   }));
// }
