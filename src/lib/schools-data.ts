export interface FlightSchool {
  name: string;
  shortName?: string;
  description: string;
  website: string;
  hasVerifiedWebsite: boolean;
}

export interface CountryData {
  id: string;
  name: string;
  flagEmoji: string;
  image: string;
  description: string;
  highlight?: string;
  schools: FlightSchool[];
}

export const countriesData: CountryData[] = [
  {
    id: "romania",
    name: "Romania",
    flagEmoji: "🇷🇴",
    image: "/images/romania.png",
    description:
      "Romania delivers Europe's most affordable, high-quality flight training with modern facilities and expert instructors. From PPL to full ATPL, compare trusted EASA-approved schools like Aeroclubul României, Jetav, Transilvania Wings, West Wings Aviation, and Ram Aviation.",
    highlight: "Start today—your cockpit awaits!",
    schools: [
      {
        name: "RAS",
        shortName: "RAS",
        description:
          "RAS Tuzla offers professional pilot training programs with a focus on practical flight experience. Located near the Black Sea coast, the school provides excellent weather conditions for year-round training.",
        website: "https://rastuzla.com/",
        hasVerifiedWebsite: true,
      },
      {
        name: "Aeroclubul României",
        shortName: "Aeroclubul României",
        description:
          "One of Romania's oldest and most prestigious aviation institutions, Aeroclubul României offers comprehensive flight training from PPL to advanced certifications with a rich heritage in Romanian aviation.",
        website: "https://www.aeroclubulromaniei.ro/",
        hasVerifiedWebsite: true,
      },
      {
        name: "Jetav",
        shortName: "Jetav",
        description:
          "Jetav provides modern flight training with state-of-the-art simulators and aircraft. Their EASA-approved programs cover PPL, CPL, and instrument ratings with experienced multinational instructors.",
        website: "https://jetav.ro/en/",
        hasVerifiedWebsite: true,
      },
      {
        name: "SSAVC / Scoala Superioara de Aviatie Civila",
        shortName: "SSAVC",
        description:
          "The Superior School of Civil Aviation offers comprehensive aviation education combining theoretical knowledge with practical flight training, preparing students for professional careers in commercial aviation.",
        website: "https://aviationacademy.ro/en/",
        hasVerifiedWebsite: true,
      },
      {
        name: "Transilvania Wings",
        shortName: "Transilvania Wings",
        description:
          "Based in the heart of Transylvania, this school offers scenic flight training with access to diverse terrain and weather conditions, providing students with a well-rounded flying experience.",
        website: "https://transylvaniawings.ro/",
        hasVerifiedWebsite: true,
      },
      {
        name: "West Wings Aviation",
        shortName: "West Wings Aviation",
        description:
          "West Wings Aviation delivers professional pilot training in western Romania with modern aircraft and experienced instructors, focusing on personalized training paths for each student.",
        website: "https://westwingsaviation.com/",
        hasVerifiedWebsite: true,
      },
      {
        name: "Ram Aviation",
        shortName: "Ram Aviation",
        description:
          "Ram Aviation offers quality flight training at competitive prices, with EASA-compliant programs and a fleet of well-maintained training aircraft, making aviation accessible to more aspiring pilots.",
        website: "https://www.ramaviation.ro/en",
        hasVerifiedWebsite: true,
      },
    ],
  },
  {
    id: "france",
    name: "France",
    flagEmoji: "🇫🇷",
    image: "/images/france.png",
    description:
      "France is home to some of Europe's most prestigious flight schools with a long tradition in aviation excellence. From the skies above Paris to the scenic south, French schools offer world-class EASA training.",
    highlight: "Fly where aviation was born!",
    schools: [
      {
        name: "EPAG NG",
        shortName: "EPAG NG",
        description:
          "EPAG NG is a leading French flight school specializing in airline pilot training with partnerships with major European airlines. Their integrated ATPL programs prepare students for direct entry into commercial aviation.",
        website: "https://pilotcareercenter.com/Pilot-Training-Type-Rating/Europe/France/11865/EPAG-NG",
        hasVerifiedWebsite: true,
      },
      {
        name: "Hub'Air",
        shortName: "Hub'Air",
        description:
          "Hub'Air Aviation Academy offers professional pilot training with a focus on airline-ready skills. Their modern fleet and simulator centers provide comprehensive EASA-approved training programs.",
        website: "https://www.hubair.com/en",
        hasVerifiedWebsite: true,
      },
      {
        name: "Aéropyrénées",
        shortName: "Aéropyrénées",
        description:
          "Located in the scenic Pyrenees region, Aéropyrénées offers flight training with exceptional flying conditions and stunning landscapes, providing an inspiring environment for pilot education.",
        website: "https://www.jetline-training.com/",
        hasVerifiedWebsite: true,
      },
      {
        name: "Paris Flight Academy",
        shortName: "Paris Flight Academy",
        description:
          "Part of the Flying Academy network, Paris Flight Academy provides international-standard pilot training with modern aircraft and simulators, offering flexible training schedules for students worldwide.",
        website: "https://flyingacademy.com/",
        hasVerifiedWebsite: true,
      },
      {
        name: "Institut Mermoz",
        shortName: "Institut Mermoz",
        description:
          "Institut Mermoz is a well-known French aviation school named after the legendary aviator Jean Mermoz, offering comprehensive pilot training programs with a focus on professional airline preparation.",
        website: "#",
        hasVerifiedWebsite: false,
      },
      {
        name: "Glass Cockpit Aviation Europe",
        shortName: "Glass Cockpit Aviation",
        description:
          "Glass Cockpit Aviation Europe specializes in modern glass cockpit training with advanced avionics, preparing pilots for the technology found in today's commercial aircraft fleets.",
        website: "#",
        hasVerifiedWebsite: false,
      },
      {
        name: "Air Occitanie",
        shortName: "Air Occitanie",
        description:
          "Air Occitanie provides regional flight training in southern France, offering personalized instruction and access to diverse flying conditions in the Occitanie region.",
        website: "#",
        hasVerifiedWebsite: false,
      },
    ],
  },
  {
    id: "great-britain",
    name: "Great Britain",
    flagEmoji: "🇬🇧",
    image: "/images/britain.png",
    description:
      "The United Kingdom boasts world-renowned flight schools with rigorous training standards and strong airline connections. British aviation education is synonymous with excellence and professionalism.",
    highlight: "Train with the best in British aviation!",
    schools: [
      {
        name: "Skyborne Airline Academy",
        shortName: "Skyborne",
        description:
          "Skyborne Airline Academy offers innovative airline pilot training programs with cutting-edge technology and airline partnerships, providing a fast-track path to commercial aviation careers.",
        website: "#",
        hasVerifiedWebsite: false,
      },
      {
        name: "CAE Oxford Aviation Academy",
        shortName: "CAE Oxford",
        description:
          "One of the world's most prestigious flight schools, CAE Oxford has trained thousands of airline pilots. Their integrated ATPL program is recognized by airlines worldwide for its excellence.",
        website: "#",
        hasVerifiedWebsite: false,
      },
      {
        name: "Leading Edge Aviation",
        shortName: "Leading Edge",
        description:
          "Leading Edge Aviation offers personalized pilot training with small class sizes and dedicated instructors, ensuring each student receives the attention needed to succeed in their aviation career.",
        website: "#",
        hasVerifiedWebsite: false,
      },
      {
        name: "Acron Aviation",
        shortName: "Acron Aviation",
        description:
          "Acron Aviation provides professional flight training with modern facilities and aircraft, focusing on producing competent and confident pilots ready for the demands of commercial aviation.",
        website: "#",
        hasVerifiedWebsite: false,
      },
      {
        name: "Aeros Flight Training",
        shortName: "Aeros",
        description:
          "Aeros Flight Training is a well-established UK flight school offering a range of EASA-approved courses from PPL to CPL/MEIR, with bases across the United Kingdom for flexible training options.",
        website: "#",
        hasVerifiedWebsite: false,
      },
    ],
  },
  {
    id: "spain",
    name: "Spain",
    flagEmoji: "🇪🇸",
    image: "/images/spain.png",
    description:
      "Spain offers excellent flight training with year-round flying weather and competitive pricing. Spanish schools are known for their modern facilities and EASA-approved programs in stunning Mediterranean settings.",
    highlight: "Fly under the Spanish sun!",
    schools: [
      {
        name: "FTEJerez",
        shortName: "FTEJerez",
        description:
          "FTEJerez is one of Europe's premier flight training organizations, located in Jerez de la Frontera. With airline partnerships and state-of-the-art facilities, they produce highly skilled professional pilots.",
        website: "#",
        hasVerifiedWebsite: false,
      },
      {
        name: "One Air",
        shortName: "One Air",
        description:
          "One Air offers professional pilot training in southern Spain with excellent weather conditions for flying year-round, providing efficient training programs that get students airborne quickly.",
        website: "#",
        hasVerifiedWebsite: false,
      },
      {
        name: "FlyBy",
        shortName: "FlyBy",
        description:
          "FlyBy Aviation Academy offers comprehensive EASA pilot training with a focus on practical skills and airline preparation, training pilots from around the world in sunny Spanish conditions.",
        website: "#",
        hasVerifiedWebsite: false,
      },
      {
        name: "European Flyers / Aerotec",
        shortName: "European Flyers",
        description:
          "European Flyers provides professional aviation training in partnership with Aerotec, offering integrated and modular pilot courses with modern training aircraft and experienced instructors.",
        website: "#",
        hasVerifiedWebsite: false,
      },
      {
        name: "CESDA",
        shortName: "CESDA",
        description:
          "CESDA is a Catalan flight school offering university-level aviation education combined with practical flight training, providing a comprehensive pathway to a professional pilot career.",
        website: "#",
        hasVerifiedWebsite: false,
      },
      {
        name: "Aeroclub Barcelona-Sabadell",
        shortName: "Aeroclub BCN",
        description:
          "One of Spain's most historic aeroclubs, offering flight training near Barcelona with a rich tradition in Spanish aviation and access to both coastal and inland flying environments.",
        website: "#",
        hasVerifiedWebsite: false,
      },
    ],
  },
  {
    id: "poland",
    name: "Poland",
    flagEmoji: "🇵🇱",
    image: "/images/poland.png",
    description:
      "Poland offers affordable, high-quality flight training with EASA-approved schools and modern facilities. Polish aviation schools combine competitive pricing with excellent training standards.",
    highlight: "Quality training at competitive prices!",
    schools: [
      {
        name: "Bartolini Air",
        shortName: "Bartolini Air",
        description:
          "Bartolini Air is one of Poland's most popular flight schools, known for affordable training and excellent pass rates. They offer PPL, CPL, and instrument rating courses with a well-maintained fleet.",
        website: "#",
        hasVerifiedWebsite: false,
      },
      {
        name: "LOT Flight Academy / Polish Aviation Academy",
        shortName: "LOT Flight Academy",
        description:
          "Associated with Poland's national airline LOT, this academy offers professional pilot training with strong airline connections and comprehensive training programs for aspiring commercial pilots.",
        website: "#",
        hasVerifiedWebsite: false,
      },
      {
        name: "Smart Aviation",
        shortName: "Smart Aviation",
        description:
          "Smart Aviation provides modern flight training with a focus on efficiency and safety, offering EASA-approved courses with experienced instructors and well-equipped training aircraft.",
        website: "#",
        hasVerifiedWebsite: false,
      },
      {
        name: "Zonda Aero",
        shortName: "Zonda Aero",
        description:
          "Zonda Aero offers specialized flight training programs with personalized instruction, catering to both recreational and professional pilots with flexible training schedules.",
        website: "#",
        hasVerifiedWebsite: false,
      },
      {
        name: "Polish Aviation Group",
        shortName: "Polish Aviation Group",
        description:
          "Polish Aviation Group provides comprehensive aviation training services, combining theoretical education with practical flight experience in well-maintained training aircraft.",
        website: "#",
        hasVerifiedWebsite: false,
      },
      {
        name: "Runway Pilot School",
        shortName: "Runway Pilot School",
        description:
          "Runway Pilot School offers accessible and affordable pilot training in Poland, with courses designed for both hobbyist and professional pilots seeking EASA certifications.",
        website: "#",
        hasVerifiedWebsite: false,
      },
    ],
  },
];

export function getCountryById(id: string): CountryData | undefined {
  return countriesData.find((country) => country.id === id);
}
