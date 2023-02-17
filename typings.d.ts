declare module '*.css';
declare module '*.scss';
declare module '*.less';
declare module '*.png';

interface PrecacheEntry {
  integrity?: string;
  url: string;
  revision?: string | null;
}
interface Window {
  __WB_MANIFEST: Array<PrecacheEntry | string>;
}
