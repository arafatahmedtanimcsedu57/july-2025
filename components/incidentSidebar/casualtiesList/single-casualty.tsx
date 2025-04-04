import React from 'react';

import type { CasualtyPerson } from '@/types/data';
import { CASUALTY_ITEMS_COLOR_ELEMENTS } from '../../../constant/casualty-types';

const Casualty = ({ person }: { person: CasualtyPerson }) => {
	return (
		<>
			<div className="flex gap-4 items-center justify-between">
				<div className="flex items-center gap-2 font-medium text-xs">
					{person.name || 'Unknown'}
				</div>

				{person.type && CASUALTY_ITEMS_COLOR_ELEMENTS[person.type]
					? CASUALTY_ITEMS_COLOR_ELEMENTS[person.type]()
					: null}
			</div>

			<div className="text-xs text-muted-foreground flex flex-col">
				{person.occupation ? <span>{person.occupation}</span> : <></>}
				{person.age ? <span>{person.age} years</span> : <></>}
			</div>
		</>
	);
};

export const SingleCasualty = React.memo(Casualty);
