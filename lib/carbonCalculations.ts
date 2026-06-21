export type FuelType = 'petrol' | 'diesel' | 'cng' | 'ev';
export type DietType = 'vegan' | 'vegetarian' | 'non-veg-moderate' | 'non-veg-heavy';

export const EMISSION_FACTORS = {
  electricity: 0.82, // kg CO2e per kWh (India)
  lpg: 1.51 * 14.2, // kg CO2e per cylinder (1.51 kg/kg * 14.2 kg)
  petrol: 2.31, // kg CO2e per liter
  diesel: 2.68, // kg CO2e per liter
  cng: 2.66, // kg CO2e per kg
  flight: 115, // kg CO2e per hour of flight approx (domestic)
  publicTransport: 0.04, // kg CO2e per km (bus/train approx)
  diet: {
    'vegan': 1.5, // kg CO2e per day
    'vegetarian': 2.0, // kg CO2e per day
    'non-veg-moderate': 3.5, // kg CO2e per day
    'non-veg-heavy': 5.0, // kg CO2e per day
  },
  shopping: {
    base: 10, // kg CO2e per shopping unit
    fastFashionMultiplier: 1.5,
  }
};

export function calculateTransport(kmPerWeek: number, fuelType: FuelType, flightsPerYear: number, publicTransportKmPerWeek: number) {
  let carEmissions = 0;
  if (fuelType === 'petrol') carEmissions = (kmPerWeek / 15) * EMISSION_FACTORS.petrol * 52;
  else if (fuelType === 'diesel') carEmissions = (kmPerWeek / 15) * EMISSION_FACTORS.diesel * 52;
  else if (fuelType === 'cng') carEmissions = (kmPerWeek / 20) * EMISSION_FACTORS.cng * 52;
  else if (fuelType === 'ev') carEmissions = (kmPerWeek * 0.15) * EMISSION_FACTORS.electricity * 52;

  const publicEmissions = publicTransportKmPerWeek * EMISSION_FACTORS.publicTransport * 52;
  const flightEmissions = flightsPerYear * 2 * EMISSION_FACTORS.flight;

  return carEmissions + publicEmissions + flightEmissions; // Total yearly kg
}

export function calculateEnergy(electricityUnitsPerMonth: number, lpgCylindersPerMonth: number, acHoursPerDay: number) {
  const acElectricity = acHoursPerDay * 1.5 * 30; // 1.5 kWh per hour
  const totalElectricity = electricityUnitsPerMonth + acElectricity;
  
  const electricityEmissions = totalElectricity * EMISSION_FACTORS.electricity * 12;
  const lpgEmissions = lpgCylindersPerMonth * EMISSION_FACTORS.lpg * 12;

  return electricityEmissions + lpgEmissions; // Total yearly kg
}

export function calculateDiet(dietType: DietType) {
  return EMISSION_FACTORS.diet[dietType] * 365; // Total yearly kg
}

export function calculateShopping(itemsPerMonth: number, isFastFashion: boolean) {
  const multiplier = isFastFashion ? EMISSION_FACTORS.shopping.fastFashionMultiplier : 1.0;
  return itemsPerMonth * EMISSION_FACTORS.shopping.base * multiplier * 12; // Total yearly kg
}

export function calculateTotalCarbon(
  transport: { kmPerWeek: number; fuelType: FuelType; flightsPerYear: number; publicTransportKmPerWeek: number },
  energy: { electricityUnitsPerMonth: number; lpgCylindersPerMonth: number; acHoursPerDay: number },
  diet: { dietType: DietType },
  shopping: { itemsPerMonth: number; isFastFashion: boolean }
) {
  const transportEmissions = calculateTransport(transport.kmPerWeek, transport.fuelType, transport.flightsPerYear, transport.publicTransportKmPerWeek);
  const energyEmissions = calculateEnergy(energy.electricityUnitsPerMonth, energy.lpgCylindersPerMonth, energy.acHoursPerDay);
  const dietEmissions = calculateDiet(diet.dietType);
  const shoppingEmissions = calculateShopping(shopping.itemsPerMonth, shopping.isFastFashion);

  const total = transportEmissions + energyEmissions + dietEmissions + shoppingEmissions;

  return {
    total,
    breakdown: {
      transport: transportEmissions,
      energy: energyEmissions,
      diet: dietEmissions,
      shopping: shoppingEmissions
    }
  };
}

export function getGrade(totalKg: number) {
  if (totalKg < 1000) return 'A';
  if (totalKg < 2000) return 'B';
  if (totalKg < 3500) return 'C';
  if (totalKg < 5000) return 'D';
  return 'F';
}
