import React from 'react';
import Link from 'next/link';

import { mediaItems } from '../data';
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
		<section className="px-10 py-16 bg-foreground">
			<div className="container mx-auto">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold text-destructive">
						Monsoon Protest Archive in News
					</h2>
					<Link
						href="/articles"
						className="text-destructive text-sm font-semibold"
					>
						Read More +
					</Link>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{mediaItems.slice(0, 3).map((item, index) => (
						<Link
							target="_blank"
							href={item.link}
							key={index}
							className="border flex items-start gap-4 px-4 py-6 bg-background rounded-sm  transition"
						>
							<Image
								src={getFaviconUrl(item.link)}
								alt="favicon"
								className="rounded-full border"
								width={40}
								height={40}
							/>
							<div>
								<p className="text-black font-semibold list-none line-clamp-2 mb-4">
									{item.title}
								</p>
								<p className="text-slate-700 text-sm">{item.source}</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
