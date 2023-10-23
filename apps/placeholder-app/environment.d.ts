declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_JWT_SECRET_KEY_TEST: string;
    readonly NEXT_PUBLIC_JWT_SECRET_KEY_UAT: string;
    readonly NEXT_PUBLIC_JWT_SECRET_KEY_PROD: string;
  }
}
