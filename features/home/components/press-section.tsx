import React from 'react';
import Link from 'next/link';

import { mediaItems } from '../data';

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
		<section className="px-10 py-16 bg-slate-100">
			<div className="container mx-auto">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold text-orange-600">MEDIA COVERAGE</h2>
					<Link
						href="/articles"
						className="text-orange-600 text-sm font-semibold"
					>
						READ MORE +
					</Link>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{mediaItems.slice(0, 3).map((item, index) => (
						<Link
							target="_blank"
							href={item.link}
							key={index}
							className="flex items-start gap-4 p-4 bg-white rounded-3xl shadow hover:shadow-md transition"
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
	);
}
