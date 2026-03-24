import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // Isolate framer-motion so it is cached separately
                    'framer-motion': ['framer-motion'],
                    // Isolate React core
                    'react-vendor': ['react', 'react-dom'],
                    // Isolate lucide icons (large bundle)
                    'lucide': ['lucide-react'],
                },
            },
        },
        // Raise the inline asset limit slightly to avoid tiny base64 fetches
        assetsInlineLimit: 4096,
        // Enable CSS code splitting
        cssCodeSplit: true,
    },
})
