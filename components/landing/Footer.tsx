"use client";

import Link from "next/link";
import { 
  Building2, 
  Globe, 
  Code2, 
  Briefcase, 
  Play, 
  Mail, 
  Phone,
  MapPin,
  ArrowRight,
  MessageCircle,
  Sparkles
} from "lucide-react";
import { CONTACT } from "@/lib/constants";

const footerLinks = {
  Solutions: [
    { label: "3D Property Tours", href: "/services" },
    { label: "Virtual Staging", href: "/services" },
    { label: "Drone Content", href: "/services" },
    { label: "Interactive Floor Plans", href: "/services" },
    { label: "AI Architecture", href: "/architecture-builder" },
    { label: "3D Viewer Demo", href: "/viewer/demo" },
  ],
  Ecosystem: [
    { label: "Contractors & Builders", href: "/niche/contractors" },
    { label: "Architects & Designers", href: "/niche/architects" },
    { label: "Suppliers & Manufacturers", href: "/niche/suppliers" },
    { label: "Owners & Developers", href: "/niche/owners" },
    { label: "Finance & Insurance", href: "/niche/finance" },
  ],
  Platform: [
    { label: "Find Professionals", href: "/#professionals" },
    { label: "Cost Estimator", href: "/#estimator" },
    { label: "Trending Projects", href: "/#trending-projects" },
    { label: "Pricing Options", href: "/services#pricing" },
    { label: "How It Works", href: "/how-it-works" },
  ],
  Resources: [
    { label: "Testimonials", href: "/services#testimonials" },
    { label: "Customer Stories", href: "/services#testimonials" },
    { label: "FAQ", href: "/how-it-works#faq" },
    { label: "Contact Sales", href: "/contact" },
    { label: "Schedule Demo", href: "/contact" },
    { label: "Help Center", href: "/contact" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Builder Signup", href: "/auth/signup" },
    { label: "Privacy Policy", href: "/contact" },
    { label: "Terms of Service", href: "/contact" },
    { label: "Security & Trust", href: "/how-it-works#features" },
  ],
};

const socials = [
  { icon: Globe, href: CONTACT.website, label: "Website" },
  { icon: Briefcase, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Play, href: "https://youtube.com", label: "YouTube" },
];

interface AnimatedButtonProps {
  text: string;
  className?: string;
  iconColor?: string;
  iconBg?: string;
  iconIcon?: React.ComponentType<{ className?: string }>;
}

const AnimatedButton = ({
  text,
  className = "",
  iconColor = "text-black",
  iconBg = "bg-white",
  iconIcon = ArrowRight,
}: AnimatedButtonProps) => {
  const Icon = iconIcon;
  return (
    <button className={`group flex items-center justify-between gap-3 pl-6 pr-2.5 py-2.5 rounded-full font-semibold text-[15px] ${className}`}>
      <div className="h-[22px] overflow-hidden flex flex-col relative">
        <span className="translate-y-0 group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
          {text}
        </span>
        <span className="absolute top-full left-0 translate-y-0 group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
          {text}
        </span>
      </div>
      <div className={`w-8 h-8 sm:w-10 sm:h-10 ${iconBg} rounded-full flex items-center justify-center shrink-0`}>
        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor} -rotate-45 group-hover:-rotate-[90deg] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]`} />
      </div>
    </button>
  );
};

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      const currentPath = window.location.pathname;
      if ((path === "" || path === currentPath) && hash) {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", `#${hash}`);
        }
      }
    }
  };

  return (
    <footer className="relative bg-white pt-0 pb-8 overflow-hidden border-t border-gray-200 font-body">
      {/* CTA Band */}
      <div className="relative py-20 sm:py-28 mb-8 bg-[#F5F5F5]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 text-[#F26522] text-[12px] font-semibold tracking-wide mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Transform Your Sales Process
          </div>
          <h3 className="text-gray-900 font-heading italic leading-[1.05] tracking-[-0.03em] text-[clamp(2rem,5vw,3.5rem)] mb-6">
            Ready to transform how <br className="hidden sm:block" />you sell properties?
          </h3>
          <p className="text-[16px] sm:text-[18px] text-gray-600 mb-10 max-w-xl mx-auto font-medium leading-relaxed">
            Let us create stunning 3D showcases, 360° virtual tours, and interactive floor plans that help you close deals 40% faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup">
              <AnimatedButton
                text="Start Free Today"
                className="bg-[#F26522] hover:bg-[#e05a1a] text-white w-full sm:w-auto shadow-lg shadow-[#F26522]/20"
                iconColor="text-[#F26522]"
              />
            </Link>
            <a
              href="https://wa.me/917376284881?text=Hi%2C%20I%27m%20interested%20in%20Builder%27s%20Central%20property%20marketing%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[15px] shadow-md transition-all">
                <MessageCircle className="w-5 h-5 fill-current" />
                Chat on WhatsApp
              </button>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-12 py-12 border-b border-gray-100">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1 flex flex-col justify-between">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-5 group">
                <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <Building2 className="w-5 h-5 text-[#F26522]" />
                </div>
                <span className="font-heading italic font-bold text-[22px] text-gray-900 tracking-tight">
                  Builder&apos;s Central
                </span>
              </Link>
              <p className="text-[14px] text-gray-500 mb-6 leading-relaxed max-w-[260px] font-medium">
                The complete property marketing infrastructure for builders and developers. 3D tours, 360° showcases, and interactive floor plans.
              </p>

              {/* Direct Contact Info */}
              <div className="space-y-2 text-[13px] text-gray-600 mb-6">
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2.5 hover:text-[#F26522] transition-colors">
                  <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                  {CONTACT.email}
                </a>
                <a href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2.5 hover:text-[#F26522] transition-colors font-mono">
                  <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                  {CONTACT.phone}
                </a>
                <div className="flex items-center gap-2.5 text-gray-500">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                  {CONTACT.address}
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2 text-[13px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#F26522] transition-all font-medium"
              />
              <button
                aria-label="Subscribe"
                className="rounded-lg px-3.5 py-2 text-white hover:bg-[#e05a1a] transition-colors bg-[#F26522] shadow-sm flex items-center justify-center shrink-0"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-[14px] font-medium text-gray-600 hover:text-[#F26522] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider">
            © {new Date().getFullYear()} BUILDER&apos;S CENTRAL. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-[#F26522] hover:border-[#F26522]/40 transition-all"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
