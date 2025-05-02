import { team } from './data';

const TeamContainer = () => {
	return (
		<section className="px-10 py-16 bg-foreground  text-slate-700">
			<div className="container mx-auto flex flex-col gap-16">
				<div className="grid md:grid-cols-4 gap-6 justify-between">
					<h2 className="text-2xl font-bold text-slate-600">About Us</h2>
					<p className="col-span-3">
						Our team consists of experienced researchers and investigators with
						background in international human rights law, open-source
						investigations, journalism, and media research. In addition to team
						members listed below, we work with a wide network of specialists and
						experts in criminal law, archiving, forensics, UN procedures, and
						other related fields.
					</p>
				</div>

				<div className="grid md:grid-cols-4 gap-6 justify-between">
					<h2 className="text-2xl font-bold text-slate-600">Our Goals</h2>
					<ul className="col-span-3 flex flex-col gap-4">
						<li>
							<strong>Document and Verify Abuses:</strong> Systematically
							collect and authenticate open-source and eyewitness evidence of
							human rights violations by state-sanctioned actors, including law
							enforcement.
						</li>
						<li>
							<strong>Ensure Secure Preservation:</strong> Create a protected,
							accessible digital archive to store verified evidence,
							safeguarding it from loss, tampering, or erasure.
						</li>
						<li>
							<strong>Advance Justice and Accountability:</strong> Share
							credible findings with independent judicial bodies to support
							legal action and redress for victims in accordance with
							international human rights and criminal law, and safeguards
							outlined under the{' '}
							<a href="https://www.ohchr.org/en/publications/policy-and-methodological-publications/berkeley-protocol-digital-open-source">
								Berkeley Protocol
							</a>
							.
						</li>
						<li>
							<strong>Support Research and Advocacy:</strong> Provide vetted
							materials to independent researchers, journalists, and human
							rights advocates to inform public discourse and drive policy
							change.
						</li>
						<li>
							<strong>Strengthen Documentation Capacity:</strong> Train human
							rights defenders in open-source investigation and digital
							archiving to expand accountability efforts.
						</li>
						<li>
							<strong>Preserve Public Memory:</strong> Maintain an accurate
							record of the July Uprising in Bangladesh to honor victims and
							resist historical revisionism.
						</li>
					</ul>
				</div>

				<div className="flex flex-col justify-between">
					<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-16 ">
						<h2 className="text-2xl font-bold text-slate-600">Project Team</h2>

						<div className="md:col-span-2 lg:col-span-3 grid  md:grid-cols-2 gap-16">
							{team.map((member) => {
								return (
									<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
										<div>
											<h3 className="text-2xl font-semibold">{member.name}</h3>
											<br />
											<h4 className="text-xl font-medium">{member.des}</h4>
											<br />
										</div>

										<div className="">
											<p>{member.bio}</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TeamContainer;
