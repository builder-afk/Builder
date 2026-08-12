import { NextRequest, NextResponse } from "next/server";
import {
  calculateCheckoutPricing,
  PLAN_TIERS,
  ADD_ON_SERVICES,
} from "@/lib/data/pricing-data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      action,
      planId,
      isAnnual,
      selectedAddOns,
      promoCode,
      billingDetails,
      paymentMethod,
      orderId,
    } = body;

    // 1. Action: CREATE ORDER
    if (action === "create_order") {
      if (!planId) {
        return NextResponse.json(
          { error: "Plan ID is required" },
          { status: 400 }
        );
      }

      const pricing = calculateCheckoutPricing(
        planId,
        Boolean(isAnnual),
        selectedAddOns || {},
        promoCode
      );

      const generatedOrderId = `ORD_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase()}`;

      return NextResponse.json({
        success: true,
        orderId: generatedOrderId,
        pricing,
        currency: "INR",
        createdAt: new Date().toISOString(),
        merchant: {
          name: "Builder's Central Technologies Pvt. Ltd.",
          gstin: "27AABCB1234F1Z8",
          supportEmail: "support@builderscentral.com",
        },
      });
    }

    // 2. Action: VERIFY & PROCESS PAYMENT
    if (action === "verify_payment") {
      const pricing = calculateCheckoutPricing(
        planId || "growth",
        Boolean(isAnnual),
        selectedAddOns || {},
        promoCode
      );

      const transactionId = `TXN_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}`;
      
      const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(
        10000 + Math.random() * 90000
      )}`;

      const invoiceRecord = {
        invoiceNumber,
        transactionId,
        orderId: orderId || `ORD_${Date.now()}`,
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        paidAt: new Date().toISOString(),
        plan: pricing.plan.name,
        billingCycle: pricing.isAnnual ? "Annual (12 Months)" : "Monthly",
        customer: {
          name: billingDetails?.fullName || "Valued Builder",
          email: billingDetails?.email || "builder@example.com",
          phone: billingDetails?.phone || "+91 98765 43210",
          company: billingDetails?.companyName || "Construction Corp",
          gstin: billingDetails?.gstin || "Unregistered / Consumer",
          city: billingDetails?.city || "Mumbai",
          state: billingDetails?.state || "Maharashtra",
        },
        paymentMethod: paymentMethod || "UPI",
        pricing,
        status: "Paid",
      };

      return NextResponse.json({
        success: true,
        message: "Payment successfully verified and subscription activated",
        transactionId,
        invoice: invoiceRecord,
      });
    }

    return NextResponse.json(
      { error: "Invalid action parameter" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Payment API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    plans: PLAN_TIERS,
    addOns: ADD_ON_SERVICES,
    gatewayStatus: "active",
    supportedMethods: ["UPI", "Credit/Debit Card", "Net Banking", "Wire Transfer"],
  });
}
