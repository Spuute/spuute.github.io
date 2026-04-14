export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  description?: string;
}

export interface Skill {
  name: string;
  level: number; // 1-100
  category: string;
}

export interface CvData {
  name: string;
  title: string;
  summary: string;
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    location: string;
  };
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}

const cvData: CvData = {
  name: "Patric Bergkvist",
  title: ".NET Developer",
  summary:
    "Engagerad och driven .NET-utvecklare med passion för att bygga skalbara, robusta och moderna applikationer. Erfarenhet inom hela stacken – från backend med C# och .NET till frontend med React och TypeScript.",
  contact: {
    email: "patric.bergkvist@icloud.com",
    phone: "+46 72 301 54 32",
    linkedin: "linkedin.com/in/patricbergkvist",
    github: "github.com/spuute",
    location: "Sverige",
  },
  experience: [
    {
      title: "Fullstack .NET Developer",
      company: "Norion bank AB",
      period: "2024 – Nu",
      description:
        "Utvecklar och effektiviserar bankens AML/KYC process genom automation och integration samtliga försystem.",
      technologies: ["C#", ".NET", "Azure", "SQL Server", "Docker", "DDD", "CQRS", "EventSourcing"],
    },
    {
      title: "Fullstack .NET Developer",
      company: "Iver AB",
      period: "2023 - 2024",
      description:
        "Byggt och förvaltat Ivers affärssystem där jag varit delaktig i systemets ekonomi moduler och integrationer. Utbyggnad av WPF komponenter samt övriga UX förbättringar samt integrationstjänster som körs i kubernetes",
      technologies: ["C#", ".NET Core", "WPF", "Entity Framework", "Kubernetes", "WPF"],
    },
    {
      title: "Fullstack .NET Developer",
      company: "IOSoft AB",
      period: "2022 – 2023",
      description:
        "Arbete mot kund som bygger fibernät. System för planering och projektering av fiber. TypeScript integration mot google maps samt webforms och ASP.NET Core API. Arbete mot kund som hanterar gåvokortssystem.",
      technologies: ["C#", "TypeScript", "Blazor", "SQL Server"],
    },
    {
      title: "Fullstack .NET Developer",
      company: "Nonsultant AB",
      period: "2021 - 2022",
      description:
      "Arbete mot kund i danmark som är begravningsentreprenör där vi tillgodosett med ett system för hantering av begravningar.",
      technologies: ["C#", "Docker", "Blazor", "ASP.NET Core", "API"]
    }
  ],
  education: [
    {
      degree: "Kandidatexamen i Datateknik",
      school: "Tekniska Högskolan",
      period: "2014 – 2017",
      description: "Inriktning mot mjukvaruutveckling och systemarkitektur.",
    },
  ],
  skills: [
    { name: "C#", level: 95, category: "Backend" },
    { name: ".NET / ASP.NET Core", level: 90, category: "Backend" },
    { name: "Entity Framework", level: 85, category: "Backend" },
    { name: "SQL Server", level: 85, category: "Backend" },
    { name: "Azure", level: 80, category: "Cloud & DevOps" },
    { name: "Docker", level: 75, category: "Cloud & DevOps" },
    { name: "Kubernetes", level: 65, category: "Cloud & DevOps" },
    { name: "CI/CD", level: 80, category: "Cloud & DevOps" },
    { name: "React", level: 70, category: "Frontend" },
    { name: "TypeScript", level: 75, category: "Frontend" },
    { name: "HTML/CSS", level: 70, category: "Frontend" },
    { name: "Git", level: 85, category: "Verktyg" },
    { name: "Agile / Scrum", level: 80, category: "Verktyg" },
  ],
};

export default cvData;
