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
    server: {
        host: '0.0.0.0', // Ouve em todas as interfaces de rede dentro do container
        port: 5173,      // Porta padrão do Vite
        hmr: {
            host: 'localhost', // Informa ao cliente para se conectar a localhost
        },
        watch: {
            usePolling: true,
            interval: 100,
        }
    },
});