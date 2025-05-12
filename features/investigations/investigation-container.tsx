import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { File, Link2Icon } from 'lucide-react';

import { investigations_data } from './data';

function InvestigationContainer() {
	return (
		<>
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
