'use client';

import InvestigationContainer from '@/features/investigations/investigation-container';

export default function Investigations() {
	return (
		<>
			<div className="flex-1 h-full overflow-auto">
				<InvestigationContainer />
			</div>
		</>
	);
}
