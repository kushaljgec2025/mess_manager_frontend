import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			'/api': 'http://localhost:8000',
		},
	},
	plugins: [react()],

});



