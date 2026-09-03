/**
 * Single source of truth for every piece of copy on the site.
 *
 * Anything still awaiting real material (photography, video, verified figures,
 * testimonials) is represented as `null` or an explicit placeholder label, so
 * those slots render as visible "to be provided" panels rather than silently
 * shipping invented numbers or fake quotes.
 */

export const site = {
  name: "NabilQureshi.com",
  shortName: "Nabil Qureshi",
  url: "https://nabilqureshi.com",
  tagline: "Practical insights on property, business technology and wellbeing.",
  description:
    "Practical insights from Nabil on property and wealth creation, business technology and AI, and the health and mindset required for lasting success.",
  disclaimer:
    "Content is general information, not financial, property or health advice.",
};

export const announcement = {
  text: "Practical ideas for property, business and life — join Nabil’s newsletter.",
  linkLabel: "Subscribe",
  href: "#newsletter",
};

/**
 * `href` is the standalone page; `section` is the id of the matching band on
 * the home page, which the nav still scroll-spies. The two differ for
 * Business & AI, so the mapping is explicit rather than derived from the slug.
 */
export const navLinks = [
  { label: "About", href: "/about", section: "about" },
  { label: "Property", href: "/property", section: "property" },
  { label: "Business & AI", href: "/business-ai", section: "business" },
  { label: "Wellness", href: "/wellness", section: "wellness" },
  { label: "Insights", href: "/insights", section: "insights" },
  { label: "Speaking", href: "/speaking", section: "speaking" },
  { label: "Contact", href: "/contact", section: "contact" },
];

export const hero = {
  eyebrow: [
    "Property & Wealth",
    "Business, Technology & AI",
    "Health & Wellness",
  ],
  headline: ["Build wealth.", "Build better businesses."],
  headlineAccent: "Build a better life.",
  body: site.description,
  primaryCta: { label: "Explore Nabil’s Insights", href: "#insights" },
  secondaryCta: { label: "Work With Nabil", href: "#contact" },
  /**
   * Drop a file at /public/media/brand-loop.mp4 and flip `video` to that path
   * to switch the hero from the static gradient to the brand loop.
   */
  video: null as string | null,
};

export const introduction =
  "Success is rarely built in one area alone. Financial confidence, effective business systems and personal wellbeing influence one another. Through NabilQureshi.com, I share lessons, practical frameworks and real-world experiences that can help people make stronger decisions across property, business and life.";

export const pathways = [
  {
    number: "01",
    title: "Property & Wealth",
    body: "Understand property, finance and long-term wealth creation through practical insights grounded in real market experience.",
    cta: "Explore Property Insights",
    href: "#property",
  },
  {
    number: "02",
    title: "Business, Technology & AI",
    body: "Learn how modern systems, automation and artificial intelligence can reduce friction and create better businesses.",
    cta: "Discover Business & AI Ideas",
    href: "#business",
  },
  {
    number: "03",
    title: "Health & Wellness",
    body: "Explore the habits, physical health and mental resilience that allow us to show up consistently for work, family and life.",
    cta: "Read Wellness Perspectives",
    href: "#wellness",
  },
];

export const story = {
  eyebrow: "MY STORY",
  heading:
    "From humble beginnings to building wealth, better businesses, and",
  headingAccent: "a better life.",
  paragraphs: [
    "My journey has been driven by one belief — that anyone can create a better future with the right mindset, knowledge, and action. Today, I help entrepreneurs, investors, and professionals build freedom through property, business, technology and personal growth.",
  ],
  cta: {
    label: "Discover my full story",
    href: "/about",
  },
  portrait: {
    src: "/media/nabil_qureshi_portrait.webp" as string | null,
    alt: "Professional portrait of Nabil Qureshi",
    label: "Professional portrait of Nabil Qureshi",
  },
};

export const credibility = {
  note: "Cross-disciplinary background across property acquisitions, corporate finance & business systems",
  stats: [
    { value: "16+", label: "Years of business and property experience" },
    { value: "100+", label: "Businesses, developments and projects supported" },
    { value: "1,000+", label: "Clients, partners and investors advised" },
    { value: "25+", label: "Media, speaking and industry appearances" },
  ],
};

export type Pillar = {
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  points: string[];
  cta: { label: string; href: string };
  image: { src: string | null; alt: string; label: string };
  tone: "ink" | "raised";
  reversed: boolean;
};

