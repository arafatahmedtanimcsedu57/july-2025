import { team } from './data';

const TeamContainer = () => {
	return (
		<section className="px-10 py-16 bg-foreground  text-slate-700">
			<div className="container mx-auto">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold text-slate-600">TEAM</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
					{' '}
					{team.map((member) => {
						return (
							<div className="p-4 mb-16">
								<h3 className="text-2xl font-semibold">{member.name}</h3>
								<br />
								<h4 className="text-xl font-medium">{member.des}</h4>
								<br />
								<br />
								<br />
								<p>{member.bio}</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default TeamContainer;
