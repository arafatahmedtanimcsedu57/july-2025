import React from 'react';
import { ChartNoAxesGantt } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

const CasualtyStats = ({ totals }: { totals: Record<string, number> }) => (
	<div className="max-w-md rounded-lg p-px bg-gradient-to-b from-blue-300 to-pink-300 dark:from-blue-800 dark:to-purple-800 ">
		<Card className="">
			<CardContent className="p-4">
				<div className="flex flex-col gap-2">
					<div className="flex text-xs text-muted-foreground items-center gap-2 ">
						<ChartNoAxesGantt />

						<div className="flex flex-col">
							Total Casualties
							<div className="font-bold">
								{(totals['Death'] || 0) + (totals['Injury'] || 0)}
							</div>
						</div>
					</div>

					<div className="flex gap-2 items-baseline justify-between">
						<div>
							<div className="text-2xl font-bold text-red-600">
								{totals['Death'] || 0}
							</div>
							<div className="text-xs">Deaths</div>
						</div>

						<div>
							<div className="text-base font-bold text-orange-600">
								{totals['Injury'] || 0}
							</div>
							<div className="text-xs">Injuries</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	</div>
);

export const SingleCasualtyStats = React.memo(CasualtyStats);