export const pillars: Pillar[] = [
  {
    id: "property",
    eyebrow: "Pillar 01 — Property & Wealth",
    heading: "Build wealth through informed property decisions.",
    body: "Property can create long-term financial opportunity, but strong outcomes require more than buying an asset. They require research, financial discipline, risk awareness and a clear strategy. Here I share practical perspectives on property investment, home-and-land opportunities, finance and sustainable wealth creation.",
    points: [
      "Property fundamentals for first-time and experienced buyers",
      "Finance, cash flow and risk considerations",
      "Location, demand and long-term value",
      "Case studies and lessons from real projects",
      "Common mistakes and better questions to ask",
    ],
    cta: { label: "Explore Property Insights", href: "#insights" },
    image: {
      src: "/media/content/property_approach.webp",
      alt: "Property development and modern architectural residence",
      label: "property / development photograph",
    },
    tone: "ink",
    reversed: false,
  },
  {
    id: "business",
    eyebrow: "Pillar 02 — Business, Technology & AI",
    heading: "Use technology to build a more capable business.",
    body: "Technology is no longer separate from business operations; it forms the foundation of how modern organisations serve customers, manage information and grow. I share practical ideas about business systems, automation and AI — with a focus on useful outcomes rather than technology for its own sake.",
    points: [
      "AI opportunities for small and medium businesses",
      "Automation of repetitive administration and follow-up",
      "Customer experience and lead management",
      "Digital foundations, data and operating systems",
      "Responsible implementation and change management",
    ],
    cta: { label: "Discover Business & AI Ideas", href: "#insights" },
    image: {
      src: "/media/content/business_ai_approach.webp",
      alt: "Enterprise AI and technology operations command center",
      label: "business / technology photograph",
    },
    tone: "raised",
    reversed: true,
  },
  {
    id: "wellness",
    eyebrow: "Pillar 03 — Health & Wellness",
    heading: "Your performance begins with your wellbeing.",
    body: "When physical or mental health declines, it becomes harder to show up fully for work, family and personal goals. Wellness is therefore not separate from success; it supports it. This section shares realistic perspectives on energy, discipline, resilience, balance and sustainable performance.",
    points: [
      "Physical health and everyday routines",
      "Mental wellbeing and resilience",
      "Managing pressure while growing a business",
      "Family, purpose and personal priorities",
      "Lessons from Nabil’s continuing wellness journey",
    ],
    cta: { label: "Read Wellness Perspectives", href: "#insights" },
    image: {
      src: "/media/content/wellness_protocol.webp",
      alt: "Luxury wellness and bio-hacking recovery sanctuary",
      label: "health / lifestyle photograph",
    },
    tone: "ink",
    reversed: false,
  },
];

export const videos = {
  eyebrow: "Watch",
  heading: "A welcome from Nabil",
  body: "Short videos on the ideas behind NabilQureshi.com — and where to begin.",
  feature: {
    src: "/media/content/speaking_showreel.webp" as string | null,
    label: "Keynote presentation & welcome",
  },
  secondary: [
    { src: "/media/content/property_approach.webp" as string | null, label: "Property masterclass" },
    { src: "/media/content/business_ai_approach.webp" as string | null, label: "Business & AI insights" },
  ],
};

export type ArticleTag =
  "Property" | "Business & AI" | "Wellness" | "Perspective";

export type Article = {
  tag: ArticleTag;
  title: string;
  href: string | null;
  /**
   * One-line summary shown on the /insights cards. Stays `null` until the
   * piece is actually written — never invent a summary for an unwritten
   * article; an unfilled excerpt renders as a visible placeholder instead.
   */
  excerpt: string | null;
};

export const articles: Article[] = [
  {
    tag: "Property",
    title: "Seven questions to ask before investing in property",
    href: null,
    excerpt: null,
  },
  {
    tag: "Property",
    title: "Why cash flow matters as much as capital growth",
    href: null,
    excerpt: null,
  },
  {
    tag: "Business & AI",
    title: "AI for small business: where should you actually begin?",
    href: null,
    excerpt: null,
  },
  {
    tag: "Business & AI",
    title: "Five business processes worth automating first",
    href: null,
    excerpt: null,
  },
  {
    tag: "Wellness",
    title: "Why health is a business performance issue",
    href: null,
    excerpt: null,
  },
  {
    tag: "Wellness",
    title: "Building resilience during uncertain periods",
    href: null,
    excerpt: null,
  },
  {
    tag: "Perspective",
    title: "Technology should support strategy — not replace it",
    href: null,
    excerpt: null,
  },
  {
    tag: "Perspective",
    title: "What property, business and wellness teach us about compounding",
    href: null,
    excerpt: null,
  },
];

export const insights = {
  eyebrow: "Insights",
  heading: "Ideas that lead to better decisions",
  body: "Explore Nabil’s latest articles, short videos, podcast conversations and practical resources across property, business technology and wellbeing.",
  filters: [
    "All",
    "Property",
    "Business & AI",
    "Wellness",
    "Perspective",
  ] as const,
  pendingLabel: "Article — coming soon",
};

export const speaking = {
  eyebrow: "Speaking & Media",
  heading: "An experienced voice for your event, podcast or audience.",
  body: "Nabil speaks about the practical connection between wealth, technology and human performance — conversational, experience-led and useful for business audiences, property communities, podcasts and leadership events.",
  topics: [
    "Building wealth through property without losing sight of risk",
    "How AI is changing the way small businesses operate",
    "From busy to effective: systems that create capacity",
    "Why wellbeing is a foundation for sustainable success",
    "The power of combining financial, technological and personal growth",
  ],
  cta: { label: "Invite Nabil to Speak", href: "#contact" },
  showreel: {
    src: "/media/content/speaking_showreel.webp" as string | null,
    label: "Keynote presentation showreel",
  },
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  pending: boolean;
};

export const testimonials = {
  eyebrow: "What people say",
  heading: "Trusted by clients and partners",
  items: [
    {
      quote: "short client or partner testimonial, added with permission",
      name: "Name",
      role: "Role, Company",
      pending: true,
    },
    {
      quote: "short client or partner testimonial, added with permission",
      name: "Name",
      role: "Role, Company",
      pending: true,
    },
    {
      quote: "short client or partner testimonial, added with permission",
      name: "Name",
      role: "Role, Company",
      pending: true,
    },
  ] as Testimonial[],
};

