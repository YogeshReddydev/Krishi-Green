import React from 'react';
import { SupportedLanguage } from '../types';

interface Props { language: SupportedLanguage; }

export const SustainableFarmingPage: React.FC<Props> = ({ language }) => {
  const isTe = language === 'te';

  const practices = [
    {
      icon: '🌾',
      title: isTe ? 'సేంద్రీయ ఎరువులు' : 'Organic Fertilizers',
      desc: isTe
        ? 'రసాయన ఎరువులకు బదులు సేంద్రీయ ఎరువులు వాడటం వల్ల భూసారం పెరుగుతుంది.'
        : 'Using organic fertilizers instead of chemicals improves long-term soil health and reduces input costs.',
    },
    {
      icon: '🔄',
      title: isTe ? 'పంట మార్పిడి' : 'Crop Rotation',
      desc: isTe
        ? 'వేర్వేరు పంటలు వేయడం వల్ల నేలలో పోషకాలు సమతుల్యంగా ఉంటాయి మరియు చీడపీడలు తగ్గుతాయి.'
        : 'Rotating crops restores soil nutrients, breaks pest and disease cycles, and reduces dependency on external inputs.',
    },
    {
      icon: '💧',
      title: isTe ? 'సమర్థవంతమైన నీటి పారుదల' : 'Efficient Irrigation',
      desc: isTe
        ? 'డ్రిప్ మరియు స్ప్రింక్లర్ సేద్యం నీటిని ఆదా చేస్తుంది మరియు పంట నాణ్యతను మెరుగుపరుస్తుంది.'
        : 'Drip and sprinkler irrigation saves water and improves crop quality compared to flood irrigation.',
    },
    {
      icon: '🌿',
      title: isTe ? 'జీవమృతం వాడకం' : 'Jeevamrutham Application',
      desc: isTe
        ? 'జీవమృతం భూమిలో సూక్ష్మజీవులను పెంచి, నేల ఆరోగ్యాన్ని మెరుగుపరుస్తుంది.'
        : 'Jeevamrutham enriches soil microbial activity and supports natural plant growth without chemicals.',
    },
    {
      icon: '🌱',
      title: isTe ? 'కవర్ క్రాప్స్' : 'Cover Crops',
      desc: isTe
        ? 'ఖాళీ భూమిలో కవర్ పంటలు వేయడం వల్ల మట్టి కోత నివారించబడుతుంది మరియు భూసారం పెరుగుతుంది.'
        : 'Planting cover crops between seasons prevents soil erosion and adds organic matter.',
    },
    {
      icon: '♻️',
      title: isTe ? 'వ్యర్థ నిర్వహణ' : 'Waste Management',
      desc: isTe
        ? 'పంట అవశేషాలను కంపోస్ట్ చేయడం వల్ల వాటిని తగలబెట్టకుండా తిరిగి నేలకు ఇవ్వవచ్చు.'
        : 'Composting crop residues instead of burning returns nutrients to the soil and avoids air pollution.',
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {isTe ? 'స్థిరమైన వ్యవసాయం' : 'Sustainable Farming'}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {isTe
            ? 'భూమి ఆరోగ్యాన్ని కాపాడుతూ మంచి దిగుబడి పొందే పద్ధతులు.'
            : 'Farming practices that protect soil health, reduce costs and support long-term productivity.'}
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {practices.map(({ icon, title, desc }) => (
          <div key={title} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-2">
            <div className="text-3xl">{icon}</div>
            <h3 className="font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
          </div>
        ))}
      </section>

      {/* Carbon monitoring link */}
      <section className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl p-8 text-center space-y-3">
        <h2 className="text-xl font-bold text-[#065f46]">
          {isTe ? 'పర్యావరణ ప్రభావ నివేదిక' : 'Environmental Impact Tracking'}
        </h2>
        <p className="text-sm text-gray-600 max-w-xl mx-auto">
          {isTe
            ? 'మీ వ్యవసాయ కార్యకలాపాలు పర్యావరణానికి ఎంత మేలు చేస్తున్నాయో తెలుసుకోండి. కార్బన్ ఇంటెగ్రిటీ పేజీలో మరింత సమాచారం చూడండి.'
            : 'Learn how your farming activities contribute to reducing carbon emissions. See the Carbon Integrity page for details.'}
        </p>
      </section>
    </main>
  );
};
