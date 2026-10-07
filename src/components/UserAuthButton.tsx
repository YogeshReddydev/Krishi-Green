import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, LogIn, LogOut, Shield, MapPin, Check, Loader2 } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface UserAuthButtonProps {
  language: SupportedLanguage;
}

export const UserAuthButton: React.FC<UserAuthButtonProps> = ({ language }) => {
  const { user, profile, loading, signInWithGoogle, signOut, updateProfileData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [villageInput, setVillageInput] = useState(profile?.village || 'Ramnagar Gram Panchayat');

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error('Sign in failed:', err);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSaveProfile = async () => {
    await updateProfileData({ village: villageInput });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center animate-pulse">
        <User className="w-4 h-4 text-gray-400" />
      </div>
    );
  }

  if (!user) {
    return (
      <button
        onClick={handleSignIn}
        disabled={isSigningIn}
        className="flex items-center gap-2 bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300 font-bold px-3 py-1.5 rounded-xl text-xs shadow-2xs transition active:scale-98 cursor-pointer"
        title="Sign in with Google"
      >
        {isSigningIn ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
        ) : (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        )}
        <span className="hidden sm:inline">Google Sign In</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 p-1 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition text-xs cursor-pointer"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || 'Farmer'}
            className="w-7 h-7 rounded-lg object-cover border border-emerald-300"
          />
        ) : (
          <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
            {user.displayName?.[0] || 'K'}
          </div>
        )}
        <span className="font-extrabold text-emerald-950 hidden md:inline max-w-[100px] truncate">
          {user.displayName?.split(' ')[0] || 'Farmer'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-emerald-100 p-4 z-50 text-xs space-y-3 animate-fadeIn">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Avatar"
                className="w-10 h-10 rounded-xl object-cover border border-emerald-200"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                {user.displayName?.[0] || 'U'}
              </div>
            )}
            <div className="overflow-hidden">
              <strong className="block text-gray-900 truncate font-black text-sm">
                {user.displayName || 'Kisan User'}
              </strong>
              <span className="text-gray-500 text-[11px] block truncate">{user.email}</span>
              <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                ✓ Verified Farmer Node
              </span>
            </div>
          </div>

          <div className="space-y-1.5 text-gray-600">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                Village Node:
              </span>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-emerald-700 hover:underline text-[10px]"
                >
                  Edit
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={villageInput}
                  onChange={(e) => setVillageInput(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-900"
                />
                <button
                  onClick={handleSaveProfile}
                  className="p-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <p className="font-semibold text-gray-800 bg-gray-50 p-2 rounded-lg border border-gray-100 text-[11px]">
                {profile?.village || 'Ramnagar Gram Panchayat'}
              </p>
            )}

            <div className="pt-1 flex items-center justify-between text-[11px] text-gray-500">
              <span>Database Sync:</span>
              <span className="text-emerald-700 font-bold">Firestore Persistent</span>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => {
                signOut();
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-rose-600 hover:bg-rose-50 rounded-xl font-bold transition text-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
