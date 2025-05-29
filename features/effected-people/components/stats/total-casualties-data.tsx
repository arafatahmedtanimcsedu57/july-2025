import { getTotalEffectedPeople } from '@/features/effected-people/lib/data-managers';
import { useFilteredData } from '@/features/effected-people/hooks/use-filtered-data';

const TotalCasualtiesData = async () => {
	const data = useFilteredData();
	const total = await getTotalEffectedPeople(data);
	return total;
};

export default TotalCasualtiesData;
