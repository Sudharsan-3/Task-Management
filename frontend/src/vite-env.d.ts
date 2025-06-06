/// <reference types="vite/client" />
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string;
    REACT_APP_API_KEY: string;
    REACT_APP_MODE: 'development' | 'production' | 'test';
    // Add other environment variables you use
  }
}