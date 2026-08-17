"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import PaymentGatewayModal from "@/components/checkout/PaymentGatewayModal";
import {
  PLAN_TIERS,
  ADD_ON_SERVICES,
  calculateCheckoutPricing,
  formatINR,
} from "@/lib/data/pricing-data";
import {
  Check,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  Lock,
  Plus,
  Star,
  Layers,
} from "lucide-react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan") || "growth";
  const billingParam = searchParams.get("billing");
  const addonParam = searchParams.get("addon") || searchParams.get("addons");

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState(planParam);
  const [isAnnual, setIsAnnual] = useState(billingParam !== "monthly");

  return (
    <div className="min-h-screen bg-[#140b07] text-white">
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F26522]/15 border border-[#F26522]/30 text-[#F26522] text-xs font-bold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Official Builder&apos;s Central Checkout</span>
          </div>
          <h1 className="font-heading italic text-4xl sm:text-5xl text-white tracking-tight leading-tight">
            Elevate Your Property Marketing with <span className="text-[#F26522]">Next-Gen Infrastructure</span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base mt-3">
            Select your plan, customize with high-impact add-ons (3D tours, virtual staging, drone shoots, AI SEO), and activate instantly.
          </p>
        </div>

        {/* CTA Launch Checkout */}
        <div className="flex justify-center mb-16">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 rounded-2xl bg-[#F26522] hover:bg-[#e05a1a] text-white font-bold text-base flex items-center gap-3 shadow-[0_10px_30px_rgba(242,101,34,0.4)] transition-all hover:scale-[1.02]"
          >
            <Lock className="w-5 h-5" />
            <span>Open Secure Payment Gateway</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Plans Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PLAN_TIERS.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 rounded-3xl border flex flex-col justify-between ${
                plan.id === selectedPlanId
                  ? "bg-[#2c1b12] border-[#F26522] shadow-[0_0_30px_rgba(242,101,34,0.2)]"
                  : "bg-[#1f140e] border-[#50372b]/40"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{plan.emoji}</span>
                  {plan.popular && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F26522] text-white uppercase">
                      Most Popular
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-neutral-400 mt-1">{plan.subtitle}</p>

                <div className="my-5">
                  <span className="text-3xl font-bold text-white">₹{plan.priceAnnual}</span>
                  <span className="text-xs text-neutral-400">/month (billed annually)</span>
                </div>

                <ul className="space-y-2 text-xs text-neutral-300 mb-6">
                  {plan.features.slice(0, 5).map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#F26522] shrink-0" />
                      <span>{f.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => {
                  setSelectedPlanId(plan.id);
                  setIsModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-[#50372b] hover:bg-[#F26522] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Select {plan.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add-ons Showcase */}
        <div className="p-8 rounded-3xl bg-[#1f140e] border border-[#50372b]/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-white">Add-on Services</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                  100% Optional
                </span>
              </div>
              <p className="text-xs text-neutral-400">Add any of these services during checkout if desired, or proceed with your plan only.</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-xs text-[#F26522] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              Configure in Gateway <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ADD_ON_SERVICES.slice(0, 4).map((addon) => (
              <div
                key={addon.id}
                className="p-4 rounded-2xl bg-[#140b07] border border-[#50372b]/40 flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-semibold text-white text-sm">{addon.name}</h4>
                  <p className="text-[11px] text-neutral-400 mt-1">{addon.subtitle}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#F26522]">{formatINR(addon.basePrice)}</span>
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#F26522] hover:text-white text-[11px] text-neutral-300 font-semibold transition-colors"
                  >
                    + Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Payment Gateway Modal */}
      <PaymentGatewayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialPlanId={selectedPlanId}
        initialIsAnnual={isAnnual}
        initialAddOnId={addonParam || undefined}
      />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#140b07] flex items-center justify-center text-white">Loading Checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
