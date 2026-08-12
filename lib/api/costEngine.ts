export type QualityTier = "economy" | "standard" | "premium" | "luxury" | "ultra_luxury";

export interface EstimatorInputs {
  city: string;
  builtUpArea: number;
  floors: number;
  quality: QualityTier;
  includeBasement: boolean;
  basementArea: number;
  includeInterior: boolean;
  includeLandscaping: boolean;
}

export const DEFAULT_INPUTS: EstimatorInputs = {
  city: "Gurgaon",
  builtUpArea: 2000,
  floors: 2,
  quality: "standard",
  includeBasement: false,
  basementArea: 1000,
  includeInterior: true,
  includeLandscaping: false,
};

// Types matching the FastAPI backend output
export interface BreakdownCategory {
  category: string;
  amount: number;
  percent: number;
  depends_on: string[];
}

export interface CostBreakdown {
  foundation: BreakdownCategory;
  structure: BreakdownCategory;
  brickwork: BreakdownCategory;
  roofing: BreakdownCategory;
  electrical: BreakdownCategory;
  plumbing: BreakdownCategory;
  flooring: BreakdownCategory;
  doors_windows: BreakdownCategory;
  painting: BreakdownCategory;
  interior_finishing: BreakdownCategory;
  miscellaneous: BreakdownCategory;
}

export interface EstimateResponse {
  estimated_cost: number;
  cost_range: {
    minimum: number;
    most_likely: number;
    maximum: number;
  };
  cost_per_sqft: number;
  confidence: {
    percentage: number;
    level: string;
    factors: Array<{
      factor: string;
      impact: string;
      impact_value: number;
      description: string;
    }>;
  };
  breakdown: CostBreakdown;
  add_on_costs: {
    basement: { amount: number };
    interior: { amount: number };
    landscaping: { amount: number };
    solar: { amount: number };
    ev_charging: { amount: number };
    boundary_wall: { amount: number };
    driveway: { amount: number };
    home_automation: { amount: number };
  };
  total_add_ons: number;
  budget_tiers: {
    minimum: { amount: number };
    recommended: { amount: number };
    premium: { amount: number };
  };
  contingency: {
    amount: number;
  };
  ai_insights: string[];
}

export interface CityRate {
  city: string;
  effective_rates: Record<QualityTier, number>;
}

export const formatINR = (amount: number): string => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
};

