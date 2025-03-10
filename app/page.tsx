import MapContainer from '@/components/map-container';
import IncidentSidebar from '@/components/incident-sidebar';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

export default function Home() {
	return (
		<main className="min-h-screen flex flex-col bg-muted-foreground/20">
			<Navbar />
			<div className="m-4 flex overflow-hidden bg-background rounded-2xl shadow-2xl border border-muted-foreground/20">
				<IncidentSidebar />
				<div className="hidden md:block">
					<MapContainer />
				</div>
				<Sidebar />
			</div>
		</main>
	);
}
