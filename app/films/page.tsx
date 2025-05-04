'use client';

import FilmContainer from '@/features/film/film-container';

export default function Home() {
	return (
		<>
			<div className="flex-1 h-full overflow-auto">
				<FilmContainer />{' '}
			</div>
		</>
	);
}
