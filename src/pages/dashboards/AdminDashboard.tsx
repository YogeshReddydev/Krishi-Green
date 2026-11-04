import React, { useState } from 'react';
import {
  SupportedLanguage,
  WasteCollectionRequest,
  ProcessingBatch,
  OrganicProduct,
  SupportTicket,
  UserRole,
} from '../../types';
import { navigateTo, APP_ROUTES } from '../../utils/navigation';
import {
  IconShield,
  IconCheck,
  IconLayers,
  IconUsers,
  IconPhone,
  IconChevronRight,
} from '../../components/Icons';

interface AdminDashboardProps {
  language: SupportedLanguage;
  wasteRequests: WasteCollectionRequest[];
  batches: ProcessingBatch[];
  products: OrganicProduct[];
  tickets: SupportTicket[];
}

export function AdminDashboard({
  language,
  wasteRequests,
  batches,
  products,
  tickets,
}: AdminDashboardProps) {
  const [simulatedRole, setSimulatedRole] = useState<UserRole>('admin');

  const roles: { role: UserRole; label: string; route: string }[] = [
    { role: 'farmer', label: 'Farmer (Rythu)', route: APP_ROUTES.DASHBOARD_FARMER },
    { role: 'waste_operator', label: 'Waste Operator', route: APP_ROUTES.DASHBOARD_WASTE },
    { role: 'processing_operator', label: 'Processing Facility Operator', route: APP_ROUTES.DASHBOARD_PROCESSING },
    { role: 'equipment_operator', label: 'Equipment Hub Operator', route: APP_ROUTES.DASHBOARD_EQUIPMENT },
    { role: 'csr_partner', label: 'CSR / Institutional Partner', route: APP_ROUTES.DASHBOARD_PARTNER },
    { role: 'verifier', label: 'Independent Carbon Verifier', route: APP_ROUTES.DASHBOARD_VERIFICATION },
    { role: 'admin', label: 'System Super Admin', route: APP_ROUTES.ADMIN },
  ];

  return (
    <div className="space-y-8 animate-fadeIn text-[#17231c]">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-green-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-emerald-300 uppercase">
              Control Panel
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold">
              Platform Administration & Role Management
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100">
              System telemetry, role simulation, live database records, and moderation.
            </p>
          </div>

          <div className="px-3 py-1.5 bg-emerald-800/80 border border-emerald-600 rounded-xl text-xs font-mono font-bold text-emerald-200">
            ● Firestore Connected (Live)
          </div>
        </div>
      </div>

      {/* Role Switcher for Presentation & Demonstration */}
      <div className="bg-white border border-emerald-200 rounded-3xl p-6 shadow-xs space-y-4">
        <div>
          <h3 className="font-bold text-base text-gray-900">
            Role-Based Access Simulator (7 User Roles)
          </h3>
          <p className="text-xs text-gray-500">
            Quickly jump to any stakeholder role dashboard to demonstrate platform workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {roles.map((r) => (
            <button
              key={r.role}
              onClick={() => {
                setSimulatedRole(r.role);
                navigateTo(r.route);
              }}
              className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/60 hover:bg-emerald-50 hover:border-emerald-400 text-left transition flex items-center justify-between group"
            >
              <div>
                <strong className="block text-xs text-gray-900 group-hover:text-emerald-900">
                  {r.label}
                </strong>
                <span className="text-[10px] text-gray-500 font-mono">{r.route}</span>
              </div>
              <IconChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-700" />
            </button>
          ))}
        </div>
      </div>

      {/* Real-Time Telemetry Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-emerald-100 rounded-2xl p-5 space-y-1 shadow-xs">
          <span className="text-[11px] text-gray-400 uppercase font-semibold">Waste Requests</span>
          <div className="text-2xl font-black text-gray-900 font-mono">{wasteRequests.length}</div>
          <span className="text-[10px] text-emerald-700 font-bold">Active in DB</span>
        </div>

        <div className="bg-white border border-emerald-100 rounded-2xl p-5 space-y-1 shadow-xs">
          <span className="text-[11px] text-gray-400 uppercase font-semibold">Active Batches</span>
          <div className="text-2xl font-black text-gray-900 font-mono">{batches.length}</div>
          <span className="text-[10px] text-emerald-700 font-bold">In Fermentation</span>
        </div>

        <div className="bg-white border border-emerald-100 rounded-2xl p-5 space-y-1 shadow-xs">
          <span className="text-[11px] text-gray-400 uppercase font-semibold">Marketplace Items</span>
          <div className="text-2xl font-black text-gray-900 font-mono">{products.length}</div>
          <span className="text-[10px] text-emerald-700 font-bold">Listed Products</span>
        </div>

        <div className="bg-white border border-emerald-100 rounded-2xl p-5 space-y-1 shadow-xs">
          <span className="text-[11px] text-gray-400 uppercase font-semibold">Support Tickets</span>
          <div className="text-2xl font-black text-gray-900 font-mono">{tickets.length}</div>
          <span className="text-[10px] text-amber-700 font-bold">Open Tickets</span>
        </div>
      </div>

      {/* System Navigation Quick Map */}
      <div className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-gray-900">
          All 18 Platform Routes Direct Access
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          {[
            { label: 'Home', path: APP_ROUTES.HOME },
            { label: 'About', path: APP_ROUTES.ABOUT },
            { label: 'Sustainable Farming', path: APP_ROUTES.SUSTAINABLE_FARMING },
            { label: 'Waste Management', path: APP_ROUTES.WASTE_MANAGEMENT },
            { label: 'AGA Fertilizer', path: APP_ROUTES.AGA },
            { label: 'Marketplace', path: APP_ROUTES.MARKETPLACE },
            { label: 'Equipment Hub', path: APP_ROUTES.EQUIPMENT_HUB },
            { label: 'Carbon Integrity', path: APP_ROUTES.CARBON_INTEGRITY },
            { label: 'Partnerships', path: APP_ROUTES.PARTNERSHIPS },
            { label: 'Agri Updates', path: APP_ROUTES.AGRICULTURE_UPDATES },
            { label: 'Contact', path: APP_ROUTES.CONTACT },
            { label: 'Farmer Dashboard', path: APP_ROUTES.DASHBOARD_FARMER },
            { label: 'Waste Dashboard', path: APP_ROUTES.DASHBOARD_WASTE },
            { label: 'Processing Dash', path: APP_ROUTES.DASHBOARD_PROCESSING },
            { label: 'Equipment Dash', path: APP_ROUTES.DASHBOARD_EQUIPMENT },
            { label: 'Partner Dash', path: APP_ROUTES.DASHBOARD_PARTNER },
            { label: 'Admin Dash', path: APP_ROUTES.ADMIN },
            { label: 'Verifier Dash', path: APP_ROUTES.DASHBOARD_VERIFICATION },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => navigateTo(item.path)}
              className="p-2.5 rounded-xl border border-gray-200 bg-[#fbfbf9] hover:bg-emerald-50 hover:border-emerald-300 text-left font-semibold text-gray-800 transition"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
