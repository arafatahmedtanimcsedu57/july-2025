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
			<section className="px-10 py-16 min-h-[100vh] bg-slate-100">
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
