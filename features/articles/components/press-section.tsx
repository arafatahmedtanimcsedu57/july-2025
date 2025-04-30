import React from 'react';
import Link from 'next/link';

import { mediaItems } from '../data';
import { File, Link2Icon, LinkIcon } from 'lucide-react';
import Image from 'next/image';

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
			<section className="px-10 py-16 bg-foreground  text-slate-700">
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

			<section className="px-10 py-16 bg-slate-100">
				<div className="container mx-auto">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-bold text-orange-600">
							Monsoon Protest Archive in News{' '}
						</h2>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{mediaItems.map((item, index) => (
							<Link
								target="_blank"
								href={item.link}
								key={index}
								className="flex items-start gap-4 px-4 py-6 bg-white rounded-2xl shadow hover:shadow-md transition"
							>
								<Image
									src={getFaviconUrl(item.link)}
									alt="favicon"
									className="rounded-full border"
									width={40}
									height={40}
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
		</>
	);
}
