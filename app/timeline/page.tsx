'use client';

import JulyUprisingTimeline from '@/features/timeline/july-uprising-timeline';

export default function Home() {
	return (
		<>
			<div className="flex-1 h-full overflow-auto">
				<JulyUprisingTimeline />
			</div>
		</>
	);
}
