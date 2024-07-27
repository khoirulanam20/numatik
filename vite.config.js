import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    define: {
        'import.meta.env.VITE_MIDTRANS_CLIENT_KEY': JSON.stringify(process.env.MIDTRANS_CLIENT_KEY),
    },
});