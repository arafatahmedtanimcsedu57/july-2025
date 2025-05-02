import { importantData, archiveData } from '../data';

function ImportantSection() {
	return (
		<section className="px-16 mb-16 dark:text-white text-primary">
			<div className="container mx-auto px-10">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-16">
					{importantData.map((section, idx) => (
						<div key={idx} className={`${idx % 2 === 0 ? 'text-accent' : ''}`}>
							<div>
								<h2
									className={`text-2xl leading-8 font-bold mb-8  ${
										idx === importantData.length - 1
											? 'text-destructive'
											: 'text-muted-foreground'
									}`}
								>
									{section.heading}
								</h2>
								{section.type === 'paragraphs' &&
									section.content.map((para, pIdx) => (
										<p
											key={pIdx}
											className="mb-4 text-secondary-foreground leading-8"
										>
											{para}
										</p>
									))}
								{section.type === 'list' && (
									<ul className="list-disc pl-5 space-y-4">
										{section.content.map((item, lIdx) => (
											<li key={lIdx}>
												<p className="mb-4 text-secondary-foreground leading-8">
													<strong>{item.label} : </strong>
													{item.paragraph}
												</p>
											</li>
										))}
									</ul>
								)}
							</div>

							{idx % 2 === 0 ? (
								<>
									{' '}
									<br />
									<br />
									<div className="rounded-full h-[2px] w-full animate-glow bg-[linear-gradient(90deg,#666666,#666666,#f0f0f0,#666666)] bg-[length:200%_100%]"></div>
								</>
							) : (
								<></>
							)}
							{idx === 0 ? (
								<>
									<div className="mt-16 text-primary">
										<h2 className="text-2xl leading-8 font-bold mb-8 text-muted-foreground">
											{archiveData.title}
										</h2>

										<div>
											{archiveData.leftSection.map((item, idx) => (
												<p
													key={idx}
													className="mb-4 text-secondary-foreground leading-8"
												>
													{item.content}
												</p>
											))}
										</div>
									</div>
								</>
							) : (
								<></>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default ImportantSection;
