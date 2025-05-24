import {
	getTotalEffectedPeople,
	getTotalDeadPeople,
	getTotalInjuredPeople,
} from '@/features/effected-people/lib/data-managers';
import { useFilteredData } from '@/features/effected-people/hooks/use-filtered-data';

const DonutChartsData = async () => {
	const data = useFilteredData();
	const total = await getTotalEffectedPeople(data);
	const deathCount = (await getTotalDeadPeople(data)) || 0;
	const injuryCount = (await getTotalInjuredPeople(data)) || 0;

	return { total, deathCount, injuryCount };
};

export default DonutChartsData;
