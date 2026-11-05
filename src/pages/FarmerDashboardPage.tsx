import React from 'react';
import { SupportedLanguage, WasteCollectionRequest, OrganicProduct } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  language: SupportedLanguage;
  wasteRequests: WasteCollectionRequest[];
  products: OrganicProduct[];
  onNavigate: (tab: string) => void;
}

export const FarmerDashboardPage: React.FC<Props> = ({ language, wasteRequests, products, onNavigate }) => {
  const isTe = language === 'te';
  const { user, profile, signInWithGoogle } = useAuth();

  if (!user) {
    return (
      <main className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="text-6xl">🌾</div>
        <h1 className="text-2xl font-extrabold text-gray-900">
          {isTe ? 'రైతు డ్యాష్‌బోర్డ్' : 'Farmer Dashboard'}
        </h1>
        <p className="text-gray-600">
          {isTe ? 'మీ ఖాతాలోకి లాగిన్ అవ్వండి.' : 'Sign in to access your farmer dashboard.'}
        </p>
        <button
          onClick={signInWithGoogle}
          className="bg-[#059669] hover:bg-[#047857] text-white font-bold px-8 py-4 rounded-full text-base transition"
        >
          {isTe ? 'Google తో లాగిన్ అవ్వండి' : 'Sign in with Google'}
        </button>
      </main>
    );
  }

  const myRequests = wasteRequests.slice(0, 5);

  const quickActions = [
    { icon: '🗑️', label: isTe ? 'వ్యర్థ సేకరణ అభ్యర్థన' : 'Request Waste Collection', tab: 'waste-management' },
    { icon: '🌱', label: isTe ? 'AGA ఎరువు' : 'Get AGA Fertilizer', tab: 'aga' },
    { icon: '🛒', label: isTe ? 'మార్కెట్‌ప్లేస్' : 'Marketplace', tab: 'marketplace' },
    { icon: '🚜', label: isTe ? 'యంత్రాలు కనుగొనండి' : 'Find Equipment', tab: 'equipment-hub' },
    { icon: '📞', label: isTe ? 'సహాయ కేంద్రం' : 'Customer Support', tab: 'helpline' },
    { icon: '🌤️', label: isTe ? 'వాతావరణం' : 'Weather & News', tab: 'agriculture-updates' },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* Welcome */}
      <section className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl p-6">
        <div className="flex items-center gap-4">
          {profile?.photoURL && (
            <img src={profile.photoURL} alt="" className="w-12 h-12 rounded-full" />
          )}
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">
              {isTe ? `నమస్తే, ${profile?.displayName || 'రైతు'}!` : `Namaste, ${profile?.displayName || 'Farmer'}!`}
            </h1>
            <p className="text-sm text-gray-500">{profile?.village || (isTe ? 'స్థానం అందుబాటులో లేదు' : 'Location not set')}</p>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900">
          {isTe ? 'త్వరిత సేవలు' : 'Quick Services'}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {quickActions.map(({ icon, label, tab }) => (
            <button
              key={tab}
              onClick={() => onNavigate(tab)}
              className="bg-white border border-gray-200 hover:border-[#059669] rounded-2xl p-4 text-center shadow-sm transition space-y-2"
            >
              <div className="text-3xl">{icon}</div>
              <div className="text-sm font-semibold text-gray-800">{label}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Support call — always visible */}
      <section className="bg-[#059669] rounded-2xl p-5 flex items-center justify-between gap-4">
        <div>
          <div className="text-white font-bold text-base">
            {isTe ? 'సహాయం కావాలా?' : 'Need Help?'}
          </div>
          <div className="text-green-100 text-sm mt-0.5">
            {isTe ? 'మీ ఫోన్‌లో నేరుగా కాల్ చేయండి' : 'Call directly from your phone'}
          </div>
        </div>
        <a
          href="tel:1800-KRISHI-GRN"
          className="flex-shrink-0 bg-white text-[#059669] font-extrabold px-5 py-3 rounded-full text-sm shadow-md"
        >
          📞 1800-KRISHI-GRN
        </a>
      </section>

      {/* My waste requests */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900">
          {isTe ? 'నా వ్యర్థ అభ్యర్థనలు' : 'My Waste Requests'}
        </h2>
        {myRequests.length === 0 ? (
          <div className="text-center py-8 bg-white border border-dashed border-gray-300 rounded-2xl space-y-2">
            <div className="text-4xl">📭</div>
            <p className="text-gray-500 text-sm">
              {isTe ? 'ఇంకా అభ్యర్థనలు లేవు.' : 'No requests yet.'}
            </p>
            <button onClick={() => onNavigate('waste-management')} className="text-sm text-[#059669] font-semibold underline">
              {isTe ? 'మొదటి అభ్యర్థన చేయండి' : 'Make your first request'}
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {myRequests.map((r) => (
              <div key={r.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900">{r.village}</div>
                  <div className="text-xs text-gray-500">{r.wasteType} · {r.pickupDate}</div>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full
                  ${r.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
