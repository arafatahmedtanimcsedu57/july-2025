import { importantData, archiveData } from '../data';

function ImportantSection() {
	return (
		<section className="text-primary">
			<div className="container mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-6">
					{importantData.map((section, idx) => (
						<div
							key={idx}
							className={`lg:grid lg:grid-cols-3 ${
								idx % 2 === 0 ? 'text-accent' : ''
							}`}
						>
							<h2
								className={`text-2xl leading-8 font-bold mb-8 text-destructive`}
							>
								{section.heading}
							</h2>
							{section.type === 'paragraphs' &&
								section.content.map((para, pIdx) => (
									<>
										{' '}
										<p
											key={pIdx}
											className="col-span-2 mb-4 text-secondary-foreground leading-8"
										>
											{para}
										</p>
										<br />
										<br />
										<div className="rounded-full h-[2px] w-full animate-glow bg-[linear-gradient(90deg,#666666,#666666,#f0f0f0,#666666)] bg-[length:200%_100%]"></div>
									</>
								))}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default ImportantSection;
