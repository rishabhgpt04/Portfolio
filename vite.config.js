import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Treat .lottie as a static asset so Vite won't try to parse it as JS
  assetsInclude: ['**/*.lottie'],
  plugins: [
    react(),
    tailwindcss(),
  ],
})