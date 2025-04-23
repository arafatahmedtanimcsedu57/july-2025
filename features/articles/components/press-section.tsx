import React from 'react';
import Link from 'next/link';

import { mediaItems } from '../data';
import { LinkIcon } from 'lucide-react';

function getFaviconUrl(url: string) {
	try {
		const domain = new URL(url).hostname;
		return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
	} catch {
		return '';
	}
}

export default function MediaCoverage() {
	return (
		<>
			<section className="px-10 py-16 bg-slate-100">
				<div className="container mx-auto">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-bold text-orange-600">
							MEDIA COVERAGE
						</h2>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{mediaItems.map((item, index) => (
							<Link
								target="_blank"
								href={item.link}
								key={index}
								className="flex items-start gap-4 p-4 bg-white rounded shadow hover:shadow-md transition"
							>
								<img
									src={getFaviconUrl(item.link)}
									alt="favicon"
									className="w-8 h-8 mt-1"
								/>
								<div>
									<li className="text-black font-semibold list-none">
										{item.title}
									</li>
									<p className="text-orange-600 text-sm font-semibold">
										{item.source}
									</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			<section className="px-10 py-16 bg-foreground  text-slate-700">
				<div className="container mx-auto mb-4">
					<h2 className="text-2xl font-bold text-primary">REPORT</h2>
				</div>

				<p>
					<strong>BLOODSHED IN BANGLADESH</strong> This report focuses in depth
					on just one day of the anti-government protests – 19th July 2024 – and
					paints a harrowing picture of families, feet literally soaked in
					blood, forced to search overflowing hospital morgues for their
					children shot by police. We were on the ground collecting evidence in
					Bangladesh days after the government fell and interviewed scores of
					families and eyewitnesses.
				</p>
				<br />
				<p>
					The report launched jointly with the ITJP says many of those killed
					were not even part of the protests, but bystanders and people who
					happened to live or work close to shooting that was completely
					indiscriminate. Estimates for the overall death toll during the weeks
					of protests range from 800 to 1500 and six months on there is still no
					final death toll. The report however confirmed that on that day at
					least 148 people were killed – three times more than initially
					reported. At the time, the government blocked all international phone
					lines and access to the internet and deployed the army to impose a
					curfew, making it difficult to collect the information. Among the 148
					casualties on 19th July 40 were 18 year or under. Shockingly 54 of the
					148 killed on 19 July were shot in the head or throat.
				</p>
				<Link
					href="https://techglobalinstitute.com/wp-content/uploads/2025/01/Bloodshed_In_Bangladesh_V6.pdf"
					target="_blank"
					className="inline-flex gap-2 items-center my-4 text-primary"
				>
					<LinkIcon width={16} />
					https://techglobalinstitute.com/wp-content/uploads/2025/01/Bloodshed_In_Bangladesh_V6.pdf
				</Link>
			</section>
		</>
	);
}
