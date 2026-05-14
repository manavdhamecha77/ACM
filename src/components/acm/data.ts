export type Activity = {
  number: string;
  title: string;
  body: string;
  tags: string[];
};

export type EventItem = {
  number: string;
  name: string;
  description: string;
  type: string;
};

export type Benefit = {
  number: string;
  title: string;
  body: string;
};

export type Testimonial = {
  quote: string;
  initials: string;
  name: string;
  role: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type TeamMember = {
  name: string;
  role: string;
  dept?: string;
  dest?: string;
};

export type ArchiveRole = {
  label: string;
  names: string[];
};

export type TeamYear = {
  type: "current" | "archive";
  members?: TeamMember[];
  roles?: ArchiveRole[];
};

export const activities: Activity[] = [
  {
    number: "01 / Workshops",
    title: "Tech Talks & Workshops",
    body: "Regular technical sessions covering software engineering, artificial intelligence, development workflows, systems thinking, and emerging technologies. Members gain hands-on, practical exposure.",
    tags: ["AI/ML", "Dev", "Systems"],
  },
  {
    number: "02 / Competitions",
    title: "Hackathons & Coding Contests",
    body: "High-energy collaborative environments that encourage rapid problem solving, teamwork, and experimentation — where ideas are transformed into working solutions under pressure.",
    tags: ["Hackathon", "CP", "Innovation"],
  },
  {
    number: "03 / Projects",
    title: "Real-World Projects",
    body: "Members collaborate on practical engineering projects spanning web development, AI systems, developer tools, and automation — with a relentless focus on quality, creativity, and technical growth.",
    tags: ["Web", "AI", "Tools"],
  },
];

export const events: EventItem[] = [
  {
    number: "001",
    name: "Dotslash",
    description:
      "A flagship hackathon focused on innovation, collaboration, and rapid problem solving. The defining event of the ACM calendar.",
    type: "Hackathon",
  },
  {
    number: "002",
    name: "Epiphany",
    description:
      "An inter-college competitive programming contest designed to challenge analytical thinking and coding proficiency at the highest level.",
    type: "Competition",
  },
  {
    number: "003",
    name: "Inception",
    description:
      "A technical coding event centred around algorithmic problem solving and engineering thinking. Where beginners become builders.",
    type: "Coding Event",
  },
];

export const benefits: Benefit[] = [
  {
    number: "01",
    title: "Enhanced Technical Skills",
    body: "Gain hands-on exposure through workshops, coding contests, collaborative projects, and technical events designed to accelerate your engineering growth.",
  },
  {
    number: "02",
    title: "Networking Opportunities",
    body: "Connect with industry professionals, faculty mentors, alumni, developers, and like-minded peers who are shaping the future of technology.",
  },
  {
    number: "03",
    title: "Community & Collaboration",
    body: "Become part of a strong technical community built around learning, innovation, teamwork, and curiosity — a space where serious builders thrive together.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      '"ACM SVNIT completely transformed how I think about engineering. The events, the people, the culture — it pushed me to build things I never thought I could."',
    initials: "AK",
    name: "Arjun Kulkarni",
    role: "B.Tech CS · 2024",
  },
  {
    quote:
      '"Dotslash was the first hackathon where I truly felt the energy of a serious technical community. ACM does not just host events — it creates experiences."',
    initials: "PM",
    name: "Priya Mehta",
    role: "B.Tech EC · 2023",
  },
  {
    quote:
      '"As someone from a non-CS background, I was hesitant. ACM SVNIT made me feel like my perspective was valued. I grew more here than in any classroom."',
    initials: "RS",
    name: "Rohan Shah",
    role: "B.Tech ME · 2024",
  },
];

export const faqs: Faq[] = [
  {
    question: "How can I join ACM?",
    answer:
      "Students can participate through the recruitment and interview process conducted annually. Keep an eye on our social channels for recruitment announcements at the start of each academic year.",
  },
  {
    question: "Is prior technical experience required?",
    answer:
      "No. Events and opportunities are designed for all levels of technical proficiency. Whether you are a complete beginner or an experienced engineer, there is a place for you in ACM SVNIT.",
  },
  {
    question: "Can students from non-CS backgrounds participate?",
    answer:
      "Yes. ACM SVNIT actively encourages interdisciplinary participation and collaboration. Engineering, design, and diverse perspectives make the community stronger.",
  },
  {
    question: "What kind of events does ACM host?",
    answer:
      "We host a wide range of events including hackathons (Dotslash), competitive programming contests (Epiphany), coding events (Inception), technical workshops, expert talks, and collaborative project initiatives throughout the year.",
  },
  {
    question: "How does ACM SVNIT support career growth?",
    answer:
      "Through direct networking with industry professionals and alumni, skill-building workshops, real project experience, and a strong peer community — members consistently report accelerated growth in their technical and professional trajectories.",
  },
];

export const teamData: Record<string, TeamYear> = {
  "2025": {
    type: "current",
    members: [
      { name: "Aarav Sharma", role: "President", dept: "B.Tech CS" },
      { name: "Priya Nair", role: "Vice President", dept: "B.Tech CS" },
      { name: "Rohan Gupta", role: "Technical Head", dept: "B.Tech CS" },
      { name: "Sneha Patel", role: "Events Head", dept: "B.Tech EC" },
      { name: "Dev Mehta", role: "Design Lead", dept: "B.Tech IT" },
      { name: "Ananya Joshi", role: "Outreach Lead", dept: "B.Tech CS" },
      { name: "Karan Singh", role: "Web Dev Lead", dest: "B.Tech CS" },
      { name: "Meera Iyer", role: "Content Lead", dept: "B.Tech CE" },
    ],
  },
  "2024": {
    type: "archive",
    roles: [
      { label: "President", names: ["Vikram Reddy"] },
      { label: "Vice President", names: ["Ishita Bansal"] },
      { label: "Technical Heads", names: ["Siddharth Kumar", "Neha Agarwal"] },
      { label: "Events", names: ["Arjun Verma", "Pooja Menon"] },
      { label: "Design", names: ["Rahul Das"] },
      { label: "Outreach", names: ["Tanvi Shah", "Nikhil Rao"] },
    ],
  },
  "2023": {
    type: "archive",
    roles: [
      { label: "President", names: ["Aditya Bose"] },
      { label: "Vice President", names: ["Kritika Malhotra"] },
      { label: "Technical Heads", names: ["Yash Trivedi", "Shruti Yadav"] },
      { label: "Events", names: ["Manav Kapoor", "Divya Sinha"] },
      { label: "Design", names: ["Akash Pillai"] },
      { label: "Outreach", names: ["Riya Chatterjee"] },
    ],
  },
  "2022": {
    type: "archive",
    roles: [
      { label: "President", names: ["Dhruv Saxena"] },
      { label: "Vice President", names: ["Kavya Nambiar"] },
      { label: "Technical Heads", names: ["Omkar Jain", "Swati Pandey"] },
      { label: "Events", names: ["Parth Bhatt", "Sonal Mishra"] },
      { label: "Core Members", names: ["Ankit Dubey", "Simran Kaur", "Harsh Prajapati"] },
    ],
  },
};

export const years = Object.keys(teamData).sort((a, b) => Number(b) - Number(a));

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
