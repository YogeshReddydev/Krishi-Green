import React, { useState } from 'react';
import {
  Navigation,
  MapPin,
  Search,
  Compass,
  Building2,
  Truck,
  FlaskConical,
  Store,
  ExternalLink,
  Loader2,
  CheckCircle2,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { SupportedLanguage } from '../types';

interface MapsLocationDetectorProps {
  language: SupportedLanguage;
  onLocationDetected?: (locationName: string) => void;
}

export const MapsLocationDetector: React.FC<MapsLocationDetectorProps> = ({
  language,
  onLocationDetected,
}) => {
  const [currentLocation, setCurrentLocation] = useState<string>('Nashik, Maharashtra');
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>({ lat: 20.00, lon: 73.79 });
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [isSearchingMaps, setIsSearchingMaps] = useState<boolean>(false);
  const [mapsResult, setMapsResult] = useState<any | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<string>('all');

  // Handle GPS detection
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lon: longitude });

        try {
          // Reverse geocode via open-meteo/nominatim
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
          );
          if (res.ok) {
            const data = await res.json();
            const locName = data.address?.state_district || data.address?.county || data.address?.city || `${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E`;
            setCurrentLocation(locName);
            if (onLocationDetected) onLocationDetected(locName);
            handleFetchMapsGrounding(locName);
          } else {
            handleFetchMapsGrounding(`${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E`);
          }
        } catch (err) {
          handleFetchMapsGrounding(`${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E`);
        } finally {
          setIsDetecting(false);
        }
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setIsDetecting(false);
      },
      { timeout: 10000 }
    );
  };

  const handleFetchMapsGrounding = async (loc = currentLocation, facility = selectedFacility) => {
    setIsSearchingMaps(true);
    try {
      const facilityQuery =
        facility === 'kvk'
          ? 'Krishi Vigyan Kendra (KVK) and soil testing laboratories'
          : facility === 'mandi'
          ? 'APMC vegetable mandi yard and crop markets'
          : facility === 'compost'
          ? 'organic composting units and bio-fertilizer centers'
          : 'Krishi Vigyan Kendra (KVK), APMC mandi yard, and bio-fertilizer centers';

      const res = await fetch('/api/maps-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: loc,
          query: facilityQuery,
        }),
      });

      if (!res.ok) throw new Error('Maps grounding unavailable');
      const data = await res.json();
      setMapsResult(data);
    } catch (err) {
      console.warn('Maps grounding error:', err);
    } finally {
      setIsSearchingMaps(false);
    }
  };

  return (
    <div className="bg-white/98 backdrop-blur-md rounded-3xl border border-emerald-100 p-5 sm:p-6 shadow-sm space-y-4">
      {/* Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <Compass className="w-4 h-4" />
            </span>
            <h3 className="font-extrabold text-gray-900 text-base">
              Google Maps Location & Agri-Hub Detector
            </h3>
          </div>
          <p className="text-xs text-gray-500">
            Detect your farm coordinates and find nearby Krishi Vigyan Kendras (KVK), mandis, and composting nodes.
          </p>
        </div>

        <button
          onClick={handleDetectLocation}
          disabled={isDetecting}
          className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow-sm active:scale-98 self-start sm:self-auto cursor-pointer"
        >
          {isDetecting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Navigation className="w-3.5 h-3.5" />
          )}
          <span>{isDetecting ? 'Detecting GPS...' : 'Detect Farm Location'}</span>
        </button>
      </div>

      {/* Location Input & Facility Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-7 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3.5 py-2">
          <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
          <input
            type="text"
            value={currentLocation}
            onChange={(e) => setCurrentLocation(e.target.value)}
            placeholder="Enter village, district, or state..."
            className="w-full bg-transparent text-xs font-bold text-gray-900 focus:outline-none"
          />
          <button
            onClick={() => handleFetchMapsGrounding()}
            disabled={isSearchingMaps}
            className="px-3 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-lg text-xs font-bold transition shrink-0"
          >
            {isSearchingMaps ? 'Searching...' : 'Search'}
          </button>
        </div>

        <div className="sm:col-span-5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Centers' },
            { id: 'kvk', label: 'KVK & Soil Labs' },
            { id: 'mandi', label: 'APMC Mandi' },
            { id: 'compost', label: 'Composting Units' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedFacility(tab.id);
                handleFetchMapsGrounding(currentLocation, tab.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                selectedFacility === tab.id
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Coordinate & Live Detection Badge */}
      {coords && (
        <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 bg-emerald-50/60 p-3 rounded-2xl border border-emerald-200/60 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-semibold text-emerald-950">Active Agricultural Coordinates:</span>
            <span className="font-mono text-emerald-800 font-bold">
              {coords.lat.toFixed(4)}° N, {coords.lon.toFixed(4)}° E
            </span>
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${currentLocation} agricultural centers`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-extrabold text-emerald-800 hover:underline flex items-center gap-1"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Maps Grounded Intelligence Results */}
      {mapsResult && (
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/90 to-teal-50/90 border border-emerald-200 space-y-3 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <strong className="text-xs font-extrabold text-emerald-950">
              Grounded Maps Intelligence (Google Maps Data via Gemini 3.5 Flash):
            </strong>
          </div>

          <div className="text-xs text-gray-800 whitespace-pre-line leading-relaxed bg-white/80 p-3.5 rounded-xl border border-emerald-100">
            {mapsResult.answer}
          </div>

          {/* Quick Facility Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `Krishi Vigyan Kendra near ${currentLocation}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-xl border border-gray-200 hover:border-emerald-400 transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-gray-800">Nearest KVK Hub</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-700 transition" />
            </a>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `APMC Mandi near ${currentLocation}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-xl border border-gray-200 hover:border-emerald-400 transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-amber-600" />
                <span className="font-bold text-gray-800">APMC Mandi Yard</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-700 transition" />
            </a>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `Organic waste composting facility near ${currentLocation}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-xl border border-gray-200 hover:border-emerald-400 transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-teal-600" />
                <span className="font-bold text-gray-800">Composting Center</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-700 transition" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
