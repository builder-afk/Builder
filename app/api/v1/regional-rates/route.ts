import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_CITIES = [
  { name: "Gurgaon", state: "Haryana", construction_index: 1.05, base_rate_economy: 1600, base_rate_standard: 1950, base_rate_premium: 2400, base_rate_luxury: 3000, base_rate_ultra_luxury: 3800 },
  { name: "Mumbai", state: "Maharashtra", construction_index: 1.25, base_rate_economy: 1900, base_rate_standard: 2300, base_rate_premium: 2800, base_rate_luxury: 3600, base_rate_ultra_luxury: 4500 },
  { name: "Bengaluru", state: "Karnataka", construction_index: 1.10, base_rate_economy: 1650, base_rate_standard: 2000, base_rate_premium: 2500, base_rate_luxury: 3200, base_rate_ultra_luxury: 4000 },
  { name: "Delhi", state: "Delhi", construction_index: 1.15, base_rate_economy: 1700, base_rate_standard: 2100, base_rate_premium: 2600, base_rate_luxury: 3300, base_rate_ultra_luxury: 4200 },
  { name: "Pune", state: "Maharashtra", construction_index: 1.05, base_rate_economy: 1550, base_rate_standard: 1900, base_rate_premium: 2350, base_rate_luxury: 3000, base_rate_ultra_luxury: 3800 },
  { name: "Hyderabad", state: "Telangana", construction_index: 1.00, base_rate_economy: 1500, base_rate_standard: 1800, base_rate_premium: 2200, base_rate_luxury: 2800, base_rate_ultra_luxury: 3500 },
  { name: "Ahmedabad", state: "Gujarat", construction_index: 0.95, base_rate_economy: 1400, base_rate_standard: 1700, base_rate_premium: 2100, base_rate_luxury: 2650, base_rate_ultra_luxury: 3300 },
  { name: "Kochi", state: "Kerala", construction_index: 0.98, base_rate_economy: 1450, base_rate_standard: 1750, base_rate_premium: 2150, base_rate_luxury: 2700, base_rate_ultra_luxury: 3400 },
];

export async function GET() {
  try {
    let allCities: any[] = [];
    try {
      allCities = await prisma.cities.findMany();
    } catch {
      // Fallback if database is not available
    }

    if (!allCities || allCities.length === 0) {
      allCities = DEFAULT_CITIES;
    }

    const cities = allCities.map((city) => {
      const base_rates = {
        economy: city.base_rate_economy ?? 1500,
        standard: city.base_rate_standard ?? 1800,
        premium: city.base_rate_premium ?? 2200,
        luxury: city.base_rate_luxury ?? 2800,
        ultra_luxury: city.base_rate_ultra_luxury ?? 3500,
      };

      const cIndex = city.construction_index ?? 1.0;

      const effective_rates = {
        economy: Math.round(base_rates.economy * cIndex),
        standard: Math.round(base_rates.standard * cIndex),
        premium: Math.round(base_rates.premium * cIndex),
        luxury: Math.round(base_rates.luxury * cIndex),
        ultra_luxury: Math.round(base_rates.ultra_luxury * cIndex),
      };

      return {
        city: city.name,
        state: city.state ?? "",
        construction_index: cIndex,
        labour_index: city.labour_index ?? 1.0,
        material_index: city.material_index ?? 1.0,
        approval_index: city.approval_index ?? 1.0,
        inflation_index: city.inflation_index ?? 1.0,
        transportation_index: city.transportation_index ?? 1.0,
        availability_index: city.availability_index ?? 1.0,
        composite_index: cIndex,
        base_rates,
        effective_rates,
      };
    });

    return NextResponse.json({ cities, count: cities.length });
  } catch (error) {
    console.error("Regional rates error:", error);
    return NextResponse.json({ cities: DEFAULT_CITIES.map(c => ({
      city: c.name,
      state: c.state,
      construction_index: c.construction_index,
      labour_index: 1.0,
      material_index: 1.0,
      approval_index: 1.0,
      inflation_index: 1.0,
      transportation_index: 1.0,
      availability_index: 1.0,
      composite_index: c.construction_index,
      base_rates: { economy: c.base_rate_economy, standard: c.base_rate_standard, premium: c.base_rate_premium, luxury: c.base_rate_luxury, ultra_luxury: c.base_rate_ultra_luxury },
      effective_rates: { economy: Math.round(c.base_rate_economy * c.construction_index), standard: Math.round(c.base_rate_standard * c.construction_index), premium: Math.round(c.base_rate_premium * c.construction_index), luxury: Math.round(c.base_rate_luxury * c.construction_index), ultra_luxury: Math.round(c.base_rate_ultra_luxury * c.construction_index) }
    })), count: DEFAULT_CITIES.length });
  }
}