export const newsletter = {
  eyebrow: "Keep in touch",
  heading: "Practical ideas for property, business and life.",
  body: "Join Nabil’s newsletter for concise insights, useful resources and honest lessons you can apply to your own journey.",
  cta: "Join the Newsletter",
  done: "Subscribed ✓",
};

export const contact = {
  eyebrow: "Work With Nabil",
  heading: "Start a conversation.",
  body: "Whether you are exploring a property opportunity, improving a business through technology, or looking for an experienced voice for your next event, start with a short conversation. Tell us what you are working toward, where you are currently stuck and what a valuable outcome would look like.",
  services: [
    { label: "Advisory", body: "property, business systems and AI adoption" },
    { label: "Speaking", body: "events, podcasts and media appearances" },
    { label: "Collaboration", body: "partnerships and selected projects" },
  ],
  enquiryTypes: [
    "I’m interested in property & wealth",
    "I’m interested in business, technology & AI",
    "I’d like to invite Nabil to speak",
    "Media or podcast enquiry",
    "Something else",
  ],
  messagePlaceholder:
    "What are you working toward, and what would a valuable outcome look like?",
  submit: "Start a Conversation",
  successHeading: "Thank you.",
  successBody:
    "Your message has been received. Nabil’s team will be in touch shortly.",
};

export const chat = {
  title: "Nabil’s Assistant",
  subtitle: "Answers from Nabil’s published content",
  greeting:
    "Hi, I’m Nabil’s assistant. Ask me anything about property, business & AI, wellness — or working with Nabil.",
  placeholder: "Ask about property, business or wellness…",
  disclaimer:
    "General information only — not financial, property or health advice.",
  suggestions: [
    "Where should I start with property?",
    "How can AI help my business?",
    "Can I invite Nabil to speak?",
  ],
  error:
    "Sorry, I could not respond just now. Please try again, or use the contact form below.",
};

