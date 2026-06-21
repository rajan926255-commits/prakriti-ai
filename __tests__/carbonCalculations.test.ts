import { calculateTransport, calculateEnergy, calculateDiet, calculateShopping, getGrade } from '../lib/carbonCalculations';

describe('Carbon Calculations', () => {
  it('calculates transport emissions correctly', () => {
    // 150 km/week petrol, 2 flights, 20km public transport
    const transport = calculateTransport(150, 'petrol', 2, 20);
    // (150/15)*2.31*52 = 1201.2
    // 20*0.04*52 = 41.6
    // 2*2*115 = 460
    // Total = 1702.8
    expect(transport).toBeCloseTo(1702.8);
  });

  it('calculates energy emissions correctly', () => {
    // 200 units, 1 cylinder, 2 ac hours
    const energy = calculateEnergy(200, 1, 2);
    // ac = 2*1.5*30 = 90. total = 290.
    // 290 * 0.82 * 12 = 2853.6
    // 1 * (1.51*14.2) * 12 = 257.304
    // Total = 3110.904
    expect(energy).toBeCloseTo(3110.904);
  });

  it('calculates diet emissions correctly', () => {
    const diet = calculateDiet('vegan');
    expect(diet).toBeCloseTo(1.5 * 365);
  });

  it('calculates shopping emissions correctly', () => {
    const shopping = calculateShopping(3, true);
    // 3 * 10 * 1.5 * 12 = 540
    expect(shopping).toBeCloseTo(540);
  });

  it('calculates grade correctly', () => {
    expect(getGrade(999)).toBe('A');
    expect(getGrade(1500)).toBe('B');
    expect(getGrade(2500)).toBe('C');
    expect(getGrade(4000)).toBe('D');
    expect(getGrade(6000)).toBe('F');
  });
});
