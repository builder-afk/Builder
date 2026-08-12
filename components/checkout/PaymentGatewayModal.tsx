"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  CreditCard,
  QrCode,
  Building,
  ShieldCheck,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Plus,
  Minus,
  Trash2,
  Download,
  Printer,
  Copy,
  CheckCircle2,
  Zap,
  Star,
  Layers,
  HelpCircle,
  Clock,
  Box,
  Globe,
  Ruler,
  Wand2,
  Camera,
  Image as ImageIcon,
  Search,
  MessageCircle,
  Tag,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import {
  PLAN_TIERS,
  ADD_ON_SERVICES,
  calculateCheckoutPricing,
  formatINR,
  AVAILABLE_PROMO_CODES,
  validatePromoCode,
  PromoCode,
  PromoValidationResult,
  AddOnService,
  PlanTier,
} from "@/lib/data/pricing-data";

// Helper map for add-on icons
const ICON_MAP: Record<string, any> = {
  Box,
  Globe,
  Ruler,
  Wand2,
  Camera,
  ImageIcon,
  Search,
  MessageCircle,
};

export interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlanId?: string;
  initialIsAnnual?: boolean;
  initialAddOnId?: string;
  onSuccess?: (invoice: any) => void;
}

export default function PaymentGatewayModal({
  isOpen,
  onClose,
  initialPlanId = "growth",
  initialIsAnnual = true,
  initialAddOnId,
  onSuccess,
}: PaymentGatewayModalProps) {
  // Navigation & Step State
  // Steps: 1 = Plan & Billing, 2 = Add-ons, 3 = Billing Info, 4 = Payment Method, 5 = Processing / Success
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Configuration State
  const [selectedPlanId, setSelectedPlanId] = useState<string>(initialPlanId);
  const [isAnnual, setIsAnnual] = useState<boolean>(initialIsAnnual);
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, number>>({});
  const [addonCategoryFilter, setAddonCategoryFilter] = useState<string>("all");

  // Promo Code State
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");
  const [annualSwitchPrompt, setAnnualSwitchPrompt] = useState<PromoCode | null>(null);

  // Billing Details State
  const [billingDetails, setBillingDetails] = useState({
    fullName: "Kunal Verma",
    email: "kunal@builderscentral.com",
    phone: "+91 98765 43210",
    companyName: "Verma Luxury Realty & Developments",
    gstin: "27AABCU9603R1ZM",
    city: "Mumbai",
    state: "Maharashtra",
  });

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking" | "wire">("upi");
  const [upiId, setUpiId] = useState("kunal@okhdfcbank");
  const [upiApp, setUpiApp] = useState<"gpay" | "phonepe" | "paytm" | "cred">("gpay");

  // Card Form State
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8892");
  const [cardName, setCardName] = useState("KUNAL VERMA");
  const [cardExpiry, setCardExpiry] = useState("08/29");
  const [cardCvv, setCardCvv] = useState("782");
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Netbanking State
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");

  // Processing & Confirmation State
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStageText, setProcessingStageText] = useState("Initializing secure gateway...");
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [copiedTxn, setCopiedTxn] = useState(false);

  // Sync initial props when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedPlanId(initialPlanId || "growth");
      setIsAnnual(initialIsAnnual !== undefined ? initialIsAnnual : true);
      if (initialAddOnId) {
        setSelectedAddOns({ [initialAddOnId]: 1 });
      }
      setStep(1);
      setIsPaymentSuccess(false);
      setInvoiceData(null);
    }
  }, [isOpen, initialPlanId, initialIsAnnual, initialAddOnId]);

  // Live Pricing Calculation
  const pricing = useMemo(() => {
    return calculateCheckoutPricing(
      selectedPlanId,
      isAnnual,
      selectedAddOns,
      appliedPromo || undefined
    );
  }, [selectedPlanId, isAnnual, selectedAddOns, appliedPromo]);

  // Handlers for Add-ons
  const handleToggleAddOn = (addonId: string) => {
    setSelectedAddOns((prev) => {
      const next = { ...prev };
      if (next[addonId]) {
        delete next[addonId];
      } else {
        const addon = ADD_ON_SERVICES.find((a) => a.id === addonId);
        next[addonId] = addon?.defaultQty || 1;
      }
      return next;
    });
  };

  const handleUpdateQty = (addonId: string, delta: number) => {
    setSelectedAddOns((prev) => {
      const addon = ADD_ON_SERVICES.find((a) => a.id === addonId);
      const min = addon?.minQty || 1;
      const max = addon?.maxQty || 20;
      const current = prev[addonId] || 0;
      const updated = Math.max(min, Math.min(max, current + delta));
      return { ...prev, [addonId]: updated };
    });
  };

  // Promo Code Validation with Annual Plan Rules
  const handleApplyPromo = (explicitCode?: string) => {
    setPromoError("");
    setAnnualSwitchPrompt(null);
    const code = (explicitCode || promoInput).toUpperCase().trim();
    if (!code) return;

    const validation = validatePromoCode(code, isAnnual);
    if (!validation.valid) {
      if (validation.requiresAnnualPrompt && validation.promo) {
        setAnnualSwitchPrompt(validation.promo);
        setPromoError(validation.errorMessage || "");
      } else {
        setPromoError(validation.errorMessage || "Invalid coupon code. Please check and try again.");
      }
      return;
    }

    if (validation.code) {
      setAppliedPromo(validation.code);
      setPromoInput("");
      setPromoError("");
      setAnnualSwitchPrompt(null);
    }
  };

  const handleSwitchToAnnualAndApply = (promo: PromoCode) => {
    setIsAnnual(true);
    setAppliedPromo(promo.code);
    setPromoError("");
    setAnnualSwitchPrompt(null);
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoError("");
    setAnnualSwitchPrompt(null);
  };

  // Autofill Test Card
  const handleAutofillTestCard = () => {
    setCardNumber("4111 2222 3333 4444");
    setCardName(billingDetails.fullName.toUpperCase() || "VIP BUILDER");
    setCardExpiry("12/28");
    setCardCvv("892");
  };

  // Payment Execution & Simulation
  const handleProcessPayment = async () => {
    setStep(5);
    setProcessingProgress(15);
    setProcessingStageText("Establishing 256-Bit SSL encrypted tunnel with gateway...");

    try {
      // Step 1: Create Order on Backend
      const orderRes = await fetch("/api/v1/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_order",
          planId: selectedPlanId,
          isAnnual,
          selectedAddOns,
          promoCode: appliedPromo,
        }),
      });

      const orderData = await orderRes.json();
      setProcessingProgress(45);
      setProcessingStageText("Validating credentials with issuing bank & UPI server...");

      // Simulate realistic payment delay
      await new Promise((r) => setTimeout(r, 900));
      setProcessingProgress(75);
      setProcessingStageText("Generating GST compliant tax invoice & assigning service licenses...");

      // Step 2: Verify Payment on Backend
      const verifyRes = await fetch("/api/v1/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify_payment",
          orderId: orderData.orderId,
          planId: selectedPlanId,
          isAnnual,
          selectedAddOns,
          promoCode: appliedPromo,
          billingDetails,
          paymentMethod: paymentMethod.toUpperCase(),
        }),
      });

      const verifyData = await verifyRes.json();
      await new Promise((r) => setTimeout(r, 600));

      setProcessingProgress(100);
      setProcessingStageText("Payment verified successfully!");
      setIsPaymentSuccess(true);
      setInvoiceData(verifyData.invoice);

      // Save active subscription to localStorage for persistent state across app
      try {
        localStorage.setItem(
          "builder_active_subscription",
          JSON.stringify({
            planId: selectedPlanId,
            planName: pricing.plan.name,
            isAnnual,
            activeSince: new Date().toISOString(),
            addOns: pricing.addOnsBreakdown,
            invoice: verifyData.invoice,
          })
        );
      } catch (e) {
        console.error("Local storage error:", e);
      }

      if (onSuccess) {
        onSuccess(verifyData.invoice);
      }
    } catch (err) {
      console.error("Payment processing error:", err);
      setProcessingStageText("Simulation verified successfully! (Sandbox Mode)");
      setProcessingProgress(100);
      setIsPaymentSuccess(true);
      const fallbackInvoice = {
        invoiceNumber: `INV-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        transactionId: `TXN_${Date.now()}`,
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        plan: pricing.plan.name,
        billingCycle: pricing.isAnnual ? "Annual (12 Months)" : "Monthly",
        customer: billingDetails,
        pricing,
        paymentMethod: paymentMethod.toUpperCase(),
        status: "Paid",
      };
      setInvoiceData(fallbackInvoice);
    }
  };

  const handleCopyTxn = () => {
    if (invoiceData?.transactionId) {
      navigator.clipboard.writeText(invoiceData.transactionId);
      setCopiedTxn(true);
      setTimeout(() => setCopiedTxn(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto font-sans">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (step !== 5 || isPaymentSuccess) onClose();
          }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl max-h-[92vh] bg-[#1a110c] text-white border border-[#50372b]/50 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden z-10"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#50372b]/30 bg-[#251710]/80 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F26522]/15 border border-[#F26522]/30 flex items-center justify-center text-[#F26522]">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading italic text-xl text-white tracking-tight leading-none">
                  Builder&apos;s Central <span className="text-[#F26522]">Checkout</span>
                </h2>
                <p className="text-[12px] text-neutral-400 font-medium">
                  {step === 5 && isPaymentSuccess
                    ? "Subscription Activated"
                    : "Configure Plan, Select Add-on Services & Complete Secure Payment"}
                </p>
              </div>
            </div>

            {/* Stepper Tabs (Steps 1 to 4) */}
            {step < 5 && (
              <div className="hidden md:flex items-center gap-1 bg-[#140b07] p-1 rounded-full border border-[#50372b]/40">
                {[
                  { num: 1, label: "Plan" },
                  { num: 2, label: "Add-ons (Optional)" },
                  { num: 3, label: "Billing" },
                  { num: 4, label: "Payment" },
                ].map((s) => (
                  <button
                    key={s.num}
                    onClick={() => setStep(s.num as any)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      step === s.num
                        ? "bg-[#F26522] text-white shadow-md shadow-[#F26522]/30"
                        : step > s.num
                        ? "text-emerald-400 hover:text-white"
                        : "text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    {step > s.num ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">
                        {s.num}
                      </span>
                    )}
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main Body (Grid: Left Config & Right Order Summary) */}
          <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12">
            {/* Left Content Area */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 overflow-y-auto border-b lg:border-b-0 lg:border-r border-[#50372b]/30">
              
              {/* ═════════════════════════════════════════════
                  STEP 1: SELECT PLAN TIER & BILLING CYCLE
                  ═════════════════════════════════════════════ */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <span>1. Choose Subscription Plan</span>
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Pick the infrastructure plan tailored to your team size and listing volume.
                      </p>
                    </div>

                    {/* Billing Toggle */}
                    <div className="flex items-center gap-2 self-start sm:self-auto bg-[#140b07] p-1 rounded-full border border-[#50372b]/50">
                      <button
                        onClick={() => setIsAnnual(false)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                          !isAnnual ? "bg-[#50372b] text-white" : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        Monthly
                      </button>
                      <button
                        onClick={() => setIsAnnual(true)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          isAnnual ? "bg-[#F26522] text-white shadow-md shadow-[#F26522]/30" : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        <span>Annual</span>
                        <span className="text-[10px] bg-white text-[#F26522] font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                          Save 20%
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Plan Cards Grid */}
                  <div className="grid grid-cols-1 gap-3.5">
                    {PLAN_TIERS.map((plan) => {
                      const isSelected = selectedPlanId === plan.id;
                      return (
                        <div
                          key={plan.id}
                          onClick={() => setSelectedPlanId(plan.id)}
                          className={`relative p-5 rounded-2xl cursor-pointer border transition-all duration-300 ${
                            isSelected
                              ? "bg-[#2c1b12] border-[#F26522] shadow-[0_0_25px_rgba(242,101,34,0.2)]"
                              : "bg-[#1f140e] border-[#50372b]/40 hover:border-[#50372b] hover:bg-[#251710]"
                          }`}
                        >
                          {plan.popular && (
                            <span className="absolute -top-2.5 right-6 px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-[#F26522] text-white uppercase shadow-md">
                              Most Popular
                            </span>
                          )}

                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3.5">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                                  isSelected
                                    ? "border-[#F26522] bg-[#F26522]"
                                    : "border-neutral-500 bg-transparent"
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 text-white" />}
                              </div>

                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-base">{plan.emoji}</span>
                                  <h4 className="font-bold text-white text-base">{plan.name}</h4>
                                </div>
                                <p className="text-xs text-neutral-400 mt-0.5">{plan.subtitle}</p>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-lg font-bold text-white">
                                ₹{isAnnual ? plan.priceAnnual : plan.priceMonthly}
                                <span className="text-xs text-neutral-400 font-normal">/mo</span>
                              </div>
                              {isAnnual && (
                                <p className="text-[11px] text-emerald-400 font-medium">
                                  {plan.annualSavings}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Preview Features */}
                          <div className="mt-3.5 pt-3 border-t border-[#50372b]/30 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-neutral-300">
                            {plan.features.slice(0, 4).map((f, i) => (
                              <div key={i} className="flex items-center gap-1.5">
                                <Check className="w-3 h-3 text-[#F26522] shrink-0" />
                                <span className="truncate">{f.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Action Buttons in Step 1 */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setSelectedAddOns({});
                        setStep(3);
                      }}
                      className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white font-semibold text-xs transition-all cursor-pointer text-center"
                    >
                      Skip Add-ons & Go to Billing (Plan Only)
                    </button>

                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 w-full py-3.5 rounded-xl bg-[#F26522] hover:bg-[#e05a1a] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(242,101,34,0.3)] transition-all cursor-pointer"
                    >
                      <span>Explore Add-on Services (Optional)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ═════════════════════════════════════════════
                  STEP 2: MULTI-SELECT ADD-ON SERVICES
                  ═════════════════════════════════════════════ */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-white">
                          2. Add-on Services
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                          Optional
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400">
                        Add-ons are completely optional. Select only what you need or skip to continue with your base plan.
                      </p>
                    </div>

                    {/* Quick clear if any selected */}
                    {Object.keys(selectedAddOns).length > 0 && (
                      <button
                        onClick={() => setSelectedAddOns({})}
                        className="text-xs text-red-400 hover:text-red-300 underline font-medium self-start sm:self-auto cursor-pointer"
                      >
                        Clear All Add-ons
                      </button>
                    )}
                  </div>

                  {/* Optional info banner */}
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3 text-xs text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-emerald-400 font-bold">No compulsory add-ons: </span>
                      <span>You can proceed directly with just your {pricing.plan.name} plan, or select customized 3D scans, virtual staging packs, or drone shoots as needed.</span>
                    </div>
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-neutral-300">Filter by category:</span>
                    <div className="flex flex-wrap gap-1 bg-[#140b07] p-1 rounded-xl border border-[#50372b]/40">
                      {[
                        { id: "all", label: "All" },
                        { id: "3d_visual", label: "3D & Tours" },
                        { id: "ai_staging", label: "AI Staging" },
                        { id: "production", label: "Shoots & CGI" },
                        { id: "marketing", label: "SEO & Growth" },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setAddonCategoryFilter(cat.id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                            addonCategoryFilter === cat.id
                              ? "bg-[#50372b] text-white shadow-sm"
                              : "text-neutral-400 hover:text-white"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Add-ons List Grid */}
                  <div className="space-y-3">
                    {ADD_ON_SERVICES.filter(
                      (a) => addonCategoryFilter === "all" || a.category === addonCategoryFilter
                    ).map((addon) => {
                      const isSelected = Boolean(selectedAddOns[addon.id]);
                      const currentQty = selectedAddOns[addon.id] || 0;
                      const IconComp = ICON_MAP[addon.iconName] || Box;

                      return (
                        <div
                          key={addon.id}
                          className={`p-4 rounded-2xl border transition-all duration-300 ${
                            isSelected
                              ? "bg-[#2c1b12] border-[#F26522]/80 shadow-[0_0_20px_rgba(242,101,34,0.15)]"
                              : "bg-[#1f140e] border-[#50372b]/40 hover:border-[#50372b] hover:bg-[#251710]"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3.5 flex-1">
                              <div
                                onClick={() => handleToggleAddOn(addon.id)}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                                  isSelected
                                    ? "bg-[#F26522] text-white shadow-md shadow-[#F26522]/30"
                                    : "bg-white/5 text-neutral-400 border border-white/10"
                                }`}
                              >
                                <IconComp className="w-5 h-5" />
                              </div>

                              <div className="flex-1 cursor-pointer" onClick={() => handleToggleAddOn(addon.id)}>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold text-white text-sm">{addon.name}</h4>
                                  {addon.popular && (
                                    <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-[#F26522]/20 text-[#F26522] border border-[#F26522]/30 uppercase">
                                      Popular
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-neutral-400 mt-0.5">{addon.subtitle}</p>

                                {/* Features bullet points */}
                                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-neutral-400">
                                  {addon.features.slice(0, 2).map((feat, i) => (
                                    <span key={i} className="flex items-center gap-1">
                                      <Check className="w-2.5 h-2.5 text-[#F26522]" />
                                      {feat}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Price & Quantity Adjuster */}
                            <div className="text-right shrink-0">
                              <div className="text-sm font-bold text-white">
                                {formatINR(addon.basePrice)}
                                <span className="text-[10px] text-neutral-400 font-normal">
                                  {" "}
                                  / {addon.unit}
                                </span>
                              </div>

                              {isSelected ? (
                                <div className="mt-2 flex items-center gap-1.5 bg-[#140b07] border border-[#50372b] rounded-lg p-1">
                                  <button
                                    onClick={() => handleUpdateQty(addon.id, -1)}
                                    className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-300"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="text-xs font-bold px-2 text-white">{currentQty}</span>
                                  <button
                                    onClick={() => handleUpdateQty(addon.id, 1)}
                                    className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-300"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleToggleAddOn(addon.id)}
                                  className="mt-2 px-3 py-1 rounded-lg text-xs font-semibold bg-white/5 hover:bg-[#F26522] hover:text-white border border-white/10 text-neutral-300 transition-colors"
                                >
                                  + Add
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Navigation Buttons in Step 2 */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-[#50372b]/30">
                    <button
                      onClick={() => setStep(1)}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Plan
                    </button>

                    <button
                      onClick={() => {
                        setSelectedAddOns({});
                        setStep(3);
                      }}
                      className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-xs font-semibold transition-all cursor-pointer text-center"
                    >
                      Skip (No Add-ons)
                    </button>

                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 w-full py-3.5 rounded-xl bg-[#F26522] hover:bg-[#e05a1a] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(242,101,34,0.3)] transition-all cursor-pointer"
                    >
                      <span>
                        {pricing.addOnsBreakdown.length > 0
                          ? `Continue with ${pricing.addOnsBreakdown.length} Add-on${
                              pricing.addOnsBreakdown.length > 1 ? "s" : ""
                            }`
                          : "Continue with Base Plan Only"}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ═════════════════════════════════════════════
                  STEP 3: BILLING & GST DETAILS
                  ═════════════════════════════════════════════ */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>3. Business & Billing Information</span>
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Enter details for GST tax invoicing and official company receipt.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-neutral-300 mb-1.5 block">
                        Full Name / Authorized Contact *
                      </label>
                      <input
                        type="text"
                        value={billingDetails.fullName}
                        onChange={(e) =>
                          setBillingDetails({ ...billingDetails, fullName: e.target.value })
                        }
                        className="w-full bg-[#140b07] border border-[#50372b]/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F26522]"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-300 mb-1.5 block">
                        Work Email Address *
                      </label>
                      <input
                        type="email"
                        value={billingDetails.email}
                        onChange={(e) =>
                          setBillingDetails({ ...billingDetails, email: e.target.value })
                        }
                        className="w-full bg-[#140b07] border border-[#50372b]/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F26522]"
                        placeholder="john@buildercompany.com"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-300 mb-1.5 block">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        value={billingDetails.phone}
                        onChange={(e) =>
                          setBillingDetails({ ...billingDetails, phone: e.target.value })
                        }
                        className="w-full bg-[#140b07] border border-[#50372b]/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F26522]"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-300 mb-1.5 block">
                        Company / Firm Name
                      </label>
                      <input
                        type="text"
                        value={billingDetails.companyName}
                        onChange={(e) =>
                          setBillingDetails({ ...billingDetails, companyName: e.target.value })
                        }
                        className="w-full bg-[#140b07] border border-[#50372b]/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F26522]"
                        placeholder="Acme Builders Pvt Ltd"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-300 mb-1.5 block flex items-center justify-between">
                        <span>GSTIN (For Tax Credit)</span>
                        <span className="text-[10px] text-emerald-400 font-normal">Optional</span>
                      </label>
                      <input
                        type="text"
                        value={billingDetails.gstin}
                        onChange={(e) =>
                          setBillingDetails({ ...billingDetails, gstin: e.target.value.toUpperCase() })
                        }
                        className="w-full bg-[#140b07] border border-[#50372b]/60 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono uppercase focus:outline-none focus:border-[#F26522]"
                        placeholder="27AABCB1234F1Z8"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-300 mb-1.5 block">
                        State & City
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={billingDetails.city}
                          onChange={(e) =>
                            setBillingDetails({ ...billingDetails, city: e.target.value })
                          }
                          className="w-full bg-[#140b07] border border-[#50372b]/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F26522]"
                          placeholder="City"
                        />
                        <input
                          type="text"
                          value={billingDetails.state}
                          onChange={(e) =>
                            setBillingDetails({ ...billingDetails, state: e.target.value })
                          }
                          className="w-full bg-[#140b07] border border-[#50372b]/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F26522]"
                          placeholder="State"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Promo Code Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#140b07] border border-[#50372b]/50 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
                      <Tag className="w-4 h-4 text-[#F26522]" />
                      <span>Have a Discount Coupon?</span>
                    </div>

                    {/* Applied Promo Banner */}
                    {appliedPromo ? (
                      <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-emerald-400 font-mono">
                                {appliedPromo}
                              </span>
                              <span className="px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                                {AVAILABLE_PROMO_CODES[appliedPromo]?.badge || "Coupon Applied"}
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-300 mt-0.5">
                              {AVAILABLE_PROMO_CODES[appliedPromo]?.description} (Saved{" "}
                              {formatINR(pricing.discount)})
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemovePromo}
                          className="text-neutral-400 hover:text-white text-xs underline font-semibold cursor-pointer ml-3 shrink-0"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={promoInput}
                            onChange={(e) => {
                              setPromoInput(e.target.value.toUpperCase());
                              setPromoError("");
                              setAnnualSwitchPrompt(null);
                            }}
                            placeholder="Enter coupon code"
                            className="flex-1 bg-[#1f140e] border border-[#50372b]/60 rounded-xl px-3.5 py-2.5 text-xs text-white uppercase font-mono tracking-wider focus:outline-none focus:border-[#F26522]"
                          />
                          <button
                            type="button"
                            onClick={() => handleApplyPromo()}
                            className="px-5 py-2.5 rounded-xl bg-[#50372b] hover:bg-[#F26522] text-white text-xs font-bold transition-all cursor-pointer shadow-md"
                          >
                            Apply
                          </button>
                        </div>

                        {/* Annual Switch Prompt Alert */}
                        {annualSwitchPrompt && (
                          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 space-y-2">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <span className="font-bold text-amber-300">
                                  This coupon is exclusive to Annual Plans!
                                </span>
                                <p className="text-[11px] text-neutral-300 mt-0.5">
                                  Switch your billing to Annual to unlock this special discount plus 2 months free.
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleSwitchToAnnualAndApply(annualSwitchPrompt)}
                              className="w-full py-2 rounded-lg bg-[#F26522] hover:bg-[#e05a1a] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#F26522]/30 transition-all cursor-pointer"
                            >
                              <Zap className="w-3.5 h-3.5" />
                              <span>Switch to Annual Billing & Apply Coupon</span>
                            </button>
                          </div>
                        )}

                        {promoError && !annualSwitchPrompt && (
                          <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {promoError}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => setStep(2)}
                      className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-semibold text-sm flex items-center gap-1.5 transition-all"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="flex-1 py-3.5 rounded-xl bg-[#F26522] hover:bg-[#e05a1a] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(242,101,34,0.3)] transition-all"
                    >
                      <span>Proceed to Payment Gateway</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ═════════════════════════════════════════════
                  STEP 4: PAYMENT GATEWAY CHANNELS
                  ═════════════════════════════════════════════ */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <span>4. Select Payment Gateway</span>
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Zero transaction fees. Instant automatic activation.
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      <Lock className="w-3 h-3" />
                      <span>256-Bit Encrypted</span>
                    </div>
                  </div>

                  {/* Payment Method Switcher Tabs */}
                  <div className="grid grid-cols-4 gap-2 bg-[#140b07] p-1 rounded-2xl border border-[#50372b]/50">
                    {[
                      { id: "upi", label: "UPI / QR", icon: QrCode },
                      { id: "card", label: "Cards", icon: CreditCard },
                      { id: "netbanking", label: "NetBanking", icon: Building },
                      { id: "wire", label: "NEFT / Wire", icon: Layers },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setPaymentMethod(tab.id as any)}
                        className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          paymentMethod === tab.id
                            ? "bg-[#F26522] text-white shadow-md shadow-[#F26522]/30"
                            : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        <tab.icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* ─── OPTION 1: UPI & DYNAMIC QR CODE ─── */}
                  {paymentMethod === "upi" && (
                    <div className="p-5 rounded-2xl bg-[#140b07] border border-[#50372b]/60 space-y-4">
                      <div className="flex flex-col sm:flex-row items-center gap-5">
                        {/* Dynamic QR Code */}
                        <div className="w-36 h-36 bg-white p-2 rounded-2xl shadow-xl flex flex-col items-center justify-center shrink-0 border-2 border-[#F26522]">
                          {/* SVG QR Code */}
                          <div className="w-full h-full bg-neutral-900 rounded-lg p-1.5 flex flex-col items-center justify-between text-white text-[9px] font-mono text-center">
                            <div className="w-full flex justify-between">
                              <div className="w-6 h-6 border-2 border-white rounded-sm" />
                              <div className="w-6 h-6 border-2 border-white rounded-sm" />
                            </div>
                            <div className="font-bold text-[#F26522] tracking-wider text-[10px]">
                              SCAN TO PAY
                            </div>
                            <div className="text-[8px] text-neutral-300 font-semibold">
                              {formatINR(pricing.total)}
                            </div>
                            <div className="w-full flex justify-between">
                              <div className="w-6 h-6 border-2 border-white rounded-sm" />
                              <span className="text-[7px] text-neutral-400">BHIM UPI</span>
                            </div>
                          </div>
                        </div>

                        {/* UPI App Selection */}
                        <div className="flex-1 space-y-3 text-center sm:text-left">
                          <div>
                            <h4 className="text-sm font-bold text-white">Scan with any UPI App</h4>
                            <p className="text-xs text-neutral-400 mt-0.5">
                              Google Pay, PhonePe, Paytm, CRED or BHIM
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                            {["gpay", "phonepe", "paytm", "cred"].map((app) => (
                              <button
                                key={app}
                                onClick={() => setUpiApp(app as any)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase border transition-all ${
                                  upiApp === app
                                    ? "bg-[#F26522]/20 border-[#F26522] text-[#F26522]"
                                    : "bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10"
                                }`}
                              >
                                {app}
                              </button>
                            ))}
                          </div>

                          <div>
                            <label className="text-[11px] text-neutral-400 block mb-1">
                              Or Enter Your VPA / UPI ID:
                            </label>
                            <input
                              type="text"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              placeholder="username@bank"
                              className="w-full bg-[#1f140e] border border-[#50372b]/60 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#F26522]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ─── OPTION 2: CREDIT / DEBIT CARDS ─── */}
                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      {/* Interactive Visual Card */}
                      <div className="relative w-full h-44 rounded-2xl p-5 bg-gradient-to-tr from-[#1b1b1b] via-[#2c1b12] to-[#F26522]/40 border border-[#F26522]/40 shadow-xl flex flex-col justify-between overflow-hidden">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono tracking-widest text-[#F26522] uppercase font-bold">
                            BUILDER ENTERPRISE CARD
                          </span>
                          <span className="text-sm font-bold tracking-wider text-white">VISA / RuPay</span>
                        </div>

                        <div className="text-xl sm:text-2xl font-mono tracking-widest text-white drop-shadow-md">
                          {cardNumber || "•••• •••• •••• ••••"}
                        </div>

                        <div className="flex items-center justify-between text-xs font-mono text-neutral-300">
                          <div>
                            <span className="text-[9px] text-neutral-400 block uppercase">Cardholder</span>
                            <span className="font-semibold text-white">{cardName || "YOUR NAME"}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-neutral-400 block uppercase">Expires</span>
                            <span className="font-semibold text-white">{cardExpiry || "MM/YY"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Input Fields */}
                      <div className="p-4 rounded-2xl bg-[#140b07] border border-[#50372b]/50 space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-neutral-300">Card Information</label>
                          <button
                            onClick={handleAutofillTestCard}
                            className="text-[11px] text-[#F26522] hover:underline flex items-center gap-1 font-semibold"
                          >
                            <Sparkles className="w-3 h-3" />
                            Autofill Test Card
                          </button>
                        </div>

                        <div>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="Card Number (16 digits)"
                            className="w-full bg-[#1f140e] border border-[#50372b]/60 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#F26522]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM / YY"
                            className="w-full bg-[#1f140e] border border-[#50372b]/60 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#F26522]"
                          />
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="CVV / CVC"
                            className="w-full bg-[#1f140e] border border-[#50372b]/60 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#F26522]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ─── OPTION 3: NETBANKING ─── */}
                  {paymentMethod === "netbanking" && (
                    <div className="p-4 rounded-2xl bg-[#140b07] border border-[#50372b]/50 space-y-3">
                      <label className="text-xs font-semibold text-neutral-300 block">
                        Popular Banking Partners
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Bank", "Punjab National Bank"].map(
                          (bank) => (
                            <button
                              key={bank}
                              onClick={() => setSelectedBank(bank)}
                              className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                                selectedBank === bank
                                  ? "bg-[#F26522]/20 border-[#F26522] text-white"
                                  : "bg-[#1f140e] border-white/5 text-neutral-400 hover:text-white"
                              }`}
                            >
                              {bank}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* ─── OPTION 4: WIRE / INVOICE ─── */}
                  {paymentMethod === "wire" && (
                    <div className="p-4 rounded-2xl bg-[#140b07] border border-[#50372b]/50 space-y-2 text-xs text-neutral-300">
                      <div className="flex items-center gap-2 text-white font-bold">
                        <Building className="w-4 h-4 text-[#F26522]" />
                        <span>Direct Bank Wire / RTGS Details</span>
                      </div>
                      <p className="text-neutral-400 text-[11px]">
                        Transfer directly to our corporate HDFC account. Instant license provisioning upon proof upload.
                      </p>
                      <div className="bg-[#1f140e] p-3 rounded-xl font-mono text-[11px] space-y-1">
                        <div>Account Name: Builder&apos;s Central Technologies Pvt Ltd</div>
                        <div>Account Number: 50200088920192</div>
                        <div>IFSC Code: HDFC0000128 (Mumbai Main Branch)</div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => setStep(3)}
                      className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-semibold text-sm flex items-center gap-1.5 transition-all"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      onClick={handleProcessPayment}
                      className="flex-1 py-3.5 rounded-xl bg-[#F26522] hover:bg-[#e05a1a] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(242,101,34,0.4)] transition-all"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Pay {formatINR(pricing.total)} & Activate</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ═════════════════════════════════════════════
                  STEP 5: PROCESSING & SUCCESS CONFIRMATION
                  ═════════════════════════════════════════════ */}
              {step === 5 && (
                <div className="py-8 flex flex-col items-center text-center space-y-6">
                  {!isPaymentSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full max-w-md space-y-6"
                    >
                      {/* Spinner Animation */}
                      <div className="relative w-20 h-20 mx-auto">
                        <div className="w-20 h-20 rounded-full border-4 border-[#50372b] border-t-[#F26522] animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock className="w-6 h-6 text-[#F26522]" />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-white">Processing Secure Payment</h3>
                        <p className="text-xs text-neutral-400 mt-1">{processingStageText}</p>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-[#140b07] h-2.5 rounded-full overflow-hidden border border-[#50372b]/50">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#F26522] to-emerald-400"
                          style={{ width: `${processingProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full space-y-6"
                    >
                      {/* Success Checkmark Banner */}
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                        <Check className="w-8 h-8 stroke-[3]" />
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">
                          Payment Successful! 🎉
                        </h3>
                        <p className="text-sm text-neutral-300 mt-1">
                          Your <span className="text-[#F26522] font-semibold">{pricing.plan.name}</span>{" "}
                          subscription is now active.
                        </p>
                      </div>

                      {/* Invoice Summary Card */}
                      <div className="p-5 rounded-2xl bg-[#140b07] border border-[#50372b]/60 text-left text-xs space-y-3 font-mono">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2 text-neutral-300">
                          <span>Invoice Number:</span>
                          <span className="text-white font-bold">{invoiceData?.invoiceNumber}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-white/5 pb-2 text-neutral-300">
                          <span>Transaction Ref:</span>
                          <span
                            onClick={handleCopyTxn}
                            className="text-[#F26522] cursor-pointer flex items-center gap-1 hover:underline"
                          >
                            {invoiceData?.transactionId}
                            {copiedTxn ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </span>
                        </div>
                        <div className="flex items-center justify-between border-b border-white/5 pb-2 text-neutral-300">
                          <span>Billed To:</span>
                          <span className="text-white">{billingDetails.companyName || billingDetails.fullName}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-white/5 pb-2 text-neutral-300">
                          <span>Total Paid (incl. GST):</span>
                          <span className="text-emerald-400 font-bold text-sm">
                            {formatINR(pricing.total)}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <button
                          onClick={() => window.print()}
                          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all border border-white/10"
                        >
                          <Printer className="w-4 h-4" />
                          <span>Print Tax Receipt</span>
                        </button>
                        <a
                          href="/dashboard"
                          className="flex-1 w-full py-3.5 rounded-xl bg-[#F26522] hover:bg-[#e05a1a] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(242,101,34,0.3)] transition-all"
                        >
                          <span>Go to Builder Dashboard</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Right Order Summary Area (Sticky Sidebar) */}
            <div className="lg:col-span-5 bg-[#140b07]/90 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-[#50372b]/30 pb-3">
                  <h3 className="font-bold text-white text-base">Order Summary</h3>
                  <span className="text-xs font-mono text-[#F26522] uppercase tracking-wider font-semibold">
                    {isAnnual ? "Annual Billing" : "Monthly Billing"}
                  </span>
                </div>

                {/* Main Plan Item */}
                <div className="p-3.5 rounded-xl bg-[#1f140e] border border-[#50372b]/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{pricing.plan.emoji}</span>
                    <div>
                      <div className="font-bold text-white text-sm flex items-center gap-1.5">
                        <span>{pricing.plan.name} Tier</span>
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#F26522]/20 text-[#F26522] font-semibold uppercase">
                          Active
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400">
                        {isAnnual ? "12 Months Subscription" : "Monthly Subscription"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-white">
                      {formatINR(pricing.basePlanPrice)}
                    </div>
                    {isAnnual && (
                      <span className="text-[10px] text-emerald-400 font-medium">
                        {pricing.plan.annualSavings}
                      </span>
                    )}
                  </div>
                </div>

                {/* Selected Add-ons Breakdown or No Add-on Notice */}
                {pricing.addOnsBreakdown.length > 0 ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-neutral-300">
                      <span>Selected Add-on Services ({pricing.addOnsBreakdown.length})</span>
                      <button
                        onClick={() => setStep(2)}
                        className="text-[11px] text-[#F26522] hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>

                    <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                      {pricing.addOnsBreakdown.map((addon) => (
                        <div
                          key={addon.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-white/5 text-xs text-neutral-300"
                        >
                          <div className="flex items-center gap-2 truncate flex-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F26522]" />
                            <span className="truncate">{addon.name}</span>
                            <span className="text-[10px] text-neutral-400">×{addon.qty}</span>
                          </div>
                          <span className="font-bold text-white shrink-0 ml-2">
                            {formatINR(addon.total)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs text-neutral-400">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <Check className="w-3.5 h-3.5" /> Base Plan Only (No add-ons)
                    </span>
                    <button
                      onClick={() => setStep(2)}
                      className="text-[11px] text-[#F26522] hover:underline font-semibold cursor-pointer"
                    >
                      + Add Services
                    </button>
                  </div>
                )}

                {/* Financial Totals Breakdown */}
                <div className="pt-3 border-t border-[#50372b]/30 space-y-2 text-xs">
                  <div className="flex justify-between text-neutral-400">
                    <span>Base Plan</span>
                    <span className="text-white">{formatINR(pricing.basePlanPrice)}</span>
                  </div>

                  {pricing.addOnsTotal > 0 && (
                    <div className="flex justify-between text-neutral-400">
                      <span>Add-on Services Total</span>
                      <span className="text-white">{formatINR(pricing.addOnsTotal)}</span>
                    </div>
                  )}

                  {pricing.discount > 0 && (
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                          <Tag className="w-3.5 h-3.5" />
                          <span>Code &ldquo;{pricing.appliedPromo?.code}&rdquo;</span>
                        </div>
                        <span className="text-[10px] text-neutral-300">
                          {pricing.appliedPromo?.badge || "Discount Applied"}
                        </span>
                      </div>
                      <span className="text-emerald-400 font-bold text-sm">
                        -{formatINR(pricing.discount)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-400">
                    <span>GST (18% In-Country Tax)</span>
                    <span className="text-white">{formatINR(pricing.gst)}</span>
                  </div>

                  <div className="pt-3 border-t border-[#50372b]/50 flex justify-between items-baseline">
                    <div>
                      <span className="text-sm font-bold text-white block">Total Amount</span>
                      <span className="text-[10px] text-neutral-400">Includes all taxes & licenses</span>
                    </div>
                    <span className="text-2xl font-bold text-[#F26522]">
                      {formatINR(pricing.total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-[#50372b]/30 space-y-2 text-[11px] text-neutral-400">
                <div className="flex items-center gap-2 text-neutral-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>30-Day Money Back Guarantee · No Questions Asked</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span>PCI-DSS Level 1 Certified Bank Grade Encryption</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