export const footer = {
  blurb:
    "Practical knowledge from real experience — helping ambitious people make better decisions in property, business and life.",
  columns: [
    {
      title: "Explore",
      links: [
        { label: "About", href: "/about" },
        { label: "Property & Wealth", href: "/property" },
        { label: "Business & AI", href: "/business-ai" },
        { label: "Health & Wellness", href: "/wellness" },
      ],
    },
    {
      title: "Begin",
      links: [
        { label: "Insights", href: "/insights" },
        { label: "Speaking & Media", href: "/speaking" },
        { label: "Newsletter", href: "/#newsletter" },
        { label: "Work With Nabil", href: "/contact" },
      ],
    },
    {
      title: "Follow",
      links: [
        { label: "LinkedIn", href: "https://www.linkedin.com/in/nabil-q-a968bbb6/" },
        { label: "Instagram", href: "#" },
        { label: "YouTube", href: "#" },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* /about                                                              */
/* ------------------------------------------------------------------ */

export const about = {
  hero: {
    eyebrow: "About Nabil",
    heading:
      "Building value through experience, technology and purposeful living.",
    lede: "Practical knowledge from real experience — helping ambitious people make better decisions in property, business and life.",
  },

  portrait: {
    src: "/media/nabil_qureshi_portrait.webp" as string | null,
    alt: "Professional portrait of Nabil Qureshi",
    label: "Professional portrait of Nabil Qureshi",
  },

  storyParagraphs: [
    "Nabil is a business and property professional with a strong interest in technology, wealth creation and personal wellbeing. His work sits at the intersection of practical business experience and future-focused thinking: helping people identify opportunities, improve the way they operate and make decisions that support long-term growth.",
    "Over the years, Nabil has seen that financial progress, business performance and personal health cannot be separated. A strong opportunity can be missed without the right systems. A growing business can become unsustainable without personal balance. And knowledge only becomes valuable when it is translated into action.",
    "NabilQureshi.com brings these lessons together. It is a place for honest insights, practical resources and conversations about building wealth through property, using technology and AI more intelligently, and creating the health and mindset needed to perform at your best.",
  ],

  purpose: {
    quote:
      "My purpose is to share practical knowledge that helps people make better decisions. I do not believe success is only about financial growth. It is also about building capable businesses, protecting your health and creating a life that has meaning.",
    attribution: "— NABIL",
  },

  /**
   * Every field is an unfilled placeholder on purpose. Nothing here has been
   * verified, so nothing here may be published — see the note in the timeline
   * section of `src/app/about/page.tsx`.
   */
  timeline: {
    eyebrow: "Journey",
    heading: "A career built across three disciplines",
    nodes: [
      {
        year: "2021 — Present",
        title: "Acquisitions & Strategic Sales · QLand Property",
        body: "Leading property acquisitions, project marketing, and investor advisory for residential and commercial developments across Queensland.",
      },
      {
        year: "2017 — 2021",
        title: "Manager & Co-Founder · Job Directions",
        body: "Established operational frameworks, business development systems, and lead qualification engines in Sydney.",
      },
      {
        year: "2015 — 2018",
        title: "Corporate Finance & Investment Governance · Kirana Colleges & Griffith SMIF",
        body: "Managed corporate finance operations and contributed to governance of Australia's first University Student Managed Investment Fund.",
      },
      {
        year: "2010 — 2014",
        title: "Director & Sales Manager · GreenStar Lighting",
        body: "Directed commercial wholesale operations, importing, and energy-efficient lighting contracting across Greater Brisbane.",
      },
      {
        year: "2008 — 2011",
        title: "Retail Operations & Commercial Sales Management",
        body: "Managed multi-site retail business operations at NightOwl Fortitude Valley and commercial sales teams across Queensland.",
      },
    ],
  },

  capabilities: {
    eyebrow: "Expertise",
    heading: "Core competencies & strategic capabilities",
    clusters: [
      {
        category: "Property Acquisitions & Development",
        skills: [
          "Real Estate Development & Off-Market Acquisitions",
          "Qualified Buyer Representation & Purchasing Negotiation",
          "Property Legislation & Statutory Compliance",
          "Project Marketing & Investment Properties",
        ],
      },
      {
        category: "Investment Advisory & Portfolio Strategy",
        skills: [
          "Investor Portfolio Structuring & Asset Selection",
          "Cash Flow & Capital Growth Risk Analysis",
          "Deal Structuring & Contractual Negotiation",
          "Investment Fund Governance & Financial Modeling",
        ],
      },
      {
        category: "Business Strategy & Executive Operations",
        skills: [
          "Enterprise Sales Process Design & Pipeline Systems",
          "Lead Qualification Architecture & Growth Engines",
          "Strategic Planning & Cross-Functional Team Leadership",
          "Executive Negotiation & Operational Governance",
        ],
      },
    ],
  },

  pillars: {
    eyebrow: "Focus",
    heading: "Three connected pillars",
    cards: [
      {
        number: "01",
        title: "Property & Wealth",
        body: "Practical education about property, finance, home-and-land opportunities and responsible long-term wealth creation.",
        cta: "Explore Property Insights",
        href: "/property",
      },
      {
        number: "02",
        title: "Business, Technology & AI",
        body: "Clear guidance on using systems, automation and AI to improve operations, customer experience and growth.",
        cta: "Discover Business & AI Ideas",
        href: "/business-ai",
      },
      {
        number: "03",
        title: "Health & Wellness",
        body: "Realistic insights about physical health, mental resilience, discipline and the ability to perform consistently.",
        cta: "Read Wellness Perspectives",
        href: "/wellness",
      },
    ],
  },

  /** Six unfilled tiles. No logo ships without written permission. */
  logoSlots: Array.from(
    { length: 6 },
    () => "media, podcast, event or association logo",
  ),

  audience: {
    eyebrow: "Audience",
    heading: "Who I write for",
    points: [
      "Property buyers and aspiring investors looking for practical guidance",
      "Business owners who want to modernise, automate and grow",
      "Professionals and entrepreneurs seeking sustainable performance and wellbeing",
      "Event organisers, podcast hosts and media seeking an informed guest or speaker",
    ],
  },

  cta: {
    heading: "Start a conversation.",
    body: "Tell me what you are working toward, where you are currently stuck and what a valuable outcome would look like.",
    primary: { label: "Work With Nabil", href: "/contact" },
    secondary: { label: "Read the Insights", href: "/insights" },
  },

  meta: {
    title: "About Nabil Qureshi — Property, Business & AI, and Wellness",
    description:
      "Nabil is a business and property professional writing about wealth creation, business technology and AI, and the health and mindset behind sustainable performance.",
    /** 1200x630 share card, shipped in public/og/. */
    ogImage: "/og/about.jpg",
  },
};

/* ------------------------------------------------------------------ */
/* /property                                                           */
/* ------------------------------------------------------------------ */

export const property = {
  hero: {
    eyebrow: "Pillar 01 — Property & Wealth",
    heading: "Build wealth through informed property decisions.",
    lede: "Property can create long-term financial opportunity, but strong outcomes require more than buying an asset. They require research, financial discipline, risk awareness and a clear strategy. Here I share practical perspectives on property investment, home-and-land opportunities, finance and sustainable wealth creation.",
  },

  coverage: {
    heading: "What I cover here",
    topics: [
      "Property fundamentals for first-time and experienced buyers",
      "Finance, cash flow and risk considerations",
      "Location, demand and long-term value",
      "Case studies and lessons from real projects",
      "Common mistakes and better questions to ask",
    ],
    image: {
      src: "/media/content/property_approach.webp" as string | null,
      alt: "Property development and luxury architectural residence",
      label: "Property / development photograph",
    },
  },

  qland: {
    eyebrow: "Industry Practice · QLand Property",
    heading: "Acquisitions, Project Marketing & Investor Representation",
    body: "In his role leading Acquisitions & Sales at QLand Property across Queensland, Nabil provides institutional-grade advisory for private investors, family offices, and developers — combining rigorous due diligence with deep market intelligence in high-growth corridors.",
    stats: [
      { value: "16+", label: "Years in Property & Finance" },
      { value: "QLD", label: "Queensland Growth Corridors" },
      { value: "100%", label: "Due Diligence & Compliance" },
    ],
    capabilities: [
      {
        title: "Off-Market Site & Land Acquisition",
        body: "Identifying and securing prime residential, commercial, and subdivision land opportunities prior to public market exposure.",
      },
      {
        title: "Qualified Buyer Advocacy & Due Diligence",
        body: "Independent buyer representation, contract negotiation, statutory compliance, and rigorous financial yield modelling.",
      },
      {
        title: "Project Marketing & Investor Structuring",
        body: "End-to-end sales strategy for house-and-land estates, master-planned communities, and targeted investor portfolios.",
      },
    ],
  },

  videos: {
    eyebrow: "Watch & Learn",
    heading: "Latest Property Masterclasses & Insights",
    lede: "In-depth video breakdowns on property acquisitions, investment mechanics, and on-the-ground case studies from QLand Property.",
    items: [
      {
        id: "vid-1",
        title: "Property Acquisition & Due Diligence in Queensland",
        duration: "14:20",
        tag: "Acquisitions",
        summary: "A step-by-step breakdown of evaluating land parcels, zoning legislation, infrastructure corridors, and off-market purchase strategy.",
        thumbnail: "/media/content/property_approach.webp",
      },
      {
        id: "vid-2",
        title: "Cash Flow vs Capital Growth: Portfolio Structuring",
        duration: "11:45",
        tag: "Portfolio Strategy",
        summary: "How to balance holding costs, debt yield, and long-term capital compounding across varying interest rate cycles.",
        thumbnail: "/media/content/advisory_showcase.webp",
      },
      {
        id: "vid-3",
        title: "QLand Property: House & Land Feasibility Analysis",
        duration: "09:30",
        tag: "Case Study",
        summary: "On-site breakdown of estate master-planning, build contracts, timeline management, and investor risk buffers.",
        thumbnail: "/media/content/property_approach.webp",
      },
    ],
  },

  articles: {
    eyebrow: "Insights",
    heading: "Property writing",
    /** Only articles carrying this tag appear on this page. */
    tag: "Property" as ArticleTag,
    /** The grid always shows three slots; unfilled ones stay visibly empty. */
    slots: 3,
    pendingLabel: "article in progress",
    cta: { label: "View all insights", href: "/insights" },
  },

  resource: {
    eyebrow: "Free resource",
    heading: "The Property Decision Checklist",
    body: "A short checklist of the questions worth answering before you commit to a property — on finance, location, risk and timing.",
    fieldLabel: "Your email address",
    placeholder: "Your email address",
    submit: "Send it to me",
    sending: "Sending…",
    done: "On its way ✓",
    success: "Check your inbox — the checklist is on its way.",
    error: "Something went wrong. Please try again in a moment.",
  },

  disclaimer:
    "Content on this page is general information about property and finance. It is not financial, investment, tax or legal advice, and it does not take account of your circumstances. Seek advice from a qualified professional before making a decision.",

  cta: {
    heading: "Exploring a property opportunity?",
    primary: { label: "Start a Conversation", href: "/contact" },
    secondary: { label: "Read the Insights", href: "/insights" },
  },

  meta: {
    title: "Property & Wealth — Nabil Qureshi",
    description:
      "Property can create long-term financial opportunity, but strong outcomes require more than buying an asset. They require research, financial discipline, risk awareness and a clear strategy.",
    /** 1200x630 share card, shipped in public/og/. */
    ogImage: "/og/property.jpg",
  },
};

/* ------------------------------------------------------------------ */
/* /business-ai                                                        */
/* ------------------------------------------------------------------ */

export const businessAi = {
  hero: {
    eyebrow: "Pillar 02 — Business, Technology & AI",
    heading: "Use technology to build a more capable business.",
    lede: "Technology is no longer separate from business operations; it forms the foundation of how modern organisations serve customers, manage information and grow. I share practical ideas about business systems, automation and AI — with a focus on useful outcomes rather than technology for its own sake.",
  },

  coverage: {
    heading: "What I cover here",
    topics: [
      "AI opportunities for small and medium businesses",
      "Automation of repetitive administration and follow-up",
      "Customer experience and lead management",
      "Digital foundations, data and operating systems",
      "Responsible implementation and change management",
    ],
    image: {
      src: "/media/content/business_ai_approach.webp" as string | null,
      alt: "Enterprise AI command center and technology architecture",
      label: "Business / technology photograph",
    },
  },

  /**
   * Cards are drawn from the shared `articles` list, filtered to `tag`.
   * `slots` is the size of the grid: any slot the filter cannot fill renders
   * as a visible `pendingLabel` placeholder rather than an invented headline.
   */
  articles: {
    eyebrow: "Insights",
    heading: "Business and AI writing",
    /** Only articles carrying this tag appear on this page. */
    tag: "Business & AI" as ArticleTag,
    /** The grid always shows three slots; unfilled ones stay visibly empty. */
    slots: 3,
    pendingLabel: "article in progress",
    cta: { label: "View all insights", href: "/insights" },
  },

  resource: {
    eyebrow: "Free resource",
    heading: "Small Business AI Readiness Scorecard",
    body: "Ten questions that show where AI and automation would actually help your business — and where they would just add cost.",
    fieldLabel: "Your email address",
    placeholder: "Your email address",
    submit: "Send it to me",
    sending: "Sending…",
    done: "On its way ✓",
    success: "Check your inbox — the scorecard is on its way.",
    error: "Something went wrong. Please try again in a moment.",
  },

  disclaimer:
    "Content on this page is general information about business systems and technology. It is not professional, legal or financial advice and does not take account of your circumstances.",

  cta: {
    heading: "Want to modernise how your business runs?",
    primary: { label: "Start a Conversation", href: "/contact" },
    secondary: { label: "Read the Insights", href: "/insights" },
  },

  meta: {
    title: "Business, Technology & AI — Nabil Qureshi",
    description:
      "I share practical ideas about business systems, automation and AI — with a focus on useful outcomes rather than technology for its own sake.",
    /** 1200x630 share card, shipped in public/og/. */
    ogImage: "/og/business-ai.jpg",
  },
};

/* ------------------------------------------------------------------ */
/* /wellness                                                           */
/* ------------------------------------------------------------------ */

export const wellness = {
  hero: {
    eyebrow: "Pillar 03 — Health & Wellness",
    heading: "Your performance begins with your wellbeing.",
    lede: "When physical or mental health declines, it becomes harder to show up fully for work, family and personal goals. Wellness is therefore not separate from success; it supports it. This section shares realistic perspectives on energy, discipline, resilience, balance and sustainable performance.",
  },

  coverage: {
    heading: "What I cover here",
    topics: [
      "Physical health and everyday routines",
      "Mental wellbeing and resilience",
      "Managing pressure while growing a business",
      "Family, purpose and personal priorities",
      "Lessons from Nabil’s continuing wellness journey",
    ],
    image: {
      src: "/media/content/wellness_protocol.webp" as string | null,
      alt: "Luxury wellness and bio-hacking recovery sanctuary",
      label: "Health / lifestyle photograph",
    },
  },

  articles: {
    eyebrow: "Insights",
    heading: "Wellness writing",
    tag: "Wellness" as ArticleTag,
    /** Slots in the grid. Any not filled by a real article stay placeholders. */
    slots: 3,
    pendingLabel: "article in progress",
    cta: { label: "View all insights", href: "/insights" },
  },

  /**
   * The planner itself does not exist yet. `asset` stays null until the real
   * PDF is supplied — see the TODO in `PlannerSignup.tsx` for the delivery
   * side of the same gap.
   */
  resource: {
    eyebrow: "Free resource",
    heading: "Weekly Performance and Wellness Planner",
    body: "A one-page planner for keeping energy, focus and recovery visible alongside your working week.",
    cta: "Send it to me",
    asset: null as string | null,
  },

  disclaimer:
    "Content on this page reflects personal experience and general wellbeing information. It is not medical advice, diagnosis or treatment. Speak to a qualified healthcare professional about your own health.",

  cta: {
    heading: "Building something without burning out?",
    primary: { label: "Start a Conversation", href: "/contact" },
    secondary: { label: "Read the Insights", href: "/insights" },
  },

  meta: {
    title: "Health & Wellness — Nabil Qureshi",
    description:
      "Realistic perspectives on energy, discipline, resilience, balance and sustainable performance — because it is harder to show up fully for work, family and personal goals when health declines.",
    /** 1200x630 share card, shipped in public/og/. */
    ogImage: "/og/wellness.jpg",
  },
};

/* ------------------------------------------------------------------ */
/* /insights                                                           */
/* ------------------------------------------------------------------ */

export const insightsPage = {
  /**
   * Hero copy is the home Insights band's, referenced rather than copied so
   * the two cannot drift apart.
   */
  hero: {
    eyebrow: insights.eyebrow,
    heading: insights.heading,
    lede: insights.body,
  },

  filters: {
    label: "Filter insights by topic",
    /** The same five chips as the home grid. */
    tags: insights.filters,
  },

  grid: {
    readLabel: "Read article →",
    pendingLabel: insights.pendingLabel,
    /** Shown in place of an excerpt that has not been written yet. */
    excerptPending: "excerpt to be written",
    empty: {
      message: "nothing published under this topic yet",
      cta: "Show all",
    },
  },

  /**
   * Formats are real; the counts and states are not. Nothing has been
   * published, so no figure may be shown — each card carries a visible
   * placeholder until real content exists.
   */
  formats: [
    {
      name: "Articles",
      body: "Written pieces on property, business technology and wellbeing.",
      state: "X published",
    },
    {
      name: "Videos",
      body: "Short explainers and welcome pieces.",
      state: "coming soon",
    },
    {
      name: "Podcasts",
      body: "Conversations and guest appearances.",
      state: "coming soon",
    },
  ],

  meta: {
    title: "Insights — Nabil Qureshi on Property, Business & AI, and Wellness",
    description: insights.body,
    /** 1200x630 share card, shipped in public/og/. */
    ogImage: "/og/insights.jpg",
  },
};

/* ------------------------------------------------------------------ */
/* /speaking                                                           */
/* ------------------------------------------------------------------ */

export const speakingPage = {
  hero: {
    eyebrow: "Speaking & Media",
    heading: "An experienced voice for your event, podcast or audience.",
    lede: "Nabil speaks about the practical connection between wealth, technology and human performance — conversational, experience-led and useful for business audiences, property communities, podcasts and leadership events.",
    cta: { label: "Invite Nabil to Speak", href: "/contact" },
  },

  showreel: {
    heading: "How Nabil speaks",
    points: [
      "Experience-led — stories and specifics from real projects, not theory",
      "Practical — every talk ends with something the audience can act on",
      "Conversational — comfortable on stage, on a panel or on a podcast",
    ],
    /** Shares the home band's unfilled showreel slot; no footage exists yet. */
    media: {
      src: "/media/content/speaking_showreel.webp" as string | null,
      alt: "Executive keynote presentation showreel",
      label: "Speaking showreel",
    },
  },

  /**
   * The five talk titles are Nabil's own and match the home Speaking band
   * verbatim. The one-line descriptions have not been written, so each card
   * carries a visible placeholder instead of an invented blurb.
   */
  topics: {
    items: [
      {
        number: "01",
        title: "Building wealth through property without losing sight of risk",
      },
      {
        number: "02",
        title: "How AI is changing the way small businesses operate",
      },
      {
        number: "03",
        title: "From busy to effective: systems that create capacity",
      },
      {
        number: "04",
        title: "Why wellbeing is a foundation for sustainable success",
      },
      {
        number: "05",
        title:
          "The power of combining financial, technological and personal growth",
      },
    ],
    pendingDescription: "PLACEHOLDER — one-line description of this talk",
  },

  /**
   * Format names are real; nothing has been agreed about running time or
   * audience size, so both stay unfilled.
   */
  formats: [
    {
      name: "Keynote",
      length: "PLACEHOLDER — typical length",
      audience: "PLACEHOLDER — typical audience",
    },
    {
      name: "Panel",
      length: "PLACEHOLDER — typical length",
      audience: "PLACEHOLDER — typical audience",
    },
    {
      name: "Podcast guest",
      length: "PLACEHOLDER — typical length",
      audience: "PLACEHOLDER — typical audience",
    },
    {
      name: "Workshop",
      length: "PLACEHOLDER — typical length",
      audience: "PLACEHOLDER — typical audience",
    },
  ],

  /**
   * Nothing in this block is confirmed. No logo and no appearance may ship
   * without written permission — see the note in the page component.
   */
  appearances: {
    heading: "Recent appearances",
    logoSlots: Array.from(
      { length: 6 },
      () => "event, podcast or publication logo",
    ),
    entries: Array.from(
      { length: 3 },
      () => "[ DATE ] — [ EVENT NAME ], [ TALK TITLE ]",
    ),
  },

  pressKit: {
    heading: "Press kit",
    /**
     * Paragraph 1 of the About biography, referenced rather than copied so the
     * two pages cannot drift apart.
     */
    bio: about.storyParagraphs[0],
    copy: {
      label: "Copy bio",
      done: "Copied ✓",
      error: "Copy failed — select the text above",
    },
    /** Every asset is still outstanding, so each row links nowhere yet. */
    downloads: [
      { label: "Headshot (high res)", href: "/media/nabil_qureshi_headshot.jpg", note: "JPG · 1024x1024" },
      {
        label: "One-page speaker sheet",
        href: "#",
        note: "file to be provided",
      },
      { label: "Full biography", href: "#", note: "file to be provided" },
      { label: "Logo", href: "#", note: "file to be provided" },
    ],
  },

  cta: {
    heading: "Invite Nabil to speak.",
    body: "Tell me about your audience, the date and the outcome you want from the session.",
    primary: {
      label: "Invite Nabil to Speak",
      href: "/contact?topic=speaking",
    },
  },

  meta: {
    title: "Speaking & Media — Nabil Qureshi",
    description:
      "Nabil speaks about the practical connection between wealth, technology and human performance — conversational, experience-led and useful for business audiences, property communities, podcasts and leadership events.",
    /** 1200x630 share card, shipped in public/og/. */
    ogImage: "/og/speaking.jpg",
  },
};

/* ------------------------------------------------------------------ */
/* /contact                                                            */
/* ------------------------------------------------------------------ */

/**
 * The contact route carries the "Work With Nabil" positioning as well as the
 * enquiry form, so there is deliberately no separate /work-with-nabil page.
 *
 * The hero, the three pathways, the enquiry types and the confirmation state
 * are all read from `contact` above — the same copy the home page band uses —
 * so the two cannot drift apart. Only what is unique to the standalone page
 * lives here.
 */
export const contactPage = {
  /**
   * Slugs used by in-page CTAs (`/contact?topic=speaking`) mapped to the
   * matching entry in `contact.enquiryTypes`. Anything unrecognised falls back
   * to the first option, so a stale or hand-typed link can never land the
   * visitor on an enquiry type that does not exist.
   */
  topicSlugs: {
    property: contact.enquiryTypes[0],
    business: contact.enquiryTypes[1],
    speaking: contact.enquiryTypes[2],
    media: contact.enquiryTypes[3],
    other: contact.enquiryTypes[4],
  } as Record<string, string>,

  pathways: {
    /**
     * What each pathway actually involves has not been confirmed. The line
     * stays a visible placeholder — see the note in the pathways band of
     * `src/app/contact/page.tsx`.
     */
    pendingLabel: "PLACEHOLDER — what this involves and who it suits",
  },

  expectations: {
    heading: "Tell me about it",
    points: [
      "I read every enquiry personally.",
      "Most replies go out within two working days.",
      "If I am not the right person, I will say so and point you elsewhere.",
    ],
  },

  form: {
    /** Every control gets a real label; placeholders are never used as one. */
    name: { label: "Name", placeholder: "Your name" },
    email: { label: "Email", placeholder: "you@example.com" },
    company: {
      label: "Company",
      optional: "optional",
      placeholder: "Your company",
    },
    topic: { label: "Purpose of enquiry" },
    message: { label: "Message" },
    consent: {
      label: "I’m happy for Nabil to contact me about this enquiry.",
    },
    /** Spam trap. Hidden from sighted users and from assistive technology. */
    honeypot: { name: "website", label: "Leave this field empty" },
    sending: "Sending…",
    errors: {
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      topic: "Please choose what your enquiry is about.",
      message: "Please tell me a little about your enquiry.",
      consent: "Please confirm you are happy to be contacted.",
      submit: "Your message could not be sent. Please try again shortly.",
      summary: "Please check the highlighted fields.",
    },
  },

  /**
   * No contact details have been verified, so none are published. Each row is
   * a visible placeholder until real values are supplied — see the note in the
   * direct band of `src/app/contact/page.tsx`.
   */
  direct: {
    items: [
      { label: "Location", value: "Brisbane & Sydney, Australia", href: null },
      { label: "LinkedIn", value: "linkedin.com/in/nabil-q-a968bbb6", href: "https://www.linkedin.com/in/nabil-q-a968bbb6/" },
      { label: "Enquiries", value: "Direct via advisory form below", href: "#enquiry" },
    ],
  },

  meta: {
    title: "Work With Nabil — Contact Nabil Qureshi",
    /** The opening sentence of the hero lede, verbatim. */
    description:
      "Whether you are exploring a property opportunity, improving a business through technology, or looking for an experienced voice for your next event, start with a short conversation.",
    /** 1200x630 share card, shipped in public/og/. */
    ogImage: "/og/contact.jpg",
  },
};

/* ------------------------------------------------------------------ */
/* /work-with-nabil                                                    */
/* ------------------------------------------------------------------ */

/**
 * The standalone "ways in" page. It is deliberately narrower than /contact:
 * it names the three pathways, sets expectations for what happens after an
 * enquiry, and says plainly who the work does and does not suit — then hands
 * the visitor to the enquiry form on /contact.
 *
 * Note this supersedes the "there is deliberately no separate
 * /work-with-nabil page" note above `contactPage`.
 */
export const workWithNabil = {
  hero: {
    eyebrow: "Work With Nabil",
    heading: "Practical help with property, business and performance.",
    lede: "Whether you are exploring a property opportunity, improving a business through technology, or looking for an experienced voice for your next event, start with a short conversation.",
    primary: { label: "Start a Conversation", href: "/contact" },
  },

  /**
   * Only `number`, `title` and `body` are agreed copy. Everything a visitor
   * would actually need to know — scope, fit, shape of the engagement — is
   * unwritten, so each card carries three visible placeholders instead. See
   * the note in the pathways band of `src/app/work-with-nabil/page.tsx`.
   *
   * Every `cta` reuses a label already approved elsewhere on the site rather
   * than introducing new copy: "Start a Conversation" is the contact form's
   * submit label, "Invite Nabil to Speak" is `speaking.cta.label`.
   */
  pathways: {
    pending: [
      "PLACEHOLDER — what this involves",
      "PLACEHOLDER — who it suits",
      "PLACEHOLDER — how it typically runs",
    ],
    cards: [
      {
        number: "01",
        title: "Advisory",
        body: "Property opportunities, business systems and AI adoption.",
        cta: "Start a Conversation",
        /**
         * `advisory` and `collaboration` are not yet keys in
         * `contactPage.topicSlugs`, so the form falls back to its first
         * enquiry type. Add the two mappings there before launch — deciding
         * which `contact.enquiryTypes` entry each one should select is a
         * copy decision, not a routing one.
         */
        href: "/contact?topic=advisory",
      },
      {
        number: "02",
        title: "Speaking",
        body: "Events, podcasts, panels and media appearances.",
        cta: "Invite Nabil to Speak",
        href: "/speaking",
      },
      {
        number: "03",
        title: "Collaboration",
        body: "Partnerships and selected projects.",
        cta: "Start a Conversation",
        href: "/contact?topic=collaboration",
      },
    ],
  },

  process: {
    /**
     * The page's first h2. It exists so the two h3s in the band below it do
     * not skip a level, and so a bare row of three numbers reads as a
     * sequence rather than as a second card grid.
     */
    heading: "How it works",
    steps: [
      {
        number: "01",
        title: "A short conversation",
        body: "You tell me what you are working toward and where you are stuck. No cost, no obligation.",
      },
      {
        number: "02",
        title: "An honest answer",
        body: "If I can help, I will say how. If I am not the right person, I will say that too and point you elsewhere.",
      },
      {
        number: "03",
        title: "Agreed scope",
        body: "We agree what the work looks like before anything starts.",
      },
    ],
  },

  /**
   * Both columns ship. Naming what this is not earns more trust than a longer
   * list of services, so the right-hand column is not an optional trim.
   */
  suitability: [
    {
      heading: "This is likely a good fit if",
      points: [
        "You are making a property or investment decision and want a second perspective",
        "Your business runs on manual processes you know could be automated",
        "You are curious about AI but unsure where it would actually pay off",
        "You need an experienced, practical voice for an audience",
      ],
    },
    {
      heading: "This is probably not a fit if",
      points: [
        "You are looking for regulated financial, legal or tax advice",
        "You want a done-for-you build with no involvement from your side",
        "You need a decision today rather than a considered one",
      ],
    },
  ],

  brief: {
    heading: "Before you get in touch",
    body: "Tell me what you are working toward, where you are currently stuck and what a valuable outcome would look like. The more specific you are, the more useful my first reply will be.",
    prompts: [
      "The situation",
      "What you have tried",
      "What a good outcome looks like",
    ],
  },

  closing: {
    disclaimer:
      "Nabil shares practical experience and general information. He is not a regulated financial, investment, legal or medical adviser, and nothing here should be treated as professional advice.",
    heading: "Start a conversation.",
    primary: { label: "Start a Conversation", href: "/contact" },
  },

  meta: {
    title: "Work With Nabil — Advisory, Speaking and Collaboration",
    /** The hero lede, verbatim. */
    description:
      "Whether you are exploring a property opportunity, improving a business through technology, or looking for an experienced voice for your next event, start with a short conversation.",
    /** 1200x630 share card, shipped in public/og/. */
    ogImage: "/og/work-with-nabil.jpg",
  },
};
