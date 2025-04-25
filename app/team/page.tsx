'use client';

import TeamContainer from '@/features/team/team-container';

export default function Home() {
	return (
		<>
			<div className="flex-1 h-full overflow-auto">
				<TeamContainer />
			</div>
		</>
	);
}
