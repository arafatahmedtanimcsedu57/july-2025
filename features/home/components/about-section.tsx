import { aboutData } from '../data';

function AboutSection() {
	return (
		<section id="about" className="py-16 text-primary">
			<div className="container mx-auto px-10">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-16">
					{aboutData.map((section, idx) => (
						<div key={idx} className={`${idx / 2 !== 0 ? 'text-accent' : ''}`}>
							<h2 className="text-2xl leading-8 font-bold mb-8 text-muted-foreground">
								{section.heading}
							</h2>
							{idx === 0 ? (
								// Use blockquote for the first section
								<blockquote className="relative  border-muted-foreground/30 pl-12 italic">
									<p className="absolute -left-4 -top-3 text-8xl font-serif text-muted-foreground/20 select-none">
										“
									</p>
									<div className="relative z-10">
										{' '}
										{/* Ensure content is above quote mark */}
										{section.paragraphs.map((para, pIdx) => (
											<p
												key={pIdx}
												className="mb-4 text-secondary-foreground leading-8 underline  decoration-muted-foreground/50 underline-offset-4" // Added underline style
											>
												{para}
											</p>
										))}
									</div>
								</blockquote>
							) : (
								section.paragraphs.map((para, pIdx) => (
									<>
										<p
											key={pIdx}
											className="mb-4 text-secondary-foreground leading-8"
										>
											{para}
										</p>

										<br />
										<br />
										<div className="rounded-full h-[2px] w-full animate-glow bg-[linear-gradient(90deg,#666666,#666666,#f0f0f0,#666666)] bg-[length:200%_100%]" />
									</>
								))
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default AboutSection;
