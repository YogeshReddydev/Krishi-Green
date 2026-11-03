import React from 'react';
import { IconClose, IconShield, IconFileText } from './Icons';

import { SupportedLanguage } from '../types';

interface LegalModalProps {
  type: 'tos' | 'privacy' | null;
  onClose: () => void;
  language: SupportedLanguage;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, onClose, language }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-[#fcfbf9] text-[#1c241e] rounded-md max-w-2xl w-full p-6 border border-[#ded9ce] space-y-4 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#ded9ce]">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#f0ede6] text-[#1e382b] rounded-sm">
              {type === 'tos' ? <IconFileText className="w-5 h-5" /> : <IconShield className="w-5 h-5" />}
            </span>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#1e382b]">
                {type === 'tos'
                  ? language === 'te'
                    ? 'నిబంధనలు & షరతులు (Terms of Service)'
                    : 'KrishiGreen Agricultural Platform: Terms of Service'
                  : language === 'te'
                  ? 'గోప్యతా విధానం (Privacy Policy)'
                  : 'KrishiGreen Data Protection & Privacy Policy'}
              </h2>
              <p className="text-[11px] text-[#5c685f]">
                Effective Date: October 2026. Compliant with IT Act 2000, DPDP Act 2023, and Fertilizer Control Order 1985.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#5c685f] hover:text-[#1c241e] rounded hover:bg-[#edeae1] transition"
          >
            <IconClose className="w-5 h-5" />
          </button>
        </div>

        {type === 'tos' ? (
          <div className="space-y-3.5 text-xs text-[#334036] leading-relaxed">
            <section className="space-y-1">
              <h3 className="font-bold text-sm text-[#1e382b]">1. Acceptance of Operational Terms</h3>
              <p>
                By accessing KrishiGreen services, farmers, Farmer Producer Organizations (FPOs), Custom Hiring Centres (CHCs), and organic producers agree to these operational terms. KrishiGreen connects certified bio-input producers, Custom Hiring Centres, and farmers in Andhra Pradesh and India.
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="font-bold text-sm text-[#1e382b]">2. Custom Hiring Centre (CHC) & Machinery Rentals</h3>
              <p>
                Machinery bookings placed via KrishiGreen are governed by standard Rythu Bharosa Kendra (RBK) and Sub-Mission on Agricultural Mechanization (SMAM) guidelines. Operators provided with rented machinery are certified by Krishi Vigyan Kendras (KVK). Farmers agree to provide safe field entry and verify fuel levels and 42-point calibration upon machine arrival.
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="font-bold text-sm text-[#1e382b]">3. Organic Bio-Inputs & Quality Assurance</h3>
              <p>
                All solid vermicompost, liquid Jeevamrutha, and bio-stimulants listed in the marketplace must possess valid laboratory test reports compliant with the Fertilizer (Inorganic, Organic or Mixed) Control Order (FCO) 1985. Batch QR codes provide verifiable lot traceability to production units.
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="font-bold text-sm text-[#1e382b]">4. Subsidies, Payments & Dispute Settlement</h3>
              <p>
                Government subsidies under SMAM, PM-PRANAM, PMKSY, and APMIP are disbursed in accordance with government administrative guidelines. Rental escrow fees are held securely and released to machine owners only after verified field operation completion.
              </p>
            </section>
          </div>
        ) : (
          <div className="space-y-3.5 text-xs text-[#334036] leading-relaxed">
            <section className="space-y-1">
              <h3 className="font-bold text-sm text-[#1e382b]">1. Information We Collect</h3>
              <p>
                KrishiGreen collects strictly necessary operational information: farmer contact details for machinery delivery coordination, village and land coordinates for weather advisories and custom hiring dispatch, and order transaction records. We do not sell or monetize personal farmer data.
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="font-bold text-sm text-[#1e382b]">2. Storage & Purpose of Use</h3>
              <p>
                Information is utilized solely for: (a) dispatching rental tractors, harvesters, and drones to accurate field plots; (b) sending localized meteorological rainfall alerts; (c) submitting documentation for SMAM and PM-PRANAM subsidy eligibility on the farmer's behalf.
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="font-bold text-sm text-[#1e382b]">3. Data Rights under DPDP Act 2023</h3>
              <p>
                In accordance with India's Digital Personal Data Protection Act 2023, farmers maintain complete rights to request data access, rectification, or deletion of farm records by contacting our Data Protection Officer at privacy@krishigreen.in or calling 1800-425-0012.
              </p>
            </section>
          </div>
        )}

        <div className="pt-3 border-t border-[#ded9ce] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1e382b] hover:bg-[#162a20] text-[#f7f5f0] text-xs font-bold rounded-sm transition"
          >
            {language === 'te' ? 'మూసివేయి (Close)' : 'Acknowledge & Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
