import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css', 
                'resources/css/cadastrar_reservas.css', 
                'resources/js/app.js', 
                'resources/js/consultar_reservas.js', 
                'resources/js/cadastrar_reservas.js', 
                'resources/js/gerenciar_salas.js', 
                'resources/scss/app.scss'
            ],
            refresh: true,
        }),
        
    ],
    server: {
        hmr: {
            host: 'localhost'
        }
    }
});
