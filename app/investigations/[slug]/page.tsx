import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { investigations_data } from '@/features/investigations/data'; // Adjust path if necessary based on actual export location

// Helper function to generate slug (must match the one used in the list component)
const generateSlug = (headline: string): string => {
	return headline
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
		.replace(/(^-|-$)+/g, ''); // Trim leading/trailing hyphens
};

// Define the expected structure of investigation data based on the JSON
interface Investigation {
	headline: string;
	feature_img?: string;
	case_details: {
		date_of_incident: string;
		incident_location: string;
		location_coordinates: string;
		preliminary_analysis: string;
		updated_on: string;
	};
	context: string[];
	method: { [key: string]: string[] | string }; // Allow string or array for method values
	types_of_analysis_conduct: {
		frame_by_frame_analysis: string;
		geolocation_verification: string;
		audio_analysis: string;
		personnel_identification?: string; // Optional based on JSON structure
		slow_motion_review?: string; // Optional
		law_enforcement_unit_identification?: string; // Optional
	};
	open_source_research: {
		label: string;
		para: string;
		link?: string;
	}[];
	timeline_of_the_incident: {
		intro?: string; // Optional intro text
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

const InvestigationPage: React.FC<PageProps> = ({ params }) => {
	const { slug } = params;

	const investigation = investigations_data.find(
		(inv) => generateSlug(inv.headline) === slug,
	) as Investigation | undefined; // Type assertion

	if (!investigation) {
		notFound(); // Use Next.js notFound function
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
		<div className="w-full overflow-auto px-4 md:px-10 py-12 text-slate-800">
			<div className="max-w-[900px] mx-auto ">
				<article className="space-y-10">
					{/* Headline */}
					<h1 className="text-3xl md:text-4xl font-bold text-slate-700 border-b pb-4">
						{investigation.headline}
					</h1>

					{/* Feature Image */}
					{investigation.feature_img && (
						<div className="my-6">
							<Image
								src={getImagePath(investigation.feature_img)}
								alt={`${investigation.headline} featured image`}
								width={1200} // Adjust width as needed
								height={675} // Adjust height for aspect ratio
								className="w-full h-auto rounded shadow-lg object-cover"
								priority // Prioritize loading the main image
							/>
						</div>
					)}

					{/* Case Details */}
					<section className="space-y-4 p-4 bg-slate-50 rounded shadow">
						<h2 className="text-2xl font-semibold text-slate-600 border-b pb-2">
							Case Details
						</h2>
						<ul className="list-disc list-inside space-y-1 text-slate-700">
							<li>
								<strong>Date of Incident:</strong>{' '}
								{investigation.case_details.date_of_incident}
							</li>
							<li>
								<strong>Location:</strong>{' '}
								{investigation.case_details.incident_location}
							</li>
							<li>
								<strong>Coordinates:</strong>{' '}
								{investigation.case_details.location_coordinates}
							</li>
							<li>
								<strong>Preliminary Analysis:</strong>{' '}
								{investigation.case_details.preliminary_analysis}
							</li>
							<li>
								<strong>Updated On:</strong>{' '}
								{investigation.case_details.updated_on}
							</li>
						</ul>
					</section>

					{/* Context */}
					<section className="space-y-4">
						<h2 className="text-2xl font-semibold text-slate-600 border-b pb-2">
							Context
						</h2>
						{investigation.context.map((para, index) => (
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
							{Object.entries(investigation.method).map(([key, value]) => (
								<div key={key}>
									{/* Only display value if key is not just a space */}
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
										<p>{value}</p> // Handle single string value if needed
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
							{Object.entries(investigation.types_of_analysis_conduct)
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
							{investigation.open_source_research.map((source, index) => (
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
							Timeline of the Incident
						</h2>
						{investigation.timeline_of_the_incident.intro && (
							<p className="text-slate-600 italic">
								{investigation.timeline_of_the_incident.intro}
							</p>
						)}
						{investigation.timeline_of_the_incident.analysis.map(
							(eventGroup, groupIndex) => (
								<div
									key={groupIndex}
									className="relative border-l-2 border-slate-300 pl-6 ml-2 space-y-6"
								>
									{/* Dot on the timeline */}
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
														.filter((imgUrl) => imgUrl) // Filter out potential empty strings/nulls
														.map((imgUrl, idx) => (
															<Image
																key={idx}
																src={getImagePath(imgUrl)}
																alt={`Timeline image ${groupIndex}-${eventIndex}-${
																	idx + 1
																}`}
																width={400} // Adjust as needed
																height={225} // Adjust for aspect ratio
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
		</div>
	);
};

export default InvestigationPage;

// Optional: Generate static paths if you want to pre-render these pages at build time
// export async function generateStaticParams() {
//   return investigations_data.map((investigation) => ({
//     slug: generateSlug(investigation.headline),
//   }));
// }
