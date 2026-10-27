import { APDistrict, SupportedLanguage } from '../types';

export interface ImpactLedgerItem {
  id: string;
  batchOrSlipNo: string;
  date: string;
  category: 'Biomass Diversion' | 'Carbon Credit Tranche' | 'Bio-Processing Batch';
  district: APDistrict | string;
  villageOrMandal: string;
  farmerOrBeneficiary: string;
  biomassType: string;
  netWeightKg: number;
  methaneAvoidedKg: number;
  carbonAvoidedTCO2e: number;
  payoutINR: number;
  qualityStandard: string;
  verificationSource: string;
  verificationStatus: 'Verified by Ground Audit' | 'Weighbridge Certified' | 'BEE ICM Registered' | 'KVK Lab Approved' | 'Pending Audit';
}

export interface LedgerSummaryStats {
  totalRecords: number;
  totalWasteKg: number;
  totalMethaneKg: number;
  totalCarbonTCO2e: number;
  totalPayoutINR: number;
  selectedDistrict: string;
}

/**
 * Escapes fields for CSV compliance according to RFC 4180
 */
function escapeCSV(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '""';
  const stringValue = String(value);
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n') || stringValue.includes('\r')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return `"${stringValue}"`;
}

/**
 * Generates and triggers browser download of an RFC-4180 compliant CSV file
 * with UTF-8 BOM so Microsoft Excel and LibreOffice Calc render Indian currency and fonts cleanly.
 */
