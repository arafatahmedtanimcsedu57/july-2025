import React from 'react';

function MethodologyContainer() {
	return (
		<div className="px-10 py-16 container mx-auto  text-slate-800">
			<div className="space-y-12 max-w-[1000px] mx-auto">
				<h1 className="text-3xl font-bold">
					TGI’s Digital Forensics Investigation Methodology
				</h1>

				<section className="grid grid-cols-1 gap-6 md:grid-cols-4">
					<h2 className="text-2xl font-semibold mb-4">Data Collection</h2>
					<p className="col-span-3">
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

				<section className="grid grid-cols-1 gap-6 md:grid-cols-4">
					<h2 className="text-2xl font-semibold mb-4">
						Maintaining Chain of Custody
					</h2>

					<div className="col-span-3 flex flex-col gap-4">
						<p>
							A structured approach to cataloging is vital to maintain a clear
							chain of custody. The chain of custody refers to the documented
							and unbroken process by which digital evidence is handled
							throughout its lifecycle, from collection to presentation in legal
							or investigative contexts. Maintaining an unbroken chain of
							custody is critical to ensure the evidence remains admissible in
							court and retains its integrity.
						</p>

						<p>Key steps in managing the chain of custody include:</p>
						<ul className="list-disc list-inside ms-8 flex flex-col gap-4">
							<li>
								<strong>Identification:</strong> Documenting when, where, and by
								whom the evidence was collected. Every piece of evidence is
								labeled with a unique identifier (UID) for traceability.
							</li>
							<li>
								<strong>Documentation:</strong> Maintaining records of the
								sources, from whom and when, and how it was collected. A
								standardized consent form is used during the data collection
								phase to ensure that digital evidence is obtained lawfully,
								ethically, and transparently, which reinforces the integrity of
								the forensic investigation. Digital evidence submitters are
								informed that they can withdraw consent at any time. We also
								document the description of the evidence and other sensitive
								information.
							</li>
							<li>
								<strong>Storage:</strong> Securing evidence in tamper-proof
								environments for restricted access. Digital evidence is often
								stored in encrypted formats to protect its integrity.
							</li>
							<li>
								<strong>Transfer:</strong> Ensuring that any transfer of
								evidence is accompanied by proper documentation, including
								signatures and timestamps, to confirm its authenticity.
							</li>
						</ul>
					</div>
				</section>

				<section className="grid grid-cols-1 gap-6 md:grid-cols-4">
					<h2 className="text-2xl font-semibold mb-4">
						Cataloguing and Preservation
					</h2>

					<p className="col-span-3">
						Each piece of evidence is assigned a unique identifier for
						traceability and organized in a Master Catalog. This catalog
						includes details like Case ID, Evidence Type, Source, Device
						Details, Creation Date, and Metadata. Maintaining this system
						ensures evidence is accessible, categorized, and preserved
						effectively throughout the forensic investigation process.
					</p>
				</section>

				<section className="grid grid-cols-1 gap-6 md:grid-cols-4">
					<h2 className="text-2xl font-semibold mb-4">
						Verification and Analysis
					</h2>
					<p className="col-span-3">
						The verification and analysis process begins after the initial steps
						of collecting and preserving digital evidence. At Tech Global
						Institute (TGI), meticulously examine the content for additional
						clues to uncover what is happening, why it is happening, and who is
						involved. Using open-source techniques, analysts strive to verify as
						many details as possible, ensuring accuracy and reliability.
					</p>
				</section>

				<section className="grid grid-cols-1 gap-6 md:grid-cols-4">
					<h2 className="text-2xl font-semibold mb-4">Analysis</h2>

					<div className="col-span-3 flex flex-col gap-6">
						<div>
							<h2 className="text-xl font-semibold mb-2">
								Frame-by-Frame (FBF) Analysis
							</h2>
							<p>
								Frame-by-frame analysis meticulously documents observations in
								video or image evidence. Analysts record details like
								individuals, security forces, and their actions, noting crowd
								dynamics, gestures, or equipment use. Significant events are
								corroborated with media or social media footage, ensuring
								precise identification of law enforcement and high certainty in
								findings.
							</p>
						</div>
						<div>
							<h2 className="text-xl font-semibold mb-2">Geolocation</h2>
							<p>
								Geolocation identifies incident locations using visual cues like
								landmarks, billboards, or environmental features. Analysts
								examine details such as clothing, language, or structures, using
								Google searches and Reverse Image Search to match locations.
								Articles, captions, and social media comments are reviewed to
								confirm the exact place of the event.
							</p>
						</div>

						<div>
							<h2 className="text-xl font-semibold mb-2">Chronolocation</h2>
							<p>
								Chronolocation determines event timing when metadata is missing.
								Analysts use shadow analysis, timestamps from related posts, or
								environmental changes to approximate time. Synchronizing with
								news reports or corroborative footage enhances precision, with
								investigation context guiding tool use for accurate temporal
								verification.
							</p>
						</div>

						<div>
							<h2 className="text-xl font-semibold mb-2">
								Establishing Body Detection and Crowd Estimation
							</h2>
							<p>
								Body detection verifies image and video authenticity before
								counting casualties. Enhancement tools clarify details, with
								frame-by-frame reviews identifying movement, wounds, or
								incapacitation. Crowd counting tools estimate numbers, while
								direct counting is used for smaller groups, distinguishing
								injured from deceased.
							</p>
						</div>
					</div>
				</section>

				<section className="grid grid-cols-1 gap-6 md:grid-cols-4">
					<h2 className="text-2xl font-semibold mb-4">Review</h2>
					<p className="col-span-3">
						Post-analysis, evidence undergoes a thorough review by external
						experts, such as weapon specialists, lawyers, and human rights
						representatives. Conducted under strict agreements, this
						multidisciplinary process confirms the accuracy and reliability of
						findings. It ensures ethical presentation and prepares evidence for
						responsible dissemination in investigative or legal contexts.
					</p>
				</section>

				<section className="grid grid-cols-1 gap-6 md:grid-cols-4">
					<h2 className="text-2xl font-semibold mb-4">
						Reconstructing Events and Documentation
					</h2>
					<p className="col-span-3">
						Reconstructing events is key to understanding large-scale incidents
						like uprisings. Analysts systematically document dates, locations,
						individuals, security forces, and their actions to reveal
						connections and implications. This structured approach tracks
						multiple incidents and outcomes, offering a comprehensive view
						essential for forensic analysis and accountability.
					</p>
				</section>

				<section className="grid grid-cols-1 gap-6 md:grid-cols-4">
					<h2 className="text-2xl font-semibold mb-4">
						Distribution and Safeguarding of Evidence
					</h2>
					<p className="col-span-3">
						Sharing digital evidence with third parties requires strict
						protocols to protect sensitive data. Access is restricted, and
						formal contracts outline usage limits and security measures. This
						ensures responsible handling, preserves privacy, prevents misuse,
						and aligns with legal and ethical standards, safeguarding all
						individuals involved.
					</p>
				</section>

				<section className="grid grid-cols-1 gap-6 md:grid-cols-4">
					<h2 className="text-2xl font-semibold mb-4">
						Ethical Considerations
					</h2>
					<p className="col-span-3">
						Digital forensics demands ethical rigor in handling sensitive
						evidence. Analysts must maintain integrity, confidentiality, and
						respect for those involved, avoiding bias and harm, especially with
						graphic content. Transparency and impartiality uphold the
						investigation’s credibility, ensuring protection for all parties and
						reinforcing the forensic process’s trustworthiness.
					</p>
				</section>

				<section className="grid grid-cols-1 gap-6 md:grid-cols-4">
					<h2 className="text-2xl font-semibold mb-4">Challenges</h2>
					<div className="col-span-3 flex flex-col gap-4">
						<p className="text-lg">Determining a Location :</p>
						<p>
							Pinpointing incident locations is challenging, especially in
							poorly mapped areas. Tools like Google Maps or Street View often
							lack detail in conflict zones, forcing reliance on visual cues
							like landmarks, billboards, or shadows. Corroborating with media
							reports or crowdsourced data helps, but ambiguity persists, making
							the process iterative and time-consuming.
						</p>

						<p className="text-lg">Counting Human Bodies :</p>
						<p>
							Counting individuals in chaotic, low-quality videos is complex.
							Blurry visuals, poor lighting, and overlapping figures obscure
							casualties in protests or conflicts. Frame-by-frame analysis and
							crowd estimation tools aid, but precision is elusive.
							Cross-checking with eyewitness accounts or additional footage is
							often necessary, yet not always available.
						</p>

						<p className="text-lg">
							Tracing Time, finding metadata, and low-quality media :
						</p>
						<p>
							Tracing event times is difficult without metadata, often stripped
							by social platforms. Analysts use timestamps, shadow analysis, or
							event sequences for approximation, but low-quality, pixelated
							media complicates detail extraction. Compression artifacts distort
							visuals, requiring cross-referencing with reports or testimonies,
							a labor-intensive process demanding precision.{' '}
						</p>

						<p className="text-lg">Violent Content :</p>
						<p>
							Analyzing violent content is emotionally taxing, with graphic
							videos causing fatigue. Repeated exposure to death or injury
							footage strains analysts, especially during large-scale events
							with high video volumes. Psychological support, like debriefing or
							mental health resources, is essential to maintain focus and ensure
							accountability.
						</p>
					</div>
				</section>

				<section className="grid grid-cols-1 gap-6 md:grid-cols-4">
					<h2 className="text-2xl font-semibold mb-4">
						Archive Materials and Manual
					</h2>
					<div className="col-span-3 flex flex-col gap-4">
						<p>We archive materials including:</p>

						<p>
							Digital files (e.g., video, audio, and photo) that document daily
							acts of resistance against the oppressor and human rights
							violations by law enforcement, military forces, and pro-government
							parties during the uprising.
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
							Reports and articles from investigative journalism and
							publications by human rights organizations, such as the UN
							Fact-Finding Mission in Bangladesh.
						</p>
					</div>
				</section>

				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200 mt-2">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase max-w-[100px]">
									Type
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase max-w-[120px]">
									[Type Code]-[Chronology Code]
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase max-w-[120px]">
									Suffix Code
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase max-w-[120px]">
									File Types
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									File Description
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							<tr>
								<td className="px-6 py-4">Video</td>
								<td className="px-6 py-4">
									<code>01-000</code>
								</td>
								<td className="px-6 py-4">
									<p>Transcript [T] </p>
									<p>
										Example: <code>01-000-T</code>
									</p>
								</td>
								<td className="px-6 py-4">Mpeg, mp4, mov, txt, doc</td>
								<td className="px-6 py-4">Video evidence and its transcript</td>
							</tr>

							<tr>
								<td className="px-6 py-4">Audio</td>
								<td className="px-6 py-4">
									<code>02-000</code>
								</td>
								<td className="px-6 py-4">
									<p>Transcript [T],</p>{' '}
									<p>
										Example: <code>02-000-T</code>
									</p>
								</td>
								<td className="px-6 py-4">Wav, mp3, txt, doc</td>
								<td className="px-6 py-4">Audio evidence and its transcript</td>
							</tr>

							<tr>
								<td className="px-6 py-4">Image</td>
								<td className="px-6 py-4">
									<code>03-000</code>
								</td>
								<td className="px-6 py-4"></td>
								<td className="px-6 py-4">Png, jpeg, svg, gif</td>
								<td className="px-6 py-4">
									Images that contain any type of <strong>‘document’</strong>
									will <strong>not</strong> be included [e.g,
									personal/medical/legal documents
								</td>
							</tr>

							<tr>
								<td className="px-6 py-4">Screenshot</td>
								<td className="px-6 py-4">
									<code>04-000</code>
								</td>
								<td className="px-6 py-4"></td>
								<td className="px-6 py-4">Png, jpeg</td>
								<td className="px-6 py-4">
									Screenshot of any type of <strong>‘document’</strong> will{' '}
									<strong>not</strong> be included [e.g, personal/medical/legal
									documents
								</td>
							</tr>

							<tr>
								<td className="px-6 py-4">Satellite Image</td>
								<td className="px-6 py-4">
									<code>05-000</code>
								</td>
								<td className="px-6 py-4"></td>
								<td className="px-6 py-4">Google Earth, Map</td>
								<td className="px-6 py-4"></td>
							</tr>

							<tr>
								<td className="px-6 py-4">Document</td>
								<td className="px-6 py-4">
									<code>06-000</code>
								</td>

								<td className="px-6 py-4">
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
								<td className="px-6 py-4">
									Doc, pdf, xls, xlsx, txt, ppt, jpeg, png
								</td>
								<td className="px-6 py-4">
									<p>
										[Document type <strong>[06, without suffix]</strong> that do
										not fall under <strong>Personal, Medical or Legal</strong>{' '}
										Document subtype]
									</p>

									<br />

									<p>
										Documents related to personal, medical (hospital data), and
										legal (FIR) matters of the deceased and injured victims for
										potential use in investigations.
									</p>
								</td>
							</tr>

							<tr>
								<td className="px-6 py-4">Media Report</td>
								<td className="px-6 py-4">
									<code>07-000</code>
								</td>
								<td className="px-6 py-4"></td>
								<td className="px-6 py-4">
									Any file type we collect from news media including archived{' '}
									<strong>weblinks</strong>, including{' '}
									<strong>photocard</strong>
								</td>
								<td className="px-6 py-4">Archived news link</td>
							</tr>
							<tr>
								<td className="px-6 py-4">Text</td>
								<td className="px-6 py-4">
									<code>08-000</code>
								</td>
								<td className="px-6 py-4"></td>
								<td className="px-6 py-4"></td>
								<td className="px-6 py-4">
									Includes screen capture, archived post, and text format
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<section className="grid grid-cols-1 gap-6 md:grid-cols-4">
					<h2 className="text-2xl font-semibold mb-4">Footnote:</h2>
					<div className="col-span-3 flex flex-col gap-4">
						<p>
							In our open-source investigative process and developing the
							manual, we adhered to the Berkeley Protocol on Digital Open Source
							Investigations and the methodology of Bellingcat & the Global
							Legal Action Network.
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
					</div>
				</section>
			</div>
		</div> /* Closes div from line 5 */
	); /* Closes return from line 4 */
} /* Closes function from line 3 */

export default MethodologyContainer;
