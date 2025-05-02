import { aboutData } from '../data';

function AboutSection() {
	return (
		<section id="about" className="py-16 text-primary">
			<div className="container mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-6">
					{aboutData.map((section, idx) => (
						<div
							key={idx}
							className={`lg:grid lg:grid-cols-3 ${
								idx / 2 !== 0 ? 'text-accent' : ''
							}`}
						>
							<h2 className="text-2xl leading-8 font-bold mb-8 text-muted-foreground">
								{section.heading}
							</h2>
							{idx === 0
								? // Use blockquote for the first section

								  section.paragraphs.map((para, pIdx) => (
										<>
											{' '}
											<p
												key={pIdx}
												className="col-span-2 mb-4 text-secondary-foreground leading-8" // Added underline style
											>
												{para}
											</p>
											<br />
											<br />
											<div className="rounded-full h-[2px] w-full animate-glow bg-[linear-gradient(90deg,#666666,#666666,#f0f0f0,#666666)] bg-[length:200%_100%]" />
										</>
								  ))
								: section.paragraphs.map((para, pIdx) => (
										<>
											<p
												key={pIdx}
												className="col-span-2 mb-4 text-secondary-foreground leading-8"
											>
												{para}
											</p>

											<br />
											<br />
											<div className="rounded-full h-[2px] w-full animate-glow bg-[linear-gradient(90deg,#666666,#666666,#f0f0f0,#666666)] bg-[length:200%_100%]" />
										</>
								  ))}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default AboutSection;
