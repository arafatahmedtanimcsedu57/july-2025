import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

const CasualtyStats = ({ totals }: { totals: Record<string, number> }) => (
	<Card className="border bg-secondary">
		<CardContent className="p-4">
			<div className="text-2xl font-bold text-purple-600">
				{totals['Multiple Casualties'] || 0}
			</div>
			<div className="text-xs">Multiple Casualties</div>
		</CardContent>
	</Card>
);

export const MultipleCasualtyStats = React.memo(CasualtyStats);
