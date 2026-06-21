import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';
import { LRUCache } from 'lru-cache';

const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

// Serverless-safe LRU Cache for basic rate limiting
const rateLimitCache = new LRUCache<string, { count: number; resetTime: number }>({
  max: 1000,
  ttl: 60 * 1000, // 1 minute TTL
});

const requestSchema = z.object({
  score: z.number().min(0).max(100000),
  breakdown: z.object({
    transport: z.number(),
    energy: z.number(),
    diet: z.number(),
    shopping: z.number(),
  }).optional(),
});

const FALLBACK_DATA = {
  tips: [
    { title: "Switch to LED Bulbs", description: "Replace your regular bulbs with LEDs. This simple change reduces your lighting energy consumption by up to 80% and saves money on your electricity bill.", saving: 50, icon: "Lightbulb" },
    { title: "Use Public Transport", description: "Take the metro or bus instead of driving your personal car or taking a cab at least twice a week. India's growing public transit is an excellent way to cut emissions.", saving: 120, icon: "Train" },
    { title: "Reduce Meat Consumption", description: "Opt for a vegetarian meal one extra day per week. A plant-based diet has a significantly lower carbon and water footprint compared to a meat-heavy diet.", saving: 80, icon: "Leaf" }
  ],
  actionPlan: {
    week1: ["Audit your home electricity usage and turn off standby appliances.", "Try carpooling to work one day this week."],
    week2: ["Replace your 3 most used light bulbs with energy-efficient LEDs.", "Commit to a fully vegetarian weekend."],
    week3: ["Carry a reusable water bottle and cloth bag everywhere.", "Use cold water for washing clothes."],
    week4: ["Take public transport for your main commute.", "Calculate your new monthly emissions and track your progress."]
  }
};

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting (5 requests per minute per IP)
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const windowMs = 60 * 1000;
    
    if (!rateLimitCache.has(ip)) {
      rateLimitCache.set(ip, { count: 1, resetTime: now + windowMs });
    } else {
      const entry = rateLimitCache.get(ip)!;
      if (now > entry.resetTime) {
        entry.count = 1;
        entry.resetTime = now + windowMs;
        rateLimitCache.set(ip, entry);
      } else {
        entry.count += 1;
        rateLimitCache.set(ip, entry);
        if (entry.count > 5) {
          return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }
      }
    }

    // 2. Validate Request Body
    const body = await req.json();
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }

    const { score, breakdown } = parsed.data;

    // 3. Gemini API Call
    if (!apiKey) {
      console.warn('GEMINI_API_KEY not configured, using fallback.');
      return NextResponse.json(FALLBACK_DATA);
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const breakdownText = breakdown 
      ? `Breakdown: Transport (${Math.round(breakdown.transport)}kg), Energy (${Math.round(breakdown.energy)}kg), Diet (${Math.round(breakdown.diet)}kg), Shopping (${Math.round(breakdown.shopping)}kg).` 
      : '';

    const prompt = `
      Act as an expert Carbon Coach for an Indian user.
      User's annual carbon footprint: ${Math.round(score)} kg CO2e.
      ${breakdownText}
      
      Provide highly actionable, India-specific tips to reduce their highest emission area.
      Format exactly as a valid JSON object matching this structure:
      {
        "tips": [
          { "title": "...", "description": "2-3 sentences explaining the tip specifically for India.", "saving": 150, "icon": "Car" } // icon can be Car, Home, Leaf, ShoppingCart, Zap, Flame
        ],
        "actionPlan": {
          "week1": ["daily action 1", "daily action 2", "daily action 3"],
          "week2": ["daily action 1", "daily action 2"],
          "week3": ["daily action 1", "daily action 2"],
          "week4": ["daily action 1", "daily action 2"]
        }
      }
      Provide exactly 3 tips.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }
    const aiData = JSON.parse(jsonMatch[0]);

    return NextResponse.json(aiData);

  } catch (error) {
    console.error('Gemini API Error, using fallback data:', error);
    return NextResponse.json(FALLBACK_DATA);
  }
}
