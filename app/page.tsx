import MapContainer from '@/components/map-container';
import IncidentSidebar from '@/components/incident-sidebar';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { CASUALTY_TYPES } from '@/constant/casualty-types';

export default function Home() {
	return (
		<main className="border-grid flex flex-1 flex-col">
			<Navbar />

			<div className="m-auto container border-dashed border-x h-[calc(100vh-61px)] flex">
				<div className="min-w-[50px] border-r border-dashed flex flex-col justify-center items-center h-full">
					{CASUALTY_TYPES.map((c_type) => (
						<Button variant="ghost" key={c_type.name}>
							<c_type.icon />
						</Button>
					))}
				</div>
				<IncidentSidebar />
				<MapContainer />
				<Sidebar />
			</div>
		</main>
	);
}
