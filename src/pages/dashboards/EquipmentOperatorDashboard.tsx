import React, { useState } from 'react';
import { SupportedLanguage } from '../../types';
import { AP_MACHINERY_CATALOG } from '../../data/apMachineryCatalog';
import {
  IconTruck,
  IconCheck,
  IconPhone,
  IconShield,
} from '../../components/Icons';

interface EquipmentOperatorDashboardProps {
  language: SupportedLanguage;
}

export function EquipmentOperatorDashboard({ language }: EquipmentOperatorDashboardProps) {
  const isTe = language === 'te';

  const [inventory, setInventory] = useState(
    AP_MACHINERY_CATALOG.slice(0, 8).map((eq, i) => ({
      ...eq,
      status: i % 3 === 0 ? 'In Field' : 'Available',
    }))
  );

  const toggleStatus = (id: string) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === 'Available'
                  ? 'In Field'
                  : item.status === 'In Field'
                  ? 'Maintenance'
                  : 'Available',
            }
          : item
      )
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn text-[#17231c]">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-green-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-emerald-300 uppercase">
              CHC Hub Operations
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold">
              Equipment Hub & Machinery Operator
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100">
              Manage machinery availability, dispatch status, and hourly rental logs.
            </p>
          </div>

          <div className="p-3 bg-emerald-900/60 rounded-xl border border-emerald-700/60 text-center">
            <span className="block text-xl font-mono font-bold text-amber-300">
              {inventory.filter((i) => i.status === 'Available').length} / {inventory.length}
            </span>
            <span className="text-[10px] text-emerald-200 uppercase font-semibold">Available Units</span>
          </div>
        </div>
      </div>

      {/* Inventory List */}
      <div className="bg-white border border-emerald-100 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 text-sm">
            Machinery Inventory & Status Control ({inventory.length})
          </h3>
          <span className="text-xs text-gray-500 font-mono">Click status badge to toggle</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-mono uppercase text-[10px] border-b border-gray-100">
              <tr>
                <th className="p-4">Item ID</th>
                <th className="p-4">Machinery Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Hourly Rent</th>
                <th className="p-4">Condition</th>
                <th className="p-4">Current Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-emerald-50/40 transition">
                  <td className="p-4 font-mono font-bold text-emerald-800">{item.id}</td>
                  <td className="p-4">
                    <strong className="block text-gray-900">{item.name}</strong>
                    {item.nameTelugu && (
                      <span className="text-emerald-700 text-[11px]">{item.nameTelugu}</span>
                    )}
                  </td>
                  <td className="p-4 text-gray-600">{item.category}</td>
                  <td className="p-4 font-mono font-bold text-gray-900">₹{item.rentPricePerHour}/hr</td>
                  <td className="p-4 text-amber-600 font-bold">★ {item.conditionRating}</td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(item.id)}
                      className={`px-3 py-1 rounded-full font-bold text-[10px] transition cursor-pointer ${
                        item.status === 'Available'
                          ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                          : item.status === 'In Field'
                          ? 'bg-blue-100 text-blue-900 hover:bg-blue-200'
                          : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                      }`}
                    >
                      ● {item.status} (Toggle)
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