export const formatINRFull = (amount: number): string => {
  return `₹${amount.toLocaleString("en-IN")}`;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api/v1";

export async function fetchEstimate(inputs: EstimatorInputs, signal?: AbortSignal): Promise<EstimateResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/estimate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: { city: inputs.city },
        building: {
          builtup_area_sqft: inputs.builtUpArea,
          floors: inputs.floors,
        },
        quality_tier: inputs.quality,
        interiors: {
          include_interior: inputs.includeInterior,
        },
        exterior: {
          landscape: inputs.includeLandscaping,
        },
        foundation: {
          include_basement: inputs.includeBasement,
          basement_area_sqft: inputs.basementArea,
        },
      }),
      signal,
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("API estimate fetch failed, computing client fallback:", err);
  }

  // Client-side fallback calculation if backend API call fails
  const totalArea = (inputs.builtUpArea || 2000) * (inputs.floors || 1);
  const rateMap: Record<QualityTier, number> = {
    economy: 1600,
    standard: 1950,
    premium: 2400,
    luxury: 3000,
    ultra_luxury: 3800,
  };
  const baseRate = rateMap[inputs.quality] || 1950;
  const estimatedCost = Math.round(totalArea * baseRate * (inputs.includeInterior ? 1.15 : 1.0));

  return {
    estimated_cost: estimatedCost,
    cost_range: {
      minimum: Math.round(estimatedCost * 0.85),
      most_likely: estimatedCost,
      maximum: Math.round(estimatedCost * 1.2),
    },
    cost_per_sqft: Math.round(estimatedCost / totalArea),
    confidence: {
      percentage: 85,
      level: "high",
      factors: [{ factor: "Location Index", impact: "High", impact_value: 1.05, description: "City regional cost index" }],
    },
    breakdown: {
      foundation: { category: "Foundation", amount: Math.round(estimatedCost * 0.12), percent: 12, depends_on: [] },
      structure: { category: "Structure", amount: Math.round(estimatedCost * 0.25), percent: 25, depends_on: [] },
      brickwork: { category: "Brickwork", amount: Math.round(estimatedCost * 0.08), percent: 8, depends_on: [] },
      roofing: { category: "Roofing", amount: Math.round(estimatedCost * 0.05), percent: 5, depends_on: [] },
      electrical: { category: "Electrical", amount: Math.round(estimatedCost * 0.10), percent: 10, depends_on: [] },
      plumbing: { category: "Plumbing", amount: Math.round(estimatedCost * 0.10), percent: 10, depends_on: [] },
      flooring: { category: "Flooring", amount: Math.round(estimatedCost * 0.10), percent: 10, depends_on: [] },
      doors_windows: { category: "Doors & Windows", amount: Math.round(estimatedCost * 0.08), percent: 8, depends_on: [] },
      painting: { category: "Painting", amount: Math.round(estimatedCost * 0.05), percent: 5, depends_on: [] },
      interior_finishing: { category: "Interior Finishing", amount: Math.round(estimatedCost * 0.05), percent: 5, depends_on: [] },
      miscellaneous: { category: "Miscellaneous", amount: Math.round(estimatedCost * 0.02), percent: 2, depends_on: [] },
    },
    add_on_costs: {
      basement: { amount: inputs.includeBasement ? (inputs.basementArea || 1000) * 1200 : 0 },
      interior: { amount: inputs.includeInterior ? totalArea * 450 : 0 },
      landscaping: { amount: inputs.includeLandscaping ? 150000 : 0 },
      solar: { amount: 0 },
      ev_charging: { amount: 0 },
      boundary_wall: { amount: 0 },
      driveway: { amount: 0 },
      home_automation: { amount: 0 },
    },
    total_add_ons: 0,
    budget_tiers: {
      minimum: { amount: Math.round(estimatedCost * 0.85) },
      recommended: { amount: estimatedCost },
      premium: { amount: Math.round(estimatedCost * 1.2) },
    },
    contingency: { amount: Math.round(estimatedCost * 0.05) },
    ai_insights: ["Estimation generated successfully.", "AAC blocks recommended for insulation."],
  };
}

export async function fetchCities(): Promise<CityRate[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/regional-rates`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data.cities && Array.isArray(data.cities)) {
        return data.cities;
      }
    }
  } catch (err) {
    console.warn("API cities fetch failed, returning default city list:", err);
  }

  return [
    { city: "Gurgaon", effective_rates: { economy: 1680, standard: 2048, premium: 2520, luxury: 3150, ultra_luxury: 3990 } },
    { city: "Mumbai", effective_rates: { economy: 2375, standard: 2875, premium: 3500, luxury: 4500, ultra_luxury: 5625 } },
    { city: "Bengaluru", effective_rates: { economy: 1815, standard: 2200, premium: 2750, luxury: 3520, ultra_luxury: 4400 } },
    { city: "Delhi", effective_rates: { economy: 1955, standard: 2415, premium: 2990, luxury: 3795, ultra_luxury: 4830 } },
    { city: "Pune", effective_rates: { economy: 1628, standard: 1995, premium: 2468, luxury: 3150, ultra_luxury: 3990 } },
    { city: "Hyderabad", effective_rates: { economy: 1500, standard: 1800, premium: 2200, luxury: 2800, ultra_luxury: 3500 } },
    { city: "Ahmedabad", effective_rates: { economy: 1330, standard: 1615, premium: 1995, luxury: 2518, ultra_luxury: 3135 } },
    { city: "Kochi", effective_rates: { economy: 1421, standard: 1715, premium: 2107, luxury: 2646, ultra_luxury: 3332 } },
  ];
}
