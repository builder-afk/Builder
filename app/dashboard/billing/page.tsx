"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Check,
  Zap,
  Building2,
  Crown,
  ArrowUpRight,
  Download,
  Calendar,
  Sparkles,
  Layers,
  Box,
  Globe,
  Ruler,
  Wand2,
  Camera,
  Search,
  MessageCircle,
  Plus,
  ShieldCheck,
  FileText,
  Printer,
  CheckCircle2,
  X,
} from "lucide-react";
import PaymentGatewayModal from "@/components/checkout/PaymentGatewayModal";
import {
  PLAN_TIERS,
  ADD_ON_SERVICES,
  formatINR,
} from "@/lib/data/pricing-data";

export default function BillingPage() {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [selectedCheckoutPlan, setSelectedCheckoutPlan] = useState("growth");
  const [selectedCheckoutAddOn, setSelectedCheckoutAddOn] = useState<string | undefined>(undefined);
  const [activePlanData, setActivePlanData] = useState({
    name: "Growth Plan",
    price: "₹12,499",
    period: "/month (billed annually)",
    renewDate: "August 15, 2027",
    tierId: "growth",
  });
  const [activeAddons, setActiveAddons] = useState<any[]>([
    {
      id: "addon_3d_showcase",
      name: "Premium 3D Property Showcase",
      qty: 2,
      price: "₹12,500/property",
      status: "Active",
    },
    {
      id: "addon_ai_staging_pack",
      name: "AI Virtual Staging Pack (5 Rooms)",
      qty: 1,
      price: "₹3,500/pack",
      status: "Active",
    },
  ]);

  const [invoices, setInvoices] = useState([
    { id: "INV-2026-006", date: "Aug 10, 2026", amount: "₹1,82,888", status: "Paid", plan: "Growth Annual + 2 Add-ons" },
    { id: "INV-2026-005", date: "May 15, 2026", amount: "₹14,999", status: "Paid", plan: "Growth Monthly" },
    { id: "INV-2026-004", date: "Apr 15, 2026", amount: "₹14,999", status: "Paid", plan: "Growth Monthly" },
    { id: "INV-2026-003", date: "Mar 15, 2026", amount: "₹14,999", status: "Paid", plan: "Growth Monthly" },
  ]);

  const [selectedInvoiceForModal, setSelectedInvoiceForModal] = useState<any>(null);

  // Load from local storage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("builder_active_subscription");
      if (saved) {
        const parsed = JSON.parse(saved);
        setActivePlanData({
          name: `${parsed.planName} Plan`,
          price: parsed.isAnnual ? "₹12,499" : "₹14,999",
          period: parsed.isAnnual ? "/month (billed annually)" : "/month",
          renewDate: "August 15, 2027",
          tierId: parsed.planId || "growth",
        });
        if (parsed.addOns && parsed.addOns.length > 0) {
          setActiveAddons(
            parsed.addOns.map((a: any) => ({
              id: a.id,
              name: a.name,
              qty: a.qty,
              price: formatINR(a.total),
              status: "Active",
            }))
          );
        }
        if (parsed.invoice) {
          setInvoices((prev) => [
            {
              id: parsed.invoice.invoiceNumber,
              date: parsed.invoice.date,
              amount: formatINR(parsed.invoice.pricing?.total || 182888),
              status: "Paid",
              plan: `${parsed.invoice.plan} (${parsed.invoice.billingCycle})`,
            },
            ...prev.filter((i) => i.id !== parsed.invoice.invoiceNumber),
          ]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const usageLimits = [
    { label: "Active 3D Property Showcases", used: 14, limit: "Unlimited", percentage: 0 },
    { label: "AI Virtual Staging Quota", used: 8, limit: 15, unit: "Renders", percentage: 53.3 },
    { label: "Cloud 3D Storage", used: 18.4, limit: 100, unit: "GB", percentage: 18.4 },
    { label: "Team Member Seats", used: 4, limit: 5, percentage: 80 },
    { label: "Tour Views This Month", used: 14250, limit: 100000, percentage: 14.2 },
  ];

  const handleOpenGateway = (planId: string = "growth", addOnId?: string) => {
    setSelectedCheckoutPlan(planId);
    setSelectedCheckoutAddOn(addOnId);
    setIsCheckoutModalOpen(true);
  };

  const handlePaymentSuccess = (invoice: any) => {
    if (invoice) {
      setActivePlanData({
        name: `${invoice.plan} Plan`,
        price: invoice.billingCycle?.includes("Annual") ? "₹12,499" : "₹14,999",
        period: invoice.billingCycle?.includes("Annual") ? "/month (billed annually)" : "/month",
        renewDate: "August 15, 2027",
        tierId: invoice.pricing?.plan?.id || "growth",
      });

      if (invoice.pricing?.addOnsBreakdown?.length > 0) {
        setActiveAddons(
          invoice.pricing.addOnsBreakdown.map((a: any) => ({
            id: a.id,
            name: a.name,
            qty: a.qty,
            price: formatINR(a.total),
            status: "Active",
          }))
        );
      }

      setInvoices((prev) => [
        {
          id: invoice.invoiceNumber,
          date: invoice.date,
          amount: formatINR(invoice.pricing?.total || 182888),
          status: "Paid",
          plan: `${invoice.plan} (${invoice.billingCycle})`,
        },
        ...prev,
      ]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading italic text-3xl sm:text-4xl text-white mb-1">
            Billing & Subscription <span className="text-[#F26522]">Infrastructure</span>
          </h1>
          <p className="text-slate-400 text-sm">
            Manage your builder platform plan, add-on services, payment methods, and GST tax invoices.
          </p>
        </div>

        <button
          onClick={() => handleOpenGateway("growth")}
          className="px-5 py-2.5 rounded-xl bg-[#F26522] hover:bg-[#e05a1a] text-white font-semibold text-xs flex items-center gap-2 shadow-[0_4px_14px_rgba(242,101,34,0.3)] transition-all cursor-pointer"
        >
          <Crown className="w-4 h-4" />
          <span>Change Plan / Add-ons</span>
        </button>
      </div>

      {/* Current Active Plan Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card rounded-3xl p-6 sm:p-8 border border-[#50372b]/50 bg-gradient-to-br from-[#2c1b12] to-[#140b07] shadow-xl"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#F26522]/20 border border-[#F26522]/40 flex items-center justify-center text-[#F26522] shadow-lg shrink-0">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="font-heading italic text-2xl font-bold text-white">
                  {activePlanData.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Active
                </span>
              </div>
              <p className="text-slate-300 text-sm">
                <span className="text-white font-bold text-xl">{activePlanData.price}</span>{" "}
                <span className="text-slate-400">{activePlanData.period}</span>
              </p>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#F26522]" />
                Next auto-renewal on {activePlanData.renewDate}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleOpenGateway("pro")}
              className="px-4 py-2.5 rounded-xl bg-[#F26522] hover:bg-[#e05a1a] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#F26522]/30 cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Upgrade to Pro Agency</span>
            </button>
            <button
              onClick={() => handleOpenGateway("growth")}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold cursor-pointer"
            >
              Configure Plan
            </button>
          </div>
        </div>
      </motion.div>

      {/* Active Add-on Services Manager */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass-card rounded-3xl p-6 sm:p-8 border border-[#50372b]/40 bg-[#1a110c]"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#F26522]" />
              <h2 className="font-heading italic text-xl font-bold text-white">
                Add-on Services & Capabilities
              </h2>
            </div>
            <p className="text-slate-400 text-xs mt-0.5">
              Photorealistic 3D property tours, AI Virtual staging renders, 4K Drone footage and AI search optimization.
            </p>
          </div>

          <button
            onClick={() => handleOpenGateway("growth", "addon_3d_showcase")}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-[#F26522] hover:text-white border border-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add More Services</span>
          </button>
        </div>

        {/* Active Add-ons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {activeAddons.map((addon) => (
            <div
              key={addon.id}
              className="p-4 rounded-2xl bg-[#251710] border border-[#50372b]/60 flex items-start justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F26522]" />
                  <h4 className="font-semibold text-white text-xs">{addon.name}</h4>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Qty: <span className="text-white font-bold">{addon.qty} Units</span> · Total:{" "}
                  <span className="text-emerald-400 font-semibold">{addon.price}</span>
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                {addon.status}
              </span>
            </div>
          ))}
        </div>

        {/* Recommended Add-ons Carousel */}
        <div className="pt-5 border-t border-white/5">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Popular Add-ons You Can Add Instantly
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: "addon_drone_shoot",
                name: "4K Aerial Drone Shoot",
                price: "₹18,500/shoot",
                desc: "Cinematic stabilized 4K footage + 15 aerial stills",
              },
              {
                id: "addon_ai_seo_suite",
                name: "AI SEO & GEO Suite",
                price: "₹15,000/mo",
                desc: "Rank in ChatGPT, Google Gemini & Perplexity search",
              },
              {
                id: "addon_architectural_cgi",
                name: "Exterior 3D CGI Elevation",
                price: "₹25,000/elevation",
                desc: "Hyper-realistic pre-construction 8K elevations",
              },
            ].map((rec) => (
              <div
                key={rec.id}
                className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-3"
              >
                <div>
                  <h5 className="font-semibold text-white text-xs">{rec.name}</h5>
                  <p className="text-[10px] text-slate-400">{rec.price}</p>
                </div>
                <button
                  onClick={() => handleOpenGateway("growth", rec.id)}
                  className="px-2.5 py-1 rounded-lg bg-[#F26522]/20 hover:bg-[#F26522] text-[#F26522] hover:text-white border border-[#F26522]/30 text-[11px] font-bold transition-colors cursor-pointer"
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Usage & Payment Methods Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass-card rounded-3xl p-6 sm:p-8 border border-[#50372b]/40 bg-[#1a110c]"
        >
          <h2 className="font-heading italic text-xl font-bold text-white mb-5">
            Resource Usage & Limits
          </h2>
          <div className="space-y-4">
            {usageLimits.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1 text-xs">
                  <span className="text-slate-300 font-medium">{item.label}</span>
                  <span className="text-slate-400 font-mono">
                    {item.used}
                    {item.unit ? ` ${item.unit}` : ""} /{" "}
                    {typeof item.limit === "string"
                      ? item.limit
                      : `${item.limit}${item.unit ? ` ${item.unit}` : ""}`}
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      item.percentage >= 90
                        ? "bg-red-500"
                        : item.percentage >= 70
                        ? "bg-amber-500"
                        : "bg-[#F26522]"
                    }`}
                    style={{
                      width: `${typeof item.limit === "string" ? 6 : item.percentage}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Payment Method Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="glass-card rounded-3xl p-6 sm:p-8 border border-[#50372b]/40 bg-[#1a110c] flex flex-col justify-between"
        >
          <div>
            <h2 className="font-heading italic text-xl font-bold text-white mb-5">
              Saved Payment Methods
            </h2>

            <div className="p-4 rounded-2xl bg-[#251710] border border-[#50372b]/60 flex items-center gap-4 mb-4">
              <div className="w-12 h-9 rounded-xl bg-gradient-to-br from-neutral-800 to-black border border-white/10 flex items-center justify-center text-white shrink-0">
                <CreditCard className="w-5 h-5 text-[#F26522]" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white font-mono font-bold">•••• •••• •••• 8892</p>
                <p className="text-xs text-slate-400 font-mono">Expires 08/2029 · Visa / RuPay</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                Default
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-[#F26522] font-bold">UPI AutoPay</span>
                <span className="font-mono text-white">kv853772@okhdfcbank</span>
              </div>
              <span className="text-slate-400 text-[11px]">Active</span>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
            <button
              onClick={() => handleOpenGateway("growth")}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Update Payment Method & GST
            </button>
          </div>
        </motion.div>
      </div>

      {/* Invoice History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="glass-card rounded-3xl p-6 sm:p-8 border border-[#50372b]/40 bg-[#1a110c] overflow-hidden"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-heading italic text-xl font-bold text-white">
              GST Tax Invoices & Receipts
            </h2>
            <p className="text-xs text-slate-400">
              Download GST compliant 18% tax credit receipts for your accounting team.
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="text-xs text-[#F26522] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Download All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#50372b]/30 text-slate-400 font-mono uppercase tracking-wider">
                <th className="pb-3 px-3">Invoice ID</th>
                <th className="pb-3 px-3">Date</th>
                <th className="pb-3 px-3">Plan / Description</th>
                <th className="pb-3 px-3">Amount</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-white">{inv.id}</td>
                  <td className="py-3.5 px-3 text-slate-400">{inv.date}</td>
                  <td className="py-3.5 px-3 text-slate-200">{inv.plan}</td>
                  <td className="py-3.5 px-3 font-bold text-emerald-400 font-mono">{inv.amount}</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold text-[10px]">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => setSelectedInvoiceForModal(inv)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#F26522] hover:text-white text-slate-300 font-semibold transition-colors cursor-pointer"
                    >
                      View Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Invoice Viewer Modal */}
      {selectedInvoiceForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#1f140e] border border-[#50372b] rounded-3xl p-6 sm:p-8 text-white space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#F26522]" />
                <h3 className="font-bold text-lg">Tax Invoice Receipt</h3>
              </div>
              <button
                onClick={() => setSelectedInvoiceForModal(null)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#140b07] border border-white/5 text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Invoice Number:</span>
                <span className="font-bold text-white">{selectedInvoiceForModal.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Issue Date:</span>
                <span>{selectedInvoiceForModal.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Seller:</span>
                <span>Builder&apos;s Central Technologies Pvt. Ltd.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">GSTIN:</span>
                <span>27AABCB1234F1Z8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Item:</span>
                <span className="text-white">{selectedInvoiceForModal.plan}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 text-emerald-400 font-bold">
                <span>Total Paid:</span>
                <span>{selectedInvoiceForModal.amount}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" /> Print PDF
              </button>
              <button
                onClick={() => setSelectedInvoiceForModal(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#F26522] hover:bg-[#e05a1a] text-white font-semibold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Gateway Modal */}
      <PaymentGatewayModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        initialPlanId={selectedCheckoutPlan}
        initialAddOnId={selectedCheckoutAddOn}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
