import React, { useState } from 'react';
import { SupportedLanguage, WasteCollectionRequest } from '../types';

interface Props {
  language: SupportedLanguage;
  wasteRequests: WasteCollectionRequest[];
  onRequestPickup: (req: Partial<WasteCollectionRequest>) => Promise<void>;
}

export const WasteManagementPage: React.FC<Props> = ({ language, wasteRequests, onRequestPickup }) => {
  const isTe = language === 'te';

  const [form, setForm] = useState({
    generatorType: 'Household' as WasteCollectionRequest['generatorType'],
    wasteType: '',
    estimatedWeightKg: 50,
    village: '',
    contactName: '',
    phone: '',
    pickupDate: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await onRequestPickup({ ...form, createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16) });
    setSubmitted(true);
    setSubmitting(false);
  };

  const sourceTypes: { value: WasteCollectionRequest['generatorType']; label: string; icon: string }[] = [
    { value: 'Household', label: isTe ? 'ఇల్లు' : 'Household', icon: '🏠' },
    { value: 'Mandi / Market', label: isTe ? 'మండి / మార్కెట్' : 'Mandi / Market', icon: '🛒' },
    { value: 'Hotel / Canteen', label: isTe ? 'హోటల్ / కాంటీన్' : 'Hotel / Canteen', icon: '🍽️' },
    { value: 'Farm Residue', label: isTe ? 'వ్యవసాయ అవశేషాలు' : 'Farm Residue', icon: '🌾' },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-12">
      {/* Hero */}
      <section className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {isTe ? 'వ్యర్థ నిర్వహణ' : 'Waste Management'}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {isTe
            ? 'మీ సేంద్రీయ వ్యర్థాలను సేకరణకు నమోదు చేయండి. మేము వాటిని AGA ఎరువుగా మారుస్తాము.'
            : 'Register your organic waste for collection. We will process it into AGA fertilizer and return value to farmers.'}
        </p>
      </section>

      {/* Sources accepted */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          {isTe ? 'మేము ఏ వ్యర్థాలు స్వీకరిస్తాము' : 'Waste Sources We Accept'}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {sourceTypes.map(({ icon, label }) => (
            <div key={label} className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
              <div className="text-3xl mb-2">{icon}</div>
              <div className="text-sm font-semibold text-gray-800">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow steps */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          {isTe ? 'సేకరణ ప్రక్రియ' : 'Collection Process'}
        </h2>
        <ol className="space-y-3">
          {[
            isTe ? 'ఈ ఫారమ్‌లో సేకరణ అభ్యర్థన నమోదు చేయండి' : 'Register a collection request using the form below',
            isTe ? 'మా బృందం మీకు నిర్ధారణ ఇస్తుంది' : 'Our team will confirm your request',
            isTe ? 'నిర్ణీత తేదీన వ్యర్థాలను సేకరిస్తాము' : 'Waste is collected on the scheduled date',
            isTe ? 'అసలు బరువు నమోదు చేయబడుతుంది' : 'Actual weight is recorded',
            isTe ? 'వ్యర్థాలను ప్రాసెసింగ్ కేంద్రానికి తీసుకెళతాము' : 'Waste is transported to our processing centre',
            isTe ? 'AGA ఎరువుగా మారిన తర్వాత రైతులకు పంపిణీ' : 'Processed into AGA fertilizer and distributed to farmers',
          ].map((step, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#059669] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span className="text-gray-700 text-sm">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Request form */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {isTe ? 'సేకరణ అభ్యర్థన చేయండి' : 'Request Waste Collection'}
        </h2>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="text-5xl">✅</div>
            <h3 className="text-lg font-bold text-[#059669]">
              {isTe ? 'అభ్యర్థన పంపబడింది!' : 'Request Submitted!'}
            </h3>
            <p className="text-sm text-gray-600">
              {isTe
                ? 'మీ సేకరణ అభ్యర్థన నమోదు చేయబడింది. మా బృందం త్వరలో మీకు సంప్రదిస్తుంది.'
                : 'Your collection request has been registered. Our team will contact you shortly.'}
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-2 text-sm text-[#059669] underline"
            >
              {isTe ? 'మరొక అభ్యర్థన చేయండి' : 'Submit another request'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Source type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isTe ? 'వ్యర్థ మూలం' : 'Waste Source'} *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {sourceTypes.map(({ value, label, icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setForm({ ...form, generatorType: value })}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition
                      ${form.generatorType === value
                        ? 'bg-[#dcfce7] border-[#059669] text-[#065f46]'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'}`}
                  >
                    <span>{icon}</span> {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Waste type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {isTe ? 'వ్యర్థాల రకం' : 'Type of Waste'} *
              </label>
              <input
                required
                type="text"
                value={form.wasteType}
                onChange={(e) => setForm({ ...form, wasteType: e.target.value })}
                placeholder={isTe ? 'ఉదా: కూరగాయల తొక్కలు, పండ్ల వ్యర్థాలు' : 'e.g. vegetable peels, fruit waste'}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {isTe ? 'అంచనా బరువు (కిలోలు)' : 'Estimated Weight (kg)'} *
              </label>
              <input
                required
                type="number"
                min={5}
                value={form.estimatedWeightKg}
                onChange={(e) => setForm({ ...form, estimatedWeightKg: Number(e.target.value) })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>

            {/* Village */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {isTe ? 'గ్రామం / ప్రాంతం' : 'Village / Location'} *
              </label>
              <input
                required
                type="text"
                value={form.village}
                onChange={(e) => setForm({ ...form, village: e.target.value })}
                placeholder={isTe ? 'మీ గ్రామం లేదా ప్రాంతం' : 'Your village or area name'}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {isTe ? 'పేరు' : 'Your Name'} *
                </label>
                <input
                  required
                  type="text"
                  value={form.contactName}
                  onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {isTe ? 'ఫోన్ నంబర్' : 'Phone Number'} *
                </label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
                />
              </div>
            </div>

            {/* Pickup date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {isTe ? 'సేకరణ తేదీ' : 'Preferred Pickup Date'} *
              </label>
              <input
                required
                type="date"
                value={form.pickupDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setForm({ ...form, pickupDate: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {isTe ? 'అదనపు వివరాలు' : 'Additional Notes'}
              </label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder={isTe ? 'ఏమైనా అదనపు సమాచారం...' : 'Any additional details...'}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#059669] hover:bg-[#047857] text-white font-bold py-4 rounded-xl text-base transition disabled:opacity-60"
            >
              {submitting
                ? (isTe ? 'పంపుతున్నారు...' : 'Submitting...')
                : (isTe ? 'సేకరణ అభ్యర్థన పంపండి' : 'Submit Collection Request')}
            </button>
          </form>
        )}
      </section>

      {/* Existing requests */}
      {wasteRequests.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">
            {isTe ? 'నమోదు అభ్యర్థనలు' : 'Registered Requests'}
          </h2>
          <div className="space-y-3">
            {wasteRequests.slice(0, 10).map((r) => (
              <div key={r.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-900">{r.village}</div>
                  <div className="text-xs text-gray-500">{r.wasteType} · {r.estimatedWeightKg} kg · {r.pickupDate}</div>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full shrink-0
                  ${r.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    r.status === 'Collected' ? 'bg-blue-100 text-blue-800' :
                    r.status === 'In Processing' ? 'bg-amber-100 text-amber-800' :
                    'bg-gray-100 text-gray-700'}`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};
