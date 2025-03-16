import React from 'react';

import { Card, CardContent } from '@/components/ui/card';

const CasualtyStats = ({ totals }: { totals: Record<string, number> }) => (
	<>
		<Card className="border">
			<CardContent className="p-4">
				<div className="text-2xl font-bold text-red-600">
					{totals['Death'] || 0}
				</div>
				<div className="text-xs">Deaths</div>
			</CardContent>
		</Card>

		<Card className="border bg-secondary">
			<CardContent className="p-4">
				<div className="text-2xl font-bold text-orange-600">
					{totals['Injury'] || 0}
				</div>
				<div className="text-xs">Injuries</div>
			</CardContent>
		</Card>
	</>
);

export const SingleCasualtyStats = React.memo(CasualtyStats);
