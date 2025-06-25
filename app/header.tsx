import React from 'react';

export default function Header() {
	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-col">
				<h5 className="text-xs font-bold w-20 sm:w-[100px]">
					{' '}
					MONSOON PROTESTS ARCHIVE
				</h5>
				{/* <p className="text-xs font-light w-max">
					Documenting the July Uprising in Bangladesh
				</p> */}
			</div>
		</div>
	);
}
