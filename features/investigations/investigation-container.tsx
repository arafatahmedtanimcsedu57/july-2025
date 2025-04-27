import React from 'react';
import Image from 'next/image';

import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from '@/shared/ui/accordion';

import { investigations_data } from './data';

function InvestigationContainer() {
	return (
		<section className="px-10 py-16 space-y-12 text-slate-800 container mx-auto">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-slate-600">CASE ANALYSIS</h2>
			</div>
			<Accordion type="single" collapsible>
				{investigations_data.map((investigation) => (
					<AccordionItem
						value={investigation.headline}
						key={investigation.headline}
						className=""
					>
						{/* Headline */}
						<AccordionTrigger className="text-2xl font-bold">
							{investigation.headline}
						</AccordionTrigger>

						<AccordionContent className="space-y-6 text-slate-600">
							{investigation?.feature_img && (
								<Image
									src={investigation.feature_img}
									alt="featured"
									width={0}
									height={0}
									className="w-[100%]"
								/>
							)}
							{/* Case Details */}
							<section className="space-y-6">
								<h2 className="text-xl font-semibold">Case Details</h2>
								<ul className="list-disc list-inside ">
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
							<section className="space-y-6">
								<h2 className="text-xl font-semibold">Context</h2>
								{investigation.context.map((para) => (
									<p key={para.slice(0, 30)} className="">
										{para}
									</p>
								))}
							</section>
							{/* Method */}
							<section className="space-y-6">
								<h2 className="text-xl font-semibold">Method</h2>
								<div className=" flex flex-col">
									{Object.entries(investigation.method).map(([key, value]) => (
										<div key={key}>
											<strong className="capitalize">
												{key.replace(/_/g, ' ')}
											</strong>{' '}
											{Array.isArray(value) ? (
												<ul className="list-disc list-inside ml-4">
													{value.map((item, index) => (
														<li key={index}>{item}</li>
													))}
												</ul>
											) : (
												<span>{value}</span>
											)}
										</div>
									))}
								</div>
							</section>
							{/* Types of Analysis Conducted */}
							<section className="space-y-6">
								<h2 className="text-xl font-semibold">
									Types of Analysis Conducted
								</h2>
								<ul className="list-disc list-inside space-y-1">
									<li>
										<strong>Frame-by-Frame Analysis:</strong>{' '}
										{
											investigation.types_of_analysis_conduct
												.frame_by_frame_analysis
										}
									</li>
									<li>
										<strong>Geolocation Verification:</strong>{' '}
										{
											investigation.types_of_analysis_conduct
												.geolocation_verification
										}
									</li>
									<li>
										<strong>Audio Analysis:</strong>{' '}
										{investigation.types_of_analysis_conduct.audio_analysis}
									</li>
									<li>
										<strong>Personnel Identification:</strong>{' '}
										{
											investigation.types_of_analysis_conduct
												.personnel_identification
										}
									</li>
								</ul>
							</section>
							{/* Open Source Research */}
							<section className="space-y-6">
								<h2 className="text-xl font-semibold">Open-Source Research</h2>
								<ul className="list-disc list-inside ">
									{investigation.open_source_research.map((source) => (
										<li key={source.label}>
											<strong>{source.label}:</strong> {source.para}{' '}
											{source.link && (
												<a
													href={source.link}
													target="_blank"
													rel="noopener noreferrer"
													className="text-blue-600 underline"
												>
													Read More
												</a>
											)}
										</li>
									))}
								</ul>
							</section>
							{/* Timeline */}
							<section className="space-y-6">
								<h2 className="text-xl font-semibold">
									Timeline of the Incident
								</h2>

								{investigation.timeline_of_the_incident.analysis.map(
									(eventGroup) => (
										<div
											key={eventGroup.map((e) => e.label).join('-')}
											className="border-l-2 border-gray-300 pl-4 ml-2 space-y-4"
										>
											{eventGroup.map((event) => (
												<div key={event.label} className="mb-4 space-y-2">
													<p className="text-sm font-medium">{event.label}</p>
													<p className="text-base">{event.para}</p>

													{/* Render Images if available */}
													{event.imgs && event.imgs.length > 0 && (
														<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
															{event.imgs.map((imgUrl, idx) => (
																<Image
																	key={idx}
																	src={imgUrl}
																	alt={`Event image ${idx + 1}`}
																	width={0}
																	height={0}
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
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	);
}

export default InvestigationContainer;
