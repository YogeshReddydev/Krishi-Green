import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface SpeechListenButtonProps {
  text: string;
  textTe?: string;
  language: SupportedLanguage;
  size?: 'xs' | 'sm' | 'md';
  variant?: 'solid' | 'subtle' | 'outline' | 'emerald';
  className?: string;
  label?: string;
}

export const SpeechListenButton: React.FC<SpeechListenButtonProps> = ({
  text,
  textTe,
  language,
  size = 'sm',
  variant = 'solid',
  className = '',
  label,
}) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Stop any playback on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stopAllAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsLoadingAudio(false);
  };

  const speakWithBrowserSpeech = (contentToSpeak: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(contentToSpeak);

    const langVoiceMap: Record<SupportedLanguage, string> = {
      te: 'te-IN',
      en: 'en-IN',
      hi: 'hi-IN',
      ta: 'ta-IN',
      kn: 'kn-IN',
      mr: 'mr-IN',
      bn: 'bn-IN',
      gu: 'gu-IN',
      ml: 'ml-IN',
      pa: 'pa-IN',
      or: 'or-IN',
      ur: 'ur-IN',
      as: 'as-IN',
    };

    const targetLangCode = langVoiceMap[language] || 'en-IN';
    utterance.lang = targetLangCode;
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      let matchedVoice = voices.find(
        (v) =>
          v.lang.toLowerCase() === targetLangCode.toLowerCase() ||
          v.lang.toLowerCase().replace('_', '-') === targetLangCode.toLowerCase()
      );

      if (!matchedVoice && targetLangCode.includes('-')) {
        const prefix = targetLangCode.split('-')[0].toLowerCase();
        matchedVoice = voices.find(
          (v) =>
            v.lang.toLowerCase().startsWith(prefix) ||
            v.name.toLowerCase().includes(language === 'te' ? 'telugu' : prefix)
        );
      }

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsLoadingAudio(false);
    };
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleToggleSpeak = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isSpeaking || isLoadingAudio) {
      stopAllAudio();
      return;
    }

    stopAllAudio();

    // Determine the exact spoken text based on selected language
    let contentToSpeak = text;
    if (language === 'te') {
      contentToSpeak = textTe || text;
    }

    if (!contentToSpeak || contentToSpeak.trim().length === 0) return;

    // For Telugu or regional speech, try server-side TTS first for native pronunciation
    setIsLoadingAudio(true);
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: contentToSpeak,
          language: language,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.audio) {
          const audio = new Audio(`data:audio/wav;base64,${data.audio}`);
          audioRef.current = audio;
          audio.onended = () => {
            setIsSpeaking(false);
            audioRef.current = null;
          };
          audio.onerror = () => {
            speakWithBrowserSpeech(contentToSpeak);
          };
          await audio.play();
          setIsSpeaking(true);
          setIsLoadingAudio(false);
          return;
        }
      }
    } catch {
      // ignore server TTS error and fallback to browser speech
    }

    // Fallback to browser Web Speech API
    speakWithBrowserSpeech(contentToSpeak);
  };

  const getButtonText = () => {
    if (label) return label;
    if (isLoadingAudio) {
      return language === 'te' ? 'వాయిస్ లోడ్...' : 'Loading...';
    }
    if (isSpeaking) {
      return language === 'te' ? 'ఆపండి' : 'Stop';
    }
    return language === 'te' ? 'వినండి' : 'Listen';
  };

  const sizeClasses = {
    xs: 'px-2 py-0.5 text-[10px] gap-1',
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3.5 py-1.5 text-sm gap-2',
  }[size];

  const variantClasses = {
    solid: isSpeaking
      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs animate-pulse'
      : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-2xs',
    emerald: isSpeaking
      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs animate-pulse'
      : 'bg-emerald-800 hover:bg-emerald-900 text-emerald-100 border border-emerald-600 shadow-2xs',
    subtle: isSpeaking
      ? 'bg-rose-100 text-rose-800 hover:bg-rose-200'
      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200',
    outline: isSpeaking
      ? 'border border-rose-300 text-rose-700 bg-rose-50'
      : 'border border-emerald-300 text-emerald-800 hover:bg-emerald-50',
  }[variant];

  return (
    <button
      onClick={handleToggleSpeak}
      title={
        isSpeaking
          ? language === 'te'
            ? 'వాయిస్ ఆపండి'
            : 'Stop Voice Reading'
          : language === 'te'
          ? 'తెలుగులో వినండి'
          : 'Listen to agro-bulletin readout'
      }
      className={`inline-flex items-center font-bold rounded-xl transition duration-150 active:scale-95 shrink-0 select-none ${sizeClasses} ${variantClasses} ${className}`}
    >
      {isLoadingAudio ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : isSpeaking ? (
        <VolumeX className="w-3.5 h-3.5 text-rose-200 shrink-0" />
      ) : (
        <Volume2 className="w-3.5 h-3.5 shrink-0" />
      )}
      <span>{getButtonText()}</span>
    </button>
  );
};
