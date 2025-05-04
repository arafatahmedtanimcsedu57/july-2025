import { Calendar } from 'lucide-react';
import React from 'react';

const timelineData = [
	{
		date: 'June 5, Wednesday',
		description:
			'The High Court reversed the 2018 abolition of the quota system for public jobs, reinstating it. This decision sparked widespread protests among students demanding the scrapping of the quota system.',
	},
	{
		date: 'July 1, Monday',
		description:
			'Students announced protests calling for the scraping of the quota system after a 24-day break due to the Eid vacation. The protests gained momentum as more students joined the movement.',
	},
	{
		date: 'July 4, Thursday',
		description:
			"Students intensified their protests after the Appellate Division of the High Court delayed the hearing on the government's appeal to challenge the court’s verdict. Students organized larger demonstrations and blockades in response.",
	},
	{
		date: 'July 7, Sunday',
		description:
			'Students started “Bangla Blockade” as a part of the protest that took Dhaka city to a standstill for hours. This action marked a significant escalation in the protest movement.',
	},

	{
		date: 'July 14, Sunday',
		description:
			'Prime Minister Sheikh Hasina`s remarks labeling protesters as `grandchildren of Razakars` sparked outrage. A midnight demonstration erupted on the Dhaka University campus in response.',
	},
	{
		date: 'July 15, Monday',
		description:
			'Bangladesh Chhatra League and ruling party activists attacked quota reform protesters at Dhaka University. Violence spread to Dhaka Medical College Hospital, targeting injured demonstrators.',
	},
	{
		date: 'July 16, Tuesday',
		description:
			'Student protests and clashes with law enforcement in Dhaka, Chattogram, and Rangpur resulted in at least six deaths, including Abu Sayeed of Begum Rokeya University. Footage of Abu Sayeed`s death went viral, intensifying the protests.',
	},
	{
		date: 'July 17, Wednesday',
		description:
			'Sheikh Hasina announced that she would set up a judicial inquiry to hold perpetrators to account, and urged students to wait for the verdict of the Supreme Court. Students called for a “complete shutdown" across the country for the next day in response.',
	},
	{
		date: 'July 18, Thursday',
		description:
			'At least 29 died, the state TV center in Rampura was vandalized and burned, nationwide internet access was cut, and BGB personnel were deployed countrywide. Border Guard Bangladesh (BGB) personnel were deployed countrywide to control the escalating violence.',
	},
	{
		date: 'July 19, Friday',
		description:
			'The government declared a nationwide curfew at midnight and deployed the army to maintain order. The internet access shutdown continued. At least 148 people were killed across the country.',
	},
	{
		date: 'July 21, Sunday',
		description:
			'The Supreme Court reduced the quota from 56% to 7%, leaving spaces for general applicants. The students continued to protest with a nine-point demand, holding the government responsible for killing over 300 students and people.',
	},
	{
		date: 'July 23, Tuesday',
		description:
			'Protest organizers rejected the new quota allocation circular since many people have already been killed. Broadband internet services were partially restored with priority, followed by full restoration the next day on July 24th.',
	},
	{
		date: 'July 28, Sunday',
		description:
			'Six detained protest coordinators announced the withdrawal of protests from the DB office, but other coordinators alleged coercion and vowed to continue. This division among leaders added complexity to the movement.',
	},
	{
		date: 'August 1, Thursday',
		description:
			"Six detained coordinators were released from the DB's custody. Demands for justice and reform remained strong, undeterred by the release.",
	},
	{
		date: 'August 3, Saturday',
		description:
			'Central Shaheed Minar in Dhaka became the epicenter of a massive protest as tens of thousands of demonstrators gathered to demand the resignation of Prime Minister Sheikh Hasina`s government.',
	},
	{
		date: 'August 4, Sunday',
		description:
			'Nearly 100 killed in deadliest protest day. Protestors announced a long march to Dhaka from all parts of the country to demand the government`s resignation.',
	},
	{
		date: 'August 5, Monday',
		description:
			'Responding to a long march to Dhaka, thousands of protestors reached the capital and took control of Sheikh Hasina`s residence, leading to her resignation and flight from the country. Her resignation was followed by violent attacks on protestors by law enforcement.',
	},
];

const JulyUprisingTimeline: React.FC = () => {
	return (
		<div className="py-12 bg-background text-slate-500">
			<h1 className="text-4xl font-bold text-center mb-10">
				Timeline of the July Uprising
			</h1>
			{/* Timeline Container */}
			<div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Vertical Line */}
				<div className="absolute w-1 bg-slate-400 top-0 bottom-0 left-[31px] md:left-1/2 md:-ml-[3px] h-full"></div>

				{/* Timeline Items */}
				{timelineData.map((item, index) => {
					const isLeft = index % 2 === 0;
					return (
						<div
							key={index}
							className={`relative mb-8 md:flex  ${
								isLeft ? 'md:justify-start' : 'md:justify-end'
							}`}
						>
							{/* Container Box (handles positioning) */}
							<div className="relative  md:w-1/2 w-full py-2.5 pl-[70px] pr-[25px] md:px-10">
								{/* Circle Indicator */}
								<div
									className={`absolute w-[25px] h-[25px] bg-slate-400 border-4 border-slate-500 rounded-full top-[15px] z-10 left-[15px] ${
										isLeft ? 'md:left-auto md:right-[-13px]' : 'md:left-[-13px]'
									}`}
								></div>

								{/* Content Box */}
								<div
									className={`border relative shadow-xl p-5 md:p-6  rounded-md text-gray-100 ${
										isLeft
											? 'md:text-left bg-gray-300 text-slate-700'
											: 'md:text-right bg-foreground text-slate-700'
									}`}
								>
									{' '}
									{/* Kept left align for readability */}
									<span
										className={`flex gap-4 mb-4 ${
											isLeft ? '' : 'flex-row-reverse'
										}`}
									>
										<div
											className={`rounded-full w-10 h-10 p-2 ${
												isLeft ? 'bg-white' : 'bg-slate-300'
											}`}
										>
											<Calendar />
										</div>
										<h2 className="text-xl font-semibold mb-2">{item.date}</h2>
									</span>
									<p className="text-sm ">{item.description}</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default JulyUprisingTimeline;
