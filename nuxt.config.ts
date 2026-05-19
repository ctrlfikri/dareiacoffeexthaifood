import { resolve } from 'node:path'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  css: [resolve(__dirname, 'app/assets/css/main.css')],

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-11-01',

  app: {
    head: {
      title: 'Dareia Coffee x Thai Food — Penang',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Dareia Coffee x Thai Food — Western, Local & Authentic Thai Food in Farlim, Air Itam, Penang.',
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Sarabun:wght@300;400;500;600;700&display=swap',
        },
      ],
    },
  },

  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit'],
    },
  },
})
