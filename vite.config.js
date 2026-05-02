import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Актив 554',
        short_name: 'Актив 554',
        description: 'Новости Лицея №554 и предложения от учеников',
        theme_color: '#1e88e5',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'logo-big.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]

})
