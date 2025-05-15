import React from 'react';
import { notFound } from 'next/navigation';
import { films_data } from '@/features/film/data'; // Adjust path if necessary

// Helper function to generate slug (must match the one used in the list component)
const generateSlug = (headline: string): string => {
	return headline
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
		.replace(/(^-|-$)+/g, ''); // Trim leading/trailing hyphens
};

// Define the expected structure of film data based on the JSON
interface Film {
	headline: string;
	feature_img?: string;
	case_details: {
		date_of_incident: string;
		incident_location: string;
		location_coordinates: string;
		preliminary_analysis: string;
		updated_on: string;
		release_date?: string; // Optional release date
	};
	context: string[];
	content: string;
}

interface PageProps {
	params: {
		slug: string;
	};
}

const FilmPage: React.FC<PageProps> = ({ params }) => {
	const { slug } = params;

	const film = films_data.find((f) => generateSlug(f.headline) === slug) as
		| Film
		| undefined; // Type assertion

	if (!film) {
		notFound();
	}

	// Function to adjust image paths relative to public directory
	const getImagePath = (relativePath: string | undefined) => {
		if (!relativePath) return '';
		// Assuming paths like './folder/image.png' should become '/folder/image.png'
		return relativePath.startsWith('./')
			? relativePath.substring(1)
			: relativePath;
	};

	return (
		<div className="w-full overflow-auto px-4 md:px-10 py-12 text-slate-800">
			<div className="max-w-[900px] mx-auto ">
				<article
					className="space-y-10"
					dangerouslySetInnerHTML={{ __html: film?.content }}
				></article>
			</div>
		</div>
	);
};

export default FilmPage;
