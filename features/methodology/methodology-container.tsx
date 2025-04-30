import React from 'react';

function MethodologyContainer() {
	return (
		<div className="px-10 py-16 container mx-auto  text-slate-800">
			<div className="max-w-[700px] mx-auto space-y-12">
				<h1 className="text-3xl font-bold">
					TGI’s Digital Forensics Investigation Methodology
				</h1>

				<section>
					<h2 className="text-2xl font-semibold">Data Collection</h2>
					<p>
						The collection process forms the foundation of digital forensics.
						Evidence is gathered from open sources such as social media
						platforms, websites, and publicly accessible environments, as well
						as from external organizations, human rights defenders, journalists,
						and testimony accounts. Analysts meticulously identify and retrieve
						data while ensuring no compromise to its integrity during
						acquisition. Advanced techniques and tools are often employed to
						capture content in its original state, preserving critical metadata
						and contextual details essential for analysis.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold">
						Maintaining Chain of Custody
					</h2>
					<p>
						A structured approach to cataloging is vital to maintain a clear
						chain of custody. The chain of custody refers to the documented and
						unbroken process by which digital evidence is handled throughout its
						lifecycle, from collection to presentation in legal or investigative
						contexts. Maintaining an unbroken chain of custody is critical to
						ensure the evidence remains admissible in court and retains its
						integrity.
					</p>

					<p>Key steps in managing the chain of custody include:</p>
					<ul className="list-disc list-inside ml-4">
						<li>
							<strong>Identification:</strong> Documenting when, where, and by
							whom the evidence was collected. Every piece of evidence is
							labeled with a unique identifier (UID) for traceability.
						</li>
						<li>
							<strong>Documentation:</strong> Maintaining records of the
							sources, from whom and when, and how it was collected. A
							standardized consent form is used during the data collection phase
							to ensure that digital evidence is obtained lawfully, ethically,
							and transparently, which reinforces the integrity of the forensic
							investigation. Digital evidence submitters are informed that they
							can withdraw consent at any time. We also document the description
							of the evidence and other sensitive information.
						</li>
						<li>
							<strong>Storage:</strong> Securing evidence in tamper-proof
							environments like “NextCloud” with restricted access. Digital
							evidence is often stored in encrypted formats to protect its
							integrity.
						</li>
						<li>
							<strong>Transfer:</strong> Ensuring that any transfer of evidence
							is accompanied by proper documentation, including signatures and
							timestamps, to confirm its authenticity.
						</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold">
						Cataloguing and Preservation
					</h2>
					<p>
						Each piece of evidence is assigned a unique identifier (UID) to
						maintain organizational clarity and traceability. Additionally, a
						Master Catalog is maintained to centralize and organize collected
						evidence. This catalog includes detailed information such as Case
						ID, Subject, Evidence Type, File Source, Original Device Details,
						Date Created, Time Created, Video/Audio Duration, Location of the
						Event, and Metadata. Maintaining this comprehensive catalog ensures
						that every piece of evidence is accessible, properly categorized,
						and traceable throughout the investigation process.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold">Verification and Analysis</h2>
					<p>
						The verification and analysis process begins after the initial steps
						of collecting and preserving digital evidence. At Tech Global
						Institute (TGI), meticulously examine the content for additional
						clues to uncover what is happening, why it is happening, and who is
						involved. Using open-source techniques, analysts strive to verify as
						many details as possible, ensuring accuracy and reliability.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold">Analysis</h2>

					<h2 className="text-xl font-semibold">
						Frame-by-Frame (FBF) Analysis
					</h2>
					<p>
						The verification and analysis process begins with frame-by-frame
						(FBF) analysis of video or image evidence, which focuses solely on
						documenting what is observed. This method meticulously records
						hidden details, ensuring a high level of certainty regarding the
						specific individuals or groups, number of individuals, types of
						security forces, including detailed methodologies to identify law
						enforcement agencies and their branches. In addition to recording
						visible elements, analysts also mark specific and important
						movements or actions, such as crowd dynamics, hand gestures, or the
						use of equipment. Analysts describe significant events captured
						within particular frames, often corroborating these observations
						with related documents or additional footage from media or social
						media platforms.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-semibold">Geolocation</h2>
					<p>
						Geolocation is a core component of digital forensic verification.
						Analysts use visual cues in evidence, such as landmarks,
						environmental markers, and distinct geographic features, to
						determine an incident's location. When we have no clue about where
						the pictures or videos were taken, we zoom in and examine everything
						visible in the picture or video. If a specific language, people's
						clothing, posters, banners, billboards, roads, special structures,
						building roofs, lights, sculptures, weather, natural places (water
						bodies, landforms, plants, etc.) or any signs that identify the
						place in the picture/video, then based on that, we do search on
						Google with relevant keywords search and Reverse Image Search to
						look for matches where the exact location has been posted elsewhere.
						From the search results, we typically focus on articles, blog posts,
						or social media posts that mention the location. We thoroughly check
						the descriptions, captions, filenames, and even comments around the
						image.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold">Chronolocation</h2>
					<p>
						Chronolocation focuses on determining the timing of an event. When
						metadata is unavailable or stripped, analysts use alternative
						methods such as shadow analysis, timestamps on related posts, or
						environmental changes within the footage to approximate the time.
						While advanced tools such as SunCalc are not always in use, they are
						applied selectively based on the investigative purpose. These tools
						help approximate or determine the timing of an event by analyzing
						environmental factors such as sunlight or shadows, particularly when
						metadata is unavailable or corrupted. The specific requirements and
						context of the investigation guide the decision to use these tools.
						Synchronizing this with external data, such as news reports or other
						corroborative footage, ensures greater precision.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold">Chronolocation</h2>
					<p>
						Chronolocation focuses on determining the timing of an event. When
						metadata is unavailable or stripped, analysts use alternative
						methods such as shadow analysis, timestamps on related posts, or
						environmental changes within the footage to approximate the time.
						Shadow analysis helps approximate or determine the timing of an
						event by analyzing environmental factors such as sunlight or
						shadows, particularly when metadata is unavailable or corrupted. The
						specific requirements and context of the investigation guide the
						decision to use these tools. Synchronizing this with external data,
						such as news reports or other corroborative footage, ensures greater
						precision.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold">
						Establishing Body Detection and Crowd Estimation
					</h2>
					<p>
						Before counting individual dead or injured bodies and the crowd, we
						verify the authenticity of images and videos. Using enhancement
						tools like zoom and brightness/contrast adjustment to clarify
						obscured details, we review entire videos frame-by-frame to detect
						individuals. Though physical condition cannot be clearly determined
						by watching videos and still images, we emphasize visible movement,
						wounds, active bleeding, distressed movement, or incapacitation to
						distinguish the injured and dead. To estimate the number of
						individuals present in a scene, we use several crowd counting tools.
						In smaller gatherings, we count individuals directly.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold">Review</h2>
					<p>
						Once content has been analyzed, it is subject to a thorough review
						to ensure that the information is accurate, reliable, and ready for
						dissemination where appropriate. During this process, TGI consults
						with external experts such as weapon specialists, crime analysts,
						lawyers, journalists, open-source investigators, and representatives
						from human rights or policy organizations. These consultations,
						conducted under strict agreements, ensure a comprehensive and
						multidisciplinary review of the evidence. This collaborative process
						enhances the reliability and ethical standards of the analysis while
						ensuring that findings are presented responsibly and sensitively.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold">
						Reconstructing Events and Documentation
					</h2>
					<p>
						Reconstructing events is a crucial aspect of digital forensics,
						especially when multiple incidents occur over a specific timeframe,
						such as during a mass uprising or significant socio-political
						movement. This process focuses on systematically documenting key
						information to establish a comprehensive understanding of the
						events, their connections, and their broader implications.
					</p>

					<p>
						Reconstructing events involves organizing data on incidents,
						including the date and location of the event, the individuals or
						groups involved, and the type of security forces present. For
						example, during an anti-quota movement or similar large-scale event,
						this methodology helps track multiple incidents, casualties, and
						their outcomes. Analysts focus on capturing structured data such as
						dates of incidents and deaths, identities and occupations of
						victims, and geographic details of the locations. Key elements such
						as security forces’ actions, movements, and involvement are also
						meticulously documented.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold">
						Distribution and Safeguarding of Evidence
					</h2>
					<p>
						Distributing digital evidence, particularly to third-party
						organizations or for media coverage, requires strict protocols to
						protect sensitive information. We ensure restricted access to source
						files and evidence, preserving the privacy and security of personal
						data and any identifiable information related to victims or
						individuals involved. Sensitive data should only be shared on a
						need-to-know basis and accompanied by appropriate agreements to
						prevent misuse or unauthorized dissemination.
					</p>

					<p>
						In cases where third-party organizations have strict data management
						policies, extended data may be shared under a formal contract. This
						ensures that the data is handled responsibly, adheres to legal and
						ethical standards, and is used solely for the purposes agreed upon.
						These contracts outline the scope of data sharing, the limitations
						on its use, and the security measures to be upheld by all parties
						involved.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold">Ethical Considerations</h2>
					<p>
						Digital forensics involves handling sensitive data and evidence,
						often under high-stakes circumstances. Analysts must approach every
						task with the utmost ethical rigor to ensure that evidence is
						treated with integrity, confidentiality, and respect for the
						individuals involved. The process should avoid any potential harm,
						particularly when dealing with graphic content or private
						information. Special care must be taken to avoid bias in analysis,
						ensure transparency in findings, and maintain impartiality.
						Upholding ethical standards ensures not only the credibility of the
						investigation but also the protection of all parties impacted by the
						forensic work.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold">Challenges</h2>
					<p>Determining a Location</p>
					<p>
						One of the significant challenges we face is pinpointing the exact
						location of an incident. While tools like Google Maps, Street View,
						and Google Earth are invaluable, they often fall short when it comes
						to less-documented areas or regions with limited coverage. For
						instance, conflict-prone zones might not have sufficient details,
						leaving us to rely on indirect visual cues. These can include
						identifying landmarks like buildings, roads, trees, billboards,
						pillars, shops or any sort of unusual cues that serve as key or
						supplementary identifiers. Sometimes, environmental markers such as
						the angle of sunlight or shadows come into play to narrow down
						possibilities. When mapping fails, corroborating descriptions from
						media reports or crowdsourced information becomes crucial. However,
						even with all these efforts, some locations remain ambiguous, making
						it a painstaking and iterative process.
					</p>

					<p>Counting Human Bodies</p>

					<p>
						Dealing with violent content adds another layer of complexity,
						especially when trying to count the number of individuals in a
						chaotic scene. Videos often show mass gatherings, protests, or
						conflict zones, where injured or deceased individuals are scattered,
						and the situation is far from orderly. Low-quality videos exacerbate
						this difficulty like blurry visuals, event or night shot, poor
						lighting, or obstructed views or composition make it hard to discern
						or determine the number of casualties. Additionally, people moving
						or overlapping in the footage create further confusion.
						Frame-by-frame analysis is critical in such situations, where we
						carefully examine every second to estimate the number of people
						involved, injured, or deceased. At times we use a number of advanced
						tools to estimate the crowd. Yet, even these approaches aren’t
						always precise. Sometimes, we have to rely on eyewitness accounts or
						additional footage to cross-check and validate our findings, which
						is not always readily available.
					</p>

					<p>Tracing Time, finding metadata, and low-quality media</p>
					<p>
						Tracing the original time of an incident is an incredibly
						challenging task, especially when working with media sourced from
						social platforms. Social media platforms often strip away metadata
						during uploads, which removes critical information like the time and
						location of capture. Without this metadata, we have to turn to
						indirect methods of validation. For instance, we analyze contextual
						signals such as timestamps of social media posts or the sequence of
						events visible in the footage. Environmental factors like the length
						and angle of shadows can also help approximate the time of day, but
						this requires advanced techniques and expertise. Low-quality media
						adds another layer of difficulty. Pixelated or blurry visuals make
						it hard to extract meaningful details, whether identifying
						individuals, vehicles, or the surroundings. A common issue we
						encounter is compression artifacts, which distort critical elements
						in videos and images. These distortions are particularly problematic
						when working with older or heavily shared content. Sometimes, we
						attempt to enhance the visuals using forensic tools, but the results
						are not always satisfactory. In such cases, we cross-reference the
						footage with other materials, such as media reports or testimonies,
						to piece together missing details. However, this process is
						labor-intensive and demands a great deal of patience and precision.
					</p>

					<p>Violent Content</p>
					<p>
						Handling violent content is one of the most distressing aspects of
						digital forensics. Videos depicting death, injury, or destruction
						are not only difficult to analyze but also take a psychological
						toll. Watching these clips repeatedly to catch minute details can
						lead to emotional fatigue. Sometimes, we encounter footage so
						graphic that it stays with us long after the analysis is done. The
						mental strain of sifting through hours of disturbing content can
						build up over time, making it hard to stay detached and focused.
						Adding to the challenge is the sheer volume of content we often have
						to process. During large-scale events like mass uprisings or
						conflicts, hundreds or even thousands of videos may surface, and
						each has to be meticulously reviewed for relevance. This combination
						of emotional burden and workload can be overwhelming. Organizations
						need to ensure that forensic analysts have access to psychological
						support and coping mechanisms, such as debriefing sessions or mental
						health resources. While this part of the job is undeniably tough, it
						underscores the importance of what we do—providing clarity and
						accountability in the midst of chaos.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold">
						Archive Materials and Manual
					</h2>
					<p>We archive materials including:</p>

					<p>
						Digital files (e.g., video, audio, and photo) that document daily
						acts of resistance against the oppressor and human rights violations
						by law enforcement, military forces, and pro-government parties
						during the uprising.
					</p>

					<p>
						Interviews and eye-witness accounts of the events surrounding the
						uprising, including the use of lethal force against demonstrators,
						extrajudicial killings, and mass casualties.
					</p>

					<p>
						Documents related to legal, personal, and medical matters of the
						deceased and injured victims for potential use in investigations.
					</p>

					<p>
						Audio, video, and photo collected from open sources (e.g., social
						media, news media, and articles).
					</p>

					<p>
						Important website links associated with our research and
						investigations.
					</p>

					<p>
						Reports and articles from investigative journalism and publications
						by human rights organizations, such as the UN Fact-Finding Mission
						in Bangladesh.
					</p>

					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200 mt-2">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Type
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[250px]">
										[Type Code]-[Chronology Code]
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Suffix Code
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										File Types
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										File Description
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								<tr>
									<td className="px-6 py-4 whitespace-nowrap">Video</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<code>01-000</code>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<p>Transcript [T] </p>
										<p>
											Example: <code>01-000-T</code>
										</p>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										Mpeg, mp4, mov, txt, doc
									</td>
									<td className="px-6 py-4">
										Video evidence and its transcript
									</td>
								</tr>

								<tr>
									<td className="px-6 py-4 whitespace-nowrap">Audio</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<code>02-000</code>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<p>Transcript [T],</p>{' '}
										<p>
											Example: <code>02-000-T</code>
										</p>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										Wav, mp3, txt, doc
									</td>
									<td className="px-6 py-4">
										Audio evidence and its transcript
									</td>
								</tr>

								<tr>
									<td className="px-6 py-4 whitespace-nowrap">Image</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<code>03-000</code>
									</td>
									<td className="px-6 py-4 whitespace-nowrap"></td>
									<td className="px-6 py-4 whitespace-nowrap">
										Png, jpeg, svg, gif
									</td>
									<td className="px-6 py-4">
										Images that contain any type of <strong>‘document’</strong>
										will <strong>not</strong> be included [e.g,
										personal/medical/legal documents
									</td>
								</tr>

								<tr>
									<td className="px-6 py-4 whitespace-nowrap">Screenshot</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<code>04-000</code>
									</td>
									<td className="px-6 py-4 whitespace-nowrap"></td>
									<td className="px-6 py-4 whitespace-nowrap">Png, jpeg</td>
									<td className="px-6 py-4">
										Screenshot of any type of <strong>‘document’</strong> will{' '}
										<strong>not</strong> be included [e.g,
										personal/medical/legal documents
									</td>
								</tr>

								<tr>
									<td className="px-6 py-4 whitespace-nowrap">
										Satellite Image
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<code>05-000</code>
									</td>
									<td className="px-6 py-4 whitespace-nowrap"></td>
									<td className="px-6 py-4 whitespace-nowrap">
										Google Earth, Map
									</td>
									<td className="px-6 py-4"></td>
								</tr>

								<tr>
									<td className="px-6 py-4 whitespace-nowrap">Document</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<code>06-000</code>
									</td>

									<td className="px-6 py-4 whitespace-nowrap">
										<p>Document [general]</p>
										<p>Example 06-000</p>
										<br />
										<strong>Subtype</strong>
										<p>Personal document [P]</p>
										<p>Medical document [M]</p>
										<p>Legal document [L]</p>

										<p>
											<strong>Example:</strong> 06–000-P or 06–000-M
										</p>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										Doc, pdf, xls, xlsx, txt, ppt, jpeg, png
									</td>
									<td className="px-6 py-4">
										<p>
											[Document type <strong>[06, without suffix]</strong> that
											do not fall under{' '}
											<strong>Personal, Medical or Legal</strong> Document
											subtype]
										</p>

										<br />

										<p>
											Documents related to personal, medical (hospital data),
											and legal (FIR) matters of the deceased and injured
											victims for potential use in investigations.
										</p>
									</td>
								</tr>

								<tr>
									<td className="px-6 py-4 whitespace-nowrap">Media Report</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<code>07-000</code>
									</td>
									<td className="px-6 py-4 whitespace-nowrap"></td>
									<td className="px-6 py-4 whitespace-nowrap">
										Any file type we collect from news media including archived{' '}
										<strong>weblinks</strong>, including{' '}
										<strong>photocard</strong>
									</td>
									<td className="px-6 py-4">Archived news link</td>
								</tr>
								<tr>
									<td className="px-6 py-4 whitespace-nowrap">Text</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<code>08-000</code>
									</td>
									<td className="px-6 py-4 whitespace-nowrap"></td>
									<td className="px-6 py-4 whitespace-nowrap"></td>
									<td className="px-6 py-4">
										Includes screen capture, archived post, and text format
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>

				<section>
					<h2 className="text-2xl font-semibold">Footnote:</h2>
					<p>
						In our open-source investigative process and developing the manual,
						we adhered to the Berkeley Protocol on Digital Open Source
						Investigations and the methodology of Bellingcat & the Global Legal
						Action Network.
					</p>
					<ul className="list-disc list-inside ml-4 mt-2">
						<li>
							<a href="https://www.ohchr.org/sites/default/files/2024-01/OHCHR_BerkeleyProtocol.pdf">
								Berkeley Protocol on Digital Open Source Investigations
							</a>
						</li>
						<li>
							<a href="https://www.bellingcat.com/app/uploads/2022/12/JA-Manual-for-PUBLICATION.pdf">
								Bellingcat & Global Legal Action Network - Methodology for
								online open source investigation
							</a>
						</li>
					</ul>
				</section>
			</div>
		</div> /* Closes div from line 5 */
	); /* Closes return from line 4 */
} /* Closes function from line 3 */

export default MethodologyContainer;
