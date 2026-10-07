import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// AI Advisory & Multi-lingual query endpoint
app.post('/api/advisor', async (req, res) => {
  try {
    const { message, language = 'English', context = 'general' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      // Provide intelligent fallback if key is not yet set
      return res.json({
        reply: `[KrishiGreen Advisor - Offline Mode (${language})]: For ${message}, we recommend composting your bio-waste with 60:40 carbon-to-nitrogen ratio. Apply 2.5 tonnes of vermicompost per acre to reduce DAP usage by 40%. Contact toll-free 1800-KRISHI-GRN for customized field support.`,
        category: 'advisory',
      });
    }

    const systemInstruction = `You are KrishiGreen's practical, compassionate AI Agri-Advisor and Waste-to-Wealth specialist for Indian farmers, FPOs, and village entrepreneurs.
KrishiGreen's core mission: "Food waste → Organic fertilizer → Farmer prosperity".
Key capabilities:
1. Provide actionable guidance on:
   - Converting food waste, vegetable mandi waste, and crop residues into organic fertilizers (vermicompost, jeevamrutha, bio-enzymes, compost).
   - Practical application dosages of organic fertilizers for Indian crops (Paddy, Wheat, Cotton, Sugarcane, Vegetables, Pulses).
   - Replacing chemical fertilizers (Urea, DAP, MOP) safely to achieve 40% chemical reduction while increasing soil organic carbon.
   - Government schemes: PM-PRANAM, PKVY, GOBARdhan, SMAM (equipment subsidy up to 50%), Agri Infrastructure Fund.
   - Farm equipment selection, maintenance, and rental guidance.
   - Mandi price trends and organic produce premium realization.
2. Language: Reply primarily in the requested language: "${language}". If the user wrote in Hindi, Telugu, Tamil, Marathi, Punjabi, Gujarati, etc., reply in that natural Indian language script with clear, encouraging, respectful language suitable for farmers. Keep answers concise, direct, and structured with bullet points.
3. Include practical tips (e.g. moisture 50-60%, aeration, curing period) when discussing composting.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `User language: ${language}\nTopic context: ${context}\nFarmer / Entrepreneur query: ${message}`,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'KrishiGreen advisor could not generate a reply. Please try again or call 1800-KRISHI-GRN.';
    res.json({ reply: replyText });
  } catch (err: any) {
    console.error('Advisor error:', err);
    res.status(500).json({
      error: 'Failed to process advisory query',
      details: err?.message || 'Internal server error',
    });
  }
});

// Soil Organic Carbon & Cost Savings Calculator endpoint
app.post('/api/calculate-impact', (req, res) => {
  try {
    const { landAcres = 2, cropType = 'Paddy', chemicalSpendYearly = 25000, wasteKgsAvailable = 500 } = req.body;

    // Organic conversion calculations
    const compostPotentialKg = Math.round(wasteKgsAvailable * 0.45); // ~45% conversion efficiency
    const chemicalFertilizerReductionPercent = 40;
    const directChemicalSavings = Math.round(chemicalSpendYearly * 0.40);
    const compostValueCreated = Math.round(compostPotentialKg * 8); // ₹8 per kg market rate
    const totalYearlyBenefit = directChemicalSavings + compostValueCreated;
    const soilCarbonIncrease = +(0.15 * (landAcres / 2)).toFixed(2); // estimated SOC % rise over 2 seasons
    const landfillMethaneDivertedKg = Math.round(wasteKgsAvailable * 0.72);

    res.json({
      acres: landAcres,
      crop: cropType,
      chemicalSavings: directChemicalSavings,
      compostYieldKg: compostPotentialKg,
      compostValue: compostValueCreated,
      totalNetBenefit: totalYearlyBenefit,
      socIncreasePercent: soilCarbonIncrease,
      methaneDivertedKg: landfillMethaneDivertedKg,
      recommendation: `By processing ${wasteKgsAvailable}kg of waste into ${compostPotentialKg}kg organic fertilizer, you can replace 3-4 bags of DAP and save ₹${directChemicalSavings} while earning ₹${compostValueCreated} in organic input value.`,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Calculation failed' });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[KrishiGreen] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
