import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  // base: '/aktiv-554-local/',
  base: '/aktiv-554.github.io/',
  //TODO: Перед деплоем заменить base в конфиге
  
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
            src: '/public/logo-big.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]

})
