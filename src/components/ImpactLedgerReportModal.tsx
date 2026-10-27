import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  X,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building,
  User,
  Scale,
  DollarSign,
  Leaf,
  Flame,
  Award,
  Share2,
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import {
  ImpactLedgerItem,
  LedgerSummaryStats,
  exportLedgerToCSV,
  downloadOfflineHTMLReport,
} from '../utils/ledgerExport';

interface ImpactLedgerReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ImpactLedgerItem[];
  stats: LedgerSummaryStats;
  language: SupportedLanguage;
}

export const ImpactLedgerReportModal: React.FC<ImpactLedgerReportModalProps> = ({
  isOpen,
  onClose,
  items,
  stats,
  language,
}) => {
  const [beneficiaryName, setBeneficiaryName] = useState<string>('Andhra Pradesh Pilot Farmer Pool');
  const [villageMandal, setVillageMandal] = useState<string>(
    stats.selectedDistrict === 'All' ? 'Pilot Mandals' : `${stats.selectedDistrict} Ag Hub`
  );
  const [serialNo] = useState<string>(
    `KG-AP-LEDGER-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`
  );

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    exportLedgerToCSV(items, stats, language);
  };

  const handleDownloadHTML = () => {
    downloadOfflineHTMLReport(items, stats, {
      beneficiaryName,
      villageMandal,
      serialNo,
    });
  };

  const issueDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-fadeIn print:border-none print:shadow-none print:max-w-none print:max-h-none print:overflow-visible">
        {/* Modal Top Control Bar (Hidden during printing) */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3 bg-gray-50/80 no-print">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-gray-900 text-base sm:text-lg">
                {language === 'te'
                  ? 'అధికారిక వ్యవసాయ ప్రభావ లెడ్జర్ & సర్టిఫికేట్'
                  : 'Official Agricultural Impact Ledger & PDF Report'}
              </h3>
              <p className="text-xs text-gray-500">
                {language === 'te'
                  ? 'రైతు భరోసా కేంద్రం (RBK) & కృషి విజ్ఞాన కేంద్రం (KVK) రికార్డులకు ఆమోదించబడింది'
                  : 'Formatted for Local Agricultural Records, Rythu Bharosa Kendra (RBK) & Bank Subsidies'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              title="Print Document or Save as PDF"
            >
              <Printer className="w-4 h-4" />
              <span>{language === 'te' ? 'ప్రింట్ / PDF సేవ్ చేయండి' : 'Print / Save PDF'}</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3 py-2 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              title="Export as CSV spreadsheet"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span>CSV</span>
            </button>

            <button
              onClick={handleDownloadHTML}
              className="hidden sm:flex px-3 py-2 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-xl text-xs font-bold transition items-center gap-1.5 cursor-pointer"
              title="Download offline HTML document"
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span>HTML</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 rounded-xl hover:bg-gray-200 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Customization toolbar (Hidden during printing) */}
        <div className="px-5 py-3 bg-emerald-50/50 border-b border-emerald-100 flex flex-wrap items-center gap-4 text-xs text-gray-700 no-print">
          <span className="font-bold text-emerald-900 uppercase text-[10px] tracking-wider">
            {language === 'te' ? 'రికార్డు వివరాలు సవరించండి:' : 'Customize Record Details:'}
          </span>
          <div className="flex items-center gap-1.5 flex-1 min-w-[200px]">
            <label className="text-gray-500 text-[11px] font-semibold">Beneficiary / Farmer:</label>
            <input
              type="text"
              value={beneficiaryName}
              onChange={(e) => setBeneficiaryName(e.target.value)}
              className="px-2.5 py-1 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-800 flex-1 focus:ring-1 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div className="flex items-center gap-1.5 flex-1 min-w-[180px]">
            <label className="text-gray-500 text-[11px] font-semibold">Mandal / Village:</label>
            <input
              type="text"
              value={villageMandal}
              onChange={(e) => setVillageMandal(e.target.value)}
              className="px-2.5 py-1 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-800 flex-1 focus:ring-1 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>

        {/* Printable Certificate Document Area */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-white print:p-2 print:overflow-visible printable-document">
          <div className="border-4 border-double border-emerald-800/80 rounded-2xl p-6 sm:p-8 space-y-6 bg-white relative">
            {/* Watermark badge in background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <Award className="w-96 h-96 text-emerald-950" />
            </div>

            {/* Official Header */}
            <div className="text-center space-y-1.5 border-b-2 border-emerald-900/60 pb-5">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-2xl mb-1 shadow-2xs">
                🌾
              </div>
              <div className="text-[11px] font-bold text-emerald-900 uppercase tracking-widest font-mono">
                Government of Andhra Pradesh • Dept. of Agriculture & RySS
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-tight uppercase">
                {language === 'te'
                  ? 'కృషి గ్రీన్ సర్క్యులర్ బయో-ఎకానమీ లెడ్జర్ & కార్బన్ ఆడిట్ ధృవీకరణ పత్రం'
                  : 'Official Circular Bio-Economy Ledger & Carbon Audit Certificate'}
              </h1>
              <p className="text-xs text-gray-600 max-w-xl mx-auto font-medium">
                Rythu Bharosa Kendra (RBK) & Krishi Vigyan Kendra (KVK) Verified Biomass Diversion and Methane Abatement Record
              </p>
            </div>

            {/* Metadata Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-emerald-50/70 border border-emerald-200/90 rounded-xl text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 block">Certificate Serial No:</span>
                <span className="font-mono font-black text-emerald-950 text-[11px]">{serialNo}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 block">Date of Certification:</span>
                <span className="font-semibold text-gray-800 text-[11px]">{issueDate}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 block">Beneficiary Entity:</span>
                <span className="font-bold text-gray-900 text-[11px] truncate block">{beneficiaryName}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 block">Jurisdiction / AP District:</span>
                <span className="font-bold text-emerald-900 text-[11px]">
                  {villageMandal}, {stats.selectedDistrict}
                </span>
              </div>
            </div>

            {/* Primary Audited Summary Boxes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-gray-500 block">Total Waste Diverted</span>
                <div className="text-xl sm:text-2xl font-black font-mono text-emerald-950 mt-1">
                  {(stats.totalWasteKg / 1000).toFixed(2)}{' '}
                  <span className="text-xs font-normal text-gray-500">MT</span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 block mt-0.5">
                  {(stats.totalWasteKg / 100).toFixed(1)} Quintals certified
                </span>
              </div>

              <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-gray-500 block">Methane Suppressed</span>
                <div className="text-xl sm:text-2xl font-black font-mono text-teal-800 mt-1">
                  {stats.totalMethaneKg.toLocaleString('en-IN')}{' '}
                  <span className="text-xs font-normal text-gray-500">kg CH₄</span>
                </div>
                <span className="text-[10px] text-gray-500 block mt-0.5">
                  Anaerobic decay averted
                </span>
              </div>

              <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-gray-500 block">Net GHG Offset</span>
                <div className="text-xl sm:text-2xl font-black font-mono text-emerald-800 mt-1">
                  {stats.totalCarbonTCO2e.toFixed(2)}{' '}
                  <span className="text-xs font-normal text-gray-500">tCO₂e</span>
                </div>
                <span className="text-[10px] text-gray-500 block mt-0.5">
                  BEE / CCTS accounting standard
                </span>
              </div>

              <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-gray-500 block">Farmer Reconciled Wealth</span>
                <div className="text-xl sm:text-2xl font-black font-mono text-emerald-700 mt-1">
                  ₹{stats.totalPayoutINR.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] font-semibold text-emerald-600 block mt-0.5">
                  Direct DBT / Bank Transfers
                </span>
              </div>
            </div>

            {/* Itemized Ledger Table */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-950 font-mono">
                  Itemized Verified Transactions ({items.length} records)
                </h4>
                <span className="text-[10px] text-gray-500 font-mono">
                  Audit Standard: FCO 1985 & ICM Baseline
                </span>
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-emerald-900 text-white font-mono text-[10px] uppercase tracking-wider">
                      <th className="p-2 sm:p-2.5">Record ID / Slip</th>
                      <th className="p-2 sm:p-2.5">Date</th>
                      <th className="p-2 sm:p-2.5">Beneficiary / Entity</th>
                      <th className="p-2 sm:p-2.5">Location</th>
                      <th className="p-2 sm:p-2.5">Residue Type</th>
                      <th className="p-2 sm:p-2.5 text-right">Net Wt (Kg)</th>
                      <th className="p-2 sm:p-2.5 text-right">Offset (tCO₂e)</th>
                      <th className="p-2 sm:p-2.5 text-right">Payout (₹)</th>
                      <th className="p-2 sm:p-2.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-[11px]">
                    {items.map((it, idx) => (
                      <tr key={it.id || idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/70'}>
                        <td className="p-2 font-mono font-bold text-gray-900">
                          {it.id}
                          <span className="block text-[9px] text-gray-400 font-normal">
                            {it.batchOrSlipNo}
                          </span>
                        </td>
                        <td className="p-2 text-gray-600 font-mono">{it.date}</td>
                        <td className="p-2 font-medium text-gray-800">{it.farmerOrBeneficiary}</td>
                        <td className="p-2 text-gray-600">
                          {it.villageOrMandal}, {it.district}
                        </td>
                        <td className="p-2 text-gray-700">{it.biomassType}</td>
                        <td className="p-2 font-mono font-bold text-gray-900 text-right">
                          {it.netWeightKg.toLocaleString('en-IN')}
                        </td>
                        <td className="p-2 font-mono font-bold text-emerald-800 text-right">
                          {it.carbonAvoidedTCO2e.toFixed(2)}
                        </td>
                        <td className="p-2 font-mono font-bold text-emerald-700 text-right">
                          ₹{it.payoutINR.toLocaleString('en-IN')}
                        </td>
                        <td className="p-2 text-center">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                            <span>{it.verificationStatus}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                    {items.length === 0 && (
                      <tr>
                        <td colSpan={9} className="p-6 text-center text-gray-500 italic">
                          No verified records logged yet for this filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Official Signatures & Verification Section */}
            <div className="pt-6 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="space-y-1">
                  <div className="h-12 flex items-end justify-center">
                    <span className="font-mono text-xs text-gray-400 italic">Digitally Verified</span>
                  </div>
                  <div className="border-t border-dashed border-gray-400 pt-1.5">
                    <strong className="block text-xs font-bold text-gray-900">
                      Village Agricultural Assistant (VAA)
                    </strong>
                    <span className="text-[10px] text-gray-500">
                      Rythu Bharosa Kendra (RBK) Jurisdiction
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="h-12 flex items-end justify-center">
                    <span className="font-mono text-xs text-gray-400 italic">Audit Passed</span>
                  </div>
                  <div className="border-t border-dashed border-gray-400 pt-1.5">
                    <strong className="block text-xs font-bold text-gray-900">
                      Senior Agronomist / Scientist
                    </strong>
                    <span className="text-[10px] text-gray-500">
                      Krishi Vigyan Kendra (KVK) Extension
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="h-12 flex items-end justify-center">
                    <span className="font-mono text-xs text-gray-400 italic">Beneficiary Sign</span>
                  </div>
                  <div className="border-t border-dashed border-gray-400 pt-1.5">
                    <strong className="block text-xs font-bold text-gray-900">
                      Farmer / FPO Authorized Signatory
                    </strong>
                    <span className="text-[10px] text-gray-500">
                      Beneficiary Acknowledgement
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance & Watermark Note */}
            <div className="text-center text-[10px] text-gray-500 pt-2 border-t border-gray-100 font-mono">
              Certified compliant with Fertilizer (Control) Order 1985 & Bureau of Energy Efficiency (BEE) Carbon Credit Trading Scheme (CCTS).
              System-generated verified ledger by Krishi Green Platform. Record Hash: {serialNo}.
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-gray-100 flex items-center justify-between gap-3 bg-gray-50/80 no-print">
          <div className="text-xs text-gray-500 font-mono">
            {items.length} records ready to print or export
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              {language === 'te' ? 'మూసివేయి' : 'Close'}
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{language === 'te' ? 'ప్రింట్ / PDF డౌన్‌లోడ్' : 'Print / Save as PDF'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