export function exportLedgerToCSV(
  items: ImpactLedgerItem[],
  stats: LedgerSummaryStats,
  language: SupportedLanguage = 'en'
): void {
  const exportTimestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  const dateSlug = new Date().toISOString().slice(0, 10);
  const districtSlug = stats.selectedDistrict === 'All' ? 'All_Districts' : stats.selectedDistrict.replace(/\s+/g, '_');

  const lines: string[] = [];

  // Metadata comments for Agricultural office records
  lines.push('# KRISHI GREEN - AGRICULTURAL CIRCULAR ECONOMY IMPACT LEDGER');
  lines.push('# Official Andhra Pradesh Pilot Record - Rythu Bharosa Kendra & KVK Verification');
  lines.push(`# Generated At: ${exportTimestamp}`);
  lines.push(`# District Filter: ${stats.selectedDistrict}`);
  lines.push(`# Total Verified Records: ${stats.totalRecords}`);
  lines.push(`# Total Biomass Diverted (Kg): ${stats.totalWasteKg.toLocaleString('en-IN')}`);
  lines.push(`# Total Biomass Diverted (Quintals): ${(stats.totalWasteKg / 100).toFixed(2)}`);
  lines.push(`# Total Methane Suppressed (Kg CH4): ${stats.totalMethaneKg.toLocaleString('en-IN')}`);
  lines.push(`# Total GHG Emission Offset (tCO2e): ${stats.totalCarbonTCO2e.toFixed(2)}`);
  lines.push(`# Total Farmer Reconciled Wealth (INR): Rs. ${stats.totalPayoutINR.toLocaleString('en-IN')}`);
  lines.push('# Compliance: Fertilizer (Control) Order 1985 & BEE Carbon Credit Trading Scheme (CCTS)');
  lines.push('');

  // Column Headers
  const headers = [
    'Record ID',
    'Slip / Batch No',
    'Date',
    'Category',
    'District (AP)',
    'Village / Mandal',
    'Farmer / Beneficiary Entity',
    'Biomass / Crop Residue Type',
    'Net Weight (Kg)',
    'Net Weight (Quintals)',
    'Net Weight (Tonnes)',
    'Methane Suppressed (kg CH4)',
    'Carbon Avoidance (tCO2e)',
    'Farmer Payout (INR)',
    'Quality & Lab Standard',
    'Verification Source',
    'Verification Status',
  ];
  lines.push(headers.map(escapeCSV).join(','));

  // Data Rows
  items.forEach((item) => {
    const quintals = (item.netWeightKg / 100).toFixed(2);
    const tonnes = (item.netWeightKg / 1000).toFixed(3);
    const row = [
      item.id,
      item.batchOrSlipNo,
      item.date,
      item.category,
      item.district,
      item.villageOrMandal,
      item.farmerOrBeneficiary,
      item.biomassType,
      item.netWeightKg,
      quintals,
      tonnes,
      item.methaneAvoidedKg,
      item.carbonAvoidedTCO2e,
      item.payoutINR,
      item.qualityStandard,
      item.verificationSource,
      item.verificationStatus,
    ];
    lines.push(row.map(escapeCSV).join(','));
  });

  // Create UTF-8 BOM + CSV string
  const csvContent = '\uFEFF' + lines.join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `KrishiGreen_Impact_Ledger_${districtSlug}_${dateSlug}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Triggers download of a standalone, offline-viewable HTML Certificate Report
 */
export function downloadOfflineHTMLReport(
  items: ImpactLedgerItem[],
  stats: LedgerSummaryStats,
  config: {
    beneficiaryName: string;
    villageMandal: string;
    serialNo: string;
    notes?: string;
  }
): void {
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const dateSlug = new Date().toISOString().slice(0, 10);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Krishi Green - Official Agricultural Impact Ledger & Certificate</title>
  <style>
    @page { size: A4 portrait; margin: 12mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; margin: 0; padding: 24px; color: #111827; background: #ffffff; }
    .cert-container { max-width: 800px; margin: 0 auto; border: 3px double #15803d; padding: 28px; border-radius: 8px; }
    .header { text-align: center; border-bottom: 2px solid #166534; padding-bottom: 16px; margin-bottom: 20px; }
    .emblem { font-size: 32px; margin-bottom: 4px; }
    .dept-title { font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; color: #166534; }
    .main-title { font-size: 22px; font-weight: 900; margin: 6px 0; color: #064e3b; text-transform: uppercase; }
    .cert-sub { font-size: 12px; color: #4b5563; }
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 14px; border-radius: 6px; margin-bottom: 20px; font-size: 13px; }
    .meta-item strong { color: #14532d; }
    .summary-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 24px; }
    .card { background: #f8fafc; border: 1px solid #cbd5e1; padding: 12px; text-align: center; border-radius: 6px; }
    .card-title { font-size: 10px; text-transform: uppercase; color: #64748b; font-weight: bold; margin-bottom: 4px; }
    .card-val { font-size: 18px; font-weight: 800; color: #0f172a; font-family: monospace; }
    .card-sub { font-size: 10px; color: #15803d; margin-top: 2px; }
    table { width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 24px; }
    th { background: #166534; color: #ffffff; padding: 8px 6px; text-align: left; font-size: 10px; text-transform: uppercase; }
    td { padding: 7px 6px; border-bottom: 1px solid #e2e8f0; }
    tr:nth-child(even) { background: #f8fafc; }
    .status-badge { display: inline-block; padding: 2px 6px; border-radius: 9999px; font-size: 9px; font-weight: bold; background: #dcfce7; color: #166534; border: 1px solid #86efac; }
    .signatures { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; text-align: center; margin-top: 40px; padding-top: 20px; }
    .sig-line { border-top: 1px dashed #64748b; padding-top: 8px; font-size: 11px; font-weight: bold; color: #334155; }
    .sig-sub { font-size: 10px; color: #64748b; }
    .footer { text-align: center; font-size: 10px; color: #64748b; margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 12px; }
    .print-btn { background: #15803d; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; cursor: pointer; margin-bottom: 16px; }
    @media print { .print-btn { display: none; } body { padding: 0; } }
  </style>
</head>
<body>
  <div style="text-align: right; max-width: 800px; margin: 0 auto;">
    <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
  </div>
  <div class="cert-container">
    <div class="header">
      <div class="emblem">🌾</div>
      <div class="dept-title">Government of Andhra Pradesh • Department of Agriculture & RySS</div>
      <div class="main-title">Official Agricultural Impact & Circular Biomass Ledger</div>
      <div class="cert-sub">Rythu Bharosa Kendra (RBK) Verified Circular Economy & Carbon Avoidance Record</div>
    </div>

    <div class="meta-grid">
      <div class="meta-item"><strong>Certificate Serial No:</strong> ${config.serialNo}</div>
      <div class="meta-item"><strong>Date of Certification:</strong> ${dateStr}</div>
      <div class="meta-item"><strong>Beneficiary / Farmer:</strong> ${config.beneficiaryName}</div>
      <div class="meta-item"><strong>District & Mandal:</strong> ${config.villageMandal}, ${stats.selectedDistrict}</div>
    </div>

    <div class="summary-cards">
      <div class="card">
        <div class="card-title">Biomass Diverted</div>
        <div class="card-val">${(stats.totalWasteKg / 1000).toFixed(2)} MT</div>
        <div class="card-sub">${(stats.totalWasteKg / 100).toFixed(1)} Quintals</div>
      </div>
      <div class="card">
        <div class="card-title">Methane Avoided</div>
        <div class="card-val">${stats.totalMethaneKg.toLocaleString('en-IN')} kg</div>
        <div class="card-sub">Anaerobic decay averted</div>
      </div>
      <div class="card">
        <div class="card-title">Carbon Offset</div>
        <div class="card-val">${stats.totalCarbonTCO2e.toFixed(2)} tCO₂e</div>
        <div class="card-sub">BEE CCTS Framework</div>
      </div>
      <div class="card">
        <div class="card-title">Farmer Wealth</div>
        <div class="card-val">₹${stats.totalPayoutINR.toLocaleString('en-IN')}</div>
        <div class="card-sub">Direct DBT / Settlement</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID / Slip</th>
          <th>Date</th>
          <th>Farmer / Entity</th>
          <th>Location</th>
          <th>Residue / Crop</th>
          <th>Net Wt (Kg)</th>
          <th>Offset (tCO₂e)</th>
          <th>Payout (₹)</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${items
          .map(
            (item) => `<tr>
          <td><strong>${item.id}</strong><br><small style="color:#64748b;">${item.batchOrSlipNo}</small></td>
          <td>${item.date}</td>
          <td>${item.farmerOrBeneficiary}</td>
          <td>${item.villageOrMandal}, ${item.district}</td>
          <td>${item.biomassType}</td>
          <td style="font-family:monospace;font-weight:bold;">${item.netWeightKg.toLocaleString('en-IN')}</td>
          <td style="font-family:monospace;color:#047857;">${item.carbonAvoidedTCO2e.toFixed(2)}</td>
          <td style="font-family:monospace;font-weight:bold;color:#15803d;">₹${item.payoutINR.toLocaleString('en-IN')}</td>
          <td><span class="status-badge">${item.verificationStatus}</span></td>
        </tr>`
          )
          .join('')}
      </tbody>
    </table>

    <div class="signatures">
      <div>
        <div class="sig-line">Village Agricultural Assistant (VAA)</div>
        <div class="sig-sub">Rythu Bharosa Kendra (RBK)</div>
      </div>
      <div>
        <div class="sig-line">Agronomist / Scientist</div>
        <div class="sig-sub">Krishi Vigyan Kendra (KVK)</div>
      </div>
      <div>
        <div class="sig-line">Beneficiary Farmer / FPO Lead</div>
        <div class="sig-sub">Authorized Signatory</div>
      </div>
    </div>

    <div class="footer">
      Generated automatically by Krishi Green Platform • Certified compliant with Fertilizer Control Order (FCO) 1985 & Bureau of Energy Efficiency (BEE) CCTS Guidelines.
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `KrishiGreen_Impact_Certificate_${dateSlug}.html`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
