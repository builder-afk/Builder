import {
  HardHat,
  Compass,
  PackageCheck,
  Building,
  Landmark,
  CheckCircle2,
  TrendingUp,
  Target,
  Users,
  Eye,
  BarChart3,
  Shield,
  Layers,
  Zap,
  Globe,
  Star,
  Award,
  Search,
  FileText,
  DollarSign,
  Handshake,
  Briefcase,
  Clock,
  MessageCircle,
  Truck,
  Wrench,
  PenTool,
  Ruler,
  Palette,
  Camera,
  Box,
  Factory,
  ShieldCheck,
  BadgeCheck,
  Phone,
  BookOpen,
  LineChart,
  PiggyBank,
  Lock,
  Scale,
  Banknote,
  Receipt,
  type LucideIcon,
} from "lucide-react";

export interface NicheBenefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface NicheTestimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

export interface NichePricing {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  recommended?: boolean;
  ctaText: string;
}

export interface NicheStatistic {
  value: string;
  label: string;
  suffix?: string;
}

export interface NicheFAQ {
  question: string;
  answer: string;
}

export interface NichePageData {
  slug: string;
  title: string;
  shortTitle: string;
  badge: string;
  icon: LucideIcon;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  heroTagline: string;
  heroDescription: string;
  detailedDescription: string;
  painPoints: {
    title: string;
    description: string;
  }[];
  benefits: NicheBenefit[];
  howItWorks: {
    step: number;
    title: string;
    description: string;
    icon: LucideIcon;
  }[];
  statistics: NicheStatistic[];
  testimonials: NicheTestimonial[];
  pricing: NichePricing[];
  faqs: NicheFAQ[];
  ctaPrimary: string;
  ctaPrimaryLink: string;
  ctaSecondary: string;
  ctaSecondaryLink: string;
  relatedNiches: string[];
}

