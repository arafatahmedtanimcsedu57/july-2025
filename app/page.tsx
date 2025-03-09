import MapContainer from '@/components/map-container';
import IncidentSidebar from '@/components/incident-sidebar';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

export default function Home() {
	return (
		<main className="min-h-screen flex flex-col">
			<Navbar />
			<div className="flex flex-1 overflow-hidden relative">
				<IncidentSidebar />
				<div className="flex-1 relative md:ml-96">
					<MapContainer />
				</div>
				<Sidebar />
			</div>
		</main>
	);
}
