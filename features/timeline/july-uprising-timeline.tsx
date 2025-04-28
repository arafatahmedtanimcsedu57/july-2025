import React from 'react';

const timelineData = [
	{
		date: 'June 5, Wednesday',
		description:
			'High Court reinstated the quota system: The High Court reversed the 2018 abolition of the quota system for public jobs and reinstated it.',
	},
	{
		date: 'July 1, Monday',
		description:
			'Students called for the scraping of quota: Students announced protests calling for the scraping of the quota system after a 24-day break due to the Eid vacation.',
	},
	{
		date: 'July 4, Thursday',
		description:
			"Appellate Division declined to hear the government's petition: Students intensified their protests after the Appellate Division of the High Court delayed the hearing on the government's appeal to challenge the court’s verdict.",
	},
	{
		date: 'July 7, Sunday',
		description:
			'Bangla Blockade: Students started “Bangla Blockade” as a part of the protest that took Dhaka city to a standstill for hours.',
	},
	{
		date: 'July 10, Wednesday',
		description:
			"Status quo on the court’s verdict: The Appellate Division ordered a four-week status quo on the court's verdict.",
	},
	{
		date: 'July 14, Sunday',
		description:
			'Sheikh Hasina’s controversial “Razakar” statement: Students held a midnight demonstration at the Dhaka University campus following Sheikh Hasina’s controversial remarks labeling protesting students as the grandchildren of “Razakars” which instigated the protest further.',
	},
	{
		date: 'July 16, Tuesday',
		description:
			'Death of Abu Sayeed: Student protests intensified across the country. At least six people were killed during the clash between protesting students and law enforcers in Dhaka, Chattogram, and Rangpur. Abu Sayeed, a student of Begum Rokeya University, was killed on that day, and footage of his death went viral on social media, intensifying the protest.',
	},
	{
		date: 'July 17, Wednesday',
		description:
			'Protestors announced a “complete shutdown” across the country: Sheikh Hasina addressed the nation, announced that she would set up a judicial inquiry to hold perpetrators to account, and urged students to wait for the verdict of the Supreme Court, assuring the court’s decision would not disappoint them. Students called for a “complete shutdown" of transportation across the country for the next day in response.',
	},
	{
		date: 'July 18, Thursday',
		description:
			'Internet shutdown and deployment of BGB: At least 29 people were killed. State-run Bangladesh Television center in Rampura was vandalized and set on fire. Internet access was cut off nationwide. Border Guard Bangladesh (BGB) personnel were deployed across the country.',
	},
	{
		date: 'July 19, Friday',
		description:
			'The government declared a curfew and deployed the army: The government declared a nationwide curfew at midnight and deployed the army to maintain order. A mob stormed into the central jail in Narsingdi and freed nearly 900 prisoners, looted some 80 firearms, and 1,000 rounds of ammunition. The nationwide internet access shutdown continued. At least 148 people were killed across the country.',
	},
	{
		date: 'July 21, Sunday',
		description:
			'Quota system reformed: The Supreme Court reduced the quota from 56% to 7%, leaving spaces for general applicants. The students continued to protest with a nine-point demand, holding the government responsible for killing over 300 students and people.',
	},
	{
		date: 'July 23, Tuesday',
		description:
			'The coordinators rejected the quota allocation. The government issued a circular formalizing the new quota allocation in line with the Supreme Court verdict. The organizers of the protest rejected the new quota allocation since many people have already been killed. Broadband internet services were partially restored with priority, followed by full restoration the next day on July 24, Wednesday.',
	},
	{
		date: 'July 28, Sunday',
		description:
			'Six coordinators were detained: Six detained coordinators of the protest issued a statement from the DB office and announced the withdrawal of the protests. Other coordinators claimed that the DB forced the six detained coordinators to make such a statement, and they vowed to continue with the protest.',
	},
	{
		date: 'August 1, Thursday',
		description:
			"Six coordinators were released: Six detained coordinators were released from the DB's custody. The government banned its opposition group Jamaat-e-Islami party, and its student wing, Islami Chhatra Shibir.",
	},
	{
		date: 'August 3, Saturday',
		description:
			'Non-cooperation movement: Sheikh Hasina offered a talk with the protestors to negotiate. The coordinators rejected her call, and the nine-point demand turned into a one-point demand: the resignation of Sheikh Hasina and her cabinet. The protestors called for a non-cooperation movement from the very next day, on August 4, Sunday.',
	},
	{
		date: 'August 4, Sunday',
		description:
			'“March to Dhaka” announced: The day had become the deadliest of protests, with around 100 people killed. The protestors announced a long march to Dhaka from all parts of the country to force the government to resign.',
	},
	{
		date: 'August 5, Monday',
		description:
			'Hasina resigned and fled: Thousands of protestors, responding to the long march to Dhaka call, began heading towards the capital, and by the afternoon, the protesters took control of Sheikh Hasina’s residence. She resigned and fled the country. Her resignation was followed by violent attacks on protestors in various places by the law enforcers.',
	},
];

const JulyUprisingTimeline: React.FC = () => {
	return (
		<div className="py-12 bg-foreground text-slate-500">
			<h1 className="text-4xl font-bold text-center mb-10">
				Timeline of the July Uprising
			</h1>
			{/* Timeline Container */}
			<div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Vertical Line */}
				<div className="absolute w-1 bg-accent top-0 bottom-0 left-[31px] md:left-1/2 md:-ml-[3px] h-full"></div>

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
									className={`absolute w-[25px] h-[25px] bg-blue-500 border-2 border-accent rounded-full top-[15px] z-10 left-[15px] ${
										isLeft ? 'md:left-auto md:right-[-13px]' : 'md:left-[-13px]'
									}`}
								></div>

								{/* Content Box */}
								<div
									className={`relative shadow-2xl p-5 md:p-6 bg-gray-800 rounded-md text-gray-100 ${
										isLeft ? 'md:text-left' : 'md:text-left'
									}`}
								>
									{' '}
									{/* Kept left align for readability */}
									<h2 className="text-xl font-semibold mb-2">{item.date}</h2>
									<p className="text-sm text-gray-300">{item.description}</p>
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
