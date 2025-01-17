declare module 'dashboard/DashboardApp';

declare global {
    interface Window {
      ReactHost: typeof import('react');
    }
  }