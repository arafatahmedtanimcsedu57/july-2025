const PERSON_ALL_INFO_TYPE = [
	'name',
	'age',
	'occupation',
	'type',
	'location',
	'description',
];

export const hasIncompleteData = (person: any): boolean => {
	return PERSON_ALL_INFO_TYPE.some((infoType) => !person[infoType]);
};

export const calculateCompleteness = (person: any): number => {
	const completedFields = PERSON_ALL_INFO_TYPE.filter(
		(infoType) => !!person[infoType],
	);
	return Math.round(
		(completedFields.length / PERSON_ALL_INFO_TYPE.length) * 100,
	);
};
