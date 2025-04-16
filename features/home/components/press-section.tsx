import Link from "next/link";
import React from "react";

const mediaItems = [
  {
    title:
      "Videos reveal new incidents of deadly brutality by Bangladesh police",
    source: "theguardian.com (2024)",
    link: "https://www.theguardian.com/world/2025/jan/14/videos-reveal-new-incidents-of-deadly-brutality-by-bangladesh-police",
  },
  {
    title:
      "Bangladesh police killed, injured 20 unarmed protesters on Aug 5 during student agitation, says rights group",
    source: "firstpost.com (January 15, 2025)",
    link: "https://www.firstpost.com/world/bangladesh-police-killed-injured-20-unarmed-protesters-on-aug-5-during-student-agitation-says-rights-group-13853045.html",
  },
  {
    title:
      "Revealed: the unlawful and targeted use of police force in Bangladesh",
    source: "channel4.com (January 14, 2025)",
    link: "https://www.channel4.com/news/revealed-the-unlawful-and-targeted-use-of-police-force-in-bangladesh",
  },
  {
    title: "Mass uprising: Deaths on July 19 three times the reported number",
    source: "thedailystar.net (January 16, 2025)",
    link: "https://www.thedailystar.net/news/bangladesh/news/mass-uprising-deaths-july-19-three-times-the-reported-number-3800381",
  },
  {
    title:
      "Short docu-film released depicting brutal Jatrabari killings on 5 August",
    source: "tbsnews.net (January 14, 2025)",
    link: "https://www.tbsnews.net/bangladesh/short-docu-film-released-depicting-brutal-jatrabari-killings-5-august-1042966",
  },
  {
    title:
      "Bloodshed in Bangladesh: ITJP report exposes atrocities on July protests",
    source: "banglanews24.com (January 15, 2024)",
    link: "https://www.banglanews24.com/english/national/news/bd/165751.details",
  },
  {
    title: "New report claims 3 times more were killed on 19 July",
    source: "daily-sun.com (January 15, 2025)",
    link: "https://www.daily-sun.com/post/786885",
  },
  {
    title: "হত্যার বিচার না হলে বাঁচার অধিকার নেই",
    source: "jugantor.com (January 15, 2025)",
    link: "https://www.jugantor.com/national/903983",
  },
  {
    title: "অভ্যুত্থানে শুধু ১৯ জুলাই নিহত ১৪৮",
    source: "samakal.com (July 19, 2024)",
    link: "https://samakal.com/bangladesh/article/275543/%E0%A6%85%E0%A6%AD%E0%A7%8D%E0%A6%AF%E0%A7%81%E0%A6%A4%E0%A7%8D%E0%A6%A5%E0%A6%BE%E0%A6%A8%E0%A7%87-%E0%A6%B6%E0%A7%81%E0%A6%A7%E0%A7%81-%E0%A7%A7%E0%A7%AF-%E0%A6%9C%E0%A7%81%E0%A6%B2%E0%A6%BE%E0%A6%87-%E0%A6%A8%E0%A6%BF%E0%A6%B9%E0%A6%A4-%E0%A7%A7%E0%A7%AA%E0%A7%AE",
  },
  {
    title: "অভ্যুত্থানে কেবল ১৯ জুলাই নিহত হয় ১৪৮ জন: প্রতিবেদন",
    source: "bangla.bdnews24.com (July 19, 2024)",
    link: "https://bangla.bdnews24.com/bangladesh/d2671de563a8",
  },
  {
    title: "জুলাই বিপ্লবে নিহতের সংখ্যা প্রাথমিক রিপোর্টের চেয়ে তিনগুণ বেশি",
    source: "daily-sun.com (January 15, 2025)",
    link: "https://www.daily-sun.com/bangla/post/9512",
  },
];

export default function MediaCoverage() {
  return (
    <section className="px-10 py-16 bg-blue-100">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-orange-600">MEDIA COVERAGE</h2>
          <a href="#" className="text-orange-600 text-sm font-semibold">
            READ MORE +
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {mediaItems.map((item, index) => (
            <Link
              target="_blank"
              href={item.link}
              key={index}
              className="space-y-2"
            >
              <li className="text-black font-semibold list-disc ml-4">
                {item.title}

                <p className="text-orange-600 text-sm font-semibold">
                  {item.source}
                </p>
              </li>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
