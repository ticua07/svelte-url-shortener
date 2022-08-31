/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly PAPU_SECRET: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