export const NICHE_PAGES: Record<string, NichePageData> = {
  contractors: {
    slug: "contractors",
    title: "Contractors & Builders",
    shortTitle: "Builders",
    badge: "For Contractors & Builders",
    icon: HardHat,
    accentColor: "#F26522",
    accentBg: "bg-orange-50",
    accentBorder: "border-orange-200",
    heroTagline: "Hundreds of contractors compete for the same projects — only the ones with strong visibility get the calls.",
    heroDescription: "Builder's Central gives you a decisive advantage by positioning your firm in front of project owners, developers, property managers, and homeowners who are actively searching for skilled building professionals.",
    detailedDescription: "In every region, hundreds of contractors compete for the same projects — but only the ones with strong visibility, verified credentials, and a compelling digital presence get the calls. General advertising, word-of-mouth, and cold outreach are no longer enough. Builder's Central puts your construction business directly where decisions are made — inside an industry-focused marketplace built exclusively for the building ecosystem.",
    painPoints: [
      { title: "Invisible to Active Buyers", description: "Your best work goes unseen because project owners can't find you when they're actively sourcing contractors." },
      { title: "Competing on Price Alone", description: "Without a strong portfolio and verified credentials, you're reduced to competing on the lowest bid." },
      { title: "Wasted Marketing Spend", description: "General advertising platforms dilute your budget across audiences that will never hire a contractor." },
      { title: "Inconsistent Lead Flow", description: "Feast-or-famine cycles because you rely on referrals and word-of-mouth instead of a predictable pipeline." },
    ],
    benefits: [
      { title: "Verified Professional Profile", description: "A dedicated, SEO-optimized company profile with verified badges, license numbers, insurance proof, and certifications that build trust instantly.", icon: BadgeCheck },
      { title: "3D Project Portfolio Showcase", description: "Showcase your completed projects with immersive 3D tours, drone footage, time-lapse builds, and before/after transformation galleries.", icon: Camera },
      { title: "Lead Generation Engine", description: "Receive qualified project inquiries directly from owners and developers who are actively sourcing contractors in your region and specialty.", icon: Target },
      { title: "Competitive Advantage Dashboard", description: "Track your profile views, inquiry rates, and market position against competitors with real-time analytics.", icon: BarChart3 },
      { title: "Priority Search Placement", description: "Premium members appear at the top of search results when owners filter by specialty, location, budget, and project type.", icon: Search },
      { title: "Direct Owner Communication", description: "Skip the middlemen. Connect directly with property owners, developers, and project managers through our secure messaging system.", icon: MessageCircle },
      { title: "Bid & Quote Management", description: "Receive, manage, and respond to project bid requests through an integrated quoting system with templates and tracking.", icon: FileText },
      { title: "Reputation & Review System", description: "Build a verified review history from completed projects that serves as social proof for future clients.", icon: Star },
    ],
    howItWorks: [
      { step: 1, title: "Create Your Verified Profile", description: "Register your construction firm, upload licenses, insurance documents, and certifications for verification.", icon: BadgeCheck },
      { step: 2, title: "Build Your 3D Portfolio", description: "Upload project photos, drone footage, and 3D tours of your completed builds to showcase quality.", icon: Camera },
      { step: 3, title: "Get Matched with Projects", description: "Our algorithm matches your specialties and service area with active project owners looking for contractors.", icon: Target },
      { step: 4, title: "Win More Projects", description: "Respond to inquiries, submit competitive quotes, and grow your business with a predictable lead pipeline.", icon: TrendingUp },
    ],
    statistics: [
      { value: "3.2", label: "Average Qualified Leads Per Week", suffix: "x" },
      { value: "68", label: "Faster Than Cold Outreach", suffix: "%" },
      { value: "₹4.5", label: "Average Project Value Connected", suffix: "Cr" },
      { value: "24", label: "Hours to First Lead (Avg)", suffix: "hrs" },
    ],
    testimonials: [
      { name: "Rajesh Kumar", role: "Managing Director", company: "Kumar Constructions Pvt Ltd", quote: "Within the first month on Builder's Central, we received 8 qualified project inquiries. Two converted into ₹2.5 Cr residential projects. The ROI is unmatched.", rating: 5 },
      { name: "Anil Sharma", role: "Founder", company: "Sharma BuildTech", quote: "We stopped spending on generic Google Ads and redirected our budget here. The leads are serious — project owners who've already seen our 3D portfolio before reaching out.", rating: 5 },
      { name: "Priya Menon", role: "Business Head", company: "Greenfield Infrastructure", quote: "The verified badge and 3D project showcase gave us instant credibility. We've doubled our project pipeline in 6 months.", rating: 5 },
    ],
    pricing: [
      { name: "Starter", price: "Free", period: "forever", description: "Get discovered by project owners with a basic verified profile.", features: ["Basic Company Profile", "Up to 3 Project Listings", "Verification Badge", "Standard Search Visibility", "Inquiry Notifications", "Community Access"], ctaText: "Get Started Free" },
      { name: "Professional", price: "₹4,999", period: "/month", description: "Premium visibility and lead generation for growing firms.", features: ["Everything in Starter", "Unlimited Project Listings", "3D Tour Integration", "Priority Search Placement", "Advanced Analytics Dashboard", "Bid Management System", "Direct Owner Messaging", "Featured in Category Pages", "Dedicated Account Manager"], recommended: true, ctaText: "Start Professional" },
      { name: "Enterprise", price: "₹14,999", period: "/month", description: "Maximum exposure for established construction companies.", features: ["Everything in Professional", "Homepage Featured Placement", "Custom Branded Microsite", "API Integration for CRM", "Multi-Location Profiles", "Priority Lead Matching", "Quarterly Market Intelligence Reports", "White-Glove Onboarding", "Custom Content Production"], ctaText: "Contact Sales" },
    ],
    faqs: [
      { question: "How quickly can I start receiving leads?", answer: "Most contractors receive their first qualified inquiry within 24-72 hours of completing their verified profile and uploading at least 3 project showcases." },
      { question: "What types of projects are available?", answer: "We connect contractors with residential, commercial, institutional, and infrastructure projects ranging from ₹10 Lakh renovations to ₹50 Cr+ developments." },
      { question: "How is this different from general marketplaces?", answer: "Builder's Central is exclusively built for the construction ecosystem. Every user is either a builder, architect, supplier, owner, or investor — meaning your audience is 100% relevant." },
      { question: "Can I manage multiple locations?", answer: "Yes. Enterprise plans support multi-location profiles with separate service area maps, team members, and project portfolios per region." },
    ],
    ctaPrimary: "List Your Construction Firm",
    ctaPrimaryLink: "/auth/signup?role=contractor",
    ctaSecondary: "Schedule a Demo",
    ctaSecondaryLink: "/contact?subject=contractor-demo",
    relatedNiches: ["architects", "suppliers", "owners"],
  },

  architects: {
    slug: "architects",
    title: "Architects, Engineers & Designers",
    shortTitle: "Architects",
    badge: "For Architects, Engineers & Designers",
    icon: Compass,
    accentColor: "#0284c7",
    accentBg: "bg-sky-50",
    accentBorder: "border-sky-200",
    heroTagline: "Your work defines projects long before construction begins — but being discovered at the right time by the right people is the real challenge.",
    heroDescription: "Even with a stunning website and active social presence, it's easy to get overlooked when owners, developers, and builders are searching for qualified design professionals inside active projects. Builder's Central positions your firm exactly where project decisions are made.",
    detailedDescription: "Architecture and design are the intellectual backbone of every project. But visibility in a crowded market remains the single biggest growth bottleneck for studios of all sizes. Decision-makers often choose architects they find inside project-planning workflows — not from cold emails or Instagram reels. Builder's Central places your studio directly into the discovery pipeline where owners, developers, and builders source design professionals for active and upcoming projects.",
    painPoints: [
      { title: "Beautiful Work, Low Discoverability", description: "Your portfolio is stunning, but the people who need to see it most — active project owners — may never find it." },
      { title: "Late-Stage Discovery", description: "By the time owners contact you, the project scope and budget may already be locked with another firm." },
      { title: "Social Media ≠ Clients", description: "Likes and followers on Instagram rarely convert to signed contracts from serious developers." },
      { title: "RFP Overload Without Context", description: "You receive generic RFPs without knowing the owner's quality expectations, budget, or design intent." },
    ],
    benefits: [
      { title: "Architecture-First Portfolio", description: "Present your work through immersive 3D walkthroughs, rendered visualizations, and interactive floor plans — not just static images.", icon: Palette },
      { title: "Early-Stage Project Matching", description: "Get discovered during project conceptualization when owners are selecting their design team — not after bids are closed.", icon: Clock },
      { title: "Specialization Taxonomy", description: "Be found by owners searching for specific expertise: residential luxury, healthcare, hospitality, institutional, industrial, landscape, and interior.", icon: Layers },
      { title: "Design Awards & Credentials", description: "Showcase RIBA, COID, IIID memberships, sustainability certifications, and design competition wins prominently.", icon: Award },
      { title: "Collaboration Network", description: "Connect with structural engineers, MEP consultants, landscape architects, and interior designers for integrated project teams.", icon: Users },
      { title: "Client Brief Intake Forms", description: "Receive structured project briefs from owners with budget range, site details, design preferences, and timeline expectations.", icon: FileText },
    ],
    howItWorks: [
      { step: 1, title: "Build Your Design Studio Profile", description: "Create a comprehensive studio profile with team bios, specializations, certifications, and design philosophy.", icon: PenTool },
      { step: 2, title: "Upload Immersive Project Galleries", description: "Showcase your best work with 3D tours, renderings, construction documentation, and before/after transformations.", icon: Camera },
      { step: 3, title: "Get Discovered by Active Owners", description: "Our platform surfaces your studio to owners and developers searching for architects within your specialty and region.", icon: Eye },
      { step: 4, title: "Win Design Commissions", description: "Receive structured project briefs, respond with your approach, and win commissions from qualified clients.", icon: Handshake },
    ],
    statistics: [
      { value: "4.8", label: "Average Lead Quality Score", suffix: "/5" },
      { value: "42", label: "Studios Expanded Client Base", suffix: "%" },
      { value: "₹8.2", label: "Average Commission Value", suffix: "Cr" },
      { value: "15", label: "Different Design Specializations", suffix: "+" },
    ],
    testimonials: [
      { name: "Ar. Neha Kapoor", role: "Principal Architect", company: "Kapoor Design Studio", quote: "Builder's Central connected us with 3 luxury villa owners in Goa within our first quarter. The structured project briefs saved us hours of back-and-forth.", rating: 5 },
      { name: "Ar. Siddharth Jain", role: "Design Director", company: "Jain & Associates", quote: "As a mid-sized studio, we were competing against large firms with bigger marketing budgets. This platform leveled the playing field with our 3D portfolio.", rating: 5 },
      { name: "Ar. Kavitha Raman", role: "Founder", company: "Studio Raman Interiors", quote: "The specialization filters meant owners found us specifically for healthcare facility design — our niche. Every inquiry was highly relevant.", rating: 4 },
    ],
    pricing: [
      { name: "Studio Starter", price: "Free", period: "forever", description: "Establish your design studio's digital presence.", features: ["Basic Studio Profile", "Up to 5 Project Showcases", "Specialization Tags", "Standard Search Listing", "Inquiry Notifications", "Professional Network Access"], ctaText: "Create Studio Profile" },
      { name: "Studio Professional", price: "₹3,999", period: "/month", description: "Premium discovery and commission pipeline for growing studios.", features: ["Everything in Starter", "Unlimited Project Showcases", "3D Tour & Render Hosting", "Priority Search Placement", "Structured Brief Intake", "Analytics & Insights Dashboard", "Direct Owner Messaging", "Awards & Certification Badges", "Team Member Profiles"], recommended: true, ctaText: "Start Professional" },
      { name: "Studio Enterprise", price: "₹11,999", period: "/month", description: "Full-scale visibility for established architecture firms.", features: ["Everything in Professional", "Homepage Featured Placement", "Custom Branded Microsite", "Multi-Office Profiles", "RFP Management System", "API & CRM Integration", "Quarterly Trend Reports", "Priority Commission Matching", "Content Production Support"], ctaText: "Contact Sales" },
    ],
    faqs: [
      { question: "Is this platform suitable for interior designers as well?", answer: "Absolutely. We support architects, interior designers, landscape architects, urban planners, and structural/MEP engineers. Each specialization has its own discovery category." },
      { question: "Can I showcase rendered visualizations and 3D walkthroughs?", answer: "Yes. We support image galleries, video embeds, 360° panoramas, and full interactive 3D property tours for each project in your portfolio." },
      { question: "How do owners find my studio?", answer: "Owners search by project type, design style, location, budget range, and specialization. Your studio appears in results that match your expertise and service area." },
      { question: "Do you support collaboration between architects and other professionals?", answer: "Yes. Our professional network feature allows architects to connect with structural engineers, MEP consultants, contractors, and suppliers for integrated project teams." },
    ],
    ctaPrimary: "Showcase Your Design Studio",
    ctaPrimaryLink: "/auth/signup?role=architect",
    ctaSecondary: "Book a Walkthrough",
    ctaSecondaryLink: "/contact?subject=architect-demo",
    relatedNiches: ["contractors", "suppliers", "owners"],
  },

  suppliers: {
    slug: "suppliers",
    title: "Suppliers, Manufacturers & Distributors",
    shortTitle: "Suppliers",
    badge: "For Suppliers, Manufacturers & Distributors",
    icon: PackageCheck,
    accentColor: "#059669",
    accentBg: "bg-emerald-50",
    accentBorder: "border-emerald-200",
    heroTagline: "Your products don't sell themselves — they sell when the right professionals specify them early and often.",
    heroDescription: "The challenge isn't quality or availability — it's visibility at the moment decisions are made. Builder's Central places your products directly in front of builders, architects, and developers while projects are being planned, specified, and sourced — not after bids are closed.",
    detailedDescription: "Building material decisions are made during the design and specification phase — long before procurement orders are placed. If your products aren't visible when architects are selecting finishes, when contractors are comparing structural materials, or when developers are budgeting projects, you're missing the highest-intent buying window in construction. Builder's Central integrates your product catalog directly into the project planning workflow.",
    painPoints: [
      { title: "Late Discovery = Lost Specifications", description: "By the time your sales team reaches a project, materials have already been specified by the architect or builder." },
      { title: "Dealer Channel Dependency", description: "You rely on dealers and distributors for reach, losing direct relationships with the architects and builders who actually specify products." },
      { title: "Trade Show Fatigue", description: "Exhibitions are expensive and the ROI is difficult to measure — contacts go cold within weeks." },
      { title: "Digital Catalog Gaps", description: "Your products lack interactive digital presence. PDFs and brochures don't compete with 3D material visualizers." },
    ],
    benefits: [
      { title: "In-Specification Product Placement", description: "Your products appear directly in project material libraries where architects and builders browse during specification and selection.", icon: Eye },
      { title: "Interactive 3D Product Catalog", description: "Upload product specs, material swatches, 3D models, and technical datasheets in an interactive digital catalog builders can explore.", icon: Box },
      { title: "Direct-to-Specifier Outreach", description: "Connect directly with the architects, engineers, and builders who specify your category of products — skip the middlemen.", icon: Target },
      { title: "Regional Distribution Mapping", description: "Display your dealer and distribution network on interactive maps so buyers can source locally with confidence.", icon: Truck },
      { title: "Project-Level Analytics", description: "Track which projects, architects, and builders are viewing, saving, and specifying your products with detailed analytics.", icon: LineChart },
      { title: "Sample Request & Quote Pipeline", description: "Receive structured sample requests and quotation inquiries with project details, quantities, and timeline requirements.", icon: Receipt },
    ],
    howItWorks: [
      { step: 1, title: "Register Your Brand", description: "Create a manufacturer/supplier profile with brand story, certifications, distribution network, and product categories.", icon: Factory },
      { step: 2, title: "Upload Product Catalog", description: "Add products with specifications, pricing, 3D material swatches, technical datasheets, and installation guides.", icon: Box },
      { step: 3, title: "Reach Active Projects", description: "Your products appear in material libraries and search results when builders and architects are selecting materials.", icon: Target },
      { step: 4, title: "Convert Specifications to Sales", description: "Receive sample requests, quotation inquiries, and bulk order leads with full project context.", icon: DollarSign },
    ],
    statistics: [
      { value: "5.4", label: "Average Monthly Specification Leads", suffix: "x" },
      { value: "₹12", label: "Annual GMV Connected", suffix: "Cr+" },
      { value: "340", label: "Active Builder & Architect Users", suffix: "+" },
      { value: "85", label: "Specification-to-Order Rate", suffix: "%" },
    ],
    testimonials: [
      { name: "Vikram Patel", role: "VP Sales", company: "GreenBoard Building Products", quote: "We went from 3 specification leads per month to over 18. The platform puts our products in front of architects at exactly the right moment — during material selection.", rating: 5 },
      { name: "Sunita Agarwal", role: "Marketing Head", company: "CeraLux Tiles & Surfaces", quote: "Our 3D material visualizer on Builder's Central generates more engagement than our entire trade show calendar combined. And the leads have project context.", rating: 5 },
      { name: "Mohit Khanna", role: "Director", company: "SteelEdge Fabrications", quote: "For the first time, we're getting direct inquiries from architects who want to specify our structural steel in upcoming projects. No more cold-calling contractors.", rating: 4 },
    ],
    pricing: [
      { name: "Catalog Starter", price: "Free", period: "forever", description: "List your brand and core product range on the platform.", features: ["Basic Manufacturer Profile", "Up to 10 Product Listings", "Standard Search Visibility", "Inquiry Notifications", "Company Certifications Display", "Dealer Locator (3 locations)"], ctaText: "List Your Products" },
      { name: "Catalog Professional", price: "₹6,999", period: "/month", description: "Premium product visibility in active project specifications.", features: ["Everything in Starter", "Unlimited Product Listings", "3D Material Swatch Viewer", "Priority Search Placement", "Sample Request Pipeline", "Specification Analytics", "Direct Architect Messaging", "Featured in Category Pages", "Bulk Quote Management"], recommended: true, ctaText: "Start Professional" },
      { name: "Catalog Enterprise", price: "₹19,999", period: "/month", description: "Full integration into the building specification ecosystem.", features: ["Everything in Professional", "Homepage Brand Placement", "Custom Product Microsite", "API Catalog Sync", "Unlimited Dealer Locations", "Project-Level Specification Tracking", "Co-Branded Content Production", "Dedicated Success Manager", "Quarterly Market Intelligence"], ctaText: "Contact Sales" },
    ],
    faqs: [
      { question: "What types of building products can we list?", answer: "All categories — structural materials (cement, steel, wood), finishes (tiles, stone, paint, flooring), fixtures (sanitaryware, lighting, hardware), MEP components, insulation, waterproofing, and more." },
      { question: "Can we see which projects are viewing our products?", answer: "Professional and Enterprise plans include specification analytics showing which architects, builders, and projects are engaging with your product catalog." },
      { question: "Do you handle logistics and order fulfillment?", answer: "No. We connect suppliers with specifiers and buyers. Order fulfillment, pricing negotiations, and logistics remain between you and the buyer." },
      { question: "Can distributors and dealers also list?", answer: "Yes. Both manufacturers and authorized distributors/dealers can create profiles. Manufacturers can also tag and manage their dealer networks on the platform." },
    ],
    ctaPrimary: "List Your Products",
    ctaPrimaryLink: "/contact?subject=supplier-onboarding",
    ctaSecondary: "Request Product Demo",
    ctaSecondaryLink: "/contact?subject=supplier-demo",
    relatedNiches: ["contractors", "architects", "owners"],
  },

  owners: {
    slug: "owners",
    title: "Project Owners & Developers",
    shortTitle: "Owners & Developers",
    badge: "For Project Owners & Developers",
    icon: Building,
    accentColor: "#7c3aed",
    accentBg: "bg-purple-50",
    accentBorder: "border-purple-200",
    heroTagline: "Instead of sorting through general search results or scattered referrals, assemble the right project team — faster and with more confidence.",
    heroDescription: "Whether you own or manage hotels, multifamily, commercial, or mixed-use developments, Builder's Central helps you compare professionals, review experience, explore past projects through 3D tours, and connect directly — all inside a construction-focused platform built for decision-makers.",
    detailedDescription: "As a project owner or developer, your most critical early-stage decision is assembling the right team of architects, contractors, and suppliers. Traditional sourcing methods — Google searches, referrals, broker recommendations — are unreliable, slow, and often biased. Builder's Central gives you a single platform where every professional is verified, every portfolio is explorable in 3D, and every connection is direct. You reduce uncertainty, expand your resource base, and keep projects moving.",
    painPoints: [
      { title: "Unreliable Referrals", description: "Word-of-mouth recommendations are biased and rarely account for your specific project type, budget, or quality expectations." },
      { title: "Opaque Vetting Process", description: "You spend weeks verifying credentials, visiting past project sites, and cross-checking references before even starting." },
      { title: "Scattered Information", description: "Professional profiles, project photos, certifications, and reviews are spread across multiple platforms with no unified view." },
      { title: "Limited Resource Pool", description: "You keep recycling the same 5-6 contractors and architects because expanding your network feels risky." },
    ],
    benefits: [
      { title: "Verified Professional Directory", description: "Browse a curated directory of builders, architects, engineers, and suppliers — all with verified licenses, insurance, and credentials.", icon: BadgeCheck },
      { title: "3D Project Due Diligence", description: "Explore professionals' past work through immersive 3D tours, drone footage, and before/after transformation galleries before contacting them.", icon: Camera },
      { title: "Intelligent Matching Engine", description: "Describe your project requirements and our algorithm matches you with the most relevant professionals based on specialty, location, and past performance.", icon: Target },
      { title: "Comparative Analysis Tools", description: "Compare multiple professionals side-by-side on pricing history, project types, ratings, certifications, and geographic coverage.", icon: Scale },
      { title: "Direct Communication", description: "No brokers, no intermediaries. Message professionals directly, request quotes, and schedule site visits through the platform.", icon: MessageCircle },
      { title: "Project Tracking Dashboard", description: "Track your active projects, team members, milestones, and communication history in a centralized owner dashboard.", icon: BarChart3 },
    ],
    howItWorks: [
      { step: 1, title: "Post Your Project Brief", description: "Describe your project — type, location, budget range, timeline, and quality expectations.", icon: FileText },
      { step: 2, title: "Receive Matched Professionals", description: "Our engine surfaces verified builders, architects, and suppliers that best match your project requirements.", icon: Users },
      { step: 3, title: "Explore & Compare 3D Portfolios", description: "Review immersive 3D tours of past projects, check ratings, and compare professionals side-by-side.", icon: Eye },
      { step: 4, title: "Connect & Build", description: "Shortlist, message, request quotes, and assemble your project team — all within the platform.", icon: Handshake },
    ],
    statistics: [
      { value: "72", label: "Faster Team Assembly", suffix: "%" },
      { value: "4.2", label: "Professionals Compared Per Project", suffix: "avg" },
      { value: "98", label: "Owner Satisfaction Rate", suffix: "%" },
      { value: "₹850", label: "Projects Connected", suffix: "Cr+" },
    ],
    testimonials: [
      { name: "Anand Murthy", role: "Managing Partner", company: "Murthy Developers Group", quote: "We used to spend 6 weeks vetting contractors through referrals. On Builder's Central, we shortlisted 4 verified builders with 3D portfolios in 3 days.", rating: 5 },
      { name: "Pooja Reddy", role: "VP Projects", company: "Reddy Hospitality Holdings", quote: "For our boutique hotel project, we needed architects with specific hospitality experience. The specialization filters found us 3 perfect matches instantly.", rating: 5 },
      { name: "Karan Mehta", role: "Director", company: "Mehta Realty", quote: "The side-by-side comparison tool is a game-changer. We evaluated 6 contractors on past project quality, pricing, and reviews — all in one screen.", rating: 5 },
    ],
    pricing: [
      { name: "Owner Free", price: "Free", period: "forever", description: "Explore the professional directory and browse portfolios.", features: ["Full Directory Access", "3D Portfolio Browsing", "Basic Search Filters", "Up to 3 Inquiries/Month", "Standard Response Time", "Community Access"], ctaText: "Start Exploring" },
      { name: "Owner Pro", price: "₹2,999", period: "/month", description: "Full-featured professional sourcing and project management.", features: ["Everything in Free", "Unlimited Inquiries", "Intelligent Project Matching", "Side-by-Side Comparison", "Direct Messaging", "Project Tracking Dashboard", "Quote Management", "Priority Support", "Verified Professional Filters"], recommended: true, ctaText: "Start Pro" },
      { name: "Developer Suite", price: "₹9,999", period: "/month", description: "Enterprise sourcing for developers with multiple active projects.", features: ["Everything in Pro", "Multi-Project Dashboard", "Team Collaboration Access", "Vendor Performance Analytics", "Contract Template Library", "Custom Procurement Workflows", "API Integration", "Dedicated Success Manager", "Quarterly Industry Briefings"], ctaText: "Contact Sales" },
    ],
    faqs: [
      { question: "Is the platform free for project owners?", answer: "Yes. Browsing professional profiles, viewing 3D portfolios, and basic search functionality are completely free. Pro and Developer plans unlock unlimited inquiries and advanced matching." },
      { question: "How are professionals verified?", answer: "We verify business registration, professional licenses, insurance certificates, and past project references. Verified professionals display trust badges on their profiles." },
      { question: "Can I post a project and receive bids?", answer: "Yes. Pro plan owners can post detailed project briefs and receive responses from matched professionals within 24-48 hours." },
      { question: "Do you cover all regions?", answer: "We're expanding rapidly across all major metros and tier-2 cities. Professionals can list their service areas, and our matching engine respects geographic proximity." },
    ],
    ctaPrimary: "Find Qualified Professionals",
    ctaPrimaryLink: "/explore",
    ctaSecondary: "Post a Project Brief",
    ctaSecondaryLink: "/contact?subject=project-brief",
    relatedNiches: ["contractors", "architects", "finance"],
  },

  finance: {
    slug: "finance",
    title: "Financial Resources, Insurance & Investment",
    shortTitle: "Finance & Insurance",
    badge: "For Lenders, Insurers & Investors",
    icon: Landmark,
    accentColor: "#b45309",
    accentBg: "bg-amber-50",
    accentBorder: "border-amber-200",
    heroTagline: "Every construction project requires two things to move forward: financing and insurance.",
    heroDescription: "Builder's Central connects lenders, insurers, and investment groups directly to the professionals who plan, build, and manage construction projects. Your presence isn't limited to one category — your services are visible across the entire building ecosystem, from early planning through completion and ownership.",
    detailedDescription: "Construction finance, insurance, and investment are the invisible infrastructure that makes every project possible. Yet lenders, surety bond providers, construction insurers, and real estate investment groups struggle to reach builders and developers at the right moment. By the time your sales team makes contact, financing may already be arranged. Builder's Central embeds your financial services directly into the project lifecycle — visible to every builder, architect, owner, and developer on the platform.",
    painPoints: [
      { title: "Reaching Builders Is Expensive", description: "Traditional financial marketing channels — events, ads, broker networks — have high acquisition costs and low conversion for construction lending." },
      { title: "Timing Misalignment", description: "You reach project owners after they've already secured financing or insurance, missing the decision window." },
      { title: "Industry Credibility Gap", description: "Generic financial institutions struggle to establish trust in the specialized construction sector compared to niche-focused providers." },
      { title: "Fragmented Distribution", description: "Your products reach builders through multiple intermediaries — brokers, agents, advisors — each adding friction and cost." },
    ],
    benefits: [
      { title: "Ecosystem-Wide Visibility", description: "Your financial services appear across the entire platform — visible to builders, architects, owners, and developers simultaneously.", icon: Globe },
      { title: "Project-Stage Targeting", description: "Target professionals at specific project stages: pre-construction financing, construction insurance, completion guarantees, or investment exits.", icon: Target },
      { title: "Construction-Specific Credibility", description: "Display your construction lending track record, project insurance portfolio, and industry certifications prominently.", icon: ShieldCheck },
      { title: "Direct-to-Builder Pipeline", description: "Skip brokers. Connect directly with builders, developers, and owners who need construction financing, project insurance, or investment partners.", icon: Handshake },
      { title: "Financial Product Showcase", description: "Present your complete product range — construction loans, project insurance, surety bonds, bridge financing, development capital — in structured catalogs.", icon: Briefcase },
      { title: "Compliance & Trust Badges", description: "Display RBI registration, IRDAI licensing, SEBI registration, and other regulatory compliance certifications.", icon: Lock },
    ],
    howItWorks: [
      { step: 1, title: "Register as a Financial Partner", description: "Create your institutional profile with regulatory credentials, product portfolio, and construction sector track record.", icon: Landmark },
      { step: 2, title: "List Financial Products", description: "Add your construction loans, insurance products, surety bonds, and investment vehicles with terms, rates, and eligibility criteria.", icon: Banknote },
      { step: 3, title: "Reach Active Projects", description: "Your products appear to builders, developers, and owners who are actively planning, building, and financing construction projects.", icon: Eye },
      { step: 4, title: "Convert to Disbursements", description: "Receive qualified applications and inquiries with project details, borrower profiles, and financial requirements.", icon: PiggyBank },
    ],
    statistics: [
      { value: "₹2,400", label: "Construction Finance Connected", suffix: "Cr" },
      { value: "680", label: "Active Builder Professionals", suffix: "+" },
      { value: "38", label: "Faster Application Pipeline", suffix: "%" },
      { value: "12", label: "Financial Product Categories", suffix: "+" },
    ],
    testimonials: [
      { name: "Deepak Nair", role: "Head of Construction Finance", company: "National Housing Bank", quote: "Builder's Central gave us direct access to verified builders and developers who need construction financing. Our disbursement pipeline grew 40% in the first year.", rating: 5 },
      { name: "Meera Joshi", role: "VP Underwriting", company: "BuildSure Insurance", quote: "We used to rely entirely on broker networks for construction insurance leads. This platform delivers pre-qualified project owners with full project context.", rating: 5 },
      { name: "Arjun Bhatia", role: "Managing Partner", company: "Brick Capital Partners", quote: "As a construction-focused PE fund, we need deal flow from active developers. Builder's Central connects us with projects at the right investment stage.", rating: 4 },
    ],
    pricing: [
      { name: "Financial Starter", price: "Free", period: "forever", description: "Establish your presence in the construction ecosystem.", features: ["Basic Institutional Profile", "Up to 3 Product Listings", "Regulatory Badge Display", "Standard Visibility", "Inquiry Notifications", "Community Access"], ctaText: "Register Free" },
      { name: "Financial Professional", price: "₹8,999", period: "/month", description: "Full financial product visibility across the building ecosystem.", features: ["Everything in Starter", "Unlimited Product Listings", "Cross-Category Visibility", "Priority Search Placement", "Direct Builder Messaging", "Application Pipeline Dashboard", "Product Comparison Listing", "Featured in Finance Hub", "Dedicated Relationship Manager"], recommended: true, ctaText: "Start Professional" },
      { name: "Financial Enterprise", price: "₹24,999", period: "/month", description: "Deep integration for major financial institutions.", features: ["Everything in Professional", "Homepage Institutional Branding", "Custom Lending Microsite", "API Application Integration", "Co-Branded Marketing Campaigns", "Regulatory Compliance Dashboard", "Multi-Product Cross-Selling", "Priority Deal Flow Matching", "Quarterly Ecosystem Reports"], ctaText: "Contact Sales" },
    ],
    faqs: [
      { question: "What types of financial services can we list?", answer: "Construction loans, project financing, home buyer mortgages, surety bonds, contractor insurance, professional indemnity, builder risk policies, mezzanine financing, bridge loans, and real estate investment products." },
      { question: "How do regulatory compliance badges work?", answer: "We verify your RBI, IRDAI, SEBI, or other regulatory registrations and display compliance badges on your profile. This builds trust with construction professionals who may not be familiar with your institution." },
      { question: "Can we target specific project types?", answer: "Yes. You can target by project type (residential, commercial, infrastructure), project size, builder category, and geographic region." },
      { question: "Is this platform only for Indian financial institutions?", answer: "While our primary market is India, international lenders, insurers, and investment groups with India operations are welcome to list their construction-focused products." },
    ],
    ctaPrimary: "Register as Financial Partner",
    ctaPrimaryLink: "/contact?subject=finance-partnership",
    ctaSecondary: "Schedule an Institutional Demo",
    ctaSecondaryLink: "/contact?subject=finance-demo",
    relatedNiches: ["owners", "contractors", "architects"],
  },
};

export const NICHE_SLUGS = Object.keys(NICHE_PAGES);

export function getNicheBySlug(slug: string): NichePageData | undefined {
  return NICHE_PAGES[slug];
}
