import React from 'react';
import { CpuIcon, InfoIcon } from 'lucide-react';

import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

export default function Header() {
	return (
		<div className="flex items-center gap-10">
			<div className="flex flex-col p-10 ">
				<h5 className="text-xl font-medium w-max">July Memorial </h5>
				<p className="text-xs font-light w-max">Remembering July 2024</p>
			</div>

			<Popover modal={false} defaultOpen={true}>
				<PopoverTrigger asChild className="shadow-xl z-[100]">
					<Button
						variant="secondary"
						size="sm"
						className="border border-primary text-xs flex items-center rounded-full p-0 h-7 w-7"
					>
						<InfoIcon className="text-primary" />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					side="right"
					className="text-slate-500 rounded-3xl w-80 h-[300px] shadow-xl scrollbar-hide overflow-auto p-6 mt-12"
				>
					<h1 className="text-sm mb-4 font-semibold">
						Methodology for Collecting Casualty Data of the July Revolution of
						Bangladesh
					</h1>

					<section className="text-xs flex flex-col gap-4">
						<p>
							To ensure accuracy and comprehensiveness, a multi-source data
							collection approach was adopted for documenting casualties related
							to the July Revolution of Bangladesh. The following methods were
							employed:
						</p>

						<ol className="flex flex-col gap-2">
							<li>
								<strong>Archival Research</strong>
								<br />
								Historical documents, newspapers, and government records from
								the period surrounding the July Revolution were reviewed.
								Special attention was given to official press releases, police
								records, hospital reports, and investigative committee findings.
							</li>

							<li>
								<strong>Media Analysis</strong>
								<br />
								Both national and international media outlets were analyzed.
								Reports from newspapers such as <em>The Daily Ittefaq</em>,{' '}
								<em>The Daily Star</em>, and <em>Prothom Alo</em>, along with
								broadcasts from international agencies (e.g., BBC, Reuters),
								were examined for casualty figures and witness testimonies.
							</li>

							<li>
								<strong>Eyewitness Interviews and Oral Histories</strong>
								<br />
								Survivors, relatives of victims, and eyewitnesses were
								interviewed where possible. These first-hand accounts helped
								triangulate data and fill gaps left by official records.
							</li>

							<li>
								<strong>NGO and Human Rights Reports</strong>
								<br />
								Reports and databases from human rights organizations, both
								local (e.g., Ain o Salish Kendra) and international (e.g.,
								Amnesty International, Human Rights Watch), were reviewed for
								independently documented casualties.
							</li>

							<li>
								<strong>Academic and Historical Literature</strong>
								<br />
								Existing research papers, books, and theses written by
								historians and political analysts were also consulted to support
								the data set and provide contextual interpretation.
							</li>

							<li>
								<strong>Cross-verification and Data Cleaning</strong>
								<br />
								All data sources were cross-verified to eliminate duplicates and
								inconsistencies. Where conflicting reports were found, data was
								categorized as either “confirmed” or “unverified” based on the
								credibility of the source and corroborative evidence.
							</li>

							<li>
								<strong>Ethical Considerations</strong>
								<br />
								In handling sensitive personal information, all ethical
								guidelines were strictly followed. Informed consent was obtained
								from interviewees, and identities were anonymized upon request
								to protect privacy.
							</li>
						</ol>
					</section>
				</PopoverContent>
			</Popover>
		</div>
	);
}
