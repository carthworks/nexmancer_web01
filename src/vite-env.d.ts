/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Public HTTPS endpoint that accepts contact-form JSON (e.g. your own API route,
   * Formspree, Resend proxy, etc.). This URL is NOT a secret — never put API keys
   * in VITE_* variables; keep keys on the server that receives this request.
   */
  readonly VITE_CONTACT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
