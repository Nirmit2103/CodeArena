/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLIST_API_KEY: string;
  readonly VITE_CLIST_USERNAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
