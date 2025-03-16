import React, { memo } from 'react';

const NewsCoverage = () => {
	return (
		<div className="p-4">
			<h3 className="text-sm font-medium mb-4">Major News Coverage</h3>
			<ul className="bg-muted/50 p-4 rounded-md flex flex-col gap-2">
				<li>
					<a
						href="https://www.bbc.com/news"
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-blue-600 dark:text-blue-400 hover:underline "
					>
						BBC: Protests begin at Bangladesh universities{' '}
					</a>
				</li>
				<li>
					<a
						href="https://www.thedailystar.net"
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-blue-600 dark:text-blue-400 hover:underline "
					>
						Daily Star: Students begin protests in Dhaka{' '}
					</a>
				</li>

				<li>
					<a
						href="https://www.aljazeera.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-blue-600 dark:text-blue-400 hover:underline "
					>
						Al Jazeera: First death reported in Bangladesh protests{' '}
					</a>
				</li>
				<li>
					<a
						href="https://www.reuters.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-blue-600 dark:text-blue-400 hover:underline "
					>
						Reuters: Protests spread to Bangladesh's port city{' '}
					</a>
				</li>

				<li>
					<a
						href="https://www.bbc.com/news"
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-blue-600 dark:text-blue-400 hover:underline "
					>
						BBC: Violence erupts in Bangladesh protests{' '}
					</a>
				</li>
				<li>
					<a
						href="https://www.aljazeera.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-blue-600 dark:text-blue-400 hover:underline "
					>
						Al Jazeera: Deadly clashes in Bangladesh{' '}
					</a>
				</li>

				<li>
					<a
						href="https://www.cnn.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-blue-600 dark:text-blue-400 hover:underline "
					>
						CNN: Protests continue for second day{' '}
					</a>
				</li>
				<li>
					<a
						href="https://www.reuters.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-blue-600 dark:text-blue-400 hover:underline "
					>
						Reuters: Vehicle drives through protesters in Dhaka{' '}
					</a>
				</li>

				<li>
					<a
						href="https://www.theguardian.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-blue-600 dark:text-blue-400 hover:underline "
					>
						The Guardian: University campus stormed by security forces{' '}
					</a>
				</li>
				<li>
					<a
						href="https://www.nytimes.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-blue-600 dark:text-blue-400 hover:underline "
					>
						New York Times: Port workers join Bangladesh protests{' '}
					</a>
				</li>
			</ul>
		</div>
	);
};

export const MajorNewsCoverage = memo(NewsCoverage);
