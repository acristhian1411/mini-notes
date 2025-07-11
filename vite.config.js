import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server:{
		allowedHosts: [
			'https://qxsfnz-ip-181-123-120-95.tunnelmole.net'
		]
	}
});
