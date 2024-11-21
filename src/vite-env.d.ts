/// <reference types="vite/client" />

declare namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_RAPIDAPI_KEY: string;
      REACT_APP_RAPIDAPI_HOST: string;
    }
}