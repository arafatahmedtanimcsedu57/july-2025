export const methodology = {
	TGI_Digital_Forensics_Investigation_Manual: {
		Data_Collection: {
			Sources: [
				'Social media platforms',
				'Websites',
				'Publicly accessible environments',
				'External organizations',
				'Human rights defenders',
				'Journalists',
				'Testimony accounts',
			],
			Methods: [
				'Advanced techniques and tools to capture content in original state',
				'Preserve metadata and contextual details',
			],
		},
		Chain_of_Custody: {
			Importance: 'Ensure evidence admissibility and integrity',
			Steps: {
				Identification:
					'Document when, where, and by whom evidence was collected; assign UID',
				Documentation:
					'Record sources, collection details, use consent forms, allow withdrawal of consent',
				Storage:
					'Secure in tamper-proof environments like NextCloud; encrypt evidence',
				Transfer: 'Document signatures, timestamps during evidence transfer',
			},
		},
		Cataloguing_and_Preservation: {
			UID_Structure: {
				Type_Code: {
					Examples: {
						Video: '01',
						Document: '06',
						Document_Subtypes: {
							Personal: 'P',
							Medical: 'M',
							Legal: 'L',
						},
					},
				},
				Chronology_Code: 'Sequential order',
				Suffix_Code: 'Further classification',
			},
			Master_Catalog_Fields: [
				'Case ID',
				'Subject',
				'Evidence Type',
				'File Source',
				'Original Device Details',
				'Date Created',
				'Time Created',
				'Video/Audio Duration',
				'Location of the Event',
				'Metadata',
			],
		},
		Verification_and_Analysis: {
			Methods: {
				Frame_by_Frame_Analysis: {
					Focus: [
						'Visible details',
						'Security force identification',
						'Uniform styles, colors, emblems',
						'Vehicles, weapons, accessories',
						'Significant movements or actions',
					],
					Cross_Referencing: 'With related documents, media footage',
				},
				Geolocation: {
					Cues: [
						'Landmarks',
						'Language',
						'Clothing',
						'Posters and banners',
						'Structures',
						'Environmental features',
					],
					Tools: ['Google Maps', 'Google Earth', 'Reverse Image Search'],
				},
				Chronolocation: {
					Focus: [
						'Shadow analysis',
						'Timestamps from posts',
						'Environmental factors',
					],
					Tools: ['SunCalc'],
				},
				Body_Detection_and_Crowd_Estimation: {
					Enhancements: ['Zoom', 'Brightness/contrast adjustment'],
					Techniques: [
						'Frame-by-frame verification',
						'Use of MapChecking',
						'Direct counting for smaller gatherings',
					],
				},
			},
		},
		Review: {
			Process: 'Thorough review for accuracy and reliability',
			Consultations: [
				'Weapon specialists',
				'Crime analysts',
				'Lawyers',
				'Journalists',
				'Open-source investigators',
				'Human rights/policy organizations',
			],
		},
		Event_Mapping_and_Documentation: {
			Purpose:
				'Track incidents during mass uprisings or socio-political movements',
			Key_Elements: [
				'Date and location of incidents',
				'Individuals or groups involved',
				'Security forces present',
				'Victim identities and occupations',
			],
			Methods: [
				'Structured data organization',
				'Cross-referencing visual evidence with media reports',
			],
		},
		Distribution_and_Safeguarding_of_Evidence: {
			Protocols: [
				'Restricted access to source files',
				'Data sharing under formal contracts',
				'Scope, limitations, and security measures outlined',
			],
		},
		Ethical_Considerations: {
			Principles: [
				'Integrity',
				'Confidentiality',
				'Respect for individuals',
				'Avoid harm',
				'Maintain impartiality',
			],
		},
		Challenges: {
			Determining_Location: {
				Issues: ['Limited map coverage', 'Ambiguous environments'],
				Methods: [
					'Visual cues',
					'Environmental markers',
					'Crowdsourced information',
				],
			},
			Counting_Human_Bodies: {
				Issues: [
					'Chaotic scenes',
					'Low-quality visuals',
					'Overlapping individuals',
				],
				Methods: [
					'Frame-by-frame analysis',
					'Advanced crowd estimation tools',
					'Eyewitness accounts',
				],
			},
			Tracing_Time_and_Metadata_Loss: {
				Issues: [
					'Metadata stripped from social media uploads',
					'Reliance on indirect validation methods',
					'Low-quality media (pixelation, compression artifacts)',
				],
				Methods: [
					'Timestamps from posts',
					'Shadow analysis',
					'Cross-referencing external sources',
				],
			},
			Handling_Violent_Content: {
				Issues: ['Emotional fatigue', 'Psychological toll on analysts'],
				Methods: ['Repetitive, detailed analysis', 'Patience and resilience'],
			},
		},
	},
};
