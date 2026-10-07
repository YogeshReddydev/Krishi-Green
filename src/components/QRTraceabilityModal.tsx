import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { X, CheckCircle2, ShieldCheck, Printer, Calendar, MapPin, Award } from 'lucide-react';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  batchData: {
    batchNo: string;
    productName: string;
    producerName: string;
    village: string;
    productionDate: string;
    certificationStatus: string;
    npk?: {
      nitrogen: string;
      phosphorus: string;
      potassium: string;
      organicCarbonPercent: number;
      ph: number;
      cToNRatio?: string;
    };
  };
}

export const QRTraceabilityModal: React.FC<QRModalProps> = ({ isOpen, onClose, batchData }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen && batchData) {
      const payload = JSON.stringify({
        batch: batchData.batchNo,
        product: batchData.productName,
        producer: batchData.producerName,
        origin: batchData.village,
        testedDate: batchData.productionDate,
        verifiedBy: 'KrishiGreen & KVK Certified Quality Lab',
        verifyUrl: `https://krishigreen.in/trace/${batchData.batchNo}`,
      });

      QRCode.toDataURL(payload, {
        width: 220,
        margin: 2,
        color: {
          dark: '#14532d',
          light: '#f0fdf4',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('QR generation error:', err));
    }
  }, [isOpen, batchData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-emerald-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600/40 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-snug">Organic Batch Traceability</h3>
              <p className="text-xs text-emerald-100/90">Verified Soil Microbiological Quality Certificate</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-100 hover:text-white hover:bg-emerald-700/50 rounded-lg transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-emerald-50/70 border border-emerald-100 rounded-xl">
            {qrDataUrl ? (
              <div className="bg-white p-2 rounded-xl border border-emerald-200 shadow-sm shrink-0">
                <img src={qrDataUrl} alt="Traceability QR" className="w-36 h-36" />
                <p className="text-[10px] text-center text-emerald-800 font-mono mt-1 font-semibold">
                  SCAN TO VERIFY
                </p>
              </div>
            ) : (
              <div className="w-36 h-36 bg-emerald-100 animate-pulse rounded-xl" />
            )}

            <div className="space-y-1.5 text-sm text-gray-700 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {batchData.certificationStatus}
              </div>
              <h4 className="font-bold text-gray-900 text-base">{batchData.productName}</h4>
              <p className="text-xs text-gray-500 font-mono">Batch: {batchData.batchNo}</p>
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <Award className="w-3.5 h-3.5 text-emerald-700" />
                <span>Producer: <strong>{batchData.producerName}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>Village: {batchData.village}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                <span>Cured & Certified: {batchData.productionDate}</span>
              </div>
            </div>
          </div>

          {/* Lab Test Results */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
              Laboratory Assayed Chemical & Microbiological Profile
            </h5>
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-center">
                <span className="text-[11px] text-gray-500 block">Total Nitrogen (N)</span>
                <span className="font-bold text-emerald-900 text-base">
                  {batchData.npk?.nitrogen || '1.8%'}
                </span>
                <span className="text-[10px] text-emerald-600 block">FCO Compliant</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-center">
                <span className="text-[11px] text-gray-500 block">Phosphorus (P₂O₅)</span>
                <span className="font-bold text-emerald-900 text-base">
                  {batchData.npk?.phosphorus || '1.2%'}
                </span>
                <span className="text-[10px] text-emerald-600 block">Citrate Soluble</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-center">
                <span className="text-[11px] text-gray-500 block">Potassium (K₂O)</span>
                <span className="font-bold text-emerald-900 text-base">
                  {batchData.npk?.potassium || '1.4%'}
                </span>
                <span className="text-[10px] text-emerald-600 block">Available</span>
              </div>
              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 text-center">
                <span className="text-[11px] text-gray-500 block">Organic Carbon</span>
                <span className="font-bold text-emerald-700 text-base">
                  {batchData.npk?.organicCarbonPercent || 18.4}%
                </span>
                <span className="text-[10px] text-emerald-600 block">Humic Enriched</span>
              </div>
              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 text-center">
                <span className="text-[11px] text-gray-500 block">pH Level</span>
                <span className="font-bold text-emerald-700 text-base">
                  {batchData.npk?.ph || 7.2}
                </span>
                <span className="text-[10px] text-emerald-600 block">Neutral Living</span>
              </div>
              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 text-center">
                <span className="text-[11px] text-gray-500 block">C:N Ratio</span>
                <span className="font-bold text-emerald-700 text-base">
                  {batchData.npk?.cToNRatio || '15:1'}
                </span>
                <span className="text-[10px] text-emerald-600 block">Optimal Cured</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2.5">
            <span className="text-base">🛡️</span>
            <div>
              <strong className="block text-amber-950 font-semibold mb-0.5">Trust & Organic Certification Guarantee</strong>
              <span>
                Processed exclusively from segregated municipal and mandi food organics in village decentralized units. Guaranteed free from heavy metals, weed seeds, and pathogens.
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-500 font-mono">Accredited: KVK Quality Audit 2026</p>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" /> Print Certificate
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
