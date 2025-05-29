import { getGroupedByDateData } from '@/features/effected-people/lib/data-managers';
import { useFilteredData } from '@/features/effected-people/hooks/use-filtered-data';

const DateWiseBarChartData = () => {
	const data = useFilteredData();
	const groupedByDateData = getGroupedByDateData(data);
	const chartData = Object.values(groupedByDateData).sort(
		(a, b) => a.timestamp - b.timestamp,
	);
	return chartData;
};

export default DateWiseBarChartData;
