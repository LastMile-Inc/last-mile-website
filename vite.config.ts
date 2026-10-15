import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  base: '/',
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    {
      name: 'last-mile-preview-robots',
      configureServer(server) {
        server.middlewares.use((_req, res, next) => {
          res.setHeader('X-Robots-Tag', 'noindex, nofollow')
          next()
        })
      },
      transformIndexHtml(html) {
        if (command === 'serve') {
          return html.replace(
            '<meta name="robots" content="index, follow" data-static-head />',
            '<meta name="robots" content="noindex, nofollow" data-static-head />',
          )
        }
        return html
      },
    },
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Allow the Cloudflare Tunnel preview hostname to reach the local Vite server.
    // Keep this explicit. Do not use allowedHosts: true.
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: [
      'review.lastmileinc.ai',
      'preview.lastmileinc.ai',
    ],
  },
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure public files are copied to build output
    copyPublicDir: true,
    sourcemap: false,
  },
}))
