import { useState, useEffect, useCallback } from 'react';

export const APP_ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SUSTAINABLE_FARMING: '/sustainable-farming',
  WASTE_MANAGEMENT: '/waste-management',
  AGA: '/aga',
  MARKETPLACE: '/marketplace',
  EQUIPMENT_HUB: '/equipment-hub',
  CARBON_INTEGRITY: '/carbon-integrity',
  PARTNERSHIPS: '/partnerships',
  AGRICULTURE_UPDATES: '/agriculture-updates',
  CONTACT: '/contact',
  // Dashboards
  DASHBOARD_FARMER: '/dashboard/farmer',
  DASHBOARD_WASTE: '/dashboard/waste',
  DASHBOARD_PROCESSING: '/dashboard/processing',
  DASHBOARD_EQUIPMENT: '/dashboard/equipment',
  DASHBOARD_PARTNER: '/dashboard/partner',
  ADMIN: '/admin',
  DASHBOARD_VERIFICATION: '/dashboard/verification',
} as const;

export type AppRoute = typeof APP_ROUTES[keyof typeof APP_ROUTES];

// Custom event for same-page URL changes without reload
const LOCATION_CHANGE_EVENT = 'krishi_location_change';

export function navigateTo(path: string) {
  if (typeof window === 'undefined') return;
  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event(LOCATION_CHANGE_EVENT));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export function useCurrentRoute() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener(LOCATION_CHANGE_EVENT, handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener(LOCATION_CHANGE_EVENT, handleLocationChange);
    };
  }, []);

  const navigate = useCallback((path: string) => {
    navigateTo(path);
  }, []);

  return { currentPath, navigate };
}
